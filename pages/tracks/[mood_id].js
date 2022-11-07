import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { supabase } from "../../supabaseClient"
import Layout from "../../components/FinalLayout"
import Loader from "../../components/Loader"


export default function MoodPage() {
  const [tracks, setTracks] = useState(null)
  const router = useRouter()
  const [vibes, setVibes] = useState([])
  const { mood_id } = router.query
  const [session, setSession] = useState(null)
  const [canSeeTracks, setCanSeeTracks] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    Howler.stop()
  }, [mood_id])

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [session])

  async function getTracks(mood_id, sorted_by) {
    if (session?.user?.id) {
      const { data, error, status } = await supabase
        .from("tracks")
        .select("submitted_at")
        .eq("submitted_by", session?.user?.id)
        .order("submitted_at", { ascending: false })
        .limit(1)
        .select()

      const myDate = data && data[0]?.submitted_at
      const msBetweenDates = Math.abs(
        new Date(myDate).getTime() - new Date().getTime()
      )
      const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000)
      if (hoursBetweenDates < 24) {
        setCanSeeTracks(true)
      }
        try {
          const { data, error, status } =
            sorted_by === "newer"
              ? await supabase
                  .from("tracks")
                  .select()
                  .eq("mood_id", mood_id)
                  .order("submitted_at", { ascending: false })
              : await supabase
                  .from("tracks")
                  .select()
                  .eq("mood_id", mood_id)
                  .order("upvotes", { ascending: false })
                  .order("submitted_at", { ascending: false })

          if (error && status !== 406) {
            throw error
          }
          if (data) {
            setTracks(data)
            setIsLoaded(true)
          }
        } catch (error) {
          console.log(error.message)
          supabase.auth.signOut()
        }
    }
  }
  useEffect(() => {
    if (!router.isReady) {
      return
    }
    async function getVibes(mood_id, sorted_by) {
      try {
        const { data, error, status } = await supabase
          .from("vibes")
          .select("mood")
          .eq("mood_id", mood_id)

        if (error && status !== 406) {
          throw error
        }
        if (data) {
          setVibes(data[0].mood)
        }
      } catch (error) {
        console.log("error.message", error.message)
      }
    }
    getTracks(mood_id)
    getVibes(mood_id)
  }, [router.isReady, router.query, mood_id, session?.user?.id])


  return (
    <div>
        {isLoaded ? <Layout
          session={session}
          setSession={setSession}
          canSeeTracks={canSeeTracks}
          title={vibes}
          mood_id={mood_id}
          tracks={tracks}
          getTracksNewer={() => getTracks(mood_id, "newer")}
          getTracks={() => getTracks(mood_id)}
        /> : <Loader/>}
    </div>
  )
}
