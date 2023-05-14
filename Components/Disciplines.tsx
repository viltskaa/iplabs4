import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {DisciplineReq} from "../utils/Requests";
import {mapDiscipline} from "../utils/mappingUtils";
import {Button, Col, Row, Space} from "antd";
import Search from "antd/es/input/Search";
import {PlusOutlined, FullscreenOutlined} from "@ant-design/icons";
import Discipline from "../models/Discipline";
import CardDiscipline from "./CardDiscipline";

const Disciplines : React.FC = () => {
    const [data, setData] = useState<Array<Discipline>>([]);
    const [filteredData, setFilteredData] = useState<Array<Discipline>>([]);
    const navigate = useNavigate();

    useEffect(() => {
        DisciplineReq.all()
            .then((x) => x.map(mapDiscipline))
            .then((x) => {
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
                <Search placeholder="Discipline name" allowClear onChange={onSearch} style={{ width: '100%' }}/>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => {navigate("add")}}/>
                <Button type="primary" icon={<FullscreenOutlined />} onClick={() => {navigate("report")}}/>
            </Space>
            <Row gutter={16}>
                {filteredData.map(item => (
                    <Col span={24}  key={item.id}>
                        <CardDiscipline discipline={item}/>
                    </Col>
                ))}
            </Row>
        </Space>
    );
};

export default Disciplines;