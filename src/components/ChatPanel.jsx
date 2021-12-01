import { useState } from "react";
import { useContext } from "react";
import { MainContext } from "../MainContext";
import ChatOptions from "./ChatOptions";
import SideOver from "./SideOver";

export default function ChatPanel() {
    const { value, setvalue } = useContext(MainContext);
    const [open, setOpen] = useState(false);

    return (
        <>
        {!value.chatState ? (
            <div className="flex h-screen">
            <div className="m-auto text-center">
            <h1 className="md:text-[70px] lg:text-[100px] leading-[140.63px] font-black">
            Start Chating.
            </h1>
            <p className="md:text-xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-pink-500">
            text your colleagues with advance <br /> blockchain level secrutiy
            & privacy.
            </p>
            </div>
            </div>
        ) : (
            <>
            <div className="h-[11vh] flex justify-between bg-[#6366F1] p-5">
            <div className="flex cursor-pointer" onClick={() => setOpen(!open)}>
            <img src={value.img} alt="avatar" className="object-fill rounded-full h-[50px] lg:h-[70px] mr-4 self-center"/>
            <div className="self-center">
            <h1 className="text-white text-xl lg:text-[25px] font-bold">{value.name}</h1>
            <p className="text-white font-light text-xs lg:text-sm">
            {value.cryptoId}
            </p>
            </div>
            </div>
            <div className="self-center">
            <ChatOptions />
            </div>
            </div>
            <div>
            <SideOver open={open} setOpen={setOpen} img={value.img} name={value.name} cryptoId={value.cryptoId} />
            </div>
            <div className="flex bg-[#6366F1] pl-5 pr-5 py-2.5 absolute w-full bottom-0">
            <div className="flex self-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-[45px] text-white mr-3 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd"
            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
            clipRule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-[45px] text-white mr-3 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" 
            clipRule="evenodd"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-[45px] text-white mr-3 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
            clpRule="evenodd"/>
            </svg>
            </div>
            <input type="text" className="w-full border-2 border-black rounded-md mr-3 h-[45px] self-center focus:outline-none px-2 text-2xl"/>
            <button className="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-[50px] text-white transform rotate-90 cursor-pointer"viewBox="0 0 20 20" 
            fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            </button>
            </div>
            </>
        )}
        </>
    );
};
