import React from 'react';
import styles from './Task.scss';

type TTask = {
    id: number,
    title: string
}

type TBoard = {
    id: number,
    order: number,
    title: string,
    items: TTask[]
}

type TTaskComponent = {
    item: TTask,    
}

const Task: React.FC<TTaskComponent> = ({ item }) => {
    
    const { title } = item;
    

    const dragStartHandlerTask = (event: React.DragEvent<HTMLElement>) => {
        
    }

    const dragLeaveHandlerTask = (event: React.DragEvent<HTMLElement>) => {
        
    }

    const dragEndHandlerTask = (event: React.DragEvent<HTMLElement>) => {
        
    }

    const dragOverHandlerTask = (event: React.DragEvent<HTMLElement>) => {
        
    }
    
    const dropHandlerTask = (event: React.DragEvent<HTMLElement>) => {
        
    }

    const deleteTaskHandler = () => {
        console.log(item)
    }

    return (
        <div className={styles.task}
                draggable={true}
                onDragStart={event => dragStartHandlerTask(event) }
                onDragLeave={event => dragLeaveHandlerTask(event) }
                onDragEnd={event => dragEndHandlerTask(event) }
                onDragOver={event => dragOverHandlerTask(event) }            
                onDrop={ event => dropHandlerTask(event)}
        >
            <p className={styles.task__title}>{ title}</p>
            <button className={styles.task__button} onClick={deleteTaskHandler}>x</button>
        </div>
    )
}


export default Task;