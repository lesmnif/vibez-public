import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import Auth from "../components/Auth"
import Account from "../components/Account"
import { data } from "autoprefixer"
import Loader from "../components/Loader"

export default function Home() {
  const [session, setSession] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    setIsLoaded(true)
  }, [session])

  return (
    <div>
      {!session ? (
        isLoaded ? (
          <Auth />
        ) : (
          <Loader />
        )
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  )
}
