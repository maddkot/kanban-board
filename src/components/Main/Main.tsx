import React, { ReactEventHandler, useEffect, useState } from 'react';
import styles from './Main.scss';
import Board from '../Board/Board';


type TTask = {
    id: number,
    order: number,
    title: string,
}

type TBoard = {
    id: number,
    order: number,
    title: string,
    items: TTask[]
}



const Main: React.FC = () => {

    const [board, setBoard] = useState<any[]>([]);
    
    const [currentBoard, setCurrentBoard] = useState<TBoard>();
    const [titleBoard, setTitleBoard] = useState('');
    const [startBoardId, setStartBoardId] = useState<number>();
    const [startTask, setStartTask] = useState<TTask>();


    const setCurrentBoardHandler = (item: TBoard) => {
        setCurrentBoard(item);
    }

    const setIdboardAndTaskHandler = (idBoard: number, item: TTask) => {
        setStartBoardId(idBoard);
        setStartTask(item);
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
            switch (item.id) {
                case paramBoard.id:
                    return { ...item, order: currentBoard!.order }
                    break
                case currentBoard!.id:
                    return { ...item, order: paramBoard.order }
                    break
                default:
                    return item
            }
        }).sort(sortBoard);         
        setBoard(changeOrderArr)
    }

    const changeTask = (/* itemTaskDrop: TTask, */ idBoardDrop:number) => {
        console.log(/* itemTaskDrop, */ idBoardDrop, startBoardId, startTask, 'changeTask');
        
        let newBoard = board.map((item: TBoard) => {
            
            if (item.id !== idBoardDrop && item.id === startBoardId) {
                console.log('доска не вернулась');

                const deleteTaskArr = item.items.filter((item) => {
                    return item.id !== startTask!.id
                });
                return { ...item, items: deleteTaskArr }
            }
            if (item.id === idBoardDrop && item.id !== startBoardId) {
                const newArrAdd = [...item.items, startTask];
                console.log(newArrAdd, 'newArrAdd')
                return {...item, items: newArrAdd}
            }
            if (item.items.length === 0 && item.id === idBoardDrop) {
                const newArr = [...item.items, startTask];
                return {...item, items: newArr}
            }
            else return item;
        })  
        console.log(newBoard, 'newBoard');
        setBoard(newBoard);
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

    const deleteTask = (task: TTask, idBoard: number) => {
        console.log(task, idBoard);
        let newBoardRemoveTask = board.map((board: TBoard) => {
            if (board.id === idBoard) {
                const filterTasks = board.items.filter((item) => {
                    return item.id !== task.id
                })
                return {...board, items: filterTasks}
            } else {return board}
        })        
        setBoard(newBoardRemoveTask);
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
                            deleteTask={deleteTask}
                            changeTask={changeTask}
                            setIdboardAndTaskHandler={setIdboardAndTaskHandler}                            
                        />
                    ))
                }
            </section>        
        </>
    )
}

export default Main;