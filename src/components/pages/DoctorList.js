import React, {useState, useEffect} from "react"
import axiosWithAuth from "../../utils/axiosWithAuth"
import { EyeOutlined } from '@ant-design/icons'
import {Table, Button, Modal, Tag, message, Row, Col, Tabs } from 'antd'

const DoctorList = () => {

    let fileUrl = '../../../'
    const { TabPane } = Tabs;

    const [visible, setVisible] = useState(false);
  
    const [users, setUser] = useState([]);

    const [user, setUse] = useState([]);

    const getUsers = async () => {
        await axiosWithAuth().get('/users/doctors')
        .then(response=>{
            setUser(response.data);
            // console.log(response.data);
        }).catch(error=>{
            console.log(error);
        })
    };


    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      }


    useEffect(() => {
        getUsers();
    }, []);

    // Reload page
    useEffect(()=>{
        // alert('reload!')
    },[])

    function activateUser(public_id){
        axiosWithAuth().put('/user/status/'+public_id, public_id)
         .then(response => {
            //  console.log(response)
            message.success(response.data.message, 5);
            window.location.reload();

         })
         .catch(error => {
             console.log(error.data.warn_message)
         })
}


    function detailsUser(public_id){
        axiosWithAuth().get('/users/'+public_id)
         .then(response => {
            setUse(response.data);
            //  console.log(response)

         })
         .catch(error => {
            //  console.log(error.data.warn_message)
         })
}


// Making table
const columns = [
    {
    title: '#',
    dataIndex: 'user_id',
    key: 'user_id',
    align: 'center',
    width: 50,
    fixed: 'left'
    },
    // {
    // title: 'Public Id',
    // dataIndex: 'public_id',
    // align: 'center',
    // key: 'public_id',
    // // fixed: 'left',
    // },
    {
    title: 'Name',
    dataIndex: 'fullname',
    align: 'center',
    key: 'fullname'
    },
    {
    title: 'Email',
    dataIndex: 'email',
    align: 'center',
    key: 'email'
    },
    // {
    // title: 'Role',
    // dataIndex: 'role_id',
    // align: 'center',
    // key: 'role_id'
    // },
    {
    title: 'Status',
    align: 'center',
    dataIndex: 'status',
    key: 'status',
    render: (dataIndex) =>(
        <>{dataIndex === true?<Tag style = {{color: '#5cb85c'}}>Active</Tag>:
        <Tag style = {{color: '#f0ad4e'}}>Inactive</Tag>}
        </>)
    },
    {
    title: 'Details',
    key: 'actions',
    align: 'center',
    // fixed: 'right',
    render: (action) =>(
        <>
        <Button type = 'primary' onClick = {() => {setVisible(true, detailsUser(action.public_id))}}>
            <EyeOutlined /></Button>{"  "}
        {/* <Button type = 'link' style = {{background: '#f0ad4e', color: 'white'}}><EditOutlined /></Button> */}
        {/* <Button type = 'warning'>Detail</Button>{"  "} */}
        </>
    )
    }

]

    return (
        <div className = "container">
            <div className = "py-4">
                <h1 style = {{textAlign: 'center'}}>List of Doctors</h1>

                <Table columns = {columns} dataSource = {users}
                scroll={{ x: 1500, y: 300 }} 
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}/>

                <Modal
                    title="User Details"
                    centered
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    width={1000}
                    footer={[
                        <Button key="back" onClick={() => setVisible(false)}>
                          Return
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => setVisible(false)}>
                          Ok
                        </Button>,
                      ]}
                >
                     {
                            user.map(use => {
                                return(
                            <>
                            <Row gutter= {16}>
                            <Col span={12}>
                                <li><b>Public_id</b>: {use.public_id}</li>
                            </Col>
                            <Col span={12}>
                                <li><b>Email</b>: {use.email}</li>
                            </Col>
                            </Row><br />
                            <Row gutter= {16}>
                            <Col span={12}>
                                <li><b>Fullname</b>: {use.fullname}</li> 
                            </Col>
                            <Col span={12}>
                                <li><b>Residence</b>: {use.residence}</li>
                            </Col>
                            </Row><br />
                            <Row gutter= {16}>
                            <Col span={12}>
                                <li><b>Occupation</b>: {use.occupation}</li>
                            </Col>
                            <Col span={12}>
                                <li><b>Status</b>: {use.status === true?<Tag style = {{color: '#5cb85c'}}>Active</Tag>:<Tag style = {{color: '#f0ad4e'}}>Inactive</Tag>}</li>
                            </Col>
                            </Row><br />
                            <Row gutter= {16}>
                            <Col span={12}>
                                <li><b>Birthday</b>: {use.date_birth}</li>
                            </Col>
                            <Col span={12}>
                                <li><b>Phone</b>: {use.contact_phone}</li>
                            </Col>
                            </Row><br />
                            <Row gutter= {16}>
                            <Col span={12}>
                                <li><b>Gender</b>: {use.sex === 'M'?'Male':'Female'}</li>
                            </Col>
                            <Col span={12}>
                                <li><b>Blood Group</b>: {use.blood_group}</li>
                            </Col>
                            </Row><br />
                            <Row gutter= {16}>
                            <Col span={12}>
                                <li><b>Marital Status</b>: {use.sex === 'S'?'Single':'Married'}</li>
                            </Col>
                            <Col span={12}>
                                {use.status === true?
                                <Button key="submit" type="link" style = {{background: '#f0ad4e', color: 'white'}}
                                    onClick={() => activateUser(use.public_id)}>
                                    Desactivate this user</Button>:
                                    <Button key="submit" type="primary" style = {{background: '#5cb85c', color: 'white'}}
                                    onClick={() => activateUser(use.public_id)}>
                                    Activate this user</Button>}
                            </Col>
                            </Row><br />
                            <Row gutter= {16}>
                            <Col span={24}>
                            <Tabs defaultActiveKey="1" centered>
                                <TabPane tab="ID Card | Passport" key="1">
                                <object width="100%" height="500px" data={fileUrl+use.nic} />
                                </TabPane>
                                <TabPane tab="CV" key="2">
                                <object width="100%" height="500px" data={fileUrl+use.cv} />
                                </TabPane>
                                <TabPane tab="Diploma" key="3">
                                <object width="100%" height="500px" data={fileUrl+use.diploma} />
                                </TabPane>
                            </Tabs>
                            </Col>
                            </Row><br />
                            </>
                                )
                            }
                                )
                     } 
                </Modal>
            </div>
        </div>
    );
};

export default DoctorList;