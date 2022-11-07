import { HeartIcon } from "@heroicons/react/outline"
import { useEffect } from "react"
import Link from "next/link"
import NoResults from "./NoResults"
import Image from "next/image"
import { supabase } from "../supabaseClient"

export default function VibesList({ getVibes, setVibes, vibes }) {
  useEffect(() => {
    Howler.stop()
  }, [])

  // const triggerDownload = async (download_url) => {
  //   const client_id = process.env.NEXT_PUBLIC_UNSPLASH_ID
  //   const myResponse = await fetch(`${download_url}&client_id=${client_id}`)
  //   const parsedResponse = await myResponse.json()
  //   const source = `${parsedResponse.url}.jpg`
  //   const fileName = `${source.split("/").pop()}`
  //   console.log("heyo", source, fileName)
  //   let el = document.createElement("a")
  //   el.setAttribute("href", source)
  //   el.setAttribute("download", fileName)
  //   document.body.appendChild(el)
  //   el.click()
  //   el.remove()
  // }

  return (
    <div className="bg-vibez-header ">
      {vibes.length === 0 && <NoResults />}
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5"
      >
        {vibes.map((vibe, index) => (
          <Link key={vibe.mood_id} href={`/tracks/${vibe.mood_id}`}>
            <a>
              <li className="border-solid col-span-1 flex flex-col text-center items-center bg-vibez-cards  rounded-lg shadow-xl divide-y divide-gray-200 ">
                <div className="flex-1 flex flex-col p-3.5">
                  <div
                    className={
                      vibe.unsplash
                        ? "flex-row relative"
                        : "flex-row relative my-2.5"
                    }
                  >
                    {vibe.unsplash ? (
                      <a>
                        <picture>
                          <img
                            // onClick={() =>
                            //   triggerDownload(
                            //     vibe?.unsplash?.links.download_location
                            //   )
                            // }
                            className="w-36 h-36 object-cover flex-shrink-0 mx-auto rounded-full border border-black"
                            src={vibe?.unsplash?.urls?.small}
                            alt="Vibe Cover"
                          />
                        </picture>
                      </a>
                    ) : (
                      <picture>
                        <img
                          className="w-36 h-36 object-contain flex-shrink-0 mx-auto rounded-full border border-black"
                          src={"logo_blanco_lateral_svg.svg"}
                          alt="Logo No Cover"
                        />
                      </picture>
                    )}
                  </div>
                  {vibe.unsplash && (
                    <div className="text-white text-xs mt-1">
                      Photo by{" "}
                      <a
                        className="underline"
                        href={`${vibe.unsplash.user.links.html}?utm_source=vibez&utm_medium=referral`}
                      >
                        {vibe.unsplash.user.name}
                      </a>{" "}
                      on{" "}
                      <a
                        className="underline"
                        href="https://unsplash.com/?utm_source=vibez&utm_medium=referral"
                      >
                        Unsplash
                      </a>
                    </div>
                  )}

                  <h3 className="mt-3.5 text-white text-xs font-bold capitalize items-center text-center">
                    {vibe.mood}{" "}
                    <div className="text-white inline-flex ml-5 text-center font-semibold ">
                      {vibe.total_upvotes}
                      <HeartIcon
                        className="ml-0.5"
                        fill="red"
                        stroke="black"
                        strokeWidth={1.5}
                        width="16"
                        height="16"
                      />
                    </div>
                  </h3>
                </div>
              </li>
            </a>
          </Link>
        ))}
      </ul>
    </div>
  )
}
