import React, { useState } from 'react';
import Task from '../Task/Task';
import styles from './Board.scss';



type TTask = {
    id: number,
    order: number
    title: string,
}

type TBoard = {
    id: number,
    order: number,
    title: string,
    items: TTask[]
}

type TBoardComponent = {
    board: TBoard,
    deleteBoard(id: number): void,
    setCurrentBoardHandler(item: TBoard): void,
    changeOrder(paramBoard: TBoard): void,    
    addTaskOnBoard: (items: TTask[], titleTask: string, id: number) => void,
    
}

const Board: React.FC<TBoardComponent> = ({ board, deleteBoard, setCurrentBoardHandler, changeOrder, addTaskOnBoard }) => {
    const {id, title, items } = board;

    const [titleTask, setTitleTask] = useState('');

    
    const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleTask(event.target.value);        
    }

    const addTaskHandler = () => {
        console.log(id, 'addTaskHandler ID')
        addTaskOnBoard(items, titleTask, id);
        setTitleTask('');
    }

    const dragStartHandlerBoard = (event: React.DragEvent<HTMLElement>, board: TBoard) => {
        console.log(board, 'dragStart');
        setCurrentBoardHandler(board);
    }

    const dragLeaveHandlerBoard = (event: React.DragEvent<HTMLElement>) => {
        
    }

    const dragEndHandlerBoard = (event: React.DragEvent<HTMLElement>) => {
        //const target = event.target as HTMLElement;
        //target.parentElement?.classList.remove('dragBackground');      
        
    }

    const dragOverHandlerBoard = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        //const target = event.target as HTMLElement
       //target.parentElement?.classList.add('dragBackground');       
    }

    const dropHandlerBoard = (event: React.DragEvent<HTMLElement>, board: TBoard) => {
        event.preventDefault();
        changeOrder(board);
    }

    return (
        <section
            className={styles.board}
            draggable={true}
            onDragStart={event => dragStartHandlerBoard(event, board) }
            onDragLeave={event => dragLeaveHandlerBoard(event) }
            onDragEnd={event => dragEndHandlerBoard(event) }
            onDragOver={event => dragOverHandlerBoard(event) }            
            onDrop={ event => dropHandlerBoard(event, board)}            
        >
            <button className={styles.board__delete} onClick={()=> deleteBoard(id)}>+</button>
            <h1>{title }</h1>
            <div className={styles.board__section}>
                {
                    items.map(item => ( 
                        <Task
                            key={item.id}
                            item={item}                            
                        />
                    ))                    
                }
            </div>
            <div className={ styles.board__addBox}>
                <input value={titleTask } onChange={handleChangeTask } className={ styles.board__addBox__input} type="text" placeholder='Введите задачу'/>
                <button className={ styles.board__addBox__button} onClick={addTaskHandler}>Добавить задачу</button>
            </div>
        </section>
    )
}

export default Board

