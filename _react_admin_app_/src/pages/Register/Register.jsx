import React from 'react';
import { Alert, Form, Row, Input, Flex, Button, notification } from 'antd';

import './Regiter.css'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Redux/Actioncreator/Actioncreator';
import { useDispatch } from 'react-redux';
const Register = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate()
    const dispatch=useDispatch()

    const [api, contextHolder] = notification.useNotification();

   async function onFinish(Values) {
        console.log(Values);
        

            const rawResponse = await fetch('https://admin-app-bdsu.onrender.com/api/v1/admin/new', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ first_name: Values.firstname, last_name: Values.lastname, email: Values.email, password: Values.password})
            });
            const content = await rawResponse.json();
           
            console.log("content",content);
            if (content.success) {
                
                api['success']({
                    message: 'Authorization',
                    description:
                    'Sucessfully login',
                });
                setTimeout(() => {
                    
                    (navigate('/'))
                }, 2000);
            } else {
                api['error']({
                    message: 'Authorization',
                    description:
                        'Pls register',
                });
            }
      ;
    }
    return (
        <>
            <div className='backroundcolor  '>
                <div className='insidebackroundcolor  '>
                    <Row className='formrow'>

                        <Form
                            layout="vertical"
                            onFinish={onFinish}
                            form={form}
                        >
                            <Row className='Register inputwidth' >REGISTER</Row>
                            <Form.Item
                                label="First Name"
                                name="firstname"
                                labelCol={{
                                    span: 20
                                }}
                                wrapperCol={{
                                    span: 25
                                }}
                               
                                rules={[
                                    {
                                        required: true
                                    },
                                    {
                                        pattern: /^[A-Za-z\\s]+$/,
                                        message: "first name should contain only aplhabets"
                                    }
                                ]}
                            >
                                <Input type='text' />
                            </Form.Item>

                            <Form.Item
                                label="Last Name"
                                name="lastname"
                                labelCol={{
                                    span: 20
                                }}
                                wrapperCol={{
                                    span: 25
                                }}
                                
                                rules={[
                                    {
                                        required: true
                                    },
                                    {
                                        pattern: /^[A-Za-z\\s]+$/,
                                        message: "last name should contain only aplhabets"
                                    }


                                ]}
                            >
                                <Input type='text' />
                            </Form.Item>
                            <Form.Item
                                className=''
                                label="Email"
                                name="email"
                              
                                labelCol={{
                                    span: 20
                                }}
                                wrapperCol={{
                                    span: 25
                                }}
                                rules={[
                                    {
                                        required: true,

                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                        message: 'Please valid email!',
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
                                    span: 25
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
                                label="Confirm Password"
                                name="confirmpassword"
                               
                                labelCol={{
                                    span: 15
                                }}
                                wrapperCol={{
                                    span: 24
                                }}
                                rules={[
                                    {
                                        required: true
                                    },
                                    
 
                                ]}
                            >
                                <Input.Password type="password" />
                            </Form.Item>
                            <Button className='buttonsubmit' htmlType="submit" block  > Submit</Button>
                            <Row justify={'center'}   > Already have an account ?<Link to='/'>sign in</Link> </Row>
                        </Form>


                    </Row>
                </div>
            </div>

        </>
    )
}
export default Register;