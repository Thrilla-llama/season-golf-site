import Link from "next/link"

/* ─────────────────────────── tiny sub-components ─────────────────────────── */

function Wordmark() {
  return (
    <span className="font-serif italic text-2xl text-white tracking-tight">
      Season Golf
    </span>
  )
}

function SearchIcon() {
  return (
    <svg
      className="w-5 h-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx={11} cy={11} r={8} />
      <path d="m21 21-4.35-4.35" strokeLinecap="round" />
    </svg>
  )
}

/* phone mockup placeholder */
function PhoneMockup({ label, className = "" }) {
  return (
    <div
      className={`w-[220px] h-[440px] rounded-[36px] border-[6px] border-white/20 bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center shadow-2xl ${className}`}
    >
      <div className="w-16 h-1.5 rounded-full bg-white/20 mb-8" />
      <div className="w-28 h-3 rounded bg-white/15 mb-3" />
      <div className="w-20 h-3 rounded bg-white/10 mb-6" />
      <div className="w-32 h-32 rounded-2xl bg-white/10 mb-6 flex items-center justify-center">
        <span className="text-white/30 text-xs font-medium">{label}</span>
      </div>
      <div className="w-24 h-3 rounded bg-white/10 mb-2" />
      <div className="w-20 h-3 rounded bg-white/8" />
    </div>
  )
}

/* dot for hole-by-hole display */
function HoleDot({ result }) {
  const colors = {
    win: "bg-brand",
    loss: "bg-red-400",
    tie: "bg-gray-300",
  }
  return <span className={`w-3 h-3 rounded-full ${colors[result]}`} />
}

/* match result card */
function MatchResultCard() {
  const holes = [
    "win","loss","win","win","tie","loss","win","win","loss",
    "win","tie","win","loss","win","win","win","tie","win",
  ]
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-sm">
            PS
          </div>
          <div>
            <p className="font-semibold text-sm text-brand">You</p>
            <p className="text-xs text-gray-400">vs Generated Opponent</p>
          </div>
        </div>
        <div className="bg-brand/10 text-brand font-bold text-sm px-3 py-1 rounded-full">
          Won 2up
        </div>
      </div>

      {/* hole by hole */}
      <div className="mb-4">
        <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2 font-medium">
          Hole by Hole
        </p>
        <div className="flex flex-wrap gap-1.5">
          {holes.map((h, i) => (
            <HoleDot key={i} result={h} />
          ))}
        </div>
      </div>

      {/* key moments */}
      <div>
        <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2 font-medium">
          Key Moments
        </p>
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-[10px] flex items-center justify-center font-bold">
              7
            </span>
            <span className="text-gray-600">Birdie on the par-5 7th</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-[10px] flex items-center justify-center font-bold">
              14
            </span>
            <span className="text-gray-600">Won 3 in a row to close it out</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* player identity card */
function IdentityCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-bold">
          PS
        </div>
        <div>
          <p className="font-semibold text-brand">Pete Santora</p>
          <p className="text-xs text-gray-400">Established 2025</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="text-center">
          <p className="text-2xl font-bold text-brand">74</p>
          <p className="text-[11px] text-gray-400 uppercase tracking-wider">Avg Score</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-brand">68%</p>
          <p className="text-[11px] text-gray-400 uppercase tracking-wider">Win Rate</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-brand">42</p>
          <p className="text-[11px] text-gray-400 uppercase tracking-wider">Rounds</p>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Driving</span>
            <span className="font-medium text-brand">82</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full">
            <div className="h-1.5 bg-brand rounded-full" style={{ width: "82%" }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Approach</span>
            <span className="font-medium text-brand">71</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full">
            <div className="h-1.5 bg-brand rounded-full" style={{ width: "71%" }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Short Game</span>
            <span className="font-medium text-brand">88</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full">
            <div className="h-1.5 bg-brand rounded-full" style={{ width: "88%" }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Putting</span>
            <span className="font-medium text-brand">76</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full">
            <div className="h-1.5 bg-brand rounded-full" style={{ width: "76%" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* season standings card */
function SeasonCard() {
  const standings = [
    { rank: 1, name: "Pete S.", pts: 142, trend: "+3" },
    { rank: 2, name: "James R.", pts: 138, trend: "+1" },
    { rank: 3, name: "Mike T.", pts: 131, trend: "-1" },
    { rank: 4, name: "Chris L.", pts: 125, trend: "+2" },
    { rank: 5, name: "David K.", pts: 118, trend: "0" },
  ]
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="font-semibold text-brand">Spring 2026</p>
          <p className="text-xs text-gray-400">Season Standings</p>
        </div>
        <div className="bg-gold/10 text-gold text-xs font-bold px-3 py-1 rounded-full">
          Week 8 of 12
        </div>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {standings.map((p) => (
            <tr key={p.rank} className="border-b border-gray-50 last:border-0">
              <td className="py-2.5 pr-3 w-8">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    p.rank === 1
                      ? "bg-gold/15 text-gold"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {p.rank}
                </span>
              </td>
              <td className="py-2.5 font-medium text-gray-800">{p.name}</td>
              <td className="py-2.5 text-right text-gray-500">{p.pts} pts</td>
              <td className="py-2.5 pl-3 text-right w-10">
                <span
                  className={`text-xs font-medium ${
                    p.trend.startsWith("+")
                      ? "text-brand"
                      : p.trend === "0"
                      ? "text-gray-400"
                      : "text-red-400"
                  }`}
                >
                  {p.trend === "0" ? "—" : p.trend}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* checkmark / x for pricing table */
function Check() {
  return (
    <svg className="w-5 h-5 text-brand mx-auto" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function Dash() {
  return <span className="block text-center text-gray-300">—</span>
}

/* ─────────────────────────── main page ─────────────────────────── */

export default function HomePage() {
  const features = [
    { name: "Post rounds", free: true, member: true },
    { name: "Match play vs generated opponents", free: true, member: true },
    { name: "Hole-by-hole match results", free: true, member: true },
    { name: "Course leaderboards", free: true, member: true },
    { name: "Golf Identity profile & stats", free: false, member: true },
    { name: "Skill breakdowns (driving, approach, short game, putting)", free: false, member: true },
    { name: "Season standings & competition", free: false, member: true },
    { name: "Historical round analytics", free: false, member: true },
    { name: "Priority new course requests", free: false, member: true },
    { name: "Early access to new features", free: false, member: true },
  ]

  return (
    <main className="flex-1">
      {/* ───────── HERO ───────── */}
      <section className="relative bg-brand overflow-hidden">
        {/* nav */}
        <nav className="relative z-10 flex items-center justify-between max-w-6xl mx-auto px-6 pt-6">
          <Wordmark />
          <a
            href="https://season.golf"
            className="text-sm font-medium text-white border border-white/30 rounded-full px-5 py-1.5 hover:bg-white/10 transition"
          >
            Log in
          </a>
        </nav>

        {/* content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-5">
            Focus on your
            <br />
            next shot.
          </h1>
          <p className="text-lg text-white/60 max-w-md mx-auto mb-8">
            Play match play. Every round.
          </p>

          {/* search bar */}
          <Link
            href="/courses"
            className="inline-flex items-center gap-3 bg-white rounded-full pl-5 pr-4 py-3 shadow-lg hover:shadow-xl transition max-w-md w-full"
          >
            <SearchIcon />
            <span className="text-gray-400 text-sm">Search Georgia courses…</span>
          </Link>

          {/* phone mockups */}
          <div className="flex justify-center items-end gap-0 mt-14 -mb-2">
            <PhoneMockup
              label="Match Play"
              className="-mr-6 translate-y-4 rotate-[-4deg] opacity-90"
            />
            <PhoneMockup
              label="Scorecard"
              className="relative z-10"
            />
          </div>
        </div>

        {/* subtle gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* ───────── STOP COUNTING ───────── */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* left – card */}
            <div className="flex-shrink-0">
              <MatchResultCard />
            </div>
            {/* right – copy */}
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-bold text-brand tracking-tight mb-5">
                Stop Counting.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Each shot is its own challenge. Play against a generated score
                from a real player&apos;s posted rounds and tendencies at your
                course, hole by hole, shot by shot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── KNOW YOUR GOLF IDENTITY ───────── */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-6 py-24 border-t border-brand/5">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            {/* right – card */}
            <div className="flex-shrink-0">
              <IdentityCard />
            </div>
            {/* left – copy */}
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-bold text-brand tracking-tight mb-5">
                Know Your
                <br />
                Golf Identity.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every round builds your profile. See your strengths, track your
                tendencies, and understand your game like never before.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── WIN THE SEASON ───────── */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-6 py-24 border-t border-brand/5">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* left – card */}
            <div className="flex-shrink-0">
              <SeasonCard />
            </div>
            {/* right – copy */}
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-bold text-brand tracking-tight mb-5">
                Win the Season.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Compete across a full season of rounds. Earn points with every
                match, climb the standings, and prove you&apos;re the best over
                the long haul.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── BECOME A MEMBER ───────── */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-brand tracking-tight mb-4">
            Become a Member
          </h2>
          <p className="text-gray-500 mb-12 max-w-md mx-auto">
            Get the full Season Golf experience. One price, the entire season.
          </p>

          {/* pricing table */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden text-left">
            {/* header row */}
            <div className="grid grid-cols-[1fr_100px_100px] bg-gray-50 text-sm font-semibold text-gray-500 uppercase tracking-wider">
              <div className="px-6 py-4">Feature</div>
              <div className="px-4 py-4 text-center">Free</div>
              <div className="px-4 py-4 text-center text-gold">Member</div>
            </div>

            {/* rows */}
            {features.map((f, i) => (
              <div
                key={f.name}
                className={`grid grid-cols-[1fr_100px_100px] text-sm ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                <div className="px-6 py-3.5 text-gray-700">{f.name}</div>
                <div className="px-4 py-3.5">
                  {f.free ? <Check /> : <Dash />}
                </div>
                <div className="px-4 py-3.5">
                  <Check />
                </div>
              </div>
            ))}
          </div>

          {/* price + CTA */}
          <div className="mt-10">
            <p className="text-4xl font-bold text-brand mb-1">
              $49
              <span className="text-lg font-normal text-gray-400">/season</span>
            </p>
            <p className="text-sm text-gray-400 mb-6">Billed once per season</p>
            <a
              href="https://season.golf"
              className="inline-block bg-gold text-white font-semibold text-lg px-10 py-3.5 rounded-full hover:brightness-110 transition shadow-lg shadow-gold/20"
            >
              Become a Member
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
