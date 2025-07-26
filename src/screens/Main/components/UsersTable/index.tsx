import type { ColumnsType } from 'antd/es/table'
import { IUser } from 'types/global'
import styles from 'screens/Main/main.module.css'
import { Button, Popconfirm, Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

interface IProps {
    dataSource: Omit<IUser, 'password'>[],
    handleEdit: (id: string) => void,
    handleDelete: (id: string) => void,
    className?: string,
}
const UsersTable = (props: IProps) => {
    const columns: ColumnsType<Omit<IUser, 'password'>> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 150,
            render: (id:string) => <span className={styles.idCell}>{id}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 200,
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            width: 150,
        },
        {
            title: 'Фамилия',
            dataIndex: 'surName',
            key: 'surName',
            width: 150,
        },
        {
            title: 'Телефон',
            dataIndex: 'telephone',
            key: 'telephone',
            width: 150,
        },
        {
            title: 'Занятость',
            dataIndex: 'employment',
            key: 'employment',
            width: 150,
            render: (employment) => {
                const employmentMap: Record<string, string> = {
                    'Full-time': 'Постоянная занятость',
                    'Part-time': 'Частичная занятость',
                    'Self-employed': 'Самозанятый',
                    'Unemployed': 'Неполная занятость',
                }
                return employmentMap[employment] || employment
            },
        },
        {
            title: 'Действия',
            key: 'actions',
            width: 150,
            align: 'center',
            render: (_, record) => (
                <div className={styles.actionsCell}>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() =>props.handleEdit(record.id)}
                        aria-label="Редактировать"
                    />
                    <Popconfirm
                        title="Вы уверены, что хотите удалить этого пользователя?"
                        onConfirm={() => props.handleDelete(record.id)}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            aria-label="Удалить"
                        />
                    </Popconfirm>
                </div>
            ),
        }
    ]
    return (
            <Table
                dataSource={props.dataSource}
                columns={columns}
                rowKey="id"
                bordered
                size="middle"
                scroll={{ x: 'max-content' }}
                className={props.className}
            />
    )
}

export default UsersTable