import { Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import SubmitButton from "./SubmitButton"
import toast from "react-hot-toast"

export default function CreatePlaylistModal({
  handleOpening,
  setHandleOpening,
  token,
  user_id,
  title,
  getUserPlaylists,
}) {
  const handlePlaylistCreation = async (token, user_id, playlistName) => {
    try {
      const myResponse = await fetch(
        `https://api.spotify.com/v1/users/${user_id}/playlists`,
        {
          method: "post",
          body: JSON.stringify({
            name: playlistName,
            description: "Created via https://www.usevibez.com/",
            public: true,
          }),
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
          "Content-Type": "application/json",
        }
      )
      getUserPlaylists()
      toast.success(
        `Your playlist '${playlistName}' got created successfully`,
        {
          duration: 1500,
        }
      )
      setTimeout(() => {
        toast.dismiss()
      }, 1500)
    } catch (error) {
      toast.error(error.name, {
        duration: 1000,
      })
    }
  }

  const [playlistName, setPlaylistName] = useState("")

  const cancelButtonRef = useRef(null)

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
              <Dialog.Panel className="relative text-white bg-vibez-cards border bordere-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6 min-w-full lg:min-w-min">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <SubmitButton
                      playlistName={playlistName}
                      setPlaylistName={setPlaylistName}
                      title={title}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full text-white inline-flex justify-center rounded-md border border-black border-transparent shadow-sm px-2 py-1 bg-gradient-to-r from-vibez-primary to-vibez-secondary text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 sm:text-sm"
                    onClick={() => {
                      setHandleOpening(false)
                      handlePlaylistCreation(
                        token,
                        user_id,
                        playlistName,
                        getUserPlaylists
                      )
                    }}
                  >
                    Create Playlist
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-black shadow-sm px-2 py-1 bg-gradient-to-r from-vibez-primary to-vibez-secondary text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-2 sm:text-sm"
                    onClick={() => setHandleOpening(false)}
                    ref={cancelButtonRef}
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
  )
}
