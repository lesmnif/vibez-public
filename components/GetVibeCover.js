import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SubmitButton from "./SubmitVibeButton";
import { XIcon} from "@heroicons/react/outline";
import { supabase } from "../supabaseClient"
import toast from "react-hot-toast";
import UnsplashImages from "./UnsplashImages";

export default function CreateVibeModal({
  handleOpening,
  setHandleOpening,
  setVibeModal,
  setVibeName,
  vibeName,
  coverImages,
  session,
  getVibes
}) {

  const cancelButtonRef = useRef(null);
  
  const [selected, setSelected] = useState(null)

  const handleSubmit = async () => {
    try{
      if(selected === null && coverImages.length > 0){
        return toast.error("You must select a Cover first")
      }
      const { data, error} = await supabase
      .from("vibes")
      .insert([{
        mood: vibeName,
        unsplash: selected,
        creator_id: session?.user?.id
      }])
      const redirectUri = async() => {
        const {data, error} = await supabase
          .from("vibes")
          .select("mood_id")
          .eq("mood", vibeName)
          window.location.replace(`/tracks/${data[0]?.mood_id}`)
      }
      setHandleOpening(false)
      redirectUri()
      getVibes()
    }catch(error){
      console.log("this is my error", error.message)
    }
  }


  return (
    <Transition.Root show={handleOpening} as={Fragment} afterLeave={() => {
      setVibeName("")
      setSelected(null)
      }}>
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
                  {coverImages.length !== 0 ? (
                    <div className="">
                      <p className="">
                      Photos by <a className="underline font-semibold" href="https://unsplash.com/?utm_source=vibez&utm_medium=referral">Unsplash</a>
                      </p>
                    <div className="absolute top-0 right-0 pt-4 pr-4 sm:block ">
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
                      <p className="text-white text-center my-2 mb-3 border-t border-spacing-y-10 border-white font-bold capitalize">
                        {vibeName}
                      </p>
                      <h1 className="block text-base font-light text-white mb-6 text-center ">
                        Choose Your Cover
                      </h1>
                      <UnsplashImages images={coverImages} selected={selected} setSelected={setSelected} />
                      <div className="mx-auto flex items-center justify-center rounded-full bg-vibez-cards">
                      </div>
                    
                      <div className="mt-3 text-center sm:mt-3">
                        <SubmitButton title={"Choose Your Cover"} hide={true}/>
                      </div>
                    </div>
                  ) : (
                    <p className="text-white font-bold text-center">
                      No cover found for {vibeName}
                    </p>
                  )}
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full  border border-black inline-flex justify-center rounded-md border-transparent shadow-sm px-2 py-1 bg-gradient-to-r from-vibez-primary to-vibez-secondary text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 sm:text-sm"
                    onClick={() => {
                      toast.dismiss()
                      handleSubmit(vibeName)
                    }}
                  >
                    {coverImages.length !== 0
                      ? "I like this cover, create the vibe"
                      : "Create vibe without cover"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-black shadow-sm px-2 py-1 bg-gradient-to-r from-vibez-primary to-vibez-secondary text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-2 sm:text-sm"
                    onClick={() => {
                      setVibeName("");
                      setHandleOpening(false);
                      setVibeModal(true);
                    }}
                  >
                    Go back
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
