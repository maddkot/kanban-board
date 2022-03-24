import React, { useState } from 'react';
import styles from './Main.scss';
import Board from '../Board/Board';

const Main: React.FC = () => {

    const [board, setBoard] = useState(
        [
            {
                id: 1,
                title: 'test'
            },
            {
                id: 2,
                title: 'test'
            },
            {
                id: 3,
                title: 'test'
            },
            {
                id: 4,
                title: 'test'
            },
            {
                id: 5,
                title: 'test'
            },
            

        ]
    );

    const addBoard = () => {
        
    }

    const deleteBoard = () => {

    }


    return (
        <>
            <form className={styles.сontrolPanel}>
                <input
                    className={styles.сontrolPanel__input}
                    placeholder='Введите название раздела'
                    type="text"
                >                            
                </input>
                <button className={styles.сontrolPanel__button} name='addBoard'>Добавить</button>
            </form>
            <section className={styles.boards}>           
                {
                    board.map((board) => (
                        <Board
                            key={board.id + Math.random()}
                            title={board.title}
                        />
                    ))
                }
            </section>        
        </>
    )
}

export default Main;