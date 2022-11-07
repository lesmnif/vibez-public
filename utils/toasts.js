import toast from "react-hot-toast"
import { supabase } from "../supabaseClient"

export const submitToast = (user_id, jsonObject, getTracks, setOpen) => {
  toast(
    (t) => (
      <div className="">
        <h1 className=" text-white bg-vibez-cards font-bold items-center text-center">
          Would you like to submit this song ?{" "}
        </h1>
        <div className="py-5 items-center text-center bg-vibez-cards">
          <span className="px-5">
            <button
              type="button"
              onClick={async () => {
                toast.dismiss(t.id)
                const mood = window.location.href.split("tracks/")[1]

                const { data, error } = await supabase.from("tracks").insert([
                  {
                    submitted_by: user_id,
                    track_info: jsonObject,
                    mood_id: mood,
                  },
                ])
                toast.success("You submitted the song!", {
                  duration: 1500,
                })
                setTimeout(() => {
                  toast.dismiss()
                }, 1500)
                getTracks()
              }}
              className="inline-flex items-center rounded-md px-5 py-1.5 border border-transparent text-xs font-medium shadow-sm text-white bg-gradient-to-r from-vibez-primary to-vibez-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {" "}
              Submit
            </button>
          </span>
          <button
            type="button"
            onClick={() => {
              toast.dismiss(t.id)
            }}
            className="inline-flex items-center px-5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-vibez-primary to-vibez-secondary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {" "}
            Keep browsing{" "}
          </button>
        </div>
        <iframe
          src={`https://open.spotify.com/embed/track/${jsonObject.id}?utm_source=generator`}
          width="100%"
          height="380"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="rounded-xl "
        ></iframe>
      </div>
    ),
    {
      duration: 15000,
      style: {
        border: "1px solid white",
        background: "#313131",
      },
    }
  )
}

export const alreadyAddedSong = async (
  playlist,
  track_uri,
  token,
  track_name,
  jsonObject
) => {
  toast(
    (t) => (
      <div>
        <h1 className=" text-white font-bold items-center text-center">
          This song already exists in your playlist, would you like to add it
          anyway ?{" "}
        </h1>
        <div className="py-5 items-center text-center">
          <span className="px-5">
            <button
              type="button"
              onClick={async () => {
                toast.dismiss(t.id)
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
              }}
              className="inline-flex items-center  px-5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-vibez-primary to-vibez-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {" "}
              Submit
            </button>
          </span>
          <button
            type="button"
            onClick={() => toast.dismiss(t.id)}
            className="inline-flex items-center px-5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-vibez-primary to-vibez-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {" "}
            Keep browsing{" "}
          </button>
        </div>

        <iframe
          src={`https://open.spotify.com/embed/track/${jsonObject.id}?utm_source=generator`}
          width="100%"
          height="380"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className=" rounded-xl"
        ></iframe>
      </div>
    ),
    {
      duration: 15000,
      style: {
        border: "1px solid white",
        background: "#313131",
      },
    }
  )
}

export const alreadyExistingVibe = async (vibe) => {
  toast(
    (t) => (
      <div>
        <h1 className=" text-white font-bold items-center text-sm text-center">
          <b>
            A vibe called {vibe.mood} already exists, would you like to check
            that one instead ?{" "}
          </b>
        </h1>
        <div className="mx-auto flex items-center justify-center rounded-full bg-vibez-cards">
          {vibe?.unsplash && (
            <picture>
              <img
                alt="Unsplash Image"
                className=" h-36 w-36 rounded-full my-5 "
                aria-hidden="true"
                src={vibe?.unsplash?.urls?.small}
              />
            </picture>
          )}
        </div>

        <div className="py-5 items-center text-center">
          <span className="px-5">
            <button
              type="button"
              onClick={() => {
                toast.dismiss(t.id)
                window.location.replace(`/tracks/${vibe.mood_id}`)
              }}
              className="inline-flex items-center  px-5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm bg-gradient-to-r from-vibez-primary to-vibez-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {" "}
              Go to the vibe
            </button>
          </span>
          <button
            type="button"
            onClick={() => toast.dismiss(t.id)}
            className="inline-flex items-center px-5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm  bg-gradient-to-r from-vibez-primary to-vibez-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {" "}
            Keep browsing{" "}
          </button>
        </div>
      </div>
    ),
    {
      duration: 15000,
      style: {
        border: "1px solid white",
        background: "#313131",
      },
    }
  )
}
