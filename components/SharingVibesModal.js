/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XIcon, LinkIcon } from "@heroicons/react/outline"
import {
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share"
import toast from "react-hot-toast"

export default function SharingVibesModal({
  handleOpening,
  setHandleOpening,
  mood,
}) {
  const cancelButtonRef = useRef(null)

  const myUrl = `Hey, check out this ${mood} playlist I just found on Vibez! \n https://vibez-two.vercel.app/tracks/43b33e8b-5910-4564-9807-84145590320f`

  return (
    <Transition.Root show={handleOpening} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setHandleOpening}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-start sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-vibez-cards border border-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full sm:p-6 min-w-full lg:min-w-min">
                <div>
                  <div className="absolute top-0 right-0 pt-4 pr-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-vibez-cards focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setHandleOpening(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon
                        className="h-6 w-6 stroke-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div className="mt-6 text-center sm:mt-0  sm:text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-white"
                    >
                      How would you like to share Vibez ?
                    </Dialog.Title>
                    <div className="mt-5 text-center">
                      <div className="text-sm text-gray-500">
                        <p className="mx-4 inline-flex">
                          <WhatsappShareButton
                            onClick={() => setHandleOpening(false)}
                            url={myUrl}
                            quote={
                              "Check out Vibez to discover and share all kinds of music with your friends!"
                            }
                          >
                            <WhatsappIcon
                              size={34}
                              round
                              className="border-2 border-vibez-primary rounded-full"
                            />
                          </WhatsappShareButton>
                        </p>
                        <div className="mx-4 inline-flex ">
                          <p className="border-2 rounded-full border-vibez-primary">
                            <LinkIcon
                              onClick={async () => {
                                await navigator.clipboard?.writeText(
                                  window.location.href
                                )
                                toast.success(`Copied to the Clipboard!`, {
                                  duration: 1500,
                                })
                                setTimeout(() => {
                                  toast.dismiss()
                                }, 1500)
                                setHandleOpening(false)
                              }}
                              className="h-8 w-8 hover:cursor-pointer stroke-black rounded-full py-1 bg-vibez-secondary "
                            />
                          </p>{" "}
                        </div>
                        <p className="mx-4 inline-flex">
                          <RedditShareButton
                            onClick={() => setHandleOpening(false)}
                            url={window.location.href}
                            title={`Hey, check out this ${mood} playlist I just found on Vibez!`}
                          >
                            <RedditIcon size={34} round className="border-2 rounded-full border-vibez-primary" />
                          </RedditShareButton>
                        </p>
                        <p className="mx-4 inline-flex">
                          <TwitterShareButton
                            onClick={() => setHandleOpening(false)}
                            url={myUrl}
                            quote={
                              "Check out Vibez to discover and share all kinds of music with your friends!"
                            }
                          >
                            <TwitterIcon size={34} round className="border-2 rounded-full border-vibez-primary"/>
                          </TwitterShareButton>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
