import React, { useState } from 'react';
import { Alert, Form, Row, Input, Flex, Button, message, notification } from 'antd';
import '../Register/Regiter.css'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userLogin, { fetchdataSuccess, login, Logout, Privateroute } from '../Redux/Actioncreator/Actioncreator';
import { useSelector } from 'react-redux';
const Login = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate()
    const dispatch = useDispatch()
   
    const [api, contextHolder] = notification.useNotification();

    function onFinish(Values) {
        

        (async () => {
            const rawResponse = await fetch('https://admin-app-bdsu.onrender.com/api/v1/admin/login',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: Values.email, password: Values.password })
                });
            const content = await rawResponse.json();

            dispatch(login(content.data))

            if (content.success) {
                navigate('/dashboard')
                notification.success({
                    message: 'Success',
                    description: 'Login sucessfull',
                    placement: 'topRight'
                });
                setTimeout(() => {
                    (navigate('/dashboard'))
                }, 2000)
                dispatch(Privateroute("true"))

            } else {
                console.log("haiiiiiiiiiiii");
                notification.error({
                    message: 'error',
                    description: 'Invalid user',
                    placement: 'topRight'
                });
            }
        })();
    }

    return (

        <>

            {contextHolder}
            <div className='backroundcolor'>

                <div className='insidebackroundcolorlogin '>
                    <Row justify={'center'} >

                        <Form layout="vertical"
                            className='logininputwidth'
                            onFinish={onFinish}
                            form={form}
                        >
                            <Row className='Register' >LOGIN</Row>

                            <Form.Item
                                label="Email"
                                name="email"
                                
                                labelCol={{
                                    span: 10
                                }}
                                wrapperCol={{
                                    span: 24
                                }}
                                rules={[
                                    {
                                        required: true,
                                        type: 'email'
                                    },
                                ]}
                            >
                                <Input type='email' />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                              
                                labelCol={{
                                    span: 8
                                }}
                                wrapperCol={{
                                    span: 24
                                }}
                                rules={[
                                    {

                                        required: true
                                    },
                                    {
                                        pattern: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
                                        message: "Password should contain atleast one special character"
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{5,}$/,
                                        message: 'Password should contain atleast 5 digits'
                                    }
                                ]}
                            >
                                <Input type="password" />
                            </Form.Item>

                            <Form.Item

                                name="submit"
                             
                                labelCol={{
                                    span: 8
                                }}
                                wrapperCol={{
                                    span: 24
                                }}
                                rules={[
                                    {
                                        max: 3,
                                    },
                                ]}
                            >
                                <Row className='Forgotpassword'> <Link to="">Forgot password?</Link></Row>
                                <Button className='login-button' block htmlType="submit" > Submit

                                </Button>

                            </Form.Item>
                            <Row justify={'center'}   > Don't have an account ? <Link to='/register'>  sign up</Link> </Row>
                        </Form>

                    </Row>
                </div>
            </div>

        </>
    )
}

export default Login;