import React, { useState, useEffect } from "react";
import { DeleteOutlined } from '@ant-design/icons';
import { Flex, Layout, Input, Button } from 'antd';

const { Header, Footer, Content } = Layout;
const { Search } = Input;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: "#ffffff"
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: "#ffffff"
};

const todoTextStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'start',
    lineHeight: '20px'
}

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: "#c9c9c9"
};

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
};

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
            <Flex gap="middle" wrap>
                <Layout style={layoutStyle}>
                    <Header style={headerStyle}>Todo List</Header>
                    <Content style={contentStyle}>
                        <div>
                            <Search
                                placeholder="input search text"
                                allowClear
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
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', minHeight: '45px' }} key={index}>
                                <span style={todoTextStyle}>{todo}</span>
                                <Button type="primary" danger icon={<DeleteOutlined />} size={'small'} onClick={() => handleDeleteTodo(index)} />
                            </div>
                        ))}
                        {/* <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={event => {
                                if (event.key === 'Enter') {
                                    handleAddTodo()
                                }
                            }}
                            placeholder="Enter a new todo"
                        /> */}
                        {/* <button onClick={handleAddTodo}>Add</button> */}
                    </Content>
                    <Footer style={footerStyle}><ul>
                        Footer
                    </ul></Footer>
                </Layout>
            </Flex>
        </div>
    );
}

export default TodoList;
