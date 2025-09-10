import { useEffect, useState } from 'react'
import { fetchData, addTasks, deleteTask } from '../Utils/ApiFetch.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
    async function deleteAll(event) {
        tasks.forEach(element => deleteTask(element.id))
        setTasks([]);
    }


    return (
        <>
            <div id='header'>
                <h1>To Do List - MJFY93</h1>
                <div id='inputContainer'>
                    <input type="text" placeholder='Add tasks here' onChange={changes} onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            newTask();
                        }
                    }} /><button onClick={newTask}>Add Tasks</button>
                </div>
                <button onClick={deleteAll} id='deleteButton'>Delete All</button>
            </div>

            <ul className="list-group  d-grid m-0 ">
                {tasks.map((element, index) => (
                    <li className="list-group-item d-flex justify-content-between m-0 border border-0 p-2" key={index} >
                        <input type="checkbox" /><span>{element.label}</span>
                        <button id={element.id} onClick={delTask}>X</button>
                    </li>
                ))}

            </ul>
        </>
    )
}

