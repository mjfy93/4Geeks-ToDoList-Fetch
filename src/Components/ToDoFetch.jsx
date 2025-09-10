import { useEffect, useState } from 'react'
import { fetchData, addTasks, deleteTask } from '../Utils/ApiFetch.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export function ToDoFetch() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const fetched = await fetchData();
                setTasks(fetched.todos.reverse())
            } catch (error) {
                console.error("Error:", error)
            }
        }
        getData();
    }, []);

    function changes(event) {
        const newText = event.target.value;
        setText(newText);
    }
    async function newTask() {
        const updated = await addTasks(text);
        setTasks(prev => [updated, ...prev]);
    }
    async function delTask(event) {
        await deleteTask(event.target.id);
        setTasks(prev => prev.filter(element => element.id != event.target.id))
    }
    async function deleteAll(event){
        tasks.forEach(element => deleteTask(element.id))
        setTasks([]);
    }


    return (
        <>
            <h1>To Do List</h1>
            <input type="text" placeholder='Add tasks here' onChange={changes} onKeyDown={(e) => {
                if (e.key == "Enter") {
                    newTask();
                }
            }} />
            <div id='buttons'>
                <button onClick={newTask}>Add Tasks</button>
                <button onClick={deleteAll}>Delete All</button>
            </div>

            <ul>
                {tasks.map((element, index) => (
                    <li key={index}><input type="checkbox"/><span>{element.label}</span><button id={element.id} onClick={delTask}>X</button></li>
                ))}

            </ul>
        </>
    )
}

