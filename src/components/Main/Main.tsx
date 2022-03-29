import React, { ReactEventHandler, useEffect, useState } from 'react';
import styles from './Main.scss';
import Board from '../Board/Board';


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


const Main: React.FC = () => {

    const [board, setBoard] = useState<any[]>([
        {
            id: 1, order: 1, title: 'First test', items: [
                { id: 1, order: 1, title: 'test task' }]
        },
    ]);
    
    const [currentBoard, setCurrentBoard] = useState<TBoard>();
    const [titleBoard, setTitleBoard] = useState('');
    

    const setCurrentBoardHandler = (item: TBoard) => {
        setCurrentBoard(item);
    }

    const sortBoard = (a: TBoard, b: TBoard) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    const changeOrder = (paramBoard: TBoard) => {
        
        let changeOrderArr = board.map((item) => {
            /* if (item.id === paramBoard.id) {                
                return { ...item, order: currentBoard?.order }
            }
            if (item.id === currentBoard?.id) {                
                return { ...item, order: paramBoard.order }
            }
            return item */
            switch (item.id) {
                case paramBoard.id:
                    return { ...item, order: currentBoard?.order }
                    break
                case currentBoard?.id:
                    return { ...item, order: paramBoard.order }
                    break
                default:
                    return item
            }
        }).sort(sortBoard);
        console.log(changeOrderArr, 'changeOrderArr'); 
        setBoard(changeOrderArr)
    }



    const handleChange = (event: React.FormEvent) => {
        const target = event.target as HTMLInputElement;
        setTitleBoard(target.value)  
    }

    const addBoard = (event: React.FormEvent) => {
        event.preventDefault()  
        const newBoard = {id: Math.random(), order: board.length + 1, title: titleBoard, items: []}
        setBoard(prev => [...prev, newBoard]);
        setTitleBoard('');
        
    }

    const deleteBoard = (id: number): void => {
        const newArr = board.filter((item) => item.id !== id);
        setBoard(newArr);
    }

    const addTaskOnBoard = (tasksArr: TTask[], titleTask: string, id: number) => { 
        console.log(tasksArr, titleTask, id);
        let newBoardAndTask = board.map((item: TBoard) => {
            if (item.id === id) {
                const newTask = { id: Math.random(), order: tasksArr.length + 1, title: titleTask };
                const newArrTask = [...tasksArr, newTask]
                return {...item, items: newArrTask}
            } else{ return item}
        })
        setBoard(newBoardAndTask);        
    }

    const deleteTask = () => {
        
    }

    useEffect(() => {
        console.log(board, 'board')
    }, [board])

    return (
        <>
            <form className={styles.сontrolPanel}>
                <input
                    className={styles.сontrolPanel__input}
                    placeholder='Введите название раздела'
                    type="text"
                    value={titleBoard}
                    onChange={handleChange}
                >                            
                </input>
                <button className={styles.сontrolPanel__button} name='addBoard' onClick={addBoard}>Добавить</button>
            </form>
            <section className={styles.boards}>           
                {
                    board.map((board: TBoard, index: React.Key) => (
                        <Board
                            key={board.id}
                            board={board}
                            deleteBoard={deleteBoard}
                            setCurrentBoardHandler={setCurrentBoardHandler}
                            changeOrder={changeOrder}                            
                            addTaskOnBoard={addTaskOnBoard}                            
                        />
                    ))
                }
            </section>        
        </>
    )
}

export default Main;