import avatar from "../images/avatar.png";
import axios from "axios";
import Web3 from "web3"
import * as CryptoJS from "crypto-js";
import * as IPFS from "ipfs-core";
import { MainContext , HomeContext } from "../MainContext";
import { useState , useContext , useEffect } from "react";
import EditPanel from "./EditPanel";
import ProfileOptions from "./ProfileOptions";
import ProfileModal from "./ProfileModal";


export default function SidePanel() {
    const url = "https://speedy-nodes-nyc.moralis.io/3dbe4cc65440492d5827d724/polygon/mumbai/archive";
    const web3  =  new Web3(url);
    const { value, setvalue } = useContext(MainContext);
    const {Value , setValue} = useContext(HomeContext);
    const [useval, setuseval] = useState('x');
    const [basicval , setbasicval] = useState();
    const [openEditPanel, setOpenEditPanel] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [showAddress, setShowAddress] = useState(false);
    var transactlist;
    var listn;
    var valsz = JSON.parse(value.EDITPFVARS);

    async function run(){
        axios.get(`https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${Value.acc}&startblock=1&endblock=99999999&sort=asc&apikey=YourApiKeyToken`).then(res => {
            res = res.data.result;
            res.forEach(item =>{
                async function exrun() {
                    try {var inputdata = new String(Web3.utils.hexToAscii(item.input))} catch(err){var inputdata=''};
                    if (item.to == Value.acc && item.hash != useval && inputdata.slice(0,24) == "WCPXWALLETLINKREQUESTED:"){
                        console.log("got in");
                        console.log(inputdata)
                        const ipfs = await IPFS.create({repo: 'ok' + Math.random()});
                        try {var rndmc = (CryptoJS.AES.decrypt(localStorage.getItem('RANDOMCHARS'),Value.passx).toString(CryptoJS.enc.Utf8));
                        }catch(err){console.log(err.message);alert("Invalid Credentials")};
                        var entypedata = localStorage.getItem('DATA');
                        var datax = (CryptoJS.AES.decrypt(entypedata,Value.passx + rndmc).toString(CryptoJS.enc.Utf8)).split(";");
                        for await (const chunk of ipfs.cat(datax[1])) {
                            var chunkx = new TextDecoder().decode(chunk)
                            var chunkxval = JSON.parse((CryptoJS.AES.decrypt(chunkx,datax[0])).toString(CryptoJS.enc.Utf8))
                        };
                        var inchatdata = chunkxval["chatdata"];
                        inchatdata.push({'name': res.from,'cryptoId': res.from,clstate:'NEW',ContractAt:inputdata.slice(25)});
                        chunkxval["chatdata"] = inchatdata;
                        console.log(chunkxval)
                        var ipfshash = (await ipfs.add(CryptoJS.AES.encrypt(JSON.stringify(chunkxval),datax[0]).toString())).cid.toString();
                        datax[1] = ipfshash;
                        localStorage.setItem('DATA',CryptoJS.AES.encrypt(datax.join(";"),Value.passx + rndmc).toString());
                        setvalue({...value,EDITPFVARS:JSON.stringify(chunkxval)});
                        setuseval(res.hash);
                    };
                };exrun();
            });
        });

    };

    setInterval(run,2000);
    var personLists = valsz.chatdata

    function adrsSlice(val){
        var slicedadrs = ((new String(val)).slice(0,14)).toString() + "...";
        return slicedadrs;
    }

    function renderlist(){
        if(personLists.length > 0){
            return (
                <div className="fixed h-[80vh] w-1/3 overflow-hidden border-r-4 border-[#D1D5DB] flex">
                <ul className="w-full overflow-x-hidden overflow-y-auto list-none pb-3">
                {personLists.map((person) => (
                    <div key={person.id}>
                    <li
                    className="py-4 md:px-1 lg:px-3 cursor-pointer hover:bg-gray-200"
                    onClick={() => 
                        setvalue({...value,name: person.name,img: avatar, cryptoId: person.cryptoId,ContractAt:person.ContractAt,chatState:true})
                    }>
                    <div className="grid grid-cols-6 gap-2">
                    <div>
                    <img src={avatar} alt="person avatar" className="md:h-[40px] lg:h-[56px] rounded-full object-fill mr-4"/>
                    </div>
                    <div className="self-center col-span-5">
                    <h1 className="text:base lg:text-lg font-bold">{adrsSlice(person.name)} <span className="text-gray-400">[{person.clstate}]</span></h1>
                    <div>
                    <p className="text-xs lg:text-sm text-[#6B7280] truncate">{person.message}</p>
                    </div>
                    </div>
                    </div>
                    </li>
                    <hr className="border-[1px] border-[#9CA3AF]" />
                    </div>
                ))}
                </ul>
                </div>

            )
        };
    };

    return (
        <>
        {openEditPanel ? ( <EditPanel setOpenEditPanel={setOpenEditPanel} />) : (
            <>
            <div className="h-[11vh] flex justify-between bg-gradient-to-r from-blue-400 to-purple-600 md:px-2 lg:px-5 border-b-2 border-[#9CA3AF]">
            <div className="cursor-pointer self-center" onClick={() => setOpenEditPanel(true)}>
            <img src={avatar} alt="avatar" className="object-fill rounded-full h-[55px] lg:h-[78px] border-2"/>
            </div>
            <div className="flex self-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white mr-5 cursor-pointer" viewBox="0 0 20 20" fill="currentColor"
            onClick={() => {setOpenModal(true);setShowAddress(false);}}>
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            <ProfileModal open={openModal} setOpen={setOpenModal} showAddress={showAddress} setShowAddress={setShowAddress} />
            <ProfileOptions />
            </div>
            </div>
            <div className="h-[8vh] border-b-2 border-[#9CA3AF] relative">
            <label htmlFor="search" className="text-gray-400 focus-within:text-gray-600 block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pointer-events-none absolute top-[50%] transform translate-y-[-50%] left-6 z-10"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            </label>
            <input type="text" name="search"
            className="h-[35px] lg:h-[42px] w-[95%] rounded-[50px] border-2 border-[#9CA3AF] pl-11 py-4 absolute top-[50%] translate-y-[-50%] ml-2 lg:ml-3"/>
            </div>
            {renderlist()}
            </>
        )}
        </>
    );
};
