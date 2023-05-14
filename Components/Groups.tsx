import React, {useEffect, useState} from 'react';
import Group from "../models/Group";
import {GroupReq} from "../utils/Requests";
import {mapGroup} from "../utils/mappingUtils";
import {Button, Col, Row, Space} from "antd";
import Search from "antd/es/input/Search";
import {PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import CardGroup from "./CardGroup";

const Groups : React.FC = () => {
    const [data, setData] = useState<Array<Group>>([])
    const [filteredData, setFilteredData] = useState<Array<Group>>([])
    const navigate = useNavigate();

    useEffect(() => {
        GroupReq.all()
            .then(x => x.map(mapGroup))
            .then(x => {
                setData(x);
                setFilteredData(x);
            })
    }, [])

    const onSearch = (event : React.ChangeEvent<HTMLInputElement>) => {
        const { currentTarget : {value} } = event;
        setFilteredData(data.filter(item => item.name.toLowerCase().includes(value.toLowerCase())));
    }

    return (
        <Space direction="vertical" style={{width : '100%'}}>
            <Space style={{width : '100%'}}>
                <Search placeholder="Group name" allowClear onChange={onSearch} style={{ width: '100%' }}/>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => {navigate("add")}}/>
            </Space>
            <Row gutter={16}>
                {filteredData.map(item => (
                    <Col span={24}  key={item.id}>
                        <CardGroup group={item}/>
                    </Col>
                ))}
            </Row>
        </Space>
    );
};

export default Groups;