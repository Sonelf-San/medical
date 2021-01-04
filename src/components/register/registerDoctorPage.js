import React, {useState, useEffect} from 'react'
import axios from 'axios'
import doctorImg from "../../assets/images/doctor.svg"
import { Form, Input, Button, Checkbox, Select, Row, Col, DatePicker} from 'antd'
import { MailOutlined, UserOutlined, LockOutlined, 
        LoginOutlined, QuestionCircleOutlined, HomeOutlined } from '@ant-design/icons'



const initialState = {
            fullname: '',
            email: '',
            residence: '',
            sex: '',
            contact_phone: '',
            nic_passport_path: '',
            occupation: '',
            date_birth: '',
            password: '',
            cv_path: '',
            diplomas_path: '',
            marital_status: '',
            fullnameError: '',
            emailError: '',
            residenceError: '',
            sexError: '',
            contact_phoneError: '',
            nic_passport_pathError: '',
            occupationError: '',
            date_birthError: '',
            passwordError: '',
            cv_pathError: '',
            diplomas_pathError: '',
            marital_statusError: ''
}


const { Option } = Select;

const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

class RegisterPatient extends React.Component {
    constructor(props){
        super(props)

        const handleFormChange = (inputValue) => {
            // setAddPatient(inputValue)
        }

        this.state = initialState;
    }


// Enable fielling form

    handleFullnameChange = (event) => {
        this.setState({
            fullname: event.target.value
        })
    }
    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleResidenceChange = (event) => {
        this.setState({
            residence: event.target.value
        })
    }
    handleSexChange = (event) => {
        this.setState({
            sex: event.target.value
        })
    }
    handleContactphoneChange = (event) => {
        this.setState({
            contact_phone: event.target.value
        })
    }
    handleNicPassportPathChange = (event) => {
        this.setState({
            nic_passport_path: event.target.value
        })
    }
    handleOccupationChange = (event) => {
        this.setState({
            occupation: event.target.value
        })
    }
    handleDatebirthChange = (event) => {
        this.setState({
            date_birth: event.target.value
        })
    }
    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleCvPathChange = (event) => {
        this.setState({
            cv_path: event.target.value
        })
    }
    handleDiplomasPathChange = (event) => {
        this.setState({
            diplomas_path: event.target.value
        })
    }

    handleMaritalStatusChange = (event) => {
        this.setState({
            marital_status: event.target.value
        })
    }

// Validation form
    // valid(item, type)
    // {
    //     let itemValue = item.target.value;
    //     switch(type)
    //     {
    //         case "fullname":{
    //             if(itemValue.length<4)
    //             {
    //                 item.target.style.color='red';
    //                 this.setState({fullname: itemValue})
    //             }
    //             else
    //             {
    //                 item.target.style.color='green';
    //                 this.setState({fullname: itemValue})
    //             }
    //         }
    //     }
    // }

// Validation form
    validate = () => {
        let fullnameError = '';
        let emailError = '';
        let residenceError = '';
        let sexError = '';
        let contact_phoneError = '';
        let nic_passport_pathError = '';
        let occupationError = '';
        let date_birthError = '';
        let passwordError = '';
        let cv_pathError = '';
        let diplomas_pathError = '';
        let marital_statusError = '';

        if(!this.state.fullname){
            fullnameError = 'Name cannot be blank';
        }
        if(!this.state.email.includes("@")){
            emailError = 'Invalid email';
        }
        if(emailError || fullnameError){
            this.setState({emailError, fullnameError});
            return false;
        }

        return true;
    };


// handle submit value
    handleSubmit = event => {
        event.preventDefault() //Avoid to lose data after submited
        const isValid = this.validate();
        if(isValid){
            console.log(this.state);
            this.setState(initialState); //Clearing Form
        }
        axios.post('/register/doctor', this.state)
             .then(response => {
                 console.log(response)
             })
             .catch(error => {
                 console.log(error)
             })
    }

    render() {
        const{ fullname,email, residence, sex, contact_phone, nic_passport_path, occupation, date_birth,
                password, cv_path, diplomas_path, marital_status } = this.state
        return (
            <div className="base-container" style={{ padding: '30px' }}>
                <div className="header">Doctor Registration</div>
                <br />
                <div className="content mx-auto border shadow p-5" 
                style={{ background: '#ECECEC', padding: '30px' }}>
                    <div className="text-center"> 
                        <img className = 'image' alt = "Patient logo" src={doctorImg} />
                    </div>
               
                    <div><br /></div>
                        {/* <form onSubmit = {this.handleSubmit}> */}
                        <Form 
                            name = 'regiter' onFinish = {onFinish}>
                            <Row gutter= {16}>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    name = "fullname"
                                    value = {fullname}
                                    onChange = {this.handleFullnameChange}
                                    hasFeedback
                                    rules = {[{ required: true, message: 'Please input your Full Name!' }]}
                                    >
                                        <Input type = "fullname"
                                        name = "fullname"
                                        value = {fullname}
                                        onChange = {this.handleFullnameChange}
                                        prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" allowClear />
                                    </Form.Item>
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.fullnameError}</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    name = "email"
                                    value = {email}
                                    onChange = {this.handleEmailChange}
                                    hasFeedback
                                        rules={[
                                            {
                                              type: 'email',
                                              message: 'The input is not valid Email!',
                                            },
                                            {
                                              required: true,
                                              message: 'Please input your Email!',
                                            },
                                          ]}
                                    >
                                        <Input
                                        name = "email"
                                        value = {email}
                                        onChange = {this.handleEmailChange}
                                        prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" allowClear />
                                    </Form.Item>
                                        
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.emailError}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter= {16}>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    name = "residence"
                                    value = {residence}
                                    onChange = {this.handleResidenceChange}
                                    hasFeedback
                                        rules = {[{ required: true, message: 'Please input your Residence!' }]}
                                    >
                                        <Input type = "residence"
                                        name = "residence"
                                        value = {residence}
                                        onChange = {this.handleResidenceChange}
                                        prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="Residence" allowClear />
                                    </Form.Item>

                                        
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.residenceError}</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                    <Form.Item 
                                    name="sex"
                                    value = {sex}
                                    onChange = {this.handleSexChange}
                                    hasFeedback
                                        rules={[{ required: true, message: 'Please select your gender!' }]}
                                    >
                                        <Select size = 'large'
                                        name="sex"
                                        value = {sex}
                                        onChange = {this.handleSexChange}
                                        placeholder="Gender">
                                        <Option value = "">Choose your Gender</Option>
                                        <Option value="F">Female</Option>
                                        <Option value="M">Male</Option>
                                        </Select>
                                        {/* <span style = {{fontSize: 9, color: 'grey'}}>Select your gender</span> */}
                                    </Form.Item>
                                     {/* <label>Marital Status</label> */}
                                    {/* <select class="form-control" value = {marital_status} name = "marital_status" onChange = {this.handleMaritalStatusChange} required>
                                            <option value = "">Choose your status</option>
                                            <option value = "S"></option>
                                            <option value = "M"></option> */}
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.sexError}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter= {16}>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    name = "phone_contact" value = {contact_phone}
                                    onChange = {this.handleContactphoneChange}
                                    hasFeedback
                                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                                    >
                                        <Input addonBefore={+237}
                                         name = "phone_contact" value = {contact_phone}
                                         onChange = {this.handleContactphoneChange}
                                         pattern = "[0-9]{3} [0-9]{3} [0-9]{3}" placeholder="Contact Phone" 
                                         allowClear />
                                    </Form.Item>
                                     <span style = {{fontSize: 12, color: 'red'}}>{this.state.contact_phoneError}</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                    <Form.Item 
                                        value = {nic_passport_path} 
                                        name = "nic_passport_path" 
                                        onChange = {this.handleNicPassportPathChange}
                                        hasFeedback
                                        rules={[
                                            // {
                                            //   type: 'pdf',
                                            //   message: 'The input is not valid file!',
                                            // },
                                            {
                                              required: true,
                                              message: 'Please input your Nationale ID Card or Passport!',
                                            },
                                          ]}
                                    >
                                        <Input type = "file"
                                        value = {nic_passport_path} 
                                        name = "nic_passport_path" 
                                        onChange = {this.handleNicPassportPathChange}
                                        placeholder = "ID Card / Passport"
                                        /><span style = {{fontSize: 9, color: 'grey'}}>Nationale ID Card or Passport</span>
                                    </Form.Item>
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.blood_groupError}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter= {16}>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    value = {occupation} name = "occupation" 
                                    onChange = {this.handleOccupationChange}
                                    hasFeedback
                                        rules = {[{ required: true, message: 'Please input your Occupation!' }]}
                                    >
                                        <Input type = "email"
                                        value = {occupation} name = "occupation" onChange = {this.handleOccupationChange}
                                        placeholder="Occupation" allowClear />
                                    </Form.Item>
                                      <span style = {{fontSize: 12, color: 'red'}}>{this.state.occupationError}</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                    <Form.Item
                                    value = {date_birth} name = "date_birth" 
                                    onChange = {this.handleDatebirthChange}
                                    value = {date_birth} name = "date_birth"
                                    hasFeedback
                                        rules = {[{ required: true, message: 'Please input your Date of Birth!' }]}
                                    >
                                        <Input type = "date"
                                        value = {date_birth} name = "date_birth" 
                                        onChange = {this.handleDatebirthChange}
                                        value = {date_birth} name = "date_birth"
                                        placeholder="Date of Birth" allowClear />
                                    </Form.Item>
                                    {/* <DatePicker  format={dateFormat} /> */}
                                        {/* <label>Date of Birth</label>
                                        <input class="form-control" type="date" value = {date_birth} name = "date_birth" onChange = {this.handleDatebirthChange} required /> */}
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.data_birthError}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter= {16}>
                                <Col span={12}>
                                    <div>
                                    <Form.Item 
                                        name = "diplomas_path" 
                                        value = {diplomas_path} 
                                        onChange = {this.handleDiplomasPathChange}
                                        hasFeedback
                                        rules={[
                                            // {
                                            //   type: 'pdf',
                                            //   message: 'The input is not valid file!',
                                            // },
                                            {
                                              required: true,
                                              message: 'Please input your latest diploma!',
                                            },
                                          ]}
                                    >
                                        <Input type = "file"
                                        name = "diplomas_path" 
                                        value = {diplomas_path} 
                                        onChange = {this.handleDiplomasPathChange}
                                        placeholder = "ID Card / Passport"
                                        /><span style = {{fontSize: 9, color: 'grey'}}>Upload latest diploma to apply to this role</span>
                                    </Form.Item>
                                       <span style = {{fontSize: 12, color: 'red'}}>{this.state.diplomas_pathError}</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                    <Form.Item 
                                        name = "cv_path" 
                                        value = {cv_path}
                                        onChange = {this.handleCvPathChange}
                                        hasFeedback
                                        rules={[
                                            // {
                                            //   type: 'pdf',
                                            //   message: 'The input is not valid file!',
                                            // },
                                            {
                                              required: true,
                                              message: 'Please input your CV!',
                                            },
                                          ]}
                                    >
                                        <Input type = "file"
                                        name = "cv_path" 
                                        value = {cv_path}
                                        onChange = {this.handleCvPathChange}
                                        placeholder = "ID Card / Passport"
                                        /><span style = {{fontSize: 9, color: 'grey'}}>Upload your CV</span>
                                    </Form.Item>
                                        <span style = {{fontSize: 12, color: 'red'}}>{this.state.cv_pathError}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter= {16}>
                            <Col span={12}>
                                <div>
                                    <Form.Item
                                        name="password" rules={[{required: true, message: 'Please input your password!',},]}
                                        hasFeedback
                                    >
                                    <Input.Password 
                                    name = "password"
                                    value = {password}
                                    onChange = {this.handlePasswordChange}
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password" />
                                    </Form.Item>
                                    <span style = {{fontSize: 12, color: 'red'}}>{this.state.passwordError}</span>
                                </div>
                            </Col>
                            <Col span = {12}>
                                <div>
                                    <Form.Item
                                        name="confirm"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('The two passwords that you entered do not match!');
                                            },
                                        }),
                                        ]}
                                    >
                                        <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        placeholder =" Confirm Password" />
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                            <Row gutter= {16}>
                                <Col span={12}>
                                    <div>
                                    <Form.Item 
                                    value = {marital_status} 
                                    name = "marital_status" 
                                    onChange = {this.handleMaritalStatusChange}
                                    hasFeedback
                                        rules={[{ required: true, message: 'Please select your gender!' }]}
                                    >
                                        <Select size = 'large'
                                        value = {marital_status} 
                                        name = "marital_status" 
                                        onChange = {this.handleMaritalStatusChange}
                                        placeholder="Status">
                                        <Option value = "">Choose your status</Option>
                                        <Option value="S">Single</Option>
                                        <Option value="M">Married</Option>
                                        </Select>
                                        {/* <span style = {{fGenderontSize: 9, color: 'grey'}}>Choose your status</span> */}
                                    </Form.Item>
                                    <span style = {{fontSize: 12, color: 'red'}}>{this.state.marital_statusError}</span>
                                    {/* </select> */}
                                </div>
                            </Col>
                            <Col span = {12}>
                                <Button size = 'large' onClick = {this.handleSubmit} fluid type="primary" htmlType="submit"
                                style = {{width: '100%'}}>
                                <LoginOutlined className="site-form-item-icon" />Sign Up
                                </Button>
                            </Col>
                        </Row>
                        </Form>
                        </div>
                        </div>
                   
        );
    }
}

export default RegisterPatient;