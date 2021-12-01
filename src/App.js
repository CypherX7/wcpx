import "./styles/output.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import React , {useState} from 'react';
import {HomeContext} from './MainContext';

function App() {
    const [Value,setValue] = useState({'Myname':'','Myaddrs':'','HomeState':true,'ChatState':'false','UserExist':false,'passx':'','acc':null,'pk':null});
    function renderpages(){
        if (Value.ChatState === true){return <Chat />} else {
            if (Value.HomeState){return <Home />} else {if (Value.UserExist){return <Login />} else {return <SignUp />}}
        };
    };

    return (
        <HomeContext.Provider value={{Value,setValue}}>
        {renderpages()}
        </HomeContext.Provider>
    );
};

export default App;
