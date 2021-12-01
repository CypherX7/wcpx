import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ReactTooltip from "react-tooltip";
import Tooltip from "react-simple-tooltip";

export default function SideOver({ open, setOpen, img, name, cryptoId }) {
    return (
        <Transition.Root show={open} as={Fragment}>
        <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-20"
        onClose={setOpen}
        >
        <div className="absolute inset-0 overflow-hidden">
        <Transition.Child
        as={Fragment}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        >
        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <Transition.Child
        as={Fragment}
        enter="transform transition ease-in-out duration-500 sm:duration-700"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500 sm:duration-700"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        >
        <div className="w-screen max-w-md">
        <div className="h-full flex flex-col bg-[#F3F4F6] shadow-xl p-4 relative">
        <div className="flex justify-between">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 text-black hover:text-gray-600 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => setOpen(false)}
        >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
        />
        </svg>
        <div className="flex self-center mr-3 bg-[#FCA5A5] border-2 border-[#EF4444] p-1 rounded-md">
        <Tooltip content="heelooo" placement="bottom">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 mr-2 text-[#EF4444] cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        />
        </svg>
        </Tooltip>

        <Tooltip content="heelooo" placement="bottom">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 mr-2 text-[#EF4444] cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
        />
        </svg>
        </Tooltip>

        <Tooltip content="heelooo" placement="bottom">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 text-[#EF4444] cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
        </svg>
        </Tooltip>
        </div>
        </div>

        <div className="mt-10">
        <img
        src={img}
        alt="avatar"
        className="object-fill rounded-full h-[200px] mx-auto"
        />
        <h1 className="text-center text-transparent break-words bg-clip-text bg-gradient-to-r from-pink-500 to-red-600 text-[50px] font-bold mt-4">
        {name}
        </h1>
        <p className="text-white font-light break-words bg-[#2563EB] p-1 rounded-md mt-6 text-center">
        {cryptoId}
        </p>
        </div>
        <div className="absolute bg-[#2563EB] border-4 border-[#3946d5] rounded-md p-1 bottom-3 translate-x-[50%]">
        <div className="grid grid-cols-4 divide-x divide-white">
        <div>
        <Tooltip content="heelooo">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 text-white mx-1 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
        </svg>
        </Tooltip>
        </div>
        <div>
        <Tooltip content="heelooo">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 text-white mx-2 cursor-pointer"
        viewBox="0 0 20 20"
        fill="currentColor"
        >
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
        </Tooltip>
        </div>
        <div>
        <Tooltip content="heelooo">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 text-white mx-2 cursor-pointer"
        viewBox="0 0 20 20"
        fill="currentColor"
        >
        <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
        <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
        <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
        </svg>
        </Tooltip>
        </div>
        <div>
        <Tooltip content="heelooo">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 text-white ml-3 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
        </svg>
        </Tooltip>
        </div>
        </div>
        </div>
        </div>
        </div>
        </Transition.Child>
        </div>
        </div>
        </Dialog>
        </Transition.Root>
    );
}
