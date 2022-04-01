import React, { useState } from "react";
import styles from './Header.css';
 
export const Header = () => {    
    const [date, setDate] = useState('');

    setInterval(() => {
        const date = new Date().toLocaleString();
        setDate(date);        
    }, 1000);

    return (
        <header className={styles.app}>
            <div className={styles.app__header}>
                <h1>Kanban board</h1>
                <p className={styles.app__subtitle}>Simple and convenient</p>
            </div>
            <p className={styles.app__date}>{date}</p>        
        </header>
    )
}