import { useState } from 'react'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export function ToDoList() {

    let [text, updateText] = useState("");
    let [listItems, updateListItems] = useState([
        {
            name: "Item 1 (Delete Me)"
        }
    ]);

    function change(event) {
        let newInput = event.target.value;
        updateText(newInput);
    }
    function addListItem() {
        if (text === "") return;
        let item = {
            name: text,

        };
        let clone = [...listItems];
        clone.push(item);
        updateListItems(clone);
        updateText("");
    }
    function eraseItem(itemToDelete) {
        for (let index = 0; index < listItems.length; index++) {
            if (listItems[index].name === itemToDelete) {
                let clone = [...listItems];
                clone.splice(index, 1);
                updateListItems(clone);
            }
        }
    }
    function eraseAll(itemsToDelete) {
        let clone = [...listItems];
        itemsToDelete = clone.splice(0, listItems.length);
        updateListItems(clone);
    }






    return (
        <>
            <h1>To Do List</h1>
            <input type="text" value={text} onChange={change} onKeyDown={(e) => {
                if (e.key == "Enter") {
                    addListItem();
                }
            }} />
            <button onClick={addListItem}>Add</button>
            <button onClick={eraseAll}>Erase All</button>
            <ol>
                {listItems.map((item) => (
                    <div id='listItems' >
                        <li>
                            {item.name}
                            <button onClick={() => eraseItem(item.name)}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </li>
                    </div>
                ))}

            </ol>
        </>
    )
}