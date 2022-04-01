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
    const [stateDisabled, setStateDisabled] = useState<boolean>(true);

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
                case currentBoard!.id:
                    return { ...item, order: paramBoard.order }                    
                default:
                    return item
            }
        }).sort(sortBoard);         
        setBoard(changeOrderArr);
        localStorage.setItem('boards', JSON.stringify(changeOrderArr))
    }

    const changeTask = (/* itemTaskDrop: TTask, */ idBoardDrop:number) => {
        console.log(/* itemTaskDrop, */ idBoardDrop, startBoardId, startTask, 'changeTask');
        
        if (idBoardDrop !== undefined && startBoardId !== undefined && startTask !== undefined ) {
            let newBoard = board.map((item: TBoard) => {
               
                if (item.id !== idBoardDrop && item.id === startBoardId) {
                    console.log('first if')
                    const deleteTaskArr = item.items.filter((item) => {
                        return item.id !== startTask.id
                    });
                    return { ...item, items: deleteTaskArr }
                }
                if (item.id === idBoardDrop && item.id !== startBoardId) {
                    console.log('second if')
                    const newArrAdd = [...item.items, startTask];
                    console.log(newArrAdd, 'newArrAdd')
                    return { ...item, items: newArrAdd }
                }
                /* if (item.items.length === 0 && item.id !== idBoardDrop) {
                    const newArr = [...item.items, startTask];
                    return {...item, items: newArr}
                } */
                else {
                    console.log('if else')
                    return item;
                }
            });  
            setBoard(newBoard);
            localStorage.setItem('boards', JSON.stringify(newBoard))
        }
    }

    const handleChange = (event: React.FormEvent) => {
        const target = event.target as HTMLInputElement;
        setTitleBoard(target.value)
 
    }

    const addBoard = (event: React.FormEvent) => {
        event.preventDefault()  
        const newBoard = {id: Math.random(), order: board.length + 1, title: titleBoard, items: []}
        const test = [...board, newBoard];
        setBoard(test);
        localStorage.setItem('boards', JSON.stringify(test))
        setTitleBoard('');
        setStateDisabled(true);
        
    }

    const deleteBoard = (id: number): void => {
        const newArr = board.filter((item) => item.id !== id);
        setBoard(newArr);
        localStorage.setItem('boards', JSON.stringify(newArr))
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
        localStorage.setItem('boards', JSON.stringify(newBoardAndTask))
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
        localStorage.setItem('boards', JSON.stringify(newBoardRemoveTask))
    }

    useEffect(() => {
        if (localStorage.getItem('boards') !== null) {
            const boards = localStorage.getItem('boards');
            setBoard(JSON.parse(boards!))
            console.log(JSON.parse(boards!), 'testlocal')
        }        
    }, [])

    useEffect(() => {
        if (titleBoard.length >= 1 && titleBoard.length !== 0) {
            setStateDisabled(false);
        } else {setStateDisabled(true)}
    }, [titleBoard])

    const marginFooter = board.length <= 0 ? `${styles.paddingFooter}` : '';

    return (
        <>
            <form className={styles.сontrolPanel}>
                <input
                    className={styles.сontrolPanel__input}
                    placeholder='Введите название раздела'
                    type="text"
                    autoComplete="off"                    
                    value={titleBoard}
                    onChange={handleChange}
                >                            
                </input>
                <button disabled={ stateDisabled} className={styles.сontrolPanel__button} name='addBoard' onClick={addBoard}>Добавить</button>
            </form>
            <section className={`${styles.boards} ${marginFooter}`}>           
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