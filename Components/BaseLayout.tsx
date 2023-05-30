import React, {ReactNode, useEffect, useState} from 'react';
import {Breadcrumb, Layout, Menu, MenuProps} from "antd";
import {Link, Outlet, useLocation} from "react-router-dom";
import {AuthReq, removeJwtToken} from "../utils/Requests";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const { Header, Content } = Layout;

const items: MenuProps['items'] = ['students', 'groups', 'disciplines'].map((key) => ({
    key,
    label: (
        <Link to={key}>{key}</Link>
    ),
}));

const breadcrumbNameMap: Record<string, string> = {
    '/students': 'Student',
    '/students/add': 'Add',
    '/students/edit': 'Edit',
    '/groups' : 'Group',
    '/groups/add' : 'Add',
    '/groups/edit' : 'Edit',
    '/disciplines' : 'Disciplines',
    '/disciplines/add' : 'Add',
    '/disciplines/edit' : 'Edit',
    '/disciplines/report' : 'Report'
};

const BaseLayout : React.FC = () => {
    let location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const user_ = await AuthReq.getUser();
            setUser(user_);
            console.log(user_)
        }

        loadUser().catch(console.error)
    }, [])

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return {
            key: url,
            title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
        };
    });

    const breadcrumbItems = [
        {
            title: <Link to="/">Home</Link>,
            key: 'home',
        },
    ].concat(extraBreadcrumbItems);

    const logout = (e) => {
        e.preventDefault();
        removeJwtToken();
        window.location.reload();
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['students']} items={items}/>
                <div className="account">
                    {user?.name}
                    <a className="btn btn-close ms-1" onClick={logout}></a>
                </div>
            </Header>
            <Layout>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: '85vh',
                        }}
                    >
                        <Breadcrumb items={breadcrumbItems} />
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default BaseLayout;