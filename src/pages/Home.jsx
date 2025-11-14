import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices } from "../redux/slices/invoiceSlice";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import { Table, Spin, Alert, Card, Tag, Typography } from 'antd';
import { useTranslation } from "react-i18next";

const { Title } = Typography;

export default function Home() {

    // t: translate function, i18n: language translation object
    const { t, i18n } = useTranslation();

    // POST BODY PART START
    dayjs.extend(dayOfYear);
    const today = dayjs();
    const initialBody = useMemo(() => ({
                documentType: "OUTGOING",
                endDate: "2025-07-04T08:31:10.422Z",
                page: 0,
                size: 20,
                startDate: "2025-06-04T08:31:10.422Z",
                referenceDocument: "",
                type: null,
                status: null,
                paymentStatus: null,
                isDeleted: false,
            }
        ), [today.dayOfYear()]);

    const [body, setBody] = useState(initialBody);

    // POST BODY PART END

    // redux variables
    const { loading, error, invoices } = useSelector((state) => state.invoiceReducer);

    const navigate = useNavigate();
    //fetch logic
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInvoices(body)).then((result) => {
            if(result.payload) {
                console.log(result.payload);
            } else {
                console.error(result);
            }
        })
    }, [dispatch, initialBody])

    // display

    // TABLE DEFINITION START
    const columns = [
        {
            title: t('tableHeaders.invoiceNumber'),
            dataIndex: 'invoiceNumber',
            key: 'invoiceNumber',
            align: 'center',
            render: (text) => <strong>{text}</strong>
        },
        {
            title: t('tableHeaders.supplier'),
            dataIndex: 'supplierName',
            key: 'supplierName',
            align: 'center',
        },
        {
            title: t('tableHeaders.date'),
            dataIndex: 'issueDate',
            key: 'issueDate',
            align: 'center',
            render: (date) => dayjs(date).format('ddd / DD.MM.YYYY') 
        },
        {
            title: `${t('tableHeaders.amount')} (EUR)`,
            dataIndex: 'payableAmount',
            key: 'payableAmount',
            align: 'center',
            sorter: (a, b) => a.payableAmount - b.payableAmount,
            render: (payableAmount, record) => payableAmount ? `${parseFloat(payableAmount).toFixed(2)} ${record.currency}` : '-'
        },
        {
            title: t('tableHeaders.paymentStatus'),
            dataIndex: 'paymentDetails',
            key: 'paymentStatus',
            align: 'center',
            render: (details) => {
                const status = details?.paymentStatus || t('tableHeaders.paymentPending');
                const color = status === 'SENT' ? 'success' : (status === t('tableHeaders.paymentPending')) ? 'warning' : 'default';
                return <Tag color={color} >{status}</Tag>
            }
        },
        {
            title: t('tableHeaders.details'),
            key: 'action',
            align: 'center',
            render: (text, record) => {
                return(
                    <a onClick={() => navigate(`/details/${record.id}`)} >{t('tableHeaders.details')}</a>
                );
            }
        }
    ]
    // TABLE DEFINITION END
    if(loading) {
        return(
            <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin size="large" tip={t('invoiceLoading')} style={{display: 'block', margin: '32px auto'}} />
            </div>
        );
    }

    if(invoices?.invoices.content.length === 0 || !invoices) {
        return(
            <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card title={t('invoiceListTitle')} style={{ margin: '24px' }} >
                    <Alert message={t('alertInfo')} description={t('noData')} type="info" showIcon />
                </Card>
            </div>
        )
    }

    return(
            <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Table
                    columns={columns}
                    dataSource={invoices.invoices.content}
                    rowKey="id"
                    pagination={{ pageSize: 20 }}
                />
            </div>
    );
}