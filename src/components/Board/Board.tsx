import React, { SetStateAction, useEffect, useState } from 'react';
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
    deleteTask: (task: TTask, idBoard: number) => void,
    changeTask: (/* item: TTask, */ idBoard: number) => void,
    setIdboardAndTaskHandler: (idBoard: number, item: TTask) => void,
}

const Board: React.FC<TBoardComponent> = ({ board, deleteBoard, setCurrentBoardHandler, changeOrder, addTaskOnBoard, deleteTask, changeTask, setIdboardAndTaskHandler }) => {
    const {id, title, items } = board;

    const [titleTask, setTitleTask] = useState('');
    const [stateDisabled, setStateDisabled] = useState<boolean>(true);
    const [dragConturStyle, setDragConturStyle] = useState(null);
    

    
    const handleChangeTaskTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleTask(event.target.value);         
    }

    const addTaskHandler = () => {        
        addTaskOnBoard(items, titleTask, id);
        setTitleTask('');
        setStateDisabled(true);
    }

    useEffect(() => {
        if (titleTask.length >= 1) {
            setStateDisabled(false);
        } else { setStateDisabled(true) }
    }, [titleTask]);

    const dragStartHandlerBoard = (event: React.DragEvent<HTMLElement>, board: TBoard) => {
        setCurrentBoardHandler(board);
        setDragConturStyle(styles.dragBackground);
    }

    const dragLeaveHandlerBoard = (event: React.DragEvent<HTMLElement>) => {
        setDragConturStyle(null)
    }

    const dragEndHandlerBoard = (event: React.DragEvent<HTMLElement>) => {
        //const target = event.target as HTMLElement;
        //target.parentElement?.classList.remove('dragBackground');      
        setDragConturStyle(null)
    }

    const dragOverHandlerBoard = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        setDragConturStyle(styles.dragBackground);
        //const target = event.target as HTMLElement
       //target.parentElement?.classList.add('dragBackground');       
    }

    const dropHandlerBoard = (event: React.DragEvent<HTMLElement>, board: TBoard) => {
        event.preventDefault();        
        changeOrder(board);
        setDragConturStyle(null)
    }


    //------------------------------

    const dragOverHandlerTask = (event: React.DragEvent<HTMLElement>, ) => {
        event.preventDefault();        
    }

    const dropHandlerTask = (event: React.DragEvent<HTMLElement>, id: number) => {
        changeTask(id);
        //event.currentTarget.style.boxShadow = 'none';       
    }


    return (
        <div className={styles.board}>
            <button className={styles.board__delete} onClick={()=> deleteBoard(id)}>+</button>
            <h1 className={`${styles.board__title} ${dragConturStyle}`}
                draggable={true}
                onDragStart={event => dragStartHandlerBoard(event, board) }
                onDragLeave={event => dragLeaveHandlerBoard(event) }
                onDragEnd={event => dragEndHandlerBoard(event) }
                onDragOver={event => dragOverHandlerBoard(event) }            
                onDrop={ event => dropHandlerBoard(event, board)}
            >{title}</h1>
            <div className={styles.board__section}
                draggable={true}
                onDragOver={event => dragOverHandlerTask(event ) }            
                onDrop={ event => dropHandlerTask(event, id)}
            >
                {
                    items.map(item => (
                            <Task                                
                                key={item.id}
                                item={item}
                                deleteTask={deleteTask}
                                idBoard={id}
                                changeTask={changeTask}
                                setIdboardAndTaskHandler={setIdboardAndTaskHandler}
                            />                       
                    ))                    
                }
            </div>
            <div className={ styles.board__addBox}>
                <input value={titleTask } onChange={handleChangeTaskTitle } className={ styles.board__addBox__input} type="text" placeholder='Введите задачу'/>
                <button disabled={ stateDisabled} className={ styles.board__addBox__button} onClick={addTaskHandler}>Добавить задачу</button>
            </div>
        </div>
    )
}

export default Board

