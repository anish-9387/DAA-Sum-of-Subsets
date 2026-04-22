interface SolutionsListProps {
  solutions: number[][]
}

function SolutionsList({ solutions }: SolutionsListProps) {
  return (
    <section className="rounded-3xl border border-white/15 bg-slate-950/60 p-5 shadow-[0_20px_60px_-30px_rgba(10,20,40,0.9)] backdrop-blur-xl sm:p-6">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="font-title text-xl font-semibold text-white">Valid Subsets</h2>
        <span className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-2.5 py-1 text-xs font-medium text-emerald-100">
          {solutions.length} found
        </span>
      </div>

      {solutions.length === 0 ? (
        <p className="text-sm text-slate-300/75">No solution yet. Run simulation to see matching subsets.</p>
      ) : (
        <ul className="space-y-2.5">
          {solutions.map((subset, index) => (
            <li
              key={`${subset.join('-')}-${index}`}
              className="rounded-xl border-l-4 border-emerald-300 bg-emerald-300/10 px-4 py-3 font-mono text-sm text-emerald-100/95 animate-in"
            >
              {'{ '}
              {subset.join(', ')}
              {' }'}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default SolutionsList
