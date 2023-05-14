import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Card, Collapse, List, Modal} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleFilled} from "@ant-design/icons";
import {IDisciplineProps} from "../types/types";
import {DisciplineReq} from "../utils/Requests";

const { confirm } = Modal;
const { Panel } = Collapse;

const CardDiscipline : React.FC<IDisciplineProps> = ({discipline} : IDisciplineProps) => {
    const navigate = useNavigate();

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure delete this discipline?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                const remGroup = await DisciplineReq.remove(discipline.id);
                if (remGroup !== null) {
                    // messageApi.success("Group deleted successfully");
                }
                else {
                    // messageApi.error("Error");
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <Card
            title={discipline.name}
            style={{width: "100%", marginBottom:"1em"}}
            bordered={false}
            hoverable={true}
            actions={[
                <Button type="link" onClick={() => {navigate("edit?id="+discipline.id)}}>
                    <EditOutlined key="edit"/>
                </Button>,
                <DeleteOutlined key="delete" onClick={showDeleteConfirm}/>
            ]}
        >
            <Collapse>
                <Panel key={1} header="Groups">
                    <List
                        size="small"
                        dataSource={discipline.groups}
                        renderItem={(item, index) => (
                            <List.Item>
                                {index+1}. {item.name}
                            </List.Item>)}
                    />
                </Panel>
            </Collapse>
        </Card>
    );
};

export default CardDiscipline;