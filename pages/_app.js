import { Toaster } from "react-hot-toast"
import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import Auth from "../components/Auth"
import Loader from "../components/Loader"
import Head from "next/head"
import "../styles/globals.css"
import { Howler } from "howler"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (!navigator.onLine) {
      return alert("You need connection")
    }
  }, [])

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            )
          },
          function (err) {
            console.log("Service Worker registration failed: ", err)
          }
        )
      })
    }
  }, [])

  const [session, setSession] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    if (session && !session.provider_token) {
      supabase.auth.signOut()
      return setIsLoaded(true)
    }
    setIsLoaded(true)
  }, [session])

  return (
    <div className=" bg-white">
      <Head>
        <title>Vibez</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="/manifest.webmanifest"></link>
        <link rel="icon" href="/icono_color_svg.svg" />
        <link rel="apple-touch-icon" href="/icono_color_svg.svg"></link>
      </Head>
      {!session ? (
        isLoaded ? (
          <Auth />
        ) : (
          <Loader />
        )
      ) : (
        <div className=" bg-white">
          <Component {...pageProps} />
          <Toaster
            toastOptions={{
              duration: 1500,
              style: {
                border: "1px solid white",
                background: "#313131",
                color: "white",
              },
            }}
          />
        </div>
      )}
    </div>
  )
}

export default MyApp
