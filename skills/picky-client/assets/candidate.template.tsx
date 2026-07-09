import type { CandidateMeta } from "../../types";

export const meta: CandidateMeta = {
  index: __INDEX__,
  title: "Round __ROUND__ · Candidate __INDEX2__",
  rationale: "TODO: one line on the criterion/direction this draft proposes",
  // kind: "trend", // rounds after #1: "winner-carryover" | "trend" | "experimental"
};

// Replace this stub with a real, finished render of THIS round's decision on a
// representative screen. Mobile-first, no inner scroll, Tailwind + Motion as needed.
export default function Candidate() {
  return (
    <main className="min-h-[100dvh] bg-white px-5 py-8">
      <p className="text-sm font-medium text-slate-500">Round __ROUND__ · Candidate __INDEX2__</p>
      <h1 className="mt-2 text-2xl font-semibold text-slate-950">Draft __INDEX2__ (not written yet)</h1>
      <p className="mt-3 max-w-prose text-slate-600">
        Fill this component with the real screen that shows what this round decides.
      </p>
    </main>
  );
}
