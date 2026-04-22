function Header() {
  return (
    <header className="space-y-4 text-center">
      <p className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-1 text-xs font-semibold tracking-[0.22em] text-amber-200 uppercase">
        Backtracking Playground
      </p>
      <h1 className="font-title text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Sum of Subsets Visualizer
      </h1>
      <p className="mx-auto max-w-2xl text-sm text-slate-200/80 sm:text-base">
        Explore how recursive search includes, excludes, and prunes combinations to hit a target total.
      </p>
    </header>
  )
}

export default Header
