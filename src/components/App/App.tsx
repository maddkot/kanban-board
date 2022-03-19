import React from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import style from './App.scss';

const App = () => {    
    return (
        <div className={style.app}>
            <Header />
            <Footer />
        </div>
    )
}

export default App;