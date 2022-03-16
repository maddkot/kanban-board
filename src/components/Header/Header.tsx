import React, { useState } from "react";
import styles from './Header.css';
 
export const Header = () => {    
    const [date, setDate] = useState('');

    setInterval(() => {
        const date = new Date().toLocaleString();
        setDate(date);        
    }, 1000);

    return (
        <div>
            <div className={styles.app}>
                <h1>Kanban</h1>
                <p>Simple and convenient</p>
            </div>
            <p>{date}</p>        
        </div>
    )
}