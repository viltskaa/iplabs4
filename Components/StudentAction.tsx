import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Select} from 'antd';
import Student from "../models/Student";
import {useNavigate, useSearchParams} from "react-router-dom";
import Group from "../models/Group";
import {GroupReq, StudentReq} from "../utils/Requests";
import {mapGroup, mapStudent} from "../utils/mappingUtils";
import {useForm} from "antd/es/form/Form";

type forForm = {name : string, group : number}

const StudentAction : React.FC = () => {
    const [student, setStudent] = useState<Student | null>(null)
    const [groups, setGroups] = useState<Array<Group>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const [form] = useForm();

    let [searchParams, ] = useSearchParams();

    useEffect(() => {
        const getStudent = async () => {
            const id : string | null = searchParams.get("id");
            if (!id) return;
            const studentL = await StudentReq.get(+id);
            if (studentL == null) return messageApi.error('You don`t have permissions!');
            setStudent(mapStudent(studentL));
            form.setFieldsValue(
                {
                    'name' : studentL.name,
                    'group' : studentL?.group?.id ?? null
                }
            );
        }

        getStudent().catch(console.error)
    }, [])

    useEffect(() => {
        const getGroups = async () => {
            const data = await GroupReq.all();
            setGroups(data.map(mapGroup));
        }
        if (student === null)
            getGroups().catch(console.error)
    }, [student])

    const renderSelect = () => groups.map(x => (<Select.Option value={x.id} key={x.id}>{x.name}</Select.Option>))

    const addNewStudent = async (value : any) => {
        const newStudent = await StudentReq.add(value.name);
        if (newStudent !== null) {
            const result = await GroupReq.addStudent(value.group, newStudent.id);
            if (result !== null) {
                messageApi.success('New student added successfully');
            }
            else {
                messageApi.error('You don`t have permissions!');
            }
        }
        else {
            messageApi.error('You don`t have permissions!');
        }
    }

    const EditStudent = async (value : any) => {
        if (student === null) return;

        const editStudent = await StudentReq.edit({
            id : student.id || 0,
            name : value.name
        })

        if (editStudent !== null) {
            if (student.group?.id !== value.group) {
                const result = await GroupReq.addStudent(value.group, student.id);
                if (result !== null) {
                    messageApi.success('Student edited successfully');
                }
                else {
                    messageApi.error('Error');
                }
                return;
            }
            messageApi.success('Student edited successfully');
        }
        else {
            messageApi.error('Error');
        }
    }

    const onFinish = async (value : any) => {
        setLoading((prevState) => !prevState);
        if (student !== null) {
            await EditStudent(value)
        } else {
            await addNewStudent(value);
        }
        setLoading((prevState) => !prevState);
        //navigate(-1);
    }

    return (
        <>
            {contextHolder}
            <Form
                name="basic"
                form={form}
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 16 }}
                style={{ width: '100%' }}
                disabled={loading}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                layout={"vertical"}
            >
                <h2>Student</h2>
                <Form.Item
                    label="Username"
                    name="name"
                    rules={[{ required: true, message: 'Please input username!' }]}
                    wrapperCol={{ span: 8 }}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="group"
                    label="Group"
                    rules={[{ required: true, message: 'Please select group!' }]}
                    wrapperCol={{ span: 8 }}
                >
                    <Select>
                        {renderSelect()}
                    </Select>
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

export default StudentAction;