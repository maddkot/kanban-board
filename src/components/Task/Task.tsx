import React, { useEffect, useState } from 'react';
import styles from './Task.scss';

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

type TTaskComponent = {
    item: TTask,
    deleteTask: (task: TTask, idBoard: number) => void,
    idBoard: number,
    changeTask: (/* item: TTask, */ idBoard: number) => void,
    setIdboardAndTaskHandler:(idBoard: number, item: TTask) =>void
}

const Task: React.FC<TTaskComponent> = ({ item, deleteTask, idBoard, changeTask, setIdboardAndTaskHandler }) => {
    
    const { title } = item;    

    const dragStartHandlerTask = (event: React.DragEvent<HTMLElement>, idBoard: number) => {        
        setIdboardAndTaskHandler(idBoard, item);
    }

    const dragLeaveHandlerTask = (event: React.DragEvent<HTMLElement>) => {
        event.currentTarget.style.boxShadow = 'none';
    }

    const dragEndHandlerTask = (event: React.DragEvent<HTMLElement>) => {
        event.currentTarget.style.boxShadow = 'none';
    }

    const dragOverHandlerTask = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();        
        if (event.currentTarget.className.includes('task')) {            
            event.currentTarget.style.boxShadow = '0 2px 3px gray';
        }
    }
    
/*     const dropHandlerTask = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();        
        changeTask(item, idBoard)
    } */

    const deleteTaskHandler = () => {
        deleteTask(item, idBoard);
    }

    return (
        <div className={styles.task}
                draggable={true}
                onDragStart={event => dragStartHandlerTask(event, idBoard) }
                onDragLeave={event => dragLeaveHandlerTask(event) }
                onDragEnd={event => dragEndHandlerTask(event) }
                onDragOver={event => dragOverHandlerTask(event) }            
                //onDrop={ event => dropHandlerTask(event)}
        >
            <p className={styles.task__title}>{ title}</p>
            <button className={styles.task__button} onClick={deleteTaskHandler}>x</button>
        </div>
    )
}


export default Task;