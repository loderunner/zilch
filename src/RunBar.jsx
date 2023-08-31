export default function RunBar({ runScore, addScore }) {
  return (
    <div className="mb-3 flex flex-row justify-between rounded-2xl bg-green-600 px-6 py-6">
      <div>Run: {runScore}</div>
      <div>{addScore ? `+${addScore}` : null}</div>
    </div>
  );
}
