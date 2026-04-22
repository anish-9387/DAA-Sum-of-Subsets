function LiquidGauge({ currentSum, target, statusClass, complete }) {
  const fillPercent = Math.min((currentSum / Math.max(target, 1)) * 100, 120)
  const translateValue = 100 - fillPercent

  const waveColor =
    statusClass === 'danger'
      ? 'from-rose-400/90 to-rose-700'
      : statusClass === 'success'
        ? 'from-emerald-300/90 to-emerald-700'
        : 'from-cyan-300/90 to-blue-700'

  return (
    <div className="relative mx-auto mb-4 mt-5 flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-slate-950/60 shadow-[inset_0_0_45px_rgba(10,20,40,0.7)]">
      <div className="z-20 text-center">
        <p className="font-mono text-4xl font-bold text-white">{complete ? 'OK' : currentSum}</p>
        <p className="mt-1 text-xs tracking-[0.2em] text-slate-300 uppercase">Current Sum</p>
      </div>
      <div
        className={`absolute bottom-0 left-[-50%] h-[220%] w-[220%] rounded-[42%] bg-gradient-to-b ${waveColor} liquid-motion`}
        style={{ transform: `translateY(${translateValue}%)` }}
      />
    </div>
  )
}

export default LiquidGauge
