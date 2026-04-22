import { useMemo, useRef, useState } from 'react'
import ControlPanel from './components/ControlPanel'
import Header from './components/Header'
import ItemsStrip from './components/ItemsStrip'
import LiquidGauge from './components/LiquidGauge'
import SolutionsList from './components/SolutionsList'

const DEFAULT_ITEMS = '5, 10, 12, 13, 15, 18'
const DEFAULT_TARGET = '30'

function parseItems(text) {
  return text
    .split(',')
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value) && value > 0)
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function App() {
  const [itemsInput, setItemsInput] = useState(DEFAULT_ITEMS)
  const [targetInput, setTargetInput] = useState(DEFAULT_TARGET)
  const [delayMs, setDelayMs] = useState(500)
  const [running, setRunning] = useState(false)
  const [complete, setComplete] = useState(false)

  const [vizState, setVizState] = useState({
    currentSum: 0,
    includedIndexes: [],
    consideringIndex: -1,
    status: 'Ready to compute.',
    statusClass: 'idle',
  })

  const [solutions, setSolutions] = useState([])
  const runningRef = useRef(false)

  const items = useMemo(() => parseItems(itemsInput), [itemsInput])
  const target = useMemo(() => Number(targetInput), [targetInput])

  const canSimulate = items.length > 0 && Number.isFinite(target) && target > 0

  function updateViz(currentSum, subsetIndexes, consideringIndex, status, statusClass) {
    setVizState({
      currentSum,
      includedIndexes: [...subsetIndexes],
      consideringIndex,
      status,
      statusClass,
    })
  }

  async function solve(k, currentSum, subsetIndexes) {
    if (!runningRef.current) {
      return
    }

    updateViz(currentSum, subsetIndexes, k, 'Evaluating path...', 'idle')
    await sleep(delayMs)

    if (!runningRef.current) {
      return
    }

    if (currentSum === target) {
      updateViz(currentSum, subsetIndexes, -1, 'Target hit. Solution logged.', 'success')
      setSolutions((previous) => [...previous, subsetIndexes.map((index) => items[index])])
      await sleep(Math.max(220, Math.floor(delayMs * 0.9)))
      return
    }

    if (currentSum > target) {
      updateViz(currentSum, subsetIndexes, -1, 'Over target. Pruning branch.', 'danger')
      await sleep(Math.max(170, Math.floor(delayMs * 0.75)))
      return
    }

    if (k >= items.length) {
      return
    }

    subsetIndexes.push(k)
    await solve(k + 1, currentSum + items[k], subsetIndexes)

    subsetIndexes.pop()
    await solve(k + 1, currentSum, subsetIndexes)
  }

  async function handleStart() {
    if (running || !canSimulate) {
      return
    }

    runningRef.current = true
    setRunning(true)
    setComplete(false)
    setSolutions([])
    updateViz(0, [], -1, 'Simulation started.', 'idle')

    await solve(0, 0, [])

    if (runningRef.current) {
      setComplete(true)
      updateViz(0, [], -1, 'Traversal complete.', 'success')
    }

    runningRef.current = false
    setRunning(false)
  }

  function handleReset() {
    runningRef.current = false
    setRunning(false)
    setComplete(false)
    setSolutions([])
    updateViz(0, [], -1, 'Ready to compute.', 'idle')
  }

  function handleRandomize() {
    if (running) {
      return
    }

    const randomItems = Array.from({ length: 6 }, () => Math.floor(Math.random() * 18) + 3)
      .sort((a, b) => a - b)
    const randomTarget = Math.floor(Math.random() * 36) + 20

    setItemsInput(randomItems.join(', '))
    setTargetInput(String(randomTarget))
    setComplete(false)
    setSolutions([])
    updateViz(0, [], -1, 'Random scenario ready.', 'idle')
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 text-white sm:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
        <Header />

        <ControlPanel
          itemsInput={itemsInput}
          targetInput={targetInput}
          delayMs={delayMs}
          disabled={running}
          canStart={canSimulate}
          onItemsInput={setItemsInput}
          onTargetInput={setTargetInput}
          onDelayChange={setDelayMs}
          onStart={handleStart}
          onReset={handleReset}
          onRandomize={handleRandomize}
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-white/15 bg-slate-950/60 p-5 shadow-[0_20px_60px_-30px_rgba(10,20,40,0.9)] backdrop-blur-xl sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-title text-xl font-semibold text-white">Shopping Basket</h2>
              <p className="rounded-full border border-amber-300/35 bg-amber-300/10 px-3 py-1 text-xs tracking-[0.15em] text-amber-100 uppercase">
                Target: Rs {canSimulate ? target : '-'}
              </p>
            </div>

            <ItemsStrip
              items={items}
              includedIndexes={vizState.includedIndexes}
              consideringIndex={vizState.consideringIndex}
            />

            <LiquidGauge
              currentSum={vizState.currentSum}
              target={canSimulate ? target : 1}
              statusClass={vizState.statusClass}
              complete={complete}
            />

            <p
              className={`text-center text-sm tracking-wide ${
                vizState.statusClass === 'danger'
                  ? 'text-rose-300'
                  : vizState.statusClass === 'success'
                    ? 'text-emerald-200'
                    : 'text-slate-300'
              }`}
            >
              {canSimulate ? vizState.status : 'Enter valid positive numbers for items and target.'}
            </p>
          </section>

          <SolutionsList solutions={solutions} />
        </div>
      </div>
    </main>
  )
}

export default App
