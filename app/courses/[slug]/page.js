import { supabase } from "@/lib/supabase"
import { lovableSupabase } from "@/lib/supabase-lovable"
import { slugify } from "@/lib/slugify"
import { notFound } from "next/navigation"

export const revalidate = 3600

// ---------------------------------------------------------------------------
// Static generation for all courses
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  const { data: courses } = await supabase.from("courses").select("name")
  return (courses ?? []).map((c) => ({ slug: slugify(c.name) }))
}

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({ params }) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  if (!course) return {}

  const title = `${course.name} – Golf Course in ${course.city}, GA`
  const description = `View details, leaderboard, and reviews for ${course.name} in ${course.city}, Georgia. Par ${course.par ?? "N/A"}, Slope ${course.slope_rating ?? "N/A"}.`
  const ogImage = course.photo_urls?.[0] ?? null

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
      type: "website",
      siteName: "Season Golf",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
async function getCourseBySlug(slug) {
  const { data: courses } = await supabase.from("courses").select("*")
  return courses?.find((c) => slugify(c.name) === slug) ?? null
}

async function getLeaderboard(courseSlug) {
  const empty = { players: [], totalMatches: 0, totalPlayers: 0 }

  const { data: lovableCourses } = await lovableSupabase
    .from("courses")
    .select("course_id, slug")
    .eq("slug", courseSlug)
    .limit(1)

  if (!lovableCourses || lovableCourses.length === 0) return empty

  const courseId = lovableCourses[0].course_id

  // Humans-only match participants at this course. Posted_player personas
  // (AI opponents) are excluded — their `user_id` is null.
  // result_type on `matches` is from the PLAYER role's perspective; the
  // OPPONENT gets the inverse.
  const { data: mps } = await lovableSupabase
    .from("match_players")
    .select("role, user_id, matches!inner(match_id, result_type, status, course_id)")
    .eq("matches.course_id", courseId)
    .eq("matches.status", "COMPLETED")
    .not("user_id", "is", null)

  if (!mps || mps.length === 0) return empty

  const byUser = new Map()
  for (const mp of mps) {
    if (!mp.matches) continue
    const uid = mp.user_id
    if (!byUser.has(uid)) {
      byUser.set(uid, { userId: uid, wins: 0, losses: 0, halves: 0 })
    }
    const agg = byUser.get(uid)
    const rt = mp.matches.result_type
    if (rt === "HALVE") {
      agg.halves++
    } else if (rt === "WIN") {
      mp.role === "PLAYER" ? agg.wins++ : agg.losses++
    } else if (rt === "LOSS") {
      mp.role === "PLAYER" ? agg.losses++ : agg.wins++
    }
  }

  // Resolve display names from `profiles`. No direct FK from match_players
  // → profiles (both share auth.users), so a second query.
  const userIds = [...byUser.keys()]
  const { data: profiles } = await lovableSupabase
    .from("profiles")
    .select(
      "user_id, public_name, first_name, last_name, display_name, is_test_user"
    )
    .in("user_id", userIds)

  const profileByUser = new Map((profiles ?? []).map((p) => [p.user_id, p]))

  const players = [...byUser.values()]
    .map((p) => {
      const profile = profileByUser.get(p.userId)
      const fullName =
        profile?.first_name && profile?.last_name
          ? `${profile.first_name} ${profile.last_name}`
          : null
      return {
        ...p,
        name:
          profile?.public_name ??
          fullName ??
          profile?.display_name ??
          null,
        isTestUser: profile?.is_test_user ?? false,
        matches: p.wins + p.losses + p.halves,
        points: p.wins + 0.5 * p.halves,
      }
    })
    .filter((p) => p.matches > 0 && p.name && !p.isTestUser)

  players.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    if (b.matches !== a.matches) return b.matches - a.matches
    return a.name.localeCompare(b.name)
  })

  return {
    players: players.slice(0, 10).map((p, i) => ({
      rank: i + 1,
      name: p.name,
      playerId: p.userId,
      record: `${p.wins}-${p.losses}-${p.halves}`,
      points: p.points,
      handicap: null,
      matches: p.matches,
    })),
    // Distinct completed matches. Can't halve participation count since
    // most matches are human-vs-AI (only one `user_id` row per match).
    totalMatches: new Set(
      mps.map((m) => m.matches?.match_id).filter(Boolean)
    ).size,
    totalPlayers: players.length,
  }
}

// Placeholder star SVG
function Stars({ rating }) {
  if (!rating) return null
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.3
  return (
    <span className="inline-flex items-center gap-0.5 text-yellow-500">
      {Array.from({ length: full }, (_, i) => (
        <span key={i}>&#9733;</span>
      ))}
      {hasHalf && <span>&#9734;</span>}
      <span className="ml-1 text-sm text-gray-600">{rating}</span>
    </span>
  )
}

function formatPoints(pts) {
  return Number.isInteger(pts) ? pts.toString() : pts.toFixed(1)
}

// Real leaderboard
function Leaderboard({ players }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-500 border-b">
          <th className="py-2 pr-4 w-12">#</th>
          <th className="py-2 pr-4">Player</th>
          <th className="py-2 pr-4 text-right">Pts</th>
          <th className="py-2 pr-4 text-right">W-L-H</th>
          <th className="py-2 pr-4 text-right">HDCP</th>
          <th className="py-2 text-right">Matches</th>
        </tr>
      </thead>
      <tbody>
        {players.map((p) => (
          <tr key={p.playerId} className="border-b border-gray-100">
            <td className="py-3 pr-4 font-medium">{p.rank}</td>
            <td className="py-3 pr-4">
              <a
                href={`https://season.golf/course-selection?liveOpponentId=${p.playerId}&liveOpponentName=${encodeURIComponent(p.name)}`}
                className="text-brand font-medium hover:underline"
              >
                {p.name}
              </a>
            </td>
            <td className="py-3 pr-4 text-right font-semibold">
              {formatPoints(p.points)}
            </td>
            <td className="py-3 pr-4 text-right text-gray-600">{p.record}</td>
            <td className="py-3 pr-4 text-right text-gray-600">
              {p.handicap != null ? p.handicap.toFixed(1) : "–"}
            </td>
            <td className="py-3 text-right text-gray-600">{p.matches}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Ghost leaderboard rows
function GhostLeaderboard() {
  const rows = [
    { rank: 1, name: "▓▓▓▓▓▓▓▓", pts: "▓", record: "▓-▓-▓" },
    { rank: 2, name: "▓▓▓▓▓▓", pts: "▓", record: "▓-▓-▓" },
    { rank: 3, name: "▓▓▓▓▓▓▓", pts: "▓", record: "▓-▓-▓" },
    { rank: 4, name: "▓▓▓▓▓", pts: "▓", record: "▓-▓-▓" },
    { rank: 5, name: "▓▓▓▓▓▓▓▓", pts: "▓", record: "▓-▓-▓" },
  ]
  return (
    <div className="relative">
      <div className="blur-[3px] select-none">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2 pr-4 w-12">#</th>
              <th className="py-2 pr-4">Player</th>
              <th className="py-2 pr-4 text-right">Pts</th>
              <th className="py-2 text-right">W-L-H</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.rank} className="border-b border-gray-100">
                <td className="py-3 pr-4 font-medium">{r.rank}</td>
                <td className="py-3 pr-4 text-gray-400">{r.name}</td>
                <td className="py-3 pr-4 text-right text-gray-400">{r.pts}</td>
                <td className="py-3 text-right text-gray-400">{r.record}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-lg font-semibold text-brand mb-3">
          Your name could be #1 here
        </p>
        <a
          href="https://season.golf"
          className="inline-block bg-brand text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-brand-light transition"
        >
          Play on Season Golf &rarr;
        </a>
      </div>
    </div>
  )
}

// Build fresh Google Places photo URL from a stored URL
function freshPhotoUrl(storedUrl) {
  // Extract the photo resource name: places/{id}/photos/{ref}
  const match = storedUrl.match(/(places\/[^/]+\/photos\/[^/]+)/)
  if (!match) return storedUrl
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  return `https://places.googleapis.com/v1/${match[1]}/media?maxWidthPx=800&key=${apiKey}`
}

// Photo strip component
function PhotoStrip({ photos }) {
  if (!photos || photos.length === 0) {
    // Placeholder strips when no photos available
    return (
      <div className="grid grid-cols-3 gap-2 mb-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-xl bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center"
          >
            <span className="text-brand/30 text-4xl">&#9971;</span>
          </div>
        ))}
      </div>
    )
  }

  const display = photos.slice(0, 3)
  return (
    <div className="grid grid-cols-3 gap-2 mb-8">
      {display.map((url, i) => (
        <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
          <img
            src={freshPhotoUrl(url)}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {/* Fill remaining slots with placeholders */}
      {Array.from({ length: 3 - display.length }, (_, i) => (
        <div
          key={`placeholder-${i}`}
          className="aspect-[4/3] rounded-xl bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center"
        >
          <span className="text-brand/30 text-4xl">&#9971;</span>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default async function CourseDetailPage({ params }) {
  const { slug } = await params
  const [course, leaderboardData] = await Promise.all([
    getCourseBySlug(slug),
    getLeaderboard(slug),
  ])
  if (!course) notFound()
  const { players: leaderboard, totalMatches, totalPlayers } = leaderboardData

  return (
    <main className="flex-1 bg-white">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Photo strip */}
        <PhotoStrip photos={course.photo_urls} />

        {/* Course name & rating */}
        <h1 className="text-3xl font-bold text-brand mb-2">{course.name}</h1>

        {course.rating && (
          <div className="flex items-center gap-2 mb-1">
            <Stars rating={course.rating} />
            {course.review_count && (
              <span className="text-sm text-gray-500">
                ({course.review_count} reviews)
              </span>
            )}
          </div>
        )}

        {course.address && (
          <p className="text-gray-500 text-sm mb-4">{course.address}</p>
        )}
        {!course.address && (
          <p className="text-gray-500 text-sm mb-4">{course.city}, Georgia</p>
        )}

        {/* Stats row */}
        <div className="flex flex-wrap gap-6 py-4 mb-8 border-y border-gray-100">
          {course.par && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Par</p>
              <p className="text-lg font-semibold">{course.par}</p>
            </div>
          )}
          {course.slope_rating && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Slope</p>
              <p className="text-lg font-semibold">{course.slope_rating}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Matches Played</p>
            <p className="text-lg font-semibold">{totalMatches}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Players</p>
            <p className="text-lg font-semibold">{totalPlayers}</p>
          </div>
        </div>

        {/* Leaderboard */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
          {leaderboard.length > 0 ? (
            <Leaderboard players={leaderboard} />
          ) : (
            <GhostLeaderboard />
          )}
        </section>

        {/* About */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">About {course.name}</h2>
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <dl className="grid grid-cols-2 gap-y-3 text-sm">
              <dt className="text-gray-500">Location</dt>
              <dd className="font-medium">{course.city}, Georgia</dd>
              {course.par && (
                <>
                  <dt className="text-gray-500">Par</dt>
                  <dd className="font-medium">{course.par}</dd>
                </>
              )}
              {course.slope_rating && (
                <>
                  <dt className="text-gray-500">Slope Rating</dt>
                  <dd className="font-medium">{course.slope_rating}</dd>
                </>
              )}
              {course.rating && (
                <>
                  <dt className="text-gray-500">Google Rating</dt>
                  <dd className="font-medium">{course.rating} / 5</dd>
                </>
              )}
              {course.website && (
                <>
                  <dt className="text-gray-500">Website</dt>
                  <dd>
                    <a
                      href={course.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand underline"
                    >
                      Visit site
                    </a>
                  </dd>
                </>
              )}
            </dl>
          </div>
        </section>

        {/* CTA bar */}
        <div className="border-2 border-brand rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-lg">
              Ready to play {course.name}?
            </p>
            <p className="text-sm text-gray-600">
              Track your rounds and compete on Season Golf.
            </p>
          </div>
          <a
            href="https://season.golf"
            className="inline-block bg-brand text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-light transition whitespace-nowrap"
          >
            Play on Season Golf &rarr;
          </a>
        </div>
      </div>
    </main>
  )
}
