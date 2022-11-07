import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";

import SubmitButton from "./SubmitButton";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PlaylistDropdown({
  selected,
  setSelected,
  handleOpening,
  setHandleOpening,
  userPlaylists,
}) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">
            Change published status
          </Listbox.Label>
          <div className="relative text-center">
            <div className="inline-flex shadow-sm rounded-full divide-x divide-indigo-600">
              <div className="  rounded-full relative z-0 inline-flex shadow-sm divide-x divide-indigo-600">
                <div className="relative inline-flex items-center bg-gradient-to-r from-vibez-primary to-vibez-secondary  py-1 pl-3 pr-4 border border-transparent rounded-l-full shadow-sm text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  <p className="ml-2.5 text-sm font-medium">{selected.name}</p>
                </div>
                <Listbox.Button className="relative inline-flex items-center bg-gradient-to-r from-vibez-secondary to-vibez-primary p-2 rounded-l-none rounded-r-full text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                  <ChevronDownIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </Listbox.Button>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="border border-white origin-top absolute z-10 right-0 mt-2 w-60 rounded-md shadow-lg overflow-hidden bg-vibez-cards divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="text-white ml-3 font-bold my-3">
                  {" "}
                  Select a playlist
                  <Listbox.Button>
                    <div className=" flex items-center self-center object-center mt-2 justify-center">
                      <p
                        onClick={() => {
                          setHandleOpening(!handleOpening);
                        }}
                        type="button"
                        className="inline-flex items-center px-10 py-1 border rounded-full border-gray-400 shadow-sm text-xs font-bold text-white bg-gradient-to-r from-vibez-primary to-vibez-secondary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Create New Playlist
                      </p>
                    </div>
                  </Listbox.Button>
                  <h1 className="text-white font-bold my-3  text-xs">
                    Your playlists
                  </h1>
                </div>
                {userPlaylists.map((playlist) => (
                  <Listbox.Option
                    key={playlist.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-gradient-to-r from-vibez-primary to-vibez-secondary" : "text-gray-900",
                        "cursor-default select-none relative p-4 text-sm hover:cursor-pointer"
                      )
                    }
                    value={playlist}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex">
                          <picture><img
                            src={playlist?.images[0]?.url}
                            alt=""
                            className="flex-shrink-0 h-6 w-6 mr-2"
                          /></picture>
                          <p
                            className={
                              selected
                                ? "font-semibold text-white  self-center "
                                : "font-normal text-white"
                            }
                          >
                            {playlist.name}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? "text-white" : "text-indigo-500"
                              }
                            >
                              <CheckIcon
                                className="h-4 w-4  mt-1 ml-2  stroke-white fill-white"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
