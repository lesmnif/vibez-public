import { Fragment, useRef, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import SubmitButton from "./SubmitVibeButton"
import GetVibeCover from "./GetVibeCover"
import { createApi } from "unsplash-js"
import { similarity } from "../utils/functions"
import { alreadyExistingVibe } from "../utils/toasts"

export default function CreateVibeModal({
  vibes,
  handleOpening,
  setHandleOpening,
  session,
  getVibes,
}) {
  const [vibeName, setVibeName] = useState("")
  const [coverImages, setCoverImages] = useState("")
  const [handleCoverModal, setHandleCoverModal] = useState(false)

  const cancelButtonRef = useRef(null)

  const handleImageFetching = async () => {
    const existingVibe = vibes.find(
      (element) => similarity(element.mood, vibeName) >= 0.8
    )
    if (existingVibe) {
      setHandleOpening(false)
      return alreadyExistingVibe(existingVibe)
    }
    if (vibeName.length >= 5 && vibeName.length <= 30) {
      const firstWord = vibeName.split(" ")[0]
      const unsplash = createApi({
        accessKey: "EzFtr41uw7yX2vuRRL6-NZLQhPq_sv7_SXQi8T4lBhk",
      })
      const myResult = await unsplash.search.getPhotos({
        page: 1,
        perPage: 20,
        query: firstWord,
      })
      setHandleOpening(false)
      setHandleCoverModal(true)
      setCoverImages(myResult.response.results)
    } else {
      return alert("The vibe name must be between 5 and 30 characters long")
    }
  }

  return (
    <div>
      {" "}
      <GetVibeCover
        getVibes={getVibes}
        session={session}
        coverImages={coverImages}
        setVibeName={setVibeName}
        handleOpening={handleCoverModal}
        setHandleOpening={setHandleCoverModal}
        setVibeModal={setHandleOpening}
        vibeName={vibeName}
      />
      <Transition.Root
        show={handleOpening}
        as={Fragment}
        afterLeave={
          !handleCoverModal ? () => setVibeName("") : console.log("lmao")
        }
      >
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
                <Dialog.Panel className="relative bg-vibez-cards border border-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6 min-w-full lg:min-w-min">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <SubmitButton
                        vibeName={vibeName}
                        setVibeName={setVibeName}
                        placeholder={`e.g: Morning energy vibes`}
                        title={"Create Your New Vibe"}
                      />
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-black border-transparent shadow-sm px-2 py-1 bg-gradient-to-r from-vibez-primary to-vibez-secondary text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 sm:text-sm"
                      onClick={() => {
                        handleImageFetching()
                      }}
                    >
                      Create Vibe
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-black shadow-sm px-2 py-1 bg-gradient-to-r from-vibez-primary to-vibez-secondary text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-2 sm:text-sm"
                      onClick={() => {
                        setHandleOpening(false)
                        setVibeName("")
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
