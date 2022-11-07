export default function PlaceholderPermission({totalSongs}) {
    return (
      <div className="bg-vibez-cards">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-4xl">
            You need to contribute and send a song that you like on any given vibe to discover new music on Vibez!</h2>
          </div>
          <dl className="mt-8 text-center sm:mx-auto sm:grid sm:max-w-3xl sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 text-lg font-medium leading-6 text-vibez-secondary"></dt>
              <dd className="order-1 text-5xl font-bold tracking-tight text-white"></dd>
            </div>
            <div className=" flex flex-col sm:mt-0 border-2 rounded-lg shadow-inner shadow-vibez-secondary  border-white bg-gradient-to-r from-vibez-primary to-vibez-secondary p-6 text-center ">
              <dt className="order-2 mt-2 text-lg font-bold leading-6 text-white">Total Songs in this Vibe</dt>
              <dd className="order-1 text-5xl font-extrabold tracking-tight text-white">{totalSongs}</dd>
            </div>
          </dl>
        </div>
      </div>
    )
  }
  