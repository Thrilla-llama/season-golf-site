import Link from "next/link"
import CourseSearch from "./components/CourseSearch"

/* ─────────────────────────── tiny sub-components ─────────────────────────── */

function Wordmark() {
  return (
    <img
      src="/wordmark-white.png"
      alt="Season Golf"
      className="h-32 w-auto"
    />
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
      <section className="bg-brand">
        {/* nav */}
        <nav className="flex items-center justify-between max-w-6xl mx-auto px-6 pt-6">
          <Wordmark />
          <a
            href="https://season.golf"
            className="text-sm font-medium text-white border border-white/30 rounded-full px-5 py-1.5 hover:bg-white/10 transition"
          >
            Log in
          </a>
        </nav>

        {/* content */}
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-6">
          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-12 lg:gap-8">
            {/* left – text & search */}
            <div className="text-center lg:text-left lg:pt-12 lg:max-w-lg flex-shrink-0">
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-5">
                Focus on your
                <br />
                next shot.
              </h1>
              <p className="text-lg text-white/60 mb-8">
                Play match play. Every round.
              </p>
              <CourseSearch />
            </div>

            {/* right – phone mockups */}
            <div className="flex justify-center items-end gap-0 flex-shrink-0">
              <IPhoneFrame className="-mr-6 translate-y-4 rotate-[-6deg] opacity-90 drop-shadow-2xl">
                <img src="/app-match.png" alt="Match play screen" className="w-full h-full object-cover" />
              </IPhoneFrame>
              <IPhoneFrame className="relative z-10 rotate-[3deg] drop-shadow-2xl">
                <img src="/app-scorecard.png" alt="Scorecard screen" className="w-full h-full object-cover" />
              </IPhoneFrame>
            </div>
          </div>
        </div>

      </section>

      {/* ───────── STOP COUNTING ───────── */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* left – image */}
            <div className="flex-shrink-0 max-w-sm w-full" style={{ filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.12))" }}>
              <img src="/stop-counting.jpeg" alt="Stop Counting – match play result" className="w-full rounded-2xl" />
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
            {/* right – image */}
            <div className="flex-shrink-0 max-w-sm w-full" style={{ filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.12))" }}>
              <img src="/know-identity.jpeg" alt="Golf Identity profile" className="w-full rounded-2xl" />
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
            {/* left – image */}
            <div className="flex-shrink-0 max-w-sm w-full" style={{ filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.12))" }}>
              <img src="/win-season.jpeg" alt="Season standings" className="w-full rounded-2xl" />
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
