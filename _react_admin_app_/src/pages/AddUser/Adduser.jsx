import './AddUser.css'
import React, { useEffect, useState } from 'react'
import { Form, Radio, Input, Col, notification, Image, Row, Select, Button, Dropdown, message, Space, Tooltip } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
const { Option } = Select;
const { TextArea } = Input;


function AddUser() {
    const [fileName, setFileName] = useState("")
    const [baseImage, setBaseImage] = useState("")
    const [upload, setUpload] = useState(true)
    const [form] = Form.useForm();
    const [ImageUrl, setImageUrl] = useState("")
    const Token = useSelector(i => i.logindatavalue.token)

    const [value, setValue] = useState();
    const [updatedata, setupdatedata] = useState([])
    const [resetval, setRestVal] = useState(false)

    const navigate = useNavigate()
    let { id } = useParams()
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {

        if (id) {
            axios.get(`https://admin-app-bdsu.onrender.com/api/v1/users/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${Token}`
                    }
                })
                .then(response => {
                    setupdatedata(response.data.data[0]);

                    console.log("response", response);
                    form.setFieldsValue(
                        {
                            firstname: updatedata.first_name,
                            lastname: updatedata.last_name,
                            email: updatedata.email,
                            gender: updatedata.gender,
                            Role: updatedata.role,
                           
                            Address: updatedata.address,
                            country: updatedata.country,
                            state: updatedata.state,
                            city: updatedata.city,
                        }
                    )
                    setRestVal(true)
                })
                .catch(e => e)
        }
    }, [resetval])



    const onChange = (e) => {
        setValue(e);
    };

    const options = [
        {
            value: 'Frontend',
            label: 'Frontend',
        },
        {
            value: 'Backend',
            label: 'Backend',
        },
        {
            value: 'HR',
            label: 'HR',
        },
        {
            value: 'BDE',
            label: 'BDE',

        },
        {
            value: 'Fullstack',
            label: 'Fullstack',

        },
    ]
    const country = [
        {
            value: 'India',
            label: 'India',
        },
        {
            value: 'Thailland',
            label: 'Thailland',
        },
        {
            value: 'Bali',
            label: 'Bali',
        },
        {
            value: 'Pattaya',
            label: 'pattaya',

        },
    ]
    const state = [
        {
            value: 'validivoskova',
            label: 'validivoskova',
        },
        {
            value: 'zambia',
            label: 'zambia',
        },
        {
            value: 'Zimbabae',
            label: 'Zimbabae',
        },

    ]
    const city = [
        {
            value: 'chennai',
            label: 'chennai',
        },
        {
            value: 'Mumbai',
            label: 'Mumbai',
        },
        {
            value: 'Ahamedabad',
            label: 'Ahamedabad',
        },

    ]

    const handleFileInputChange = async e => {
        const files = e.target.files[0]
        setFileName(files)
     
        const result = await getBase64(files)
        setBaseImage(result)
        setUpload(false)
        setImageUrl()
        setupdatedata({...updatedata,imageurl:""})

    };

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });


    const uploadImageFunction = async () => {

        const bodyFormData = new FormData();
        bodyFormData.append('file', fileName);
        console.log("fileName", fileName);

        const configure = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${Token}`,
               
            }
        }
        const Imageresult = await axios.post("https://admin-app-bdsu.onrender.com/image/uploads", bodyFormData, configure)
        
        if (Imageresult.data.success) {
            notification.success({
                message: 'Success',
                description: 'Image Uploaded',
                placement: 'topRight'
            });
            setImageUrl(Imageresult.data.url)

        }
    }


    function onFinish(Values) {
        if(id){
            if(ImageUrl || updatedata.imageurl){
                axios.patch(`https://admin-app-bdsu.onrender.com/api/v1/users/${id}`,
                    {
                        first_name: Values.firstname,
                        last_name: Values.lastname,
                        email: Values.email,
                        imageurl: baseImage ? ImageUrl : updatedata.imageurl,
                        gender: Values.gender,
                        role: Values.Role,
                        address: Values.Address,
                        country: Values.country,
                        state: Values.state,
                        city: Values.city
        
        
                    },
                    {
                        headers: {
        
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${Token}`
                        }
                    }
        
                ).then(response => {
                    if (response.data.success) {
                        navigate('/dashboard')
                        notification.success({
                            message: 'Success',
                            description: 'UserDetails  Updated',
                            placement: 'topRight'
                        });
        
                    }
                    else {
                        notification.error({
                            message: 'error',
                            description: 'Invalid',
                            placement: 'topRight'
                        });
                    }
                }
                )
                    .catch(e => console.log("errrrrr", e)
                    )
            }
            else{
                notification.error({
                                message: ' please upload image',
                                placement: 'topRight'
                            })
            }
        }
        
        else{

            if(ImageUrl){
    
                axios.post("https://admin-app-bdsu.onrender.com/api/v1/users/new",
    
                    {
                        first_name: Values.firstname,
                        last_name: Values.lastname,
                        email: Values.email,
                        imageurl: ImageUrl,
                        gender: Values.gender,
                        role: Values.Role,
                        address: Values.Address,
                        country: Values.country,
                        state: Values.state,
                        city: Values.city
    
    
                    },
                    {
                        headers: {
    
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${Token}`
                        }
                    }
    
                ).then(response => {
                    if (response.data.success) {
                        navigate('/dashboard')
                        notification.success({
                            message: 'Success',
                            description: 'User created',
                            placement: 'topRight'
                        });
    
                    }
                    else {
                        notification.error({
                            message: 'error',
                            description: 'Invalid',
                            placement: 'topRight'
                        });
                    }
                    console.log("responsetopost", response.data.success)
                    console.log("responsetopost", response)
                }
                ).catch(e => {
                    console.log("e", e);
                })
            }
            else{
                notification.error({
                                message: ' please upload image',
                                placement: 'topRight'
                            })
            }
        }
        
            
            

    }

    useEffect(() => {
        form.resetFields()
       
    }, [id])




    return (
        <>
            {contextHolder}
            <Row>
                <Col span={1} />
                <Col span={22}>
                    <Form
                        layout="vertical"
                        className='Form add_user_form'

                        form={form}
                        onFinish={onFinish}
                        size='large'

                    >
                        <Row className='AlignmentCenter' justify={'space-between'}  >
                            <Col span={11}>
                                <Form.Item

                                    label={<label className='LabelColor'>First Name</label>}
                                    className='Inputlabel margin'
                                    name="firstname"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input className='inputBox' />
                                </Form.Item>
                            </Col>
                            
                            <Col span={11}>
                                <Form.Item
                                    label={<label className='LabelColor'>Last Name</label>}
                                    className='Inputlabel'
                                    name="lastname"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input className='inputBox' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row className='AlignmentCenter' justify={'space-between'}  >
                            <Col span={11}>
                                <Form.Item

                                    label={<label className='LabelColor'>Email</label>}
                                    className='Inputlabel margin'
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input className='inputBox' />
                                </Form.Item>
                            </Col>
                           
                            <Col span={11}>
                                <Form.Item
                                    label={<label className='LabelColor'>Gender</label>}
                                    className='Inputlabel '
                                    name="gender"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Radio.Group onChange={onChange} value={value}>
                                        <Radio className='LabelColor' value={"male"}>Male</Radio>
                                        <Radio className='LabelColor' value={"female"}>Female</Radio>

                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row className='AlignmentCenter' justify={'space-between'} >
                            <Col span={11}>
                                <Form.Item
                                    label={<label className='LabelColor' >Role</label>}
                                    className='Inputlabel margin'
                                    name="Role"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select Role"

                                        options={options}
                                    />

                                </Form.Item>
                            </Col>
                            
                            <Col span={11}>
                                <Row>
                                    <Col span={9}>
                                        <Form.Item label={<label className='LabelColor'>Image</label>}
                                            className='imageInputlabel'
                                            name="image"
                                            rules={[
                                                {
                                                    required: id ? false : true,

                                                },
                                            ]}
                                        >

                                            <Input type='file' name='image' className='inputimage' onChange={(e) => handleFileInputChange(e)} />
                                        </Form.Item>

                                    </Col >
                                    <Col span={4} className="Baseimg">
                                        {fileName ?

                                            <Image src={baseImage} width={20} height={30} /> : <Image src={updatedata.imageurl} width={20} height={30} />}
                                    </Col>
                                    <Col >
                                        <Button className="file_margin inputimage" disabled={upload} onClick={uploadImageFunction} >Upload</Button>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                        <Row className='AlignmentCenter' justify={'center'} >
                            <Col span={1}></Col>
                            <Col span={20}>
                                <Form.Item
                                    label={<label className='LabelColor'>Address</label>}
                                   
                                    name="Address"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <TextArea rows={4} className='inputBox' />
                                </Form.Item>
                            </Col>
                            <Col span={2}></Col>
                        </Row>

                        <Row className='AlignmentCenter' justify={'space-between'}  >
                            <Col span={7}>
                                <Form.Item

                                    label={<label className='LabelColor'>Country</label>}
                                    className='country'
                                    name="country"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select country"
                                        options={country}
                                    />

                                </Form.Item>
                            </Col>
                          
                            <Col span={7}>
                                <Form.Item

                                    label={<label className='LabelColor'>State</label>}
                                    className='country'
                                    name="state"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select Role"
                                        options={state}
                                    />

                                </Form.Item>
                            </Col>
                            
                            <Col span={7}>
                                <Form.Item

                                    label={<label className='LabelColor'>City</label>}
                                    className='country'
                                    name="city"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select city"
                                        options={city}
                                    />

                                </Form.Item>
                            </Col>

                        </Row>
                        <Row className='button'>

                            <Form.Item label=" " colon={false}>
                                <Button htmlType="submit" className='addusersubmit'>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Row>
                    </Form>
                </Col>
                <Col span={1}></Col>
            </Row>





        </>
    )
}

export default AddUser;