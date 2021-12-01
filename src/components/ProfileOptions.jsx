import { Fragment, useState } from "react";
import { Menu, Transition, Switch } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ProfileOptions() {
    const [enabled, setEnabled] = useState(true);

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
        <div className="flex justify-between">
        <p className="block p-4">Notification</p>
        <Switch
        checked={enabled}
        onChange={setEnabled}
        className="mt-4 mr-4 flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer"
        >
        <span
        aria-hidden="true"
        className="pointer-events-none absolute bg-white w-full h-full rounded-md"
        />
        <span
        aria-hidden="true"
        className={classNames(
            enabled ? "bg-indigo-600" : "bg-gray-200",
            "pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200"
        )}
        />
        <span
        aria-hidden="true"
        className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200"
        )}
        />
        </Switch>
        </div>
        <hr />
        <Menu.Item>
        <p className="block p-4 cursor-pointer hover:bg-gray-100">Logout</p>
        </Menu.Item>
        </Menu.Items>
        </Transition>
        </Menu>
    );
}
