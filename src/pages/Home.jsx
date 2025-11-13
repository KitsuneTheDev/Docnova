import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices } from "../redux/slices/invoiceSlice";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";

export default function Home() {
    dayjs.extend(dayOfYear);
    const today = dayjs();
    const initialBody = useMemo(() => ({
                documentType: "OUTGOING",
                endDate: today.toISOString(),
                page: 0,
                size: 20,
                startDate: today.subtract(1, 'month').toISOString(),
                referenceDocument: "",
                type: null,
                status: null,
                paymentStatus: null,
                isDeleted: false,
            }
        ), [today.dayOfYear()]);

    const [body, setBody] = useState(initialBody);
    const [data, setData] = useState(null);

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

    if(!data) {
        return(
            <div>
                <h1>No data to display.</h1>
            </div>
        )
    }

    return(
        <div>
            {data.map((data, index) => <h2>DATA</h2>)}
        </div>
    );
}