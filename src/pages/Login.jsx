import { useState , useContext } from "react";
import { HomeContext } from "../MainContext";
import ReactTooltip from "react-tooltip";
import {onlychars} from "../data/imp";
import * as CryptoJS from "crypto-js";
import * as IPFS from "ipfs-core";
import AES from "crypto-js/aes";
import {ethers} from "ethers";

export default function Login(){
    const {Value , setValue} = useContext(HomeContext);
    const [data, setData] = useState({address:Value.Myaddrs,password: "",secretPhrase: "",pk:""});

    async function run(){
        const ipfs = await IPFS.create({repo: 'ok' + Math.random()});
        var scph = (data.secretPhrase).replace(/\s/g,'');
        try {var rndmc = (AES.decrypt(localStorage.getItem('RANDOMCHARS'),(data.password)+scph)).toString(CryptoJS.enc.Utf8);
        }catch(err){console.log(err.message);alert("Invalid Credentials")};
        var entypedata = localStorage.getItem('DATA');
        try {var datax = (AES.decrypt(entypedata,data.password+scph+rndmc).toString(CryptoJS.enc.Utf8)).split(";");
        }catch(err){alert("Invalid Credentials")};
        for await (const chunk of ipfs.cat(datax[1])) {
            var chunkx = new TextDecoder().decode(chunk);
            var chunkxval = JSON.parse((CryptoJS.AES.decrypt(chunkx,datax[0])).toString(CryptoJS.enc.Utf8));
        };
        try {
            if ((data.password).length < 8 || ([...(data.password)]).every(val => onlychars.includes(val)) === false){
                alert("Invalid Passowrd");
            } else if (((data.secretPhrase).split(" ")).length < 5){
                alert("Invalid Secret Phrase");
            } else if (datax[0].slice(0,12) !== "xHAHAITWORKS" || rndmc.slice(0,12) !== "xHAHAITWORKS") {
                alert("Credentials are Invalid");
            } else {
                setValue({...Value,passx:((data.password)+scph),ChatState:true,pk:chunkxval.msgpk,acc:chunkxval.msgacc}); 
            }
        }catch(err){alert("Not working")};

    };

    const submitHandler = (e) => {
        e.preventDefault();
        run(); 
    }; 
    return (
        <div className="bg-[#00000080] min-h-screen py-16">
        <ReactTooltip effect="solid" place="right" />
        <div className="bg-white rounded-[30px] md:w-[650px] lg:w-[850px] mx-auto py-8 px-12">
        <h1 className="text-[60px] leading-[75px] font-light text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-pink-500">
        Login.
        </h1>
        <form onSubmit={submitHandler}>
        <h1 className="md:text-[20px] lg:text-[25px] font-light mb-2">Address</h1>
        <input type="text" value={Value.Myaddrs}
        className="border-2 border-[#000000] rounded-[5px] w-[100%] h-[40px] bg-blue-100 address-color text-xl text-center font-black"
        onChange={(e) => setData({ ...data, address: e.target.value })}/>
        <h1 className="md:text-[20px] lg:text-[25px] font-light mb-2 mt-5">Password</h1>
        <input type="password" required className="border-2 border-[#000000] rounded-[5px] w-[100%] h-[40px] text-2xl px-2 focus:outline-none"
        onChange={(e) => setData({ ...data, password: e.target.value })}/>
        <h1 className="md:text-[20px] lg:text-[25px] font-light mb-2 mt-5 text-2xl">Secret Phrase</h1>
        <input type="text" required className="border-2 border-[#000000] rounded-[5px] w-[100%] h-[40px] text-2xl px-2 focus:outline-none"
        onChange={(e) => setData({ ...data, secretPhrase: e.target.value })}/>
        <div className="text-center mt-16">
        <button type="submit" className="text-white font-light text-[36px] bg-lbBg rounded-[10px] w-[200px] h-[70px]">Login</button>
        </div>
        </form>
        </div>
        </div>
    );
};
