import { useState , useContext , useEffect} from "react";
import ChatPanel from "../components/ChatPanel";
import SidePanel from "../components/SidePanel";
import * as IPFS from "ipfs-core";
import * as CryptoJS from "crypto-js";
import axios from "axios";
import {MainContext , HomeContext} from "../MainContext";

export default function Chat (){
    const [value, setvalue] = useState({name: '',img: null,cryptoId: '',EDITPFVARS:'',clstate:'',ContractAt:''});
    const {Value , setValue} = useContext(HomeContext);
    useEffect(() => {
        async function run(){
            const ipfs = await IPFS.create({repo: 'ok' + Math.random()});
            try {var rndmc = (CryptoJS.AES.decrypt(localStorage.getItem('RANDOMCHARS'),Value.passx).toString(CryptoJS.enc.Utf8));
            }catch(err){console.log(err.message);alert("Invalid Credentials")};
            var entypedata = localStorage.getItem('DATA');
            var datax = (CryptoJS.AES.decrypt(entypedata,Value.passx + rndmc).toString(CryptoJS.enc.Utf8)).split(";");
            for await (const chunk of ipfs.cat(datax[1])) {
                var chunkx = new TextDecoder().decode(chunk)
                var chunksval = (CryptoJS.AES.decrypt(chunkx,datax[0])).toString(CryptoJS.enc.Utf8)
                setvalue({...value,EDITPFVARS:chunksval,LOADCHAT:true});
            };
        };run();
    },[]);

    function renderl(){
        if (value.LOADCHAT === true){
            return (
                <div className="grid grid-cols-3 h-screen">
                <div className="border-r-4 border-[#D1D5DB] relative">
                <SidePanel />
                </div>
                <div className="col-span-2 relative">
                <ChatPanel />
                </div>
                </div>
            );
        }
    }
    return (
        <MainContext.Provider value={{value,setvalue}}>
        {renderl()}
        </MainContext.Provider>
    );
};
