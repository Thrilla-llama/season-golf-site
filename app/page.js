import Link from "next/link"
import CourseSearch from "./components/CourseSearch"

/* ─────────────────────────── tiny sub-components ─────────────────────────── */

function Wordmark() {
  return (
    <span className="font-serif italic text-2xl text-white tracking-tight">
      Season Golf
    </span>
  )
}

/* ─── iPhone 15 Pro frame wrapper ─── */
function IPhoneFrame({ children, className = "" }) {
  return (
    <div className={`relative w-[220px] h-[440px] ${className}`}>
      <svg
        viewBox="0 0 220 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      >
        {/* outer frame */}
        <rect x="2" y="2" width="216" height="436" rx="36" ry="36"
          stroke="#1a1a1a" strokeWidth="4" fill="none" />
        {/* inner bezel */}
        <rect x="6" y="6" width="208" height="428" rx="33" ry="33"
          stroke="#2a2a2a" strokeWidth="1" fill="none" />
        {/* dynamic island */}
        <rect x="72" y="12" width="76" height="22" rx="11"
          fill="#1a1a1a" />
        {/* side button right – power */}
        <rect x="218" y="120" width="4" height="50" rx="2" fill="#2a2a2a" />
        {/* side buttons left – volume up */}
        <rect x="-2" y="110" width="4" height="30" rx="2" fill="#2a2a2a" />
        {/* side buttons left – volume down */}
        <rect x="-2" y="150" width="4" height="30" rx="2" fill="#2a2a2a" />
        {/* side buttons left – action button */}
        <rect x="-2" y="80" width="4" height="18" rx="2" fill="#2a2a2a" />
      </svg>
      {/* screen area */}
      <div className="absolute inset-[6px] rounded-[33px] overflow-hidden bg-white">
        {children}
      </div>
    </div>
  )
}

/* ─── Scorecard screen content ─── */
function ScorecardScreen() {
  const holes  = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const pars   = [4, 3, 5, 4, 4, 3, 5, 4, 4]
  const hdcps  = [5, 9, 1, 3, 7, 13, 11, 15, 17]

  return (
    <div className="w-full h-full flex flex-col bg-[#f8f8f5] text-[6px] leading-tight">
      {/* status bar */}
      <div className="flex items-center justify-between px-4 pt-8 pb-1">
        <span className="font-semibold text-[5px] text-gray-500">9:41</span>
        <div className="flex items-center gap-1">
          <div className="w-3 h-1.5 border border-gray-400 rounded-[1px] relative">
            <div className="absolute inset-[0.5px] right-[1px] bg-gray-500 rounded-[0.5px]" style={{width:'60%'}} />
          </div>
        </div>
      </div>

      {/* header */}
      <div className="bg-brand text-white px-3 py-2 text-center">
        <p className="font-bold text-[7px]">Charlie Yates Golf Course</p>
        <p className="text-[5px] opacity-70">Black Tees</p>
      </div>

      {/* scorecard table */}
      <div className="px-1.5 pt-2 flex-1">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-0.5 py-0.5 text-left text-gray-500 font-medium">Hole</th>
              {holes.map(h => (
                <th key={h} className="px-0.5 py-0.5 text-center font-medium text-gray-700 w-[16px]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100">
              <td className="px-0.5 py-0.5 text-gray-500 font-medium">Par</td>
              {pars.map((p,i) => (
                <td key={i} className="px-0.5 py-0.5 text-center text-gray-600">{p}</td>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <td className="px-0.5 py-0.5 text-gray-500 font-medium">HDCP</td>
              {hdcps.map((h,i) => (
                <td key={i} className="px-0.5 py-0.5 text-center text-gray-400">{h}</td>
              ))}
            </tr>
            <tr>
              <td className="px-0.5 py-0.5 text-brand font-semibold">You</td>
              {holes.map((h,i) => (
                <td key={i} className="px-0.5 py-0.5 text-center text-gray-300">{i === 0 ? "4" : "–"}</td>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <td className="px-0.5 py-0.5 text-gray-500 font-medium">Opp</td>
              {holes.map((h,i) => (
                <td key={i} className="px-0.5 py-0.5 text-center text-gray-300">{i === 0 ? "5" : "–"}</td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* match status */}
        <div className="flex items-center justify-center gap-1 mt-2">
          <span className="w-2 h-2 rounded-full bg-brand" />
          <span className="text-[5px] text-brand font-semibold">1 UP after 1</span>
        </div>
      </div>

      {/* bottom entry card */}
      <div className="bg-white border-t border-gray-200 px-3 py-2 mt-auto">
        <p className="text-center text-[6px] text-gray-500 mb-1.5">
          Enter score for <span className="font-bold text-gray-700">Hole 2</span> &middot; Par 3 &middot; HDCP 9
        </p>
        <div className="flex items-center justify-center gap-3 mb-2">
          <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">–</button>
          <span className="text-[14px] font-bold text-gray-800">3</span>
          <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">+</button>
        </div>
        <div className="bg-brand text-white text-center py-1.5 rounded-lg text-[6px] font-bold">
          Post Hole Score
        </div>
      </div>

      {/* home indicator */}
      <div className="flex justify-center py-1">
        <div className="w-10 h-[3px] rounded-full bg-gray-300" />
      </div>
    </div>
  )
}

/* ─── Match notification screen content ─── */
function MatchNotificationScreen() {
  const holeDots = [
    "win","loss","win","win","tie","loss","win","win","loss",
    "win","tie","win","loss","win","win","win","tie","current",
  ]
  const dotColor = {
    win: "bg-brand",
    loss: "bg-red-400",
    tie: "bg-gray-300",
    current: "bg-gold animate-pulse",
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#f8f8f5]">
      {/* status bar */}
      <div className="flex items-center justify-between px-4 pt-8 pb-1 text-[5px]">
        <span className="font-semibold text-gray-500">9:41</span>
        <div className="flex items-center gap-1">
          <div className="w-3 h-1.5 border border-gray-400 rounded-[1px] relative">
            <div className="absolute inset-[0.5px] right-[1px] bg-gray-500 rounded-[0.5px]" style={{width:'60%'}} />
          </div>
        </div>
      </div>

      {/* Season Golf wordmark */}
      <div className="text-center pt-4 pb-2">
        <span className="font-serif italic text-[11px] text-brand tracking-tight">
          Season Golf
        </span>
      </div>

      {/* notification card */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-md p-4 w-full">
          {/* match header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-[6px]">
              PS
            </div>
            <div>
              <p className="text-[7px] font-semibold text-brand">You vs Hunter</p>
              <p className="text-[5px] text-gray-400">Charlie Yates GC &middot; Hole 18</p>
            </div>
            <div className="ml-auto bg-brand/10 text-brand font-bold text-[6px] px-2 py-0.5 rounded-full">
              1 UP
            </div>
          </div>

          {/* putting notification */}
          <div className="bg-brand/5 rounded-lg p-2 mb-3 text-center">
            <p className="text-[7px] text-brand font-medium">Hunter is putting...</p>
            <p className="text-[5px] text-gray-400 mt-0.5">Waiting for opponent score</p>
          </div>

          {/* hole dots */}
          <div>
            <p className="text-[5px] uppercase tracking-wider text-gray-400 mb-1 font-medium">
              Hole by Hole
            </p>
            <div className="flex flex-wrap gap-[3px]">
              {holeDots.map((h, i) => (
                <span key={i} className={`w-[7px] h-[7px] rounded-full ${dotColor[h]}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* home indicator */}
      <div className="flex justify-center py-1.5">
        <div className="w-10 h-[3px] rounded-full bg-gray-300" />
      </div>
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
          <CourseSearch />

          {/* phone mockups */}
          <div className="flex justify-center items-end gap-0 mt-14 -mb-2">
            <IPhoneFrame className="-mr-6 translate-y-4 rotate-[-4deg] opacity-90">
              <MatchNotificationScreen />
            </IPhoneFrame>
            <IPhoneFrame className="relative z-10">
              <ScorecardScreen />
            </IPhoneFrame>
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
