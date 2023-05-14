import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Row, Select, Space} from "antd";
import CardStudent from "./CardStudent";
import {ReportType} from "../types/types";
import Discipline from "../models/Discipline";
import Disciplines from "./Disciplines";
import {DisciplineReq} from "../utils/Requests";
import {mapDiscipline} from "../utils/mappingUtils";
import CardGroup from "./CardGroup";
import {get} from "axios";

const Report : React.FC = () => {
    const [reportData, setReportData] = useState<ReportType>([]);
    const [id, setId] = useState<number>(0);
    const [disciplines, setDisciplines] = useState<Array<Discipline>>([]);

    useEffect(() => {
        const getDisciplines = async () => {
            const data = await DisciplineReq.all();
            setDisciplines(data.map(mapDiscipline));
        }

        getDisciplines()
            .catch(console.error);
    }, [])

    const renderValues = () => {
        return disciplines.map(x => {
            return {
                label : x.name,
                value : x.id
            }
        })
    }

    const onChange = (value : any, option : any) => {
        setId(+value);
    }

    const getReport = async () => {
        const data = await DisciplineReq.report(id);
        if (data == null) return;
        setReportData(data);
    }

    return (
        <Space direction='vertical' style={{width : '100%', marginTop : '10px'}}>
            <Space>
                <Select
                    style={{ width: 300 }}
                    options={renderValues()}
                    onChange={onChange}
                />
                <Button type="primary" onClick={getReport}>Get</Button>
            </Space>
            <Row gutter={16}>
                {reportData.map((item, index) => (
                    <Col span={24}  key={index}>
                        <Card bordered={false} style={{ width: 300 }}>
                            <p>Group name : {item.first}</p>
                            <p>Students count : {item.second}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Space>
    );
};

export default Report;