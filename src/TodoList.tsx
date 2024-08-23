import { useState, useEffect } from "react";
import { DeleteOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Flex, Layout, Input, Button } from 'antd';

const { Header, Content } = Layout;
const { Search } = Input;

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
            const todoDate = new Date().toLocaleString( );
            
            setTodos([[inputValue, todoDate], ...todos]);
            setInputValue("");
        }
    };

    const handleDeleteTodo = (index: any) => {
        setTodos(todos.filter((_: any, todo: any) => todo !== index));
    };

    return (
        <div>
            <Flex gap="middle" wrap>
                <Layout className="todoLayout">
                    <Header className="todoHeader">Todo List</Header>
                    <Content className="todoContent">
                        <div className="todoInputText">
                            <Search
                                placeholder="What will you do?"
                                enterButton="Add"
                                onSearch={handleAddTodo}
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={event => {
                                    if (event.key === 'Enter') {
                                        handleAddTodo()
                                    }
                                }}
                            />
                        </div>
                        {todos.map((todo: any, index: any) => (
                            <div className="todoListItem" key={index}>
                                <FieldTimeOutlined className="todoListItemIcon" />
                                <div className="todoListItemContainer">
                                    <span className="todoText">{todo[0]}</span>
                                    <span className="todoDate">{todo[1]}</span>
                                </div>
                                <Button className="todoDeleteButton" type="primary" danger icon={<DeleteOutlined />} size={'small'} onClick={() => handleDeleteTodo(index)} />
                            </div>
                        ))}
                    </Content>
                </Layout>
            </Flex>
        </div>
    );
}

export default TodoList;
