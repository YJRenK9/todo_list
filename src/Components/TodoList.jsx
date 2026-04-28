import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [headingInput, setHeadingInput] = useState('');
  const [listInputs, setListInputs] = useState({});

  // listInputs: {0: 'input_item', 1: 'input_item2'} => for the todo list at index 0 (first todo list), the input value for adding a new item is 'input_item'

  function handleAddTodo() {
    // check if the input for the heading is not empty or just whitespace
    if (headingInput.trim() !== '') {
      // add a new todo list to the existing array of todos, with the heading from the input and an empty list for the inner items
      setTodos([...todos, { heading: headingInput, lists: [] }]);
      // reset the input field for the heading after adding the new todo list
      setHeadingInput('');
    }
  }

  // function to handle adding a new item to a specific todo list
  function handleAddList(index) {
    // check if the input for the given index is not empty or just whitespace (AND if the specific list exists)
    if (listInputs[index] && listInputs[index].trim() !== '') {
      // create a shallow copy of the current todos array
      const newTodos = [...todos];
      // add the new item from the input to the corresponding todo list 
      newTodos[index].lists.push(listInputs[index]);
      // update the list of todos with the new item added to the corresponding todo list (without this, it'll only affect the copy, not the original)
      setTodos(newTodos);
      // reset the input field (make input field empty) for the specific index after adding the new item to the corresponding todo list
      setListInputs({ ...listInputs, [index]: '' });
    }
  }

  // while the user is typing in the input field for adding a new item to a specific todo list, this function updates the corresponding value in the listInputs state for that specific index (which is used to keep track of the input values for each todo list's item input field)
  function handleListInputChange(index, value) {
    setListInputs({ ...listInputs, [index]: value });
    console.log(listInputs, [index], value);
  }

  // Removes a specific todo list in the list
  function handleDeleteTodo(index) {
    // create a shallow copy of the current todos array
    const newTodos = [...todos];
    // remove the todo list at the specified index
    newTodos.splice(index, 1);
    // update the inner todo list (without this, it'll only affect the copy, not the original)
    setTodos(newTodos);
  }

  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}
            onChange={(e) => { setHeadingInput(e.target.value); }}
          />
          <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
        </div>
      </div>
      <div className="todo_main">
        {todos.map((todo, index) => ( // iterate over each todo item in the todos array (doesn't display anything if todos is empty)
          <div key={index} className='todo-card'>
            <div className='heading_todo'>
              {/* display the heading text of the current todo item */}
              <h3>{todo.heading}</h3>
              {/* button to delete the current heading by passing its index */}
              <button className='delete-button-heading' onClick={() => handleDeleteTodo(index)}>Delete Heading</button>
            </div>
            <ul>
              {/* Iterate over each inner todo item in the inner todos array */}
              {todo.lists.map((list, listIndex) => (
                <li key={listIndex} className='todo_inside_list'>
                  {/* display each item from the inner todos list */}
                  <p>{list}</p>
                </li>
              ))}
            </ul>
            <div className='add_list'>
              {/* input field for adding a new item under a specific todo list */}
              <input 
                type="text"
                className="list-input"
                placeholder="Add List Item"
                value={listInputs[index] || ''} // ensures the input field is cleared after adding an item to the corresponding todo list (if listInputs[index] is undefined, it will use an empty string instead)
                onChange={(e) => handleListInputChange(index, e.target.value)} />
                {/* button to add the item to the corresponding todo list */}
                <button className='add-list-button' onClick={() => handleAddList(index)}>Add Item</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
