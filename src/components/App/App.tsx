import React from "react";
import { Header } from "../Header/Header";
import style from './App.scss';

const App = () => {    
    return (
        <div className={style.app}>
            <Header/>
        </div>
    )
}

export default App;