import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import FinalLayout from "./FinalLayoutVibes"
import Loader from "./Loader"

export default function Account({ session }) {
  
  const [handleOpening, setHandleOpening] = useState(false)
  const [vibes, setVibes] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  
  useEffect(() => {
    Howler.stop()
  }, [])

  useEffect(() => {
    getProfile()
    getVibes()
  }, [session])


  async function getVibes(sorted_by) {
    try {
      const { data, error, status } =
        sorted_by === "newer"
          ? await supabase
              .from("vibes")
              .select()
              .order("created_at", { ascending: false })
          : await supabase
              .from("vibes")
              .select()
              .order("total_upvotes", { ascending: false })
              .order("created_at", { ascending: false })

      if (error && status !== 406) {
        throw error
      }
      if (data) {
        setVibes(data)
        setIsLoaded(true)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  async function getProfile() {
    try {
      const user = supabase.auth.user()
      let { data, error, status } = await supabase.from("profiles").insert([
        {
          id: user.id,
          username: user.email,
        },
      ])
   
      if (error && status !== 406) {
        throw error
      }
    } catch (error) {
      console.log("this is my error", error)
    }
  }

  return (
    <div>
      {isLoaded ? <FinalLayout
        handleOpening={handleOpening}
        setHandleOpening={setHandleOpening}
        session={session}
        vibes={vibes}
        getVibesNewer={() => getVibes("newer")}
        getVibes={getVibes}
        setVibes={setVibes}
      /> : <Loader/>}
      
    </div>
  )
}
