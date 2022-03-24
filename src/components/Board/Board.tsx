import React from 'react';
import styles from './Board.scss';

type TBoard = {
    title: string
}

const Board: React.FC<TBoard> = ({title}) => {
    return (
        <section className={styles.card}>
            <button className={styles.card__delete}>+</button>
            <h1>{title }</h1>
            <div className={styles.card__section}>
                <p>test</p>
                <p>test</p>                
            </div>
            <button className={styles.card__add}>Добавить задачу</button>
        </section>
    )
}

export default Board