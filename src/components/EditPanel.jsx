import { useState , useContext , useEffect } from "react";
import avatar from "../images/avatar.png";
import {MainContext , HomeContext} from "../MainContext";
import * as CryptoJS from "crypto-js";
import * as IPFS from "ipfs-core";
import AES from "crypto-js/aes";
import {ethers} from "ethers";

export default function EditPanel({ setOpenEditPanel }){
    const {value , setvalue} = useContext(MainContext);
    const {Value , setValue} = useContext(HomeContext);
    console.log(Value);
    var jsonval = JSON.parse(value.EDITPFVARS);
    const [basicdata , setbasicdata] = useState({'username':jsonval.username,'address':jsonval.address,'bio':jsonval.bio,'sendadrs':jsonval.msgacc})
    const [image, setImage] = useState(false);

    function handleImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {setImage(e.target.result);};
            reader.readAsDataURL(e.target.files[0]);
        };
    };

    return (
        <>
        <div className="p-5 bg-[#F3F4F6] h-full">
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 text-black hover:text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24"
        stroke="currentColor" onClick={() => setOpenEditPanel(false)}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        </div>
        <div className="mt-5"><div className="grid place-items-center relative h-[203px] w-[203px] rounded-full border-2 border-black mx-auto">
        <div className="image-upload"><div className="d-flex">
        <img src={image ? image : avatar} draggable={false} alt="uploaded-img" className="h-[200px] w-[200px] object-cover rounded-full"/>
        <div className="align-self-end cam">
        <label htmlFor="upload-input" className="absolute bottom-1 left-[9.5rem] cursor-pointer bg-white p-1 rounded-full border-2 border-black">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"/>
        </svg>
        </label>
        <input id="upload-input" type="file" accept=".jpg,.jpeg,.gif,.png" onChange={handleImageChange} className="hidden"/>
        </div></div></div></div>
        <div className="flex justify-center mt-3">
        <h1 className="text-center text-transparent break-words bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 text-[50px] font-black mt-4">
        {basicdata.username}
        </h1>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-end mb-4 ml-3 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"/>
        </svg>
        </div>
        <p className="text-white font-light break-words bg-[#2563EB] mt-8 p-px text-center">{basicdata.address}</p>
        <div className="flex justify-between">
        <h1 className="text-sm font-light mt-6">Send Address: {basicdata.sendadrs}</h1>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-end mb-4 ml-3 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" >
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
        </svg>
        </div>
        <div className="flex justify-between pt-6">
        <h1 className="text-[30px] font-light mt-3">Bio: {basicdata.bio}</h1>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-end mb-4 ml-3 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"/>
        </svg>
        </div>
        </div>
        <div className="absolute bg-[#2563EB] border-4 border-[#3946d5] rounded-md p-1 bottom-3 translate-x-[35%]">
        <div className="grid grid-cols-4 divide-x divide-white">
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 text-white mx-1 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
        </div>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 text-white mx-2 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
        </div>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 text-white mx-2 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
        <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
        <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
        </svg>
        </div>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 text-white ml-3 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
        </svg>
        </div>
        </div>
        </div>
        </div>
        </>
    );
};
