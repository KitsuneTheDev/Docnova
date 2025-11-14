import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { Form, Input, Button, Card, Typography, Spin, Alert, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // redux states
    const { loading, error} = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();

    const onFinish = (values) => {
        const userCredentials = values;
        dispatch(loginUser(userCredentials)).then((result) => {
            if(result.payload) {
                console.log(result.payload);
                setEmail("");
                setPassword("");
            } else {
                console.error(result);
            }
        });
    }

    return(
        <div style={{display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh'}} >
            <Card title={<Title style={{textAlign: 'center'}} level={3} >Sisteme Giriş</Title>} >
                <Form
                    name="login-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Geçerli e-posta giriniz.' }]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="E-posta" 
                            type="email"
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Geçerli bir şifre giriniz.' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Şifre"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: '100%' }}
                            loading={loading}
                            disabled={loading}
                        >
                            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                        </Button>
                    </Form.Item>
                </Form>
                {error && <Alert message="Giriş hatası" type="error" showIcon style={{marginTop: '16px', padding: '8px 16px'}} />}
            </Card>
        </div>
    );
}