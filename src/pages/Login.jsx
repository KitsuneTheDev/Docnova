import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { Form, Input, Button, Card, Typography, Spin, Alert, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";

const { Title } = Typography;

export default function Login() {

    const { t, i18n } = useTranslation();

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
        <div style={{display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', boxSizing: 'border-box'}} >
            <Card title={<Title style={{textAlign: 'center'}} level={3} >{t('LoginTitle')}</Title>} >
                <Form
                    name="login-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: t('requiredEmail') }]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder={t('emailPlaceholder')} 
                            type="email"
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: t('requiredPassword') }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type='password'
                            placeholder={t('passwordPlaceholder')}
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
                            {loading ? t('loginMessage') : t('loginButton')}
                        </Button>
                    </Form.Item>
                </Form>
                {error && <Alert message={t('loginErrorMessage')} type="error" showIcon style={{marginTop: '16px', padding: '8px 16px'}} />}
            </Card>
        </div>
    );
}