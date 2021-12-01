import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

export default function ChatOptions() {
  return (
    <Menu as="div" className="relative inline-block text-left z-10">
      <div>
        <Menu.Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-0.5">
            <Menu.Item>
              <p className="block pl-5 py-3 cursor-pointer hover:bg-gray-100">
                Search
              </p>
            </Menu.Item>
            <hr />
            <Menu.Item>
              <p className="block pl-5 py-3 cursor-pointer hover:bg-gray-100">
                Delete chat
              </p>
            </Menu.Item>
            <hr />
            <Menu.Item>
              <p className="block pl-5 py-3 cursor-pointer hover:bg-gray-100">
                Block
              </p>
            </Menu.Item>
            <hr />
            <Menu.Item>
              <p className="block pl-5 py-3 cursor-pointer hover:bg-gray-100">
                Report
              </p>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
