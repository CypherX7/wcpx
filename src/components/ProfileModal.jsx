import { Fragment, useState , useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HomeContext , MainContext } from "../MainContext";
import * as IPFS from "ipfs-core";
import * as CryptoJS from "crypto-js";
import Web3 from 'web3';
import axios from "axios";

export default function ProfileModal({open,setOpen,showAddress,setShowAddress}) {
    const url = "https://speedy-nodes-nyc.moralis.io/3dbe4cc65440492d5827d724/polygon/mumbai/archive";
    const web3  =  new Web3(url);
    const [address, setAddress] = useState();
    const {Value , setValue} = useContext(HomeContext);
    const {value , setvalue} = useContext(MainContext);
    let chatvals = [];
    const submitHandler = (e) => {
        e.preventDefault();

        JSON.parse(value.EDITPFVARS).chatdata.forEach(function (item){chatvals.push(item.cryptoId)}); 

        if (chatvals.includes(address) === true){
            alert("Already sent Invite");
        } else {
            axios.get(`/chatx/${(Value.pk).toString()}/${'TRUE'}`);
            alert('It takes around 30 secons to send a request');

            async function requestInvite(){
                axios.get(`/invitex/`).then(async res => {
                    console.log(res);
                    var reqcontractadrs = res.data.contract;
                    var msg = web3.utils.toHex(`WCPXWALLETLINKREQUESTED:${reqcontractadrs}`);
                    var tx = await web3.eth.accounts.signTransaction({'to':address,'value':'1000000000','gas':2000000,'data':msg},Value.pk);
                    web3.eth.sendSignedTransaction(tx.rawTransaction).then((receipt)=>{console.log(receipt);});

                    const ipfs = await IPFS.create({repo: 'ok' + Math.random()});
                    try {var rndmc = (CryptoJS.AES.decrypt(localStorage.getItem('RANDOMCHARS'),Value.passx).toString(CryptoJS.enc.Utf8));
                    }catch(err){console.log(err.message);alert("Invalid Credentials")};
                    var entypedata = localStorage.getItem('DATA');
                    var datax = (CryptoJS.AES.decrypt(entypedata,Value.passx + rndmc).toString(CryptoJS.enc.Utf8)).split(";");
                    for await (const chunk of ipfs.cat(datax[1])) {
                        var chunkx = new TextDecoder().decode(chunk);
                        var chunkxval = JSON.parse((CryptoJS.AES.decrypt(chunkx,datax[0])).toString(CryptoJS.enc.Utf8));
                    };
                    var inchatdata = chunkxval["chatdata"];
                    inchatdata.push({'name': address,'cryptoId': address,clstate:'REQUESTED',ContractAt:reqcontractadrs});
                    chunkxval["chatdata"] = inchatdata;
                    var ipfshash = (await ipfs.add(CryptoJS.AES.encrypt(JSON.stringify(chunkxval),datax[0]).toString())).cid.toString();
                    datax[1] = ipfshash;
                    localStorage.setItem('DATA',CryptoJS.AES.encrypt(datax.join(";"),Value.passx + rndmc).toString());
                    console.log("done");
                    setvalue({...value,EDITPFVARS:JSON.stringify(chunkxval)});
                });
            };
            setTimeout(requestInvite(),30000);
            setOpen(false);
            chatvals = [];
        }
    };

    return (
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" 
        leaveFrom="opacity-100" leaveTo="opacity-0">
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" 
        enterTo="opacity-100 translate-y-0 sm:scale-100"leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" 
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
        <div className="inline-block align-bottom bg-white rounded-lg px-4 py-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
        {!showAddress ? (
            <div className="flex justify-center">
            <div className="mr-10 cursor-pointer" onClick={() => setShowAddress(true)}>
            <div className="border-4 border-[#A5B4FC] rounded-full h-[110px] w-[110px] mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 text-[#A5B4FC] mx-auto mt-5" viewBox="0 0 20 20" fill="currentColor">
            <path 
            d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
            </div>
            <h1 className="text-[30px] text-center font-medium text-[#2563EB]">Invite</h1>
            </div>
            <div>
            <div className="border-4 border-[#A5B4FC] rounded-full cursor-pointer h-[110px] w-[110px] mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 text-[#A5B4FC] mx-auto mt-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            </div>
            <h1 className="text-[30px] text-center font-medium text-[#2563EB]">Create group</h1>
            </div>
            </div>
        ) : (
            <div className="text-center">
            <h1 className="text-[40px] font-light">Enter Address</h1>
            <form onSubmit={submitHandler}>
            <input type="text" className="border-2 border-black w-full rounded-md mt-4 p-2" required onChange={(e) => setAddress(e.target.value)}/>
            <button type="submit" className="font-light text-[30px] bg-gradient-to-r from-red-500 to-pink-500 px-5 py-1 mt-5 rounded-lg text-white">
            Send request
            </button>
            </form>
            </div>
        )}
        </div>
        </Transition.Child>
        </div>
        </Dialog>
        </Transition.Root>
    );
}
