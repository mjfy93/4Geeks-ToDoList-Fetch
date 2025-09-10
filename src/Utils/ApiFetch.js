import { text } from "@fortawesome/fontawesome-svg-core";

const user = "mjfy93";
export const createUser = async () => {
    const response = await fetch(`https://playground.4geeks.com/todo/users/${user}`, {
        method: 'POST'
    })
    const data = await response.json();

    return data;
}

export const fetchData = async () => {
    const response = await fetch(`https://playground.4geeks.com/todo/users/${user}`)
    if (!response.ok) {
        return await createUser();
    } else {
        const data = await response.json();

        return data;
    }
}
export const addTasks = async (text) => {
    const response = await fetch(`https://playground.4geeks.com/todo/todos/${user}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ "label": text, "is_done": false })
    })
    const data = await response.json();
    return data;
}
export const deleteTask = async (id) => {
    await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json', accept: 'application/json' }
    })
}
export const deleteAll = async () => {
    await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json', accept: 'application/json' }
    })

}


