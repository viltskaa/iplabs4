import React, {memo} from 'react';
import {IGroupProps} from "../types/types";
import {Badge, Button, Card, Collapse, Divider, List, message, Modal} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleFilled} from "@ant-design/icons";
import {GroupReq, StudentReq} from "../utils/Requests";
import {useNavigate} from "react-router-dom";

const { confirm } = Modal;
const { Panel } = Collapse;

const CardGroup: React.FC<IGroupProps> = memo(({group} : IGroupProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure delete this group?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                const remGroup = await GroupReq.remove(group.id);
                if (remGroup !== null) {
                    messageApi.success("Group deleted successfully");
                }
                else {
                    messageApi.error("Error");
                }
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
                title={group.name}
                style={{width: "100%", marginBottom:"1em"}}
                bordered={false}
                hoverable={true}
                actions={[
                    <Button type="link" onClick={() => {navigate("edit?id="+group.id)}}>
                        <EditOutlined key="edit"/>
                    </Button>,
                    <DeleteOutlined key="delete" onClick={showDeleteConfirm}/>
                ]}
            >
                <Collapse>
                    <Panel key={1} header="Students">
                        <List
                            size="small"
                            dataSource={group.students}
                            renderItem={(item, index) => (
                                <List.Item>
                                    {index+1}. {item.name}
                                </List.Item>)}
                        />
                    </Panel>
                </Collapse>
                <Divider/>
                <Collapse>
                    <Panel key={2} header="Disciplines">
                        <List
                            size="small"
                            dataSource={group.disciplines}
                            renderItem={(item, index) => (
                                <List.Item>
                                    {index+1}. {item.name}
                                </List.Item>)}
                        />
                    </Panel>
                </Collapse>
            </Card>
        </>
    );
});

export default CardGroup;