import React, {memo} from 'react';
import {Button, Card, message, Modal} from "antd";
import { EditOutlined,DeleteOutlined,ExclamationCircleFilled } from '@ant-design/icons';
import { IStudentProps } from "../types/types";
import {GroupReq, StudentReq} from "../utils/Requests";
import students from "./Students";
import {useNavigate} from "react-router-dom";

const { confirm } = Modal;

const CardStudent: React.FC<IStudentProps> = memo(({student}: IStudentProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure delete this student?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                const remStudent = await StudentReq.remove(student.id);
                if (remStudent !== null) {
                    messageApi.success("Student deleted successfully");
                }
                else {
                    return messageApi.error("You don`t have permissions!");
                }
                navigate(0);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <>
            {contextHolder}
            <Card
                title={student.name}
                style={{width: "100%", marginBottom:"1em"}}
                bordered={false}
                hoverable={true}
                actions={[
                    <EditOutlined key="edit" onClick={() => {navigate("edit?id=" + student.id)}}/>,
                    <DeleteOutlined key="delete" onClick={showDeleteConfirm}/>
                ]}
            >
                <p><b>Id</b> {student.id}</p>
                <p><b>Group</b> {student.group?.name}</p>
            </Card>
        </>
    );
});

export default CardStudent;