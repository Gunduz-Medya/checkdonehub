import { useState, useEffect } from "react";
import { CheckCircleOutlined } from '@ant-design/icons';
import { Flex, Layout, Input } from 'antd';
import EmptyList from "./EmptyList";
import TodoItem from "./components/TodoItem";
import DeleteAllButton from "./components/DeleteAllButton";

const { Header, Content } = Layout;
const { Search } = Input;

function TodoList() {
    const [todos, setTodos] = useState<[string, string][]>(() => {
        const storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    });
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== "") {
            const todoDate = new Date().toLocaleString();
            setTodos([[inputValue, todoDate], ...todos]);
            setInputValue("");
        }
    };

    const handleDeleteTodo = (index: number) => {
        setTodos(todos.filter((_: [string, string], i: number) => i !== index));
    };

    const handleDeleteAllTodos = () => {
        setTodos([]);
    };

    const getTimeStatus = (todoDate: string) => {
        const now = new Date();
        const todoDateTime = new Date(todoDate);
        const diffInHours = (now.getTime() - todoDateTime.getTime()) / (1000 * 60 * 60);

        if (diffInHours <= 24) {
            return "#1add19";
        } else if (diffInHours <= 48) {
            return "#ffa500";
        } else {
            return "#ff4d4f";
        }
    };

    return (
        <div>
            <Flex gap="middle" wrap>
                <Layout className="todoLayout">
                    <Header className="todoHeader">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span>Check Done Hub <CheckCircleOutlined /></span>
                        </div>
                    </Header>
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
                        {todos.length ? todos.map((todo: [string, string], index: number) => (
                            <TodoItem
                                key={index}
                                todo={todo}
                                onDelete={() => handleDeleteTodo(index)}
                                getTimeStatus={getTimeStatus}
                            />
                        )) : <EmptyList />}
                        
                        {todos.length >= 3 && (
                            <DeleteAllButton onDeleteAll={handleDeleteAllTodos} />
                        )}
                    </Content>
                </Layout>
            </Flex>
        </div>
    );
}

export default TodoList;
