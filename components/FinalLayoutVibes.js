import { useState, useEffect } from "react"
import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon, PlusIcon } from "@heroicons/react/outline"
import MagnifyingGlassIcon from "./MagnifyingGlassIcon"
import Logo from "../public/icono_blanco_svg.svg"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "../supabaseClient"
import { Searcher } from "fast-fuzzy"
import SortButtonGroups from "./SortButtonGroups"
import CreateVibeModal from "./CreateVibeModal"
import VibesList from "./VibesList"
import { usePWAInstall } from "react-use-pwa-install"

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

export default function FinalLayoutVibes({
  handleOpening,
  setHandleOpening,
  session,
  vibes,
  getVibes,
  getVibesNewer,
  setVibes,
}) {
  const [searcher, setSearcher] = useState(defaultSearcher)
  const [searcherQuery, setSearcherQuery] = useState("")
  const [selectedOption, setSelectedOption] = useState("Most liked")

  const install = usePWAInstall()

  const handleButtonSelection = (buttonName) => {
    setSelectedOption(buttonName)
    return buttonName === "Most liked" ? getVibes() : getVibesNewer()
  }

  const defaultSearcher = new Searcher(vibes, {
    keySelector: (vibe) => {
      return [vibe.mood]
    },
  })

  useEffect(() => {
    const searcher = new Searcher(vibes, {
      keySelector: (vibe) => {
        return [vibe.mood]
      },
    })
    setSearcher(searcher)
  }, [vibes])

  const filteredVibes =
    searcherQuery === "" ? vibes : searcher.search(searcherQuery)


  return (
    <>
      <div>
        <CreateVibeModal
          handleOpening={handleOpening}
          setHandleOpening={setHandleOpening}
          session={session}
          vibes={vibes}
          getVibes={getVibes}
        />
        <div className="bg-vibez-page min-h-screen">
          <Disclosure
            as="nav"
            className=" bg-vibez-header bg-gradient-to-r from-vibez-primary via-vibez-secondary to-vibez-test bg-[length:100%_4px] bg-no-repeat bg-bottom"
          >
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between ">
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
                      </div>
                    </div>
                    <div className="-mr-2 flex items-center ">
                      <Disclosure.Button className="inline-flex items-center mr-2 justify-center rounded-md bg-vibez-header p-2">
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
                  <div className="border-t border-vibez-primary pb-3">
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

          <header className="py-5 flex mx-auto items-center ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
              <h1 className=" text-4xl mb-5 tracking-tight font-bold text-white capitalize">
                <p className=" text-center mb-3">
                  <button
                    type="button"
                    onClick={() => setHandleOpening(true)}
                    className="inline-flex items-center text-right rounded-md border border-gray-700 bg-gradient-to-r from-vibez-primary to-vibez-secondary px-2.5 py-1.5 text-xs font-bold  text-white shadow-sm hover:bg-indigo-600 bg-opacity-95 focus:outline-none focus:ring-2 focus:ring-vibez-secondary focus:ring-offset-2"
                  >
                    <PlusIcon width={11} height={11} className="mr-1.5" />
                    Create New Vibe
                  </button>
                </p>
                Browse Vibes{" "}
              </h1>
              <div className="text-black text-base font-semibold inline-flex float-right">
                <p className=" text-white mr-3 text-base mt-0.5">Sort by: </p>
                <SortButtonGroups
                  handleButtonSelection={handleButtonSelection}
                  selectedOption={selectedOption}
                />
              </div>
            </div>
          </header>

          <main className="">
            <div className=" max-w-7xl mx-auto  pb-12 px-4 sm:px-6 lg:px-8">
              <div className="bg-vibez-header border border-vibez-primary  border-opacity-40 shadow-lg shadow-black rounded-lg px-5 py-6 sm:px-6">
                <VibesList
                  vibes={filteredVibes}
                  setVibes={setVibes}
                  getVibes={getVibes}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
