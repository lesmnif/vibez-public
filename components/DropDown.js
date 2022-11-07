import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { CheckCircleIcon, BanIcon} from "@heroicons/react/outline";
import Image from "next/image";
import SpotifyIcon from "../public/SpotifyIcon.png";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDown({track_uri}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="bg-vibez-cards rounded-full flex items-center text-white focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-vibez-primary">
          <span className="sr-only">Open options</span>
          <DotsVerticalIcon
            fill="white"
            className="h-5 w-5"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-vibez-cards ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => alert("Report sent!")}
                  className={classNames(
                    active ? "bg-vibez-header text-white" : "text-white",
                    "group flex items-center px-3.5 py-2 text-sm hover:cursor-pointer"
                  )}
                >
                  <BanIcon
                    stroke="#ff4040"
                    width="25"
                    height="25"
                    strokeWidth={1.5}
                  />
                  <p className="text-white ml-1 ">Report Song</p>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href={track_uri}
                  className={classNames(
                    active ? "bg-vibez-header text-white" : "text-white",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <Image alt="Logo" width="20" height="20" src={SpotifyIcon} />
                  <p className="text-white ml-2 "> Listen on Spotify</p>
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
