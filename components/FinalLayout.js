import { useState, useEffect } from "react"
import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon, ShareIcon } from "@heroicons/react/outline"
import MagnifyingGlassIcon from "./MagnifyingGlassIcon"
import TrackList from "./TracksList"
import Logo from "../public/icono_blanco_svg.svg"
import Image from "next/image"
import Link from "next/link"
import PlaylistDropdown from "./PlaylistDropdown"
import { supabase } from "../supabaseClient"
import CreatePlaylistModal from "./CreatePlaylistModal"
import { Searcher } from "fast-fuzzy"
import SharingTracksModal from "./SharingVibesModal"
import SortButtonGroups from "./SortButtonGroups"
import { usePWAInstall } from "react-use-pwa-install"

export default function FinalLayout({
  canSeeTracks,
  tracks,
  getTracks,
  getTracksNewer,
  title,
  mood_id,
  session,
  setSession,
}) {
  const [handleOpening, setHandleOpening] = useState(false)
  const [selected, setSelected] = useState([])
  const [userPlaylists, setUserPlaylists] = useState([])
  const [searcher, setSearcher] = useState(defaultSearcher)
  const [searcherQuery, setSearcherQuery] = useState("")
  const [handleSharingModal, setHandleSharingModal] = useState(false)
  const [selectedOption, setSelectedOption] = useState("Most liked")

  const install = usePWAInstall()

  const userNavigation = [
    {
      name: "How Vibez Works",
      function: () => {
        window.location.replace("/tutorial_vibez")
      },
    },
    {
      name: "Sign out",
      function: () => {
        supabase.auth.signOut()
      },
    },
  ]

  const defaultSearcher = new Searcher(tracks, {
    keySelector: (track) => {
      return [
        track.track_info.name,
        track.track_info.artists[0].name,
        track.track_info.album.name,
      ]
    },
  })

  useEffect(() => {
    const searcher = new Searcher(tracks, {
      keySelector: (track) => {
        return [
          track.track_info.name,
          track.track_info.artists[0].name,
          track.track_info.album.name,
        ]
      },
    })
    setSearcher(searcher)
  }, [tracks])

  const filteredTracks =
    searcherQuery === "" ? tracks : searcher.search(searcherQuery)

  const getUserPlaylists = async (token) => {
    const myResponse = await fetch(
      "https://api.spotify.com/v1/me/playlists?limit=10",
      {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      }
    )
    const jsonObject = await myResponse.json()
    setUserPlaylists(jsonObject.items)
    setSelected(jsonObject.items[0])
  }

  useEffect(() => {
    if (session?.provider_token) {
      getUserPlaylists(session?.provider_token)
    }
  }, [session?.provider_token, setSelected])

  const handleButtonSelection = (buttonName) => {
    setSelectedOption(buttonName)
    return buttonName === "Most liked" ? getTracks() : getTracksNewer()
  }

  return (
    <>
      <div>
        <SharingTracksModal
          mood={title}
          handleOpening={handleSharingModal}
          setHandleOpening={setHandleSharingModal}
        />
        <CreatePlaylistModal
          setHandleOpening={setHandleOpening}
          handleOpening={handleOpening}
          user_id={session?.user.user_metadata.provider_id}
          token={session?.provider_token}
          title={title}
          getUserPlaylists={() => getUserPlaylists(session?.provider_token)}
        />
        <div className="bg-vibez-page min-h-screen">
          <Disclosure
            as="nav"
            className=" bg-vibez-header bg-gradient-to-r from-vibez-primary via-vibez-secondary to-vibez-test bg-[length:100%_4px] bg-no-repeat bg-bottom "
          >
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between">
                    <div className="flex items-center px-2 lg:px-0">
                      <div className="flex-shrink-0">
                        <Link href={"/"}>
                          <a>
                            <Image
                              width="40%"
                              height="40%"
                              src={Logo}
                              alt="Workflow"
                            />
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-1 justify-center ml-4 lg:ml-6 lg:justify-center mr-2">
                      <div className="w-full max-w-lg lg:max-w-xs">
                        <label htmlFor="search" className="sr-only">
                          Search
                        </label>

                        {canSeeTracks && (
                          <div className="relative text-gray-400 focus-within:text-gray-600">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <MagnifyingGlassIcon />
                            </div>
                            <input
                              id="search"
                              className="block w-full rounded-md border border-transparent bg-white py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-vibez-primary sm:text-sm"
                              placeholder="Search"
                              value={searcherQuery}
                              onChange={(event) =>
                                setSearcherQuery(event.target.value)
                              }
                              type="search"
                              name="search"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="-mr-2 flex items-center ">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center mr-2 rounded-md bg-vibez-header p-2">
                        {open ? (
                          <XIcon
                            stroke="white"
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6 stroke-white"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="hidden lg:ml-4 lg:block">
                      <div className="flex items-center"></div>
                    </div>
                  </div>
                </div>
                <Disclosure.Panel className="">
                  <div className="border-t border-vibez-primary pb-3 ">
                    <div className="mt-3 space-y-1">
                      {install && (
                        <Disclosure.Button
                          as="a"
                          onClick={install}
                          className="block px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-gray-800"
                        >
                          Install Vibez
                        </Disclosure.Button>
                      )}
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          onClick={item.function}
                          className="block px-4 py-2 text-base font-medium text-white hover:bg-gray-100 hover:text-gray-800"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <header className="py-5 flex mx-auto items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className=" text-3xl mb-5 tracking-tight font-bold text-white capitalize text-center ">
                {title}{" "}
                <ShareIcon
                  onClick={() => setHandleSharingModal(true)}
                  className=" inline-flex ml-1 hover:cursor-pointer "
                  stroke="white"
                  width="25"
                  height="25"
                />
              </h1>
              {canSeeTracks && (
                <div className="text-center">
                  <PlaylistDropdown
                    selected={selected}
                    setSelected={setSelected}
                    handleOpening={handleOpening}
                    setHandleOpening={setHandleOpening}
                    userPlaylists={userPlaylists}
                  />
                  <div className="text-black text-base text-center font-semibold inline-flex mt-5">
                    <p className=" text-white mr-2 text-base mt-0.5 text-center">
                      Sort by:{" "}
                    </p>
                    <SortButtonGroups
                      handleButtonSelection={handleButtonSelection}
                      selectedOption={selectedOption}
                    />
                  </div>
                </div>
              )}
            </div>
          </header>

          <main className="">
            <div className=" max-w-7xl mx-auto  pb-12 px-4 sm:px-6 lg:px-8">
              <div className="bg-vibez-cards border border-vibez-primary  border-opacity-40 rounded-lg shadow-lg px-5 py-6 sm:px-6">
                <TrackList
                  canSeeTracks={canSeeTracks}
                  session={session}
                  originalTracks={tracks}
                  mood_id={mood_id}
                  tracks={filteredTracks}
                  getTracks={getTracks}
                  selected={selected}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
