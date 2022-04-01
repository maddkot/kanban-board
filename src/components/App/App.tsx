import React from "react";
import style from './App.scss';
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";

const App = () => {    
    return (
        <div className={style.app}>
            <Header />
            <Main />
            <Footer />
        </div>
    )
}

export default App;