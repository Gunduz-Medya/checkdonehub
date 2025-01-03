import { FieldTimeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface TodoItemProps {
    todo: [string, string];
    onDelete: () => void;
    getTimeStatus: (date: string) => string;
}

function TodoItem({ todo, onDelete, getTimeStatus }: TodoItemProps) {
    return (
        <div className="todoListItem">
            <FieldTimeOutlined 
                className="todoListItemIcon" 
                style={{ color: getTimeStatus(todo[1]) }}
            />
            <div className="todoListItemContainer">
                <span className="todoText">{todo[0]}</span>
                <span className="todoDate">{todo[1]}</span>
            </div>
            <Button 
                className="todoDeleteButton" 
                type="primary" 
                danger 
                icon={<DeleteOutlined />} 
                size={'small'} 
                onClick={onDelete} 
            />
        </div>
    );
}

export default TodoItem; 