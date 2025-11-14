import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Alert, Card, Descriptions, Spin, Typography, Tag, Divider } from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

export default function Details() {

    const [invoice, setInvoice] = useState({});
    // redux variables
    const { loading, error, invoices } = useSelector((state) => state.invoiceReducer);
    // id from params
    const { id } = useParams();

    const navigate = useNavigate();

    // filter invoices by compId
    useEffect(() => {
        if(!loading) {
            const invoiceList = invoices?.invoices.content;
            const filteredContent = invoiceList?.find((i) => i.id === id);

            if(filteredContent) {
                setInvoice(filteredContent);
            } else {
                setInvoice(null);
                navigate('/404');
            }
        }
    }, [loading, id])

    console.log("invoice -->", invoice);
    if(loading) {
        return(
            <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin size="large" tip="Faturalar Yükleniyor..." style={{display: 'block', margin: '32px auto'}} />
            </div>
        );
    }

    if(error) {
          return(
            <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Alert message="Hata" description={`Veri hatası: ${error}`} type='error' showIcon style={{ margin: '32px' }} />
            </div>
        );      
    }

    if(!invoice) {
          return(
            <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Alert message="Fatura Bulunamadı" description={`ID: ${id} iel eşleşen fatura kaydı bulunamadı.`} type='warning' showIcon style={{ margin: '32px' }} />
            </div>
        );      
    }

    const statusTag = (status) => {
        const color = status === 'SAVED_AS_ZUGFERD' ? 'blue' : 'default';
        return <Tag color={color}>{status}</Tag>;
    };

    return(
        <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card
                title={<Title level={3} style={{ margin: '16px' }} >Fatura Detayları: {invoice.invoiceNumber || invoice.id}</Title>}
            >
                <Divider orientation="left" ><Title level={4}>Genel Bilgiler</Title></Divider>

                <Descriptions bordered column={{ xs: 1, sm: 2, lg: 3 }} size="middle">
                    <Descriptions.Item label="Fatura Numarası">
                        <Text strong >{invoice.invoiceNumber}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Durum">
                        {statusTag(invoice.status)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tür">
                        {invoice.documentType}
                    </Descriptions.Item>
                    <Descriptions.Item label="Düzenlenme Tarihi">
                        {dayjs(invoice.issueDate).format('ddd - DD/MM/YYYY')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Vade Tarihi">
                        {invoice.dueDate ? dayjs(invoice.dueDate).format('ddd - DD/MM/YYYY') : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Oluşturulma Tarihi">
                        {dayjs(invoice.createdTime).format('ddd - DD/MM/YYYY')}
                    </Descriptions.Item>
                </Descriptions>

                <Divider orientation="left" ><Title level={4}>Mali Bilgiler</Title></Divider>

                <Descriptions bordered column={3} size="middle">
                    <Descriptions.Item label="Toplam Tutar">
                        <Text strong>{`${parseFloat(invoice.paymentDetails?.totalAmount).toFixed(2)} ${invoice.currency}`}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Ödenecek Tutar">
                        <Text strong type="success">{`${parseFloat(invoice.payableAmount).toFixed(2)} ${invoice.currency}`}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Vergi Hariç Tutar">
                        {`${parseFloat(invoice.taxExclusiveAmount).toFixed(2)} ${invoice.currency}`}
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="Ödeme Durumu" span={3}>
                        <Tag color={invoice.paymentDetails?.paymentStatus === 'SENT' ? 'success' : 'processing'}>
                            {invoice.paymentDetails?.paymentStatus || 'BEKLİYOR'}
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>

                <Divider orientation="left"><Title level={4}>Taraf Bilgileri</Title></Divider>
                
                <Descriptions bordered column={2} size="middle">
                    <Descriptions.Item label="Tedarikçi Adı (Biz)">
                        {invoice.supplierName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Müşteri Adı">
                        {invoice.customerName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tedarikçi Ülke Kodu">
                        {invoice.supplierCountryCode || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Müşteri Ülke Kodu">
                        {invoice.customerCountryCode || '-'}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>  
    );
}