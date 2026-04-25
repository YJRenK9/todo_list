import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [headingInput, setHeadingInput] = useState('');
  const [listInputs, setListInputs] = useState({});

  function handleAddTodo() {
    if (headingInput.trim() !== '') {
      setTodos([...todos, { heading: headingInput, lists: [] }]);
      setHeadingInput('');
    }
  }

  // function to handle adding a new item to a specific todo list
  function handleAddList(index) {
    // check if the input for the given index is not empty or just whitespace (AND if the specific list exists)
    if (listInputs[index] && listInputs[index]) {
      const newTodos = [...todos];
      newTodos[index].lists.push(listInputs[index]);
      setTodos(newTodos);
      setListInputs({ ...listInputs, [index]: '' });
    }
  }

  // ???
  function handleListInputChange(index, value) {
    setListInputs({ ...listInputs, [index]: value });
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
        {todos.map((todo, index) => ( // iterate over each todo item in the todos array
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
                placeholder="Add List"
                value={listInputs[index] || ''} 
                onChange={(e) => handleListInputChange(index, e.target.value)} />
                {/* button to add the item to the corresponding todo list */}
                <button className='add-list-button' onClick={() => handleAddList(index)}>Add List?</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
