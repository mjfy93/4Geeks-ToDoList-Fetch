import { useState, useEffect } from "react";
import  "../App.css";

function ToDoFetch (){

    const [text, updateText] = useState("");
    const [listItems, updateListItems] = useState([]);
    const [load, setLoad] = useState(true);
    const user = "mjfy93";


    const getListItems = async ()=> {
        try{
            setLoad(true);
            let response = await fetch(`https://playground.4geeks.com/todo/users/${user}`)
            const info = await response.json();
            updateListItems(info.items || []);
        } catch (error){
            console.error("Oops! Can't get your tasks!", error);
        }
        )
    }
}