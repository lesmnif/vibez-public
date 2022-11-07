import Link from "next/link"
import ForwardIcon from "./ForwardIcon"
import { useEffect } from "react"
import Logo from "../public/logo_color_lateral_svg.svg";
import Image from "next/image";
import { Howler } from "howler";


const features = [
  {
    name: "Search a Vibe to Explore",
    description:
      "Look out for a vibe that syncs with how you feel, so you can discover music accordingly! If there isn't a vibe that convinces you, create your own ! People will help you discover that kind of music.",
    number: 1,
  },
  {
    name: "We Need Your Taste!",
    description:
      "People need you ! You have to submit at least once a day to be able to browse through vibes. Don't be shy, it's anonymous and everyone feels music different, we want to know how you feel it yourself.",
    number: 2,
    
  },
  {
    name: "Start Adding Songs",
    description:
      "Choose a playlist and start adding songs. Your saved songs are automatically synced to Spotify.",
    number: 3,
    class: "h-64 flow-root bg-vibez-cards rounded-lg border-vibez-secondary shadow-inner shadow-vibez-secondary opacit border border-opacity-70 px-6 pb-8"

  },
  {
    name: "Like and Share",
    description:
      "If you like a Song make sure to like it so more people can reach out to it. You can also share it, the more the merrier!",
    number: 4,
    class: "h-64 flow-root rounded-lg bg-vibez-cards border-vibez-secondary shadow-inner shadow-vibez-secondary opacit border border-opacity-70 px-6 pb-8"
   
  },
]

export default function Tutorial() {

  useEffect(() => {
    Howler.stop()
  }, [])

  return (
    <div className="relative bg-vibez-header min-h-screen py-16 sm:py-24 lg:py-32 ml-">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
      <Image alt="Logo" width="200%" height="125%" className=" w-56 h-56" src={Logo} />
        <h2 className="text-lg font-bold mt-2 text-vibez-primary md:text-3xl">
          What is Vibez and How Does it Work ?
        </h2>
        <p className="mx-auto mt-5 max-w-prose text-lg text-white font-medium md:text-2xl">
          Share and discover music based on vibes. Don&apos;t be shy, be
          original, be yourself, variety makes a good playlist.
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className={feature.class ? feature.class : "flow-root rounded-lg border-vibez-secondary shadow-inner shadow-vibez-secondary opacit border border-opacity-70 bg-vibez-cards px-6 pb-8"}>
                  <div className="-mt-6">
                    <div className=" justify-evenly">
                      <span className="inline-flex text-center items-center justify-center rounded-md bg-gradient-to-r from-vibez-primary to-vibez-secondary y p-3 shadow-md shadow-vibez-terciary">
                        <p
                          className="h-6 w-6 text-white font-medium"
                          aria-hidden="true"
                        >
                          {feature.number} 
                        </p>
                      </span>
                    </div>
                    
                    <h3 className="mt-8 text-xl font-extrabold tracking-tight text-vibez-primary">
                      {feature.name} 
                    </h3>
                    <p className="mt-5 text-base text-white font-medium">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/">
            <button className="text-transparent bg-clip-text bg-gradient-to-r from-vibez-primary via-vibez-secondary to-vibez-terciary font-bold mt-10 text-lg hover:cursor-pointer ml-4">
              {" "}
              Start Vibing
              <ForwardIcon />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
