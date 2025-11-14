import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Alert, Card, Descriptions, Spin, Typography, Tag, Divider } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

export default function Details() {

    const { t, i18n } = useTranslation();

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
            <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin size="large" tip={t('loadingInvoices')} style={{display: 'block', margin: '32px auto'}} />
            </div>
        );
    }

    if(error) {
          return(
            <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Alert message={t('errorTitle')} description={`${t('dataError')}: ${error}`} type='error' showIcon style={{ margin: '32px' }} />
            </div>
        );      
    }

    if(!invoice) {
          return(
            <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Alert message={t('invoiceNotFound')} description={`ID: ${id} ${t('invoiceNotFoundDetails')}`} type='warning' showIcon style={{ margin: '32px' }} />
            </div>
        );      
    }

    const statusTag = (status) => {
        const color = status === 'SAVED_AS_ZUGFERD' ? 'blue' : 'default';
        return <Tag color={color}>{status}</Tag>;
    };

    return(
        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card
                title={<Title level={3} style={{ margin: '16px' }} >{t('invoiceDetailsTitle')}: {invoice.invoiceNumber || invoice.id}</Title>}
            >
                <Divider orientation="left" ><Title level={4}>{t('detailsHeaders.generalTitle')}</Title></Divider>

                <Descriptions bordered column={{ xs: 1, sm: 2, lg: 3 }} size="middle">
                    <Descriptions.Item label={t('detailsHeaders.invoiceNumber')}>
                        <Text strong >{invoice.invoiceNumber}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={t('detailsHeaders.status')}>
                        {statusTag(invoice.status)}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('detailsHeaders.type')}>
                        {invoice.documentType}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('detailsHeaders.issueDate')}>
                        {dayjs(invoice.issueDate).format('ddd - DD/MM/YYYY')}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('detailsHeaders.dueDate')}>
                        {invoice.dueDate ? dayjs(invoice.dueDate).format('ddd - DD/MM/YYYY') : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('detailsHeaders.createdDate')}>
                        {dayjs(invoice.createdTime).format('ddd - DD/MM/YYYY')}
                    </Descriptions.Item>
                </Descriptions>

                <Divider orientation="left" ><Title level={4}>{t('detailsHeaders.financialTitle')}</Title></Divider>

                <Descriptions bordered column={3} size="middle">
                    <Descriptions.Item label={t('detailsHeaders.totalAmount')}>
                        <Text strong>{`${parseFloat(invoice.paymentDetails?.totalAmount).toFixed(2)} ${invoice.currency}`}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={t('detailsHeaders.payableAmount')}>
                        <Text strong type="success">{`${parseFloat(invoice.payableAmount).toFixed(2)} ${invoice.currency}`}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={t('detailsHeaders.taxExc')}>
                        {`${parseFloat(invoice.taxExclusiveAmount).toFixed(2)} ${invoice.currency}`}
                    </Descriptions.Item>
                    
                    <Descriptions.Item label={t('detailsHeaders.paymentStatus')} span={3}>
                        <Tag color={invoice.paymentDetails?.paymentStatus === 'SENT' ? 'success' : 'processing'}>
                            {invoice.paymentDetails?.paymentStatus || t('tableHeaders.paymentPending')}
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>

                <Divider orientation="left"><Title level={4}>{t('detailsHeaders.supplierTitle')}</Title></Divider>
                
                <Descriptions bordered column={2} size="middle">
                    <Descriptions.Item label={t('detailsHeaders.supplierName')}>
                        {invoice.supplierName}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('detailsHeaders.customerName')}>
                        {invoice.customerName}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('detailsHeaders.supplierCountry')}>
                        {invoice.supplierCountryCode || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('detailsHeaders.customerCountry')}>
                        {invoice.customerCountryCode || '-'}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>  
    );
}