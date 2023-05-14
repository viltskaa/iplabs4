import 'react'

import React, {useEffect, useState} from 'react';
import {Col, Row, Space, Button, Breadcrumb} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {StudentObject} from "../types/types";
import Student from "../models/Student";
import CardStudent from "./CardStudent";
import Search from "antd/es/input/Search";
import {useNavigate} from "react-router-dom";
import {StudentReq} from "../utils/Requests";
import {mapStudent} from "../utils/mappingUtils";

const Students : React.FC = () => {
    const [data, setData] = useState<Array<Student>>([]);
    const [filteredData, setFilteredData] = useState<Array<Student>>([]);
    const navigate = useNavigate();

    useEffect(() => {
        StudentReq.all()
            .then((x) => x.map(mapStudent))
            .then((x) => {
                setData(x);
                setFilteredData(x);
        })
    }, [])

    const onSearch = (event : React.ChangeEvent<HTMLInputElement>) => {
        const { currentTarget : {value} } = event;
        setFilteredData(data.filter(item => item.name.toLowerCase().includes(value.toLowerCase()) ||
                                            item.group?.name.toLowerCase().includes(value.toLowerCase())));
    }

    return (
        <Space direction="vertical" style={{width : '100%'}}>
            <Space style={{width : '100%'}}>
                <Search placeholder="Student name or group name" allowClear onChange={onSearch} style={{ width: '100%' }}/>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => {navigate("add")}}/>
            </Space>
            <Row gutter={16}>
                {filteredData.map(item => (
                    <Col span={6}  key={item.id}>
                        <CardStudent student={item}/>
                    </Col>
                ))}
            </Row>
        </Space>
    );
};

export default Students;