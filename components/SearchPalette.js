import { Fragment, useEffect, useState } from "react"
import { Combobox, Dialog, Transition } from "@headlessui/react"
import { PlusSmIcon, SearchIcon } from "@heroicons/react/solid"
import { submitToast } from "../utils/toasts"
import toast from "react-hot-toast"
import { supabase } from "../supabaseClient"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function SearchPalette({
  mood_id,
  open,
  setOpen,
  token,
  tracks,
  user_id,
  getTracks,
}) {
  const [query, setQuery] = useState("")
  const [recentTracks, setRecentTracks] = useState([])
  const [filteredTracks, setFilteredTracks] = useState([])

  useEffect(() => {
    const getRecentTracks = async (token, tracks) => {
      const myResponse = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=30",
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        }
      )
      const jsonObject = await myResponse.json()
      const arrUniq = [
        ...new Map(
          jsonObject.items.map((value) => [value.track.id, value])
        ).values(),
      ]
      const finalArray = arrUniq.map((element) => element.track)
      setRecentTracks(finalArray)
    }
    if (token) {
      getRecentTracks(token, tracks)
    }
  }, [token, tracks])

  useEffect(() => {
    const getSearch = async (token) => {
      const myResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track&limit=20&offset=0`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        }
      )
      const jsonObject = await myResponse.json()
      setFilteredTracks(jsonObject.tracks.items)
    }
    if (query && token) {
      getSearch(token)
    }
  }, [token, query])

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-3xl transform divide-y divide-white border border-white border-opacity-40 overflow-hidden rounded-xl bg-vibez-cards shadow-2xl ring-1 ring-white ring-opacity-5 transition-all">
              <Combobox
                onChange={async (track) => {
                  const containsTrack = tracks.find(
                    (trackItem) => trackItem.track_info.id === track.id
                  )
                  if (track && containsTrack) {
                    if (
                      !window.confirm(
                        "Song already exists in this vibe, would you like to upvote it ?"
                      )
                    ) {
                      return
                    } else {
                      try {
                        const { data, error } = await supabase
                          .from("upvotes")
                          .insert([
                            {
                              track_id: containsTrack.track_id,
                              user_id: user_id,
                            },
                          ])
                        if (error) {
                          throw error
                        }
                        const { datasita, errorsito } = await supabase.rpc(
                          "increment",
                          {
                            row_id: containsTrack.track_id,
                            x: 1,
                          }
                        )
                        const { dat, err } = await supabase.rpc(
                          "incrementUpvotes",
                          {
                            row_id: mood_id,
                            x: 1,
                          }
                        )
                        getTracks()
                        return alert("You upvoted the song, keep browsing ")
                      } catch (error) {
                        if (error.code === "23505") {
                          return alert("You already upvoted this song")
                        }
                        toast.error("Something went wrong", {
                          duration: 1000,
                        })
                      }
                    }
                  }
                  toast.dismiss()
                  submitToast(user_id, track, getTracks, setOpen)
                }}
              >
                {({ activeOption }) => (
                  <>
                    <div className="relative">
                      <SearchIcon
                        className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <Combobox.Input
                        className="h-12 w-full border-0 bg-vibez-cards pl-11 pr-4 text-white placeholder-gray-400 sm:text-sm"
                        placeholder="Search songs by name, artist or album"
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </div>

                    {(query === "" || filteredTracks.length > 0) && (
                      <Combobox.Options
                        as="div"
                        static
                        hold
                        className="flex divide-x divide-white"
                      >
                        <div
                          className={classNames(
                            "max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4",
                            activeOption && "sm:h-96"
                          )}
                        >
                          {query === "" && (
                            <h2 className="mt-2 mb-4 text-xs font-semibold text-white">
                              Recently played tracks
                            </h2>
                          )}
                          <div className="-mx-2 text-sm text-white">
                            {(query === "" ? recentTracks : filteredTracks).map(
                              (track) => (
                                <Combobox.Option
                                  as="div"
                                  key={track.id}
                                  value={track}
                                  className={({ active }) =>
                                    classNames(
                                      "flex cursor-default select-none items-center rounded-md p-2",
                                      active &&
                                        "bg-gradient-to-r from-vibez-primary to-vibez-secondary text-white"
                                    )
                                  }
                                >
                                  {({ active }) => (
                                    <>
                                      <picture>
                                        <img
                                          src={track?.album?.images[0]?.url}
                                          alt="covers"
                                          className="h-12 w-12 flex-none "
                                        />
                                      </picture>
                                      <div className="ml-3 flex-auto">
                                        <p className=" font-semibold text-white">
                                          {track?.name}
                                        </p>
                                        <p className=" text-white">
                                          {track.artists.length === 1
                                            ? track.artists[0].name
                                            : track.artists.map(
                                                (artist, index, array) =>
                                                  array[index + 1] === undefined
                                                    ? artist.name
                                                    : artist.name + "," + " "
                                              )}
                                        </p>
                                      </div>
                                      {active && (
                                        <PlusSmIcon
                                          className="ml-3 h-5 w-5 flex-none text-white fill-white"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </>
                                  )}
                                </Combobox.Option>
                              )
                            )}
                          </div>
                        </div>
                      </Combobox.Options>
                    )}

                    {query !== "" && filteredTracks.length === 0 && (
                      <div className="py-14 px-6 text-center text-sm sm:px-14">
                        <p className="mt-4 font-semibold text-white">
                          No Songs Found
                        </p>
                        <p className="mt-2 text-white">
                          We couldn’t find anything with that term. Please try
                          again.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
