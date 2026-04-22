function ItemsStrip({ items, includedIndexes, consideringIndex }) {
  const includedSet = new Set(includedIndexes)

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item, index) => {
        const included = includedSet.has(index)
        const considering = consideringIndex === index

        const baseClasses = 'rounded-xl border px-3 py-2 text-sm font-semibold transition duration-300'
        const stateClasses = included
          ? 'border-cyan-200/70 bg-cyan-300/30 text-cyan-50 shadow-[0_0_25px_-8px_rgba(45,212,191,0.85)] -translate-y-1'
          : 'border-white/20 bg-white/5 text-slate-200'

        const consideringClasses = considering
          ? 'ring-2 ring-amber-300/90 scale-105'
          : ''

        return (
          <div key={`${item}-${index}`} className={`${baseClasses} ${stateClasses} ${consideringClasses}`}>
            Rs {item}
          </div>
        )
      })}
    </div>
  )
}

export default ItemsStrip
