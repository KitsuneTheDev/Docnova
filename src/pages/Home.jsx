import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices } from "../redux/slices/invoiceSlice";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import { Spin } from "antd";

export default function Home() {
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

    const { loading, error, invoices } = useSelector((state) => state.invoiceReducer);

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

    if(loading) {
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    if(!invoices) {
        return(
            <div>
                <h1>No data to display.</h1>
            </div>
        )
    }

    return(
        <div>
            {invoices.invoices.content.map((invoice, index) => <h2 key={index}>DATA</h2>)}
        </div>
    );
}