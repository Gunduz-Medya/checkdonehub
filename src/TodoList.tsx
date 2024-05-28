import React, { useState, useEffect } from "react";

function TodoList() {
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    });
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== "") {
            setTodos([...todos, inputValue]);
            setInputValue("");
        }
    };

    const handleDeleteTodo = (index: any) => {
        setTodos(todos.filter((_: any, i: any) => i !== index));
    };

    return (
        <div>
            <h2>Todo List</h2>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={event => {
                    if(event.key === 'Enter') {
                        handleAddTodo()
                    }
                }}
                placeholder="Enter a new todo"
            />
            <button onClick={handleAddTodo}>Add</button>
            <ul>
                {todos.map((todo: any, index: any) => (
                    <li key={index}>
                        {todo}
                        <button onClick={() => handleDeleteTodo(index)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
