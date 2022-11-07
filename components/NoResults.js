export default function NoResults() {
    return (
      <div
        className="relative block w-full border-dashed rounded-lg p-6 text-center"
      >
        <p className="mt-3 block  text-sm font-semibold text-white">No results found</p>
        <p className= "mt-2 block text-xs font-medium text-white">Try with another search!</p>
      </div>
    )
  }