import React, { useEffect, useState } from 'react';
import { UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Row, Modal, Divider, Space, Segmented, Table, Badge, Tag, Typography, Button, Tooltip } from 'antd';
import { FiTable } from "react-icons/fi";
import { GoStack } from "react-icons/go";
import { FiDollarSign, FiLogOut } from "react-icons/fi"
import { LuLinkedin } from "react-icons/lu";
import { BsHddStack } from "react-icons/bs";
import { CgViewComfortable } from "react-icons/cg";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import './Dashboard.css'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { RxDashboard } from 'react-icons/rx';
import { IoMaleSharp } from "react-icons/io5";
import { render } from '@testing-library/react';
const { Text } = Typography


function Dashboard() {
    const Token = useSelector(e => e.logindatavalue.token)

    const [data, setData] = useState([])
    const [Carddata, setCardData] = useState([])

    const [deletedata, setdeletedata] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState()
    const [showUser, setShowUser] = useState(true)
    const [segment, setSegment] = useState("card")
    const navigate = useNavigate()


    useEffect(() => {
        axios.get("https://admin-app-bdsu.onrender.com/api/v1/users",
            {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            }
        ).then(response => {
            console.log('response.data.data', response.data.data)
            setData(response.data.data)
            if (response.data.success) {
                const cardsCount = response.data.data.reduce((acc, curr) => {
                    acc[curr.gender] = (acc[curr.gender] || 0) + 1;
                    acc[curr.role] = (acc[curr.role] || 0) + 1;
                    return acc
                }, {})
                setCardData(cardsCount)
                console.log("cardscount", cardsCount);

            }

        })
            .catch((e) => {
                console.log("error");

            })
    }, [deletedata])

    const deleteUser = async (id) => {
        axios.delete(`https://admin-app-bdsu.onrender.com/api/v1/users/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            }
        ).then(response => {
            setdeletedata(true)
            console.log("havsdsadagbsdjhasjhdad", response);

        })


            .catch((e) => {
                console.log("sdfsd", e);

            })


    }

    const Modaldata = (items) => {
        setModal(true)
        setModalData(items.id)
        

    }
    const columns = [
        {
            title: 'Name',
            key: 'name',
            render: (obj) => {
                return `${obj.first_name} ${obj.last_name}`
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',

        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        }, {
            title: 'Action',
            key: 'action',
            render: (user) => {
                return (
                    <Row justify={'center'}>
                        <Button type="primary" className='greenButton' onClick={() => { navigate(`/edit/${user.id}`) }} ><FaRegPenToSquare /> </Button>
                        <Button type="primary" className='redButton' onClick={() => deleteUser(user.id)}> <RiDeleteBin6Line /> </Button>
                    </Row>
                )
            }
        }
    ]
     
    const dataForTable = data

    const CardData = [
        {
            icon: <UsergroupAddOutlined className='icon' />,
            label: "Total",
            Count: data.length,
        },
        {
            icon: <UserOutlined className='icon' />,
            label: "Male",
            Count: Carddata.male,
        },
        {
            icon: <UserOutlined className='icon' />,
            label: "FeMale",
            Count: Carddata.female,
        },
        {
            icon: <CgViewComfortable className='icon' />,
            label: "Front End",
            Count: Carddata.Frontend,
        },
        {
            icon: <BsHddStack className='icon' />,
            label: "Back End",
            Count: Carddata.Backend,
        },
        {
            icon: <LuLinkedin className='icon' />,
            label: "HR",
            Count: Carddata.HR,
        },
        {
            icon: <FiDollarSign className='icon' />,
            label: "BDE",
            Count: Carddata.BDE,
        },
        {
            icon: <GoStack className='icon' />,
            label: "Full Stack",
            Count: Carddata.Fullstack,
        },

    ]
    return (

        <div  >

            <Space wrap size={[22, 22]}>
                {CardData.map((items) =>
                    <>
                        <Card className='cardcolor cardwidth' >
                            <Row justify='space-around'>
                                <Space direction='vertical'  >
                                    {items.icon}
                                    <Text className='total'>{items.label.toUpperCase()}</Text>
                                </Space>
                                <Text className='count'>{items.Count ? items.Count : 0}</Text>
                            </Row>
                        </Card>
                    </>
                )}

            </Space>
            <Divider
                style={{
                    borderColor: '#2B2B2B',
                }}
            >
            </Divider>
            <Row className='Userbutton'    >
                <Col>
                    <h2 className='userhead'>USERS</h2>
                </Col>
                <Col className='userbuttoncol' >
                    <Segmented onChange={(e) => setSegment(e)}
                        options={[
                            { value: 'card', icon: <RxDashboard /> },
                            { value: 'Table', icon: <FiTable /> },
                        ]}
                    />
                </Col>

            </Row>

            {segment === 'card' ?
                <Row className='dashboard'>
                    {data.map((items) => {
                        return (
                            <>
                                <Col className='user' >
                                    <Card className='outercard'>
                                        <Row justify={'center'}>
                                            <img src={items.imageurl} className='image' onClick={() => { Modaldata(items) }}></img>
                                        </Row>
                                        <Row justify={'center'}>
                                            <Tooltip title={items.first_name} placement="Bottom ">
                                                <Text className='count'>{items.first_name}</Text>
                                            </Tooltip>
                                        </Row>
                                        <Row justify={'center'}>
                                            <Tooltip title={items.email} placement="Bottom ">
                                                <Text className='emailuser'>{items.email}</Text>
                                            </Tooltip>
                                        </Row>
                                        <Row justify={'space-between'} className='userOption'>
                                            <Col>
                                                <Button type="primary" className='greenButton' onClick={() => { navigate(`/edit/${items.id}`) }} ><FaRegPenToSquare /></Button>
                                            </Col>
                                            <Col className='deletebutton'>
                                                <Button type="primary" className='redButton' onClick={() => deleteUser(items.id)} > <RiDeleteBin6Line /></Button>
                                            </Col>
                                        </Row>
                                    </Card>

                                </Col>

                                <Modal className='modal'
                                    okButtonProps={{ style: { display: 'none' } }}
                                    cancelButtonProps={{ style: { display: 'none' } }}
                                    title={
                                        <Row className='titlerow'>
                                            <Col>
                                                <h2 className='modaltitle'>{items.first_name}</h2>
                                            </Col>
                                            <Col >
                                                <Row  >
                                                    <Tag
                                                        color={"#2d38b6"} icon={<FaRegPenToSquare />}> {items.role}
                                                    </Tag>
                                                </Row>
                                            </Col>
                                        </Row>
                                    }


                                    open={modal && modalData === items.id}
                                    onCancel={() => setModal(false)}
                                >
                                    <div className='contentInModal'>

                                        <div className='inner'>
                                            <img className='imageSample' src={items.imageurl} alt="" />

                                            <Badge.Ribbon text={<IoMaleSharp />} color="magenta">  </Badge.Ribbon>

                                            <Row className='emailModal'>
                                                <Text>Email : {items.email}</Text>
                                            </Row>
                                            <Row className='addressModal'>
                                                <Text>Addreess :{items.address}</Text>
                                            </Row>
                                            <Row className='addressModal'>
                                                <Text>Created at : {items.created_at}</Text>
                                            </Row>
                                            <Row justify={'space-between'} >
                                                <Col className='editbuttonmodal'>
                                                    <Button type="primary" className='ModalGreenButton' onClick={() => { navigate(`/edit/${items.id}`) }} ><FaRegPenToSquare />Edit</Button>
                                                </Col>
                                                <Col className='deletebuttonmodal'>
                                                    <Button type="primary" className='ModalRedButton' onClick={() => deleteUser(items.id)}> <RiDeleteBin6Line />Delete</Button>
                                                </Col>
                                            </Row>
                                        </div>

                                    </div>

                                </Modal>
                            </>
                        )
                    })}
                </Row>
                :
                <div className='tabelOuterTag'>
                    <Table columns={columns} dataSource={dataForTable} className='tabel noHover' />
                </div>
            }
        </div>
    )

};
export default Dashboard;