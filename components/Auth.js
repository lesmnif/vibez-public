import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import Image from "next/image"
import Logo from "../public/logo_color_svg.svg"
import SpotifyIcon from "../public/SpotifyIcon_white.png"

export default function Auth() {
  const [loading, setLoading] = useState()

  useEffect(() => {
    Howler.stop()
  }, [])

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn(
        {
          provider: "spotify",
        },
        {
          redirectTo: "https://www.usevibez.com/tutorial_vibez",
          scopes: [
            "playlist-modify-public",
            "user-read-currently-playing",
            "user-read-recently-played",
          ],
        }
      )
      if (error) throw error
    } catch (error) {
      console.log(error.error_description, error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid h-screen w-screen place-items-center bg-background-normal bg-cover">
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-8 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900  ">
          <Image alt="Logo" width="125%" height="125%" src={Logo} />
          <span className="block mt-5 text-lg font-sans">
            And you, how do you feel music ?
          </span>
        </h2>
        <div className="mt-8 flex justify-center ">
          <div className="inline-flex mx-auto">
            <button
              type="button"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault()
                handleLogin()
              }}
              className="inline-flex items-center w-72 border py-1.5 border-transparent font-sans text-lg font-medium rounded-full shadow-sm text-white border-spacing-y-8 bg-spotify-green   hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              <p className="inline-flex items-center mr-8 ml-2">
                <Image alt="Logo" width="35" height="35" src={SpotifyIcon} />
              </p>
              <p className=" font-sans text-lg">Log in with Spotify</p>
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            alert("Quickly sign up for Spotify to discover new music now")
          }
          className="font-sans text-spotify-green inline-flex items-center px-10 border py-1.5 my-5  border-spotify-green text-lg font-medium rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-spotify-green"
        >
          I don&apos;t have Spotify
        </button>
      </div>
    </div>
  )
}
