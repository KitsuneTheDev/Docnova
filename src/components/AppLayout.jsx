import { Layout, Menu, Button, Space, message } from "antd";
import { LogoutOutlined, FileTextOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router";
import { logout } from '../redux/slices/userSlice';
import { useTranslation } from 'react-i18next';

const { Header, Content } = Layout;

export default function AppLayout() {

    // t: translate function, i18n: language translation object
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        message.info('Çıkış yapılıyor.');
        navigate('/login');
    };

    // Toggle language
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return(
        <div style={{display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh'}} >
            <Layout style={{width: '100%', height: '100%'}}>
                <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 24px' }}>
                    <div style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}}>
                        Docnova
                    </div>
                    <Button type={i18n.language === 'tr' ? 'primary' : 'default'} onClick={() => changeLanguage('tr')}>TR</Button>
                    <Button type={i18n.language === 'en' ? 'primary' : 'default'} onClick={() => changeLanguage('en')}>EN</Button>
                </Header>
                <Button 
                    type="primary" 
                    danger
                    orientation='right'
                    icon={<LogoutOutlined />} 
                    onClick={handleLogout}
                    style={{ width: '120px', marginTop: '8px' }}
                >
                    Çıkış Yap
                </Button>
                <Content style={{ padding: '0 24px' }}>
                    <div style={{ minHeight: 'calc(100vh - 64px)', marginTop: 24, background: '#fff', padding: 24 }}>
                        <Outlet /> 
                    </div>
                </Content>
            </Layout>
        </div>
    );
}