export default function SortButtonGroups({
  handleButtonSelection,
  selectedOption,
}) {
  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      <button
        type="button"
        value="Most liked"
        onClick={(event) => handleButtonSelection(event.target.value)}
        className={
          selectedOption !== "Most liked"
            ? "relative inline-flex items-center rounded-l-md border border-gray-500 bg-white px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            : "relative inline-flex items-center rounded-l-md border border-gray-700 bg-gradient-to-r from-vibez-primary to-vibez-secondary px-2 py-1 text-sm font-medium text-gray-900 focus:z-10 focus:border-indigo-500"
        }
      >
        {selectedOption !== "Most liked" ? "Most liked" : <b className="text-white">Most liked</b>}
      </button>
      <button
        type="button"
        onClick={(event) => handleButtonSelection(event.target.value)}
        value="Most recent"
        className={
          selectedOption !== "Most recent"
            ? "relative -ml-px inline-flex items-center rounded-r-md border border-gray-500 bg-white px-2  py-1 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            : "relative -ml-px inline-flex items-center rounded-r-md border border-gray-700 bg-gradient-to-r from-vibez-primary to-vibez-secondary px-2  py-1 text-sm text-gray-900 focus:z-10"
        }
      >
        {selectedOption !== "Most recent" ? "Most recent" : <b className="text-white">Most recent</b>}
      </button>
    </span>
  )
}
