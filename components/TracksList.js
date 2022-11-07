import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { PlusSmIcon } from "@heroicons/react/solid"
import toast from "react-hot-toast"
import { PlusCircleIcon } from "@heroicons/react/outline"
import { HeartIcon } from "@heroicons/react/outline"
import { submitToast, alreadyAddedSong } from "../utils/toasts"
import ExplicitIcon from "./ExplicitIcon"
import SearchPalette from "./SearchPalette"
import DropDown from "./DropDown"
import PlayButton from "./PlayButton"
import NoTracks from "./NoTracks"
import NoResults from "./NoResults"
import PlaceholderPermission from "./PlaceholderPermission"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function TracksList({
  tracks,
  getTracks,
  selected,
  mood_id,
  originalTracks,

  session,

  canSeeTracks,
}) {
  const [upvotedTracks, setUpvotedTracks] = useState([])
  const [open, setOpen] = useState(false)
  const [currentId, setCurrentId] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const [initialUpvotedTracks, setInitialUpvotedTracks] = useState([])
  const handlePlaylistSubmission = async (
    playlist,
    track_uri,
    token,
    track_name,
    track_id
  ) => {
    try {
      const myResponsito = await fetch(
        `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        }
      )
      const jsonObjecsito = await myResponsito.json()
      const containsTrack = jsonObjecsito.items.find(
        (trackItem) => trackItem.track.id === track_id
      )
      if (containsTrack) {
        return alreadyAddedSong(
          playlist,
          track_uri,
          token,
          track_name,
          containsTrack.track
        )
      }

      const myResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlist.id}/tracks?uris=${track_uri}`,
        {
          method: "post",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        }
      )
      toast.success(
        `You added "${track_name}" successfully to ${playlist.name}`,
        {
          duration: 1500,
        }
      )
      setTimeout(() => {
        toast.dismiss()
      }, 1500)
    } catch (error) {
      return alert(error)
    }
  }

  const handleUpvotes = async (track_id, user_id) => {
    try {
      if (!upvotedTracks.includes(track_id)) {
        setUpvotedTracks(upvotedTracks.concat(track_id))
        setIsDisabled(true)
      } else {
        setUpvotedTracks(
          upvotedTracks.filter((trackid) => trackid !== track_id)
        )
        setIsDisabled(true)
      }
      const { data, error } = await supabase.from("upvotes").insert([
        {
          track_id: track_id,
          user_id: user_id,
        },
      ])
      if (data) {
        const { data, error } = await supabase.rpc("increment", {
          row_id: track_id,
          x: 1,
        })
        const { dat, err } = await supabase.rpc("incrementUpvotes", {
          row_id: mood_id,
          x: 1,
        })
        setIsDisabled(false)
      }
      throw error
    } catch (error) {
      if (error?.code === "23505") {
        const { data, error } = await supabase
          .from("upvotes")
          .delete()
          .match({ track_id: track_id, user_id: user_id })

        if (data) {
          const { data, error } = await supabase.rpc("increment", {
            row_id: track_id,
            x: -1,
          })
          const { dat, err } = await supabase.rpc("incrementUpvotes", {
            row_id: mood_id,
            x: -1,
          })
          setIsDisabled(false)
        }
      }
      setIsDisabled(false)
    }
  }

  const handleCurrentListening = async (token, tracks) => {
    try {
      const myResponse = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        }
      )

      const jsonObject = await myResponse.json()
      const finalTrack = jsonObject.item

      const containsTrack = tracks.find(
        (track) => track.track_info.id === finalTrack.id
      )
      if (finalTrack && containsTrack) {
        if (
          !window.confirm(
            "Song already exists in this vibe, would you like to upvote it ?"
          )
        ) {
          return setOpen(!open)
        } else {
          try {
            const { data, error } = await supabase.from("upvotes").insert([
              {
                track_id: containsTrack.track_id,
                user_id: session.user.id,
              },
            ])
            if (error) {
              throw error
            }
            const { datasita, errorsito } = await supabase.rpc("increment", {
              row_id: containsTrack.track_id,
              x: 1,
            })
            const { dat, err } = await supabase.rpc("incrementUpvotes", {
              row_id: mood_id,
              x: 1,
            })
            alert("You upvoted the song, keep browsing ")
          } catch (error) {
            if (error.code === "23505") {
              return alert("You already upvoted this song")
            }
            console.log("my error", error)
            toast.error("Something went wrong", {
              duration: 1000,
            })
          }
        }
        setUpvotedTracks(upvotedTracks.concat(containsTrack.track_id))
        getTracks()
      } else {
        submitToast(session.user.id, jsonObject.item, getTracks)
      }
    } catch (error) {
      return toast.error("You need to be listening something in Spotify", {
        duration: 1000,
      })
    }
  }

  useEffect(() => {
    const initialUpvotes = async () => {
      if (session) {
        try {
          const { data, error } = await supabase
            .from("upvotes")
            .select("track_id")
            .eq("user_id", session?.user.id)
          if (data) {
            const insertData = data.map((track) => track.track_id)
            setUpvotedTracks(insertData)
            return setInitialUpvotedTracks(insertData)
          }
        } catch (error) {
          toast.error("Something went wrong")
        }
      }
    }
    initialUpvotes()
  }, [session])

  const options = [
    {
      name: "Add currently listening Song",
      function: () => {
        toast.dismiss()
        handleCurrentListening(session?.provider_token, tracks)
      },
    },
    {
      name: "Browse song to submit",
      function: () => setOpen(!open),
    },
  ]
  const callMySound = (src, currentId, track_id, setCurrentId) => {
    Howler.stop()
    if (!src) {
      return console.log("No preview Url")
    }
    if (track_id === currentId) {
      return setCurrentId(null)
    }
    const sound = new Howl({
      src,
      html5: true,
      preload: true,
      volume: 0.3,
      onplay: () => {
        setCurrentId(currentId)
      },
      onstop: () => {
        setCurrentId(null)
      },
      onend: () => {
        setCurrentId(null)
      },
    })
    sound.play()
  }


  return (
    <div>
      {originalTracks.length === 0 && <NoTracks />}
      {(tracks.length === 0 && originalTracks.length) > 0 && <NoResults />}
      <Popover className="mb-3 sticky top-3 ">
        {({ open }) => (
          <>
            <Popover.Button
              className={classNames(
                open ? "text-gray-900" : "text-gray-500",
                "flex mx-auto items-center p-1  border border-transparent rounded-full shadow-sm text-white bg-gradient-to-r from-vibez-primary to-vibez-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              )}
            >
              <PlusSmIcon
                className={classNames(
                  open ? "text-gray-600" : "text-gray-400",
                  "h-5 w-5 group-hover:text-gray-500"
                )}
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute ml-auto z-10 left-1/2 transform -translate-x-1/2  mt-6 px-2 w-screen max-w-xs sm:px-0">
                <div className="rounded-lg border border-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="relative grid gap-6 bg-vibez-cards px-5 py-6 sm:gap-8 sm:p-8">
                    {options.map((item) => (
                      <Popover.Button
                        key={item.name}
                        href={item.href}
                        className="-m-3 p-3 block rounded-md divide-y divide-vibez-primary transition ease-in-out duration-150"
                        onClick={item.function}
                      >
                        <p className="text-base font-medium text-white ">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-white">
                          {item.description}
                        </p>
                      </Popover.Button>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <div className="flow-root mt-6 bg-vibez-cards">
        <ul role="list" className="-my-5 divide-y divide-white bg-vibez-cards ">
          {canSeeTracks ? (
            tracks.map((track) => (
              <li key={track.track_id} className="py-2 ">
                <div className="flex items-center space-x-2 ">
                  <div className="flex-shrink-0">
                    {/* over:skew-y-3 hover:contrast-125 transition-transform  */}
                    <picture><img
                      onClick={() =>
                        callMySound(
                          track.track_info.preview_url,
                          track.track_id,
                          currentId,
                          setCurrentId
                        )
                      }
                      className={
                        track.track_id === currentId
                          ? "h-20 w-20 mr-1 hover:cursor-pointer rounded-md shadow-lg border-4 border-vibez-primary"
                          : "h-20 w-20 mr-1 hover:cursor-pointer rounded-md shadow-lg border border-black"
                      }
                      src={track.track_info.album?.images[0].url}
                      alt=""
                    /></picture>
                  </div>
                  <div className="flex-1 min-w-1 text-sm  ">
                    {track.track_info.preview_url && (
                      <PlayButton
                        callMySound={() =>
                          callMySound(
                            track.track_info.preview_url,
                            track.track_id,
                            currentId,
                            setCurrentId
                          )
                        }
                        isPlaying={currentId === track.track_id ? true : false}
                      />
                    )}
                    <p
                      onClick={() =>
                        callMySound(
                          track.track_info.preview_url,
                          track.track_id,
                          currentId,
                          setCurrentId
                        )
                      }
                      className={
                        track.track_id === currentId
                          ? "font-semibold text-vibez-primary hover:cursor-pointer"
                          : "font-semibold text-white hover:cursor-pointer"
                      }
                    >
                      {track.track_info.name}
                      {track.track_info.explicit && (
                        <ExplicitIcon
                          color={
                            track.track_id === currentId ? "#A260F4" : "white"
                          }
                        />
                      )}
                    </p>
                    <p
                      onClick={() =>
                        callMySound(
                          track.track_info.preview_url,
                          track.track_id,
                          currentId,
                          setCurrentId
                        )
                      }
                      className=" text-white hover:cursor-pointer"
                    >
                      {track.track_info.artists.length === 1
                        ? track.track_info.artists[0].name
                        : track.track_info.artists.map((artist, index, array) =>
                            array[index + 1] === undefined
                              ? artist.name
                              : artist.name + "," + " "
                          )}
                    </p>
                  </div>
                  <div>
                    <div className=" text-white">
                      <p className="mt-2 flex items-center text-sm text-white sm:mt-0">
                        <button
                          className="text-gray-900 group flex items-center px-2 py-1 text-sm"
                          onClick={() => {
                            toast.dismiss()
                            handlePlaylistSubmission(
                              selected,
                              track.track_info.uri,
                              session?.provider_token,
                              track.track_info.name,
                              track.track_info.id
                            )
                          }}
                        >
                          <PlusCircleIcon
                            stroke="#A260F4"
                            width="25"
                            height="25"
                            strokeWidth={1.5}
                          />
                          <p className="text-white ml-1 text-sm">
                            Save to Playlist
                          </p>
                        </button>
                      </p>
                      <p className=" text-white ml-20">
                        {!initialUpvotedTracks.includes(track.track_id)
                          ? track.upvotes +
                            upvotedTracks.includes(track.track_id)
                            ? 1
                            : 0
                          : upvotedTracks.includes(track.track_id)
                          ? track.upvotes
                          : track.upvotes - 1}
                        <button
                          onClick={() =>
                            !isDisabled
                              ? handleUpvotes(track.track_id, session.user.id)
                              : console.log("Processing request...")
                          }
                        >
                          <HeartIcon
                            stroke="black"
                            strokeWidth={1.5}
                            className={
                              !isDisabled
                                ? "inline-flex mb-1 transition duration-50 ease-in-out transform active:-translate-y-0.5 active:scale-110"
                                : "inline-flex mb-1 transition duration-50 ease-in-out transform"
                            }
                            fill={
                              upvotedTracks.includes(track.track_id)
                                ? "red"
                                : "white"
                            }
                            width="25"
                            height="25"
                          />
                        </button>
                      </p>
                    </div>
                    <div className="inline-flex items-center  ml-24 py-1  text-sm leading-5 font-medium text-white">
                      <DropDown track_uri={track.track_info.uri} />
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <PlaceholderPermission totalSongs={tracks.length} />
          )}
        </ul>
      </div>
      <p>
        <SearchPalette
          mood_id={mood_id}
          user_id={session?.user.id}
          getTracks={getTracks}
          open={open}
          setOpen={setOpen}
          token={session?.provider_token}
          tracks={tracks}
        />
      </p>
    </div>
  )
}
