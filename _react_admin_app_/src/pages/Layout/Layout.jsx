import React, { Suspense, useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, } from '@ant-design/icons';
import { Button, Layout, Row, Col, Menu, Image, theme, notification } from 'antd';
import { Typography } from 'antd';


import img from '../../Assestss/images.jpg'
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { MdPersonAddAlt1 } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

import './Layout.css'
import { Route, Router, Routes, useLocation, useNavigate } from 'react-router';
// import Dashboard from '../Dashboard/Dashboard';
// import AddUser from '../AddUser/Adduser';
import { useDispatch, useSelector } from 'react-redux';
import {  removeLocalStorage } from '../Redux/Actioncreator/Actioncreator';
import { PrivateRoutes } from '../../Router/PrivateRoute';
const { Title } = Typography;
const { Header, Sider, Content } = Layout;
const Staticlayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [tab, setTab] = useState("/dashboard")
    const navigate = useNavigate()
    const location = useLocation()
    const urlparam = new URLSearchParams(location.search)
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch()
    const layoutselector = useSelector(i => i.logindatavalue)


    const logOutFunctionality = () => {
        dispatch(removeLocalStorage())
        navigate('/');
        notification.success({
            message: 'Success',
            description: 'Logout Sucessfull',
            placement: 'topRight'
        });
    }
    useEffect(() => {
        if (location.pathname.split('/')[1] === 'edit') {
            setTab('')
        }
        if (location.pathname.split('/')[1] === 'dashboard') {
            setTab('/dashboard')
        }
        else  if (location.pathname.split('/')[1] === 'adduser') {
            setTab('/adduser')
        }
    }, [location])
    return (

        <Layout  className='mainlayout' >
            {contextHolder}
            <Sider trigger={null} collapsible collapsed={collapsed} width={250} className='layout'>
                <Row justify={'space-around'} className="Menubutton1"> 
                    {!collapsed ?
                        <>
                            <Col > <img src={img} className='anadearmas' /></Col>
                            <Col className='imagename'>
                                <Col className='imagename'>{layoutselector.first_name} {layoutselector.last_name}</Col>
                                <Col className='imagename' >{layoutselector.email}</Col>
                            </Col>
                            <MenuUnfoldOutlined  onClick={() => setCollapsed(!collapsed)} />
                        </> :
                        <MenuUnfoldOutlined className="Menubutton" onClick={() => setCollapsed(!collapsed)} />}
                </Row>
                <Menu className='Menuitems'
                    onClick={({ key }) => {
                        setTab(key)
                        navigate(key)
                    }}
                    selectedKeys={tab}
                    items={[
                        {
                            key: '/dashboard',
                            icon: <RxDashboard />,
                            label: 'Dashboard',
                        },
                        {
                            key: '/adduser',
                            icon: <MdPersonAddAlt1 />,
                            label: 'Add User',
                        },
                        {
                            key: '/settings',
                            icon: <IoSettingsOutline />,
                            label: 'Settings',
                            disabled: true
                        },
                    ]}
                />
                <Row className='logoutbuttonrow'>
                    {!collapsed ? <>
                        <Col>
                            <Button className='logout' icon={<IoIosLogOut />}
                                onClick={() => {
                                    logOutFunctionality()
                                }
                                }
                            >Logout</Button>
                        </Col>

                    </> : <IoIosLogOut className="Menubutton" onClick={() => setCollapsed(!collapsed)} />}
                    <Col>
                    </Col>
                </Row>
            </Sider>
            <Layout>
                <Header className='header'
                    style={{ padding: 0, backgroundColor: '#2b2b2b'}}
                >
                    {location.pathname.split('/')[1] === 'edit' && <Title className='header_title' >EDIT USER</Title>}
                    {location.pathname.split('/')[1] === 'dashboard' && <Title className='header_title'>DASHBOARD</Title>}
                    {location.pathname.split('/')[1] === 'adduser' && <Title className='header_title' >ADD USER</Title>}
                    {location.pathname.split('/')[1] === 'settings' && <Title className='header_title'>SETTINGS</Title>}

                </Header>
                <Content className='content'
                    style={{ padding: 24 }}
                >
                    <>
                        <Routes>
                            {PrivateRoutes.map((route) => {
                                let Component = route.component
                                return (
                                    <Route exact={true} key={route.name} path={route.path}
                                        element={
                                            <>
                                                <Suspense fallback={"loading"}>
                                                    <Component />
                                                </Suspense></>
                                        } />
                                )
                            })}

                        </Routes>
                    </>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Staticlayout;