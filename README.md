# Sum of Subsets Visualizer

A modern, interactive visualization of the Sum of Subsets backtracking algorithm.

This project demonstrates how recursive search explores combinations, prunes invalid paths, and records valid subsets whose sum matches a target value.

## Features

- Real-time backtracking simulation with include/exclude decisions
- Branch pruning visualization when partial sums exceed the target
- Animated liquid gauge for current sum progression
- Live highlighted item strip for the active recursion path
- Dynamic list of valid subsets found during traversal
- Adjustable simulation speed and random scenario generator

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS

## Run Locally

1. Install dependencies:

	```bash
	npm install
	```

2. Start the development server:

	```bash
	npm run dev
	```

3. Build for production:

	```bash
	npm run build
	```

## How It Works

Given a list of positive numbers and a target sum:

1. The algorithm recursively decides whether to include each item.
2. If the current sum equals the target, that subset is recorded.
3. If the current sum exceeds the target, that branch is pruned.
4. The visualization updates at each recursion step.

This creates an intuitive view of classic backtracking behavior in action.
