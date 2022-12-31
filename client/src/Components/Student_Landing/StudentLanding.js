import react, { useState,useEffect } from "react";
import {Link} from 'react-router-dom';
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import { Table, Tag, Space } from 'antd';

import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

import {urlss} from "../../actions/crud"
import { useDispatch , useSelector } from "react-redux";

import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import {comp} from "../../actions/crud"
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


// import Updates from './Updates';
// import Post from './post'
// import Complaints from './Complaints';
// import Messpage from './Messpage';
// import LeaveForm from './Outpass';
// import Display from "./display";
// import Payments from "./payment";
const { Header, Content, Footer, Sider } = Layout;

const { Column, ColumnGroup } = Table;

const StudentLanding = () =>
{
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [loading , setloading] = useState(true);
  const [data ,setdata] = useState([]);
  const today = Date.now();


  function onFinish(values) {
    console.log('Received values of form: ', values);
    const Value = {
      ...values,
      'Emp_Id' : user?.result.Emp_Id,
      "Complained_Date": new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(today),
    };
    console.log(Value);
    dispatch(comp(Value));
    form.resetFields();
    fetch();
  }

  const fetch = () => {
    console.log("lkj")
    dispatch(urlss());
  }

  useEffect(() => {
    fetch();
  },[]);


  const post = useSelector( (state) => state.url.data);
  console.log(post);

  const post1 = useSelector( (state) => state.comp.data);
  console.log(post1);

  useEffect(() => {
    if(post){
      setdata(post);
      setloading(false);
    }
  });

        return(
          <div>
              <Table dataSource={data}>
          <Column title="Full Name" dataIndex="full" key="full" />
          <Column title="Short Url" dataIndex="short" key="short" />
          <Column title="Date" dataIndex="Date_Of_Issue" key="Date_Of_Issue" />
          <Column title="Clicks" dataIndex="clicks" key="clicks" />
          <Column
            title="Open Link"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                {/* <Button type="link" onClick = {() => {
                  console.log(record.short);
                  const zxc = `http:localhost:5000/${record.short}`;
                  console.log(zxc);
                  window.location.href(zxc)
                  }}>
                  View More
                </Button> */}
                {/* {const zxc = `http:localhost:5000/${record.short}`} */}
                <a target="_blank" href={`http:localhost:5000/${record.short}`} >{record.short}</a>
                {fetch()}
                {/* <a target="_blank" href="https://meetflo.zendesk.com/hc/en-us/articles/230425728-Privacy-Policies">Policies</a> */}
              </Space>
            )}
          />
          </Table>  
          
          <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
            <Form.Item name = "fullUrl" label="Link" style={{ width : "55rem"  }}>
          <Input />
        </Form.Item>
 

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          submit
        </Button>
      </Form.Item>
    </Form>
          </div>      
        );
};
export default StudentLanding;



