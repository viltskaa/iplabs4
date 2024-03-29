import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import {useNavigate, useSearchParams} from "react-router-dom";
import Discipline from "../models/Discipline";
import {DisciplineReq} from "../utils/Requests";
import {mapDiscipline} from "../utils/mappingUtils";

const DisciplineAction : React.FC = () => {
    const [discipline, setDiscipline] = useState<Discipline | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [form] = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    let [searchParams, ] = useSearchParams();

    useEffect(() => {
        const getDiscipline = async () => {
            const id : string | null = searchParams.get("id");
            if (!id) return;
            const disciplineL = await DisciplineReq.get(+id);
            if (disciplineL === null) return messageApi.error('You don`t have permissions!');;
            setDiscipline(mapDiscipline(disciplineL));
            form.setFieldsValue({
                'name' : disciplineL.name
            });
        }

        getDiscipline()
            .catch(console.error);
    }, [])

    const onFinish = async (value : any) => {
        setLoading(prevState => !prevState);
        if (discipline === null) {
            const data = await DisciplineReq.add(value.name);
            if (!data) {
                return messageApi.error('You don`t have permissions!');
            }
        } else {
            await DisciplineReq.edit({
                id : discipline.id,
                name : value.name
            });
        }
        setLoading(prevState => !prevState);
    }

    return (
        <>
            {contextHolder}
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
                <h2>Discipline</h2>
                <Form.Item
                    label="Discipline name"
                    name="name"
                    rules={[{ required: true, message: 'Please input Discipline name!' }]}
                    wrapperCol={{ span: 8 }}
                >
                    <Input />
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

export default DisciplineAction;