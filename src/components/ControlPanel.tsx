interface ControlPanelProps {
  itemsInput: string
  targetInput: string
  delayMs: number
  disabled: boolean
  canStart: boolean
  onItemsInput: (value: string) => void
  onTargetInput: (value: string) => void
  onDelayChange: (value: number) => void
  onStart: () => void
  onReset: () => void
  onRandomize: () => void
}

function ControlPanel({
  itemsInput,
  targetInput,
  delayMs,
  disabled,
  canStart,
  onItemsInput,
  onTargetInput,
  onDelayChange,
  onStart,
  onReset,
  onRandomize,
}: ControlPanelProps) {
  return (
    <section className="rounded-3xl border border-white/15 bg-slate-950/60 p-5 shadow-[0_20px_60px_-30px_rgba(10,20,40,0.9)] backdrop-blur-xl sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Items (comma separated)</span>
          <input
            value={itemsInput}
            onChange={(event) => onItemsInput(event.target.value)}
            disabled={disabled}
            className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 font-mono text-sm text-white outline-none ring-0 transition focus:border-teal-300/80"
            placeholder="5, 10, 12, 13, 15, 18"
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-slate-300">Target sum</span>
          <input
            value={targetInput}
            onChange={(event) => onTargetInput(event.target.value)}
            disabled={disabled}
            type="number"
            min="1"
            className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 font-mono text-sm text-white outline-none ring-0 transition focus:border-teal-300/80"
          />
        </label>
      </div>

      <label className="mt-4 block space-y-2 text-sm">
        <span className="text-slate-300">Simulation speed: {delayMs}ms</span>
        <input
          type="range"
          min="120"
          max="1200"
          step="20"
          value={delayMs}
          onChange={(event) => onDelayChange(Number(event.target.value))}
          disabled={disabled}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-teal-300"
        />
      </label>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={onStart}
          disabled={disabled || !canStart}
          className="rounded-xl bg-linear-to-r from-teal-300 to-cyan-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Simulate Search
        </button>

        <button
          onClick={onReset}
          className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 font-semibold text-white transition hover:bg-white/10"
        >
          Reset
        </button>

        <button
          onClick={onRandomize}
          disabled={disabled}
          className="rounded-xl border border-teal-200/60 bg-teal-300/10 px-5 py-2.5 font-semibold text-teal-100 transition hover:bg-teal-300/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Random Scenario
        </button>
      </div>
    </section>
  )
}

export default ControlPanel
