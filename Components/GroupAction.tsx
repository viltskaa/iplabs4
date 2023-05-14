import React, {useEffect, useState} from 'react';
import Group from "../models/Group";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Button, Form, Input, Select, Space} from "antd";
import Student from "../models/Student";
import {DisciplineReq, GroupReq, StudentReq} from "../utils/Requests";
import {mapDiscipline, mapGroup, mapStudent} from "../utils/mappingUtils";
import {useForm} from "antd/es/form/Form";
import Discipline from "../models/Discipline";
import {cmpArrays} from "../utils/CompareArrays";

const { Option } = Select;

const GroupAction : React.FC = () => {
    const [group, setGroup] = useState<Group | null>(null);
    const [disciplines, setDisciplines] = useState<Array<Discipline>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const [form] = useForm();
    let [searchParams, ] = useSearchParams();

    useEffect(() => {
        const getGroup = async () => {
            const id : string | null = searchParams.get("id");
            if (id !== null) {
                const groupL = await GroupReq.get(+id);
                if (groupL === null) return;
                setGroup(mapGroup(groupL));
                form.setFieldsValue({
                    'name' : groupL.name,
                    'disciplines' : groupL.disciplines.map(x => x.id)
                })
            }
        }

        const getDisciplines = async () => {
            const disciplinesL = await DisciplineReq.all();
            if (disciplinesL !== null) {
                setDisciplines(disciplinesL.map(mapDiscipline));
            }
        }

        getGroup()
            .then(() => {
                getDisciplines()
                    .catch(console.error)
            })
            .catch(console.error);
    }, [])

    const renderSelect = () => {
        console.log(disciplines)
        if (disciplines !== null) {
            return disciplines.map(x => {
                return {
                    label : x.name,
                    value : x.id
                }
            })
        }
    }

    const filter = (inputValue : string, option : any) => {
        return option.label.includes(inputValue);
    }

    const onFinish = async (value : any) => {
        setLoading(prevState => !prevState);
        if (group === null) {
            const data = await GroupReq.add(value.name);
            if (data !== null && value.disciplines.length > 0) {
                await GroupReq.addDisciplines(data, value.disciplines);
            }
        } else {
            await GroupReq.edit({
                id : group.id,
                name : value.name
            });
            if (value.disciplines !== null && value.disciplines.length > 0) {
                await GroupReq.addDisciplines(group, value.disciplines);
            }
        }
        setLoading(prevState => !prevState);
        navigate(-1);
    }

    return (
        <>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 16 }}
                style={{ width: '100%' }}
                disabled={loading}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                layout={"vertical"}
            >
                <h2>Group</h2>
                <Form.Item
                    label="Group name"
                    name="name"
                    rules={[{ required: true, message: 'Please input group name!' }]}
                    wrapperCol={{ span: 8 }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Disciplines"
                    name="disciplines"
                    wrapperCol={{ span: 8 }}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select disciplines"
                        options={renderSelect()}
                        filterOption={filter}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default GroupAction;