import { ethers } from "ethers";
import AES from "crypto-js/aes";
import * as IPFS from "ipfs-core";
import { useState , useContext } from "react";
import {onlychars} from "../data/imp";
import ReactTooltip from "react-tooltip";
import {HomeContext} from "../MainContext";

export default function SignUp(){
    ethers.getDefaultProvider("https://speedy-nodes-nyc.moralis.io/3dbe4cc65440492d5827d724/polygon/mumbai/archive");
    const {Value , setValue} = useContext(HomeContext);
    const [data, setData] = useState({address:Value.Myaddrs,username: "",password: "",rePassword: "",sphr:""});

    async function run(){
        const ipfs = await IPFS.create({repo:'ipfs-'+Math.random()});
        const wallet = ethers.Wallet.createRandom();

        var enkey = "xHAHAITWORKS";for (let i = 0; i < 2560; i++) {enkey += Math.random().toString(36).slice(2)};
        var radmc = "xHAHAITWORKS";for (let i = 0; i < 256; i++) {radmc += Math.random().toString(36).slice(2)};

        var pfdata = AES.encrypt(JSON.stringify({
            'APX':'TRUEWCPWL','address':data.address,'username':data.username,'msgacc':wallet.address,'msgpk':wallet.privateKey,'chatdata':[],
            'bio':'','pfp':''}),enkey).toString();

        var ipfshash = (await ipfs.add(pfdata)).cid.toString();

        var encryptdata = AES.encrypt(enkey+";"+ipfshash,data.password+((data.sphr).replace(/\s/g,''))+radmc);
        radmc = AES.encrypt(radmc,data.password+((data.sphr).replace(/\s/g,''))).toString()
        localStorage.setItem('RANDOMCHARS',radmc);
        localStorage.setItem('DATA',encryptdata);
        localStorage.setItem('USEREXIST','TRUE');
        setValue({...Value,Myname:data.username,UserExist:true})
    }

    const tooltippass = "Min length 8.Only special chars like !@#$%^&*+=-_.,~ allowed.";
    const tooltipsphr = "Create a unique Sentence minimum of 5 that you can remember.";
    
    const submitHandler = (e) => { 

        e.preventDefault();
        if (data.password !== data.rePassword) {
            alert("Passowrd doesn't match.");
        } else if ((data.password).length < 8 || (data.password).length > 101 || ([...(data.password)]).every(val => onlychars.includes(val)) === false){
            alert("Invalid Passowrd");
        } else if (((data.sphr).split(" ")).length < 5 || ((data.sphr).split(" ")).length > 15){
            alert("Invalid Secret Phrase");
        } else {
            run();
        }
    };

    return (
        <div className="bg-[#00000080] min-h-screen py-16">
        <ReactTooltip effect="solid" place="right" html={true} />
        <div className="bg-white rounded-[30px] md:w-[650px] lg:w-[850px] mx-auto py-8 px-12">
        <h1 className="text-[60px] leading-[75px] font-light text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-pink-500">
        Sign Up.
        </h1>
        <form onSubmit={submitHandler}>
        <h1 className="md:text-[20px] lg:text-[25px] font-light mb-2">Address</h1>
        <input type="text" value={data.address} readOnly
        className="border-2 text-center bg-blue-100 font-black border-[#000000] rounded-[5px] w-[100%] h-[40px] address-color text-xl"/>
        <div className="grid gap-12 mt-5">
        <div>
        <h1 className="md:text-[20px] lg:text-[25px] font-light mb-2">Display Name</h1>
        <input type="text" required className="border-2 border-[#000000] px-2 rounded-[5px] w-[100%] h-[40px] text-xl focus:outline-none"
        onChange={(e) => setData({ ...data, username: e.target.value})}/>
        </div>
        </div>
        <div className="grid grid-cols-2 gap-12 mt-5">
        <div>
        <h1 className="md:text-[20px] lg:text-[25px] font-light mb-2">
        Password{" "}<span className="text-red-500" data-tip={tooltippass}>&#9432;</span>
        </h1>
        <input type="password" required className="border-2 border-[#000000] px-2 rounded-[5px] w-[100%] h-[40px] text-xl focus:outline-none"
        onChange={(e) => setData({ ...data, password: e.target.value})}/>
        </div>
        <div>
        <h1 className="md:text-[20px] lg:text-[25px] font-light mb-2">Re-enter Password</h1>
        <input type="password" required className="border-2 border-[#000000] px-2 rounded-[5px] w-[100%] h-[40px] text-xl focus:outline-none"
        onChange={(e) => setData({ ...data, rePassword: e.target.value})}/>
        </div>
        </div>
        <h1 className="md:text-[20px] lg:text-[25px] font-light mb-2 mt-5">
        Secret Phrase{" "}<span className="text-red-500" data-tip={tooltipsphr}>&#9432;</span>
        </h1>
        <input type="text" required className="border-2 border-[#000000] px-2 rounded-[5px] w-[100%] h-[40px] text-xl focus:outline-none"
        onChange={(e) => setData({ ...data, sphr: e.target.value})}/>
        <div className="text-center">
        <button type="submit" className="text-white font-light text-[36px] bg-lbBg rounded-[10px] w-[280px] h-[70px] mt-8">Create Account</button>
        </div>
        </form>
        </div>
        </div>
    );
};
