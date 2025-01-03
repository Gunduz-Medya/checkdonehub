import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface DeleteAllButtonProps {
    onDeleteAll: () => void;
}

function DeleteAllButton({ onDeleteAll }: DeleteAllButtonProps) {
    return (
        <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />}
            onClick={onDeleteAll}
            style={{ 
                marginLeft: '15px',
                marginRight: '15px',
                marginTop: '5px',
                marginBottom: '15px',
                boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.15), 0 1px 9px 0 rgba(0, 0, 0, 0.15)',
                borderRadius: '10px',
                width: 'calc(100% - 30px)'
            }}
        >
            Delete All Todos
        </Button>
    );
}

export default DeleteAllButton; 