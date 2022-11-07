export default function SubmitButton({ setPlaylistName, title}) {
    
    return (
      <div>
        <h1 className="block text-base font-semibold text-white mb-5">
          Name Your Playlist
        </h1>
        <div className="mt-1">
          <input
            onChange={(event) => setPlaylistName(event.target.value)}
            type="text"
            placeholder={`e.g: ${title}`}
            className="placeholder:capitalize shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mb-5 block w-full bg-vibez-cards sm:text-sm border-2 border-white text-white rounded-md"
          />
        </div>
      </div>
    )
  }