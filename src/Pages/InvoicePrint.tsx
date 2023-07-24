import { useParams } from "react-router-dom";
import Invoice, { InvoiceParams } from "../Components/Invoice";
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import { Button, Center } from "@mantine/core";

function InvoicePrint() {
  const { payment_amount, payment_date, loan_number } =
    useParams<InvoiceParams>();
    const componentRef = useRef<HTMLDivElement | null>(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

  return (
    <div>
        { payment_amount && payment_date && loan_number ? 
        <>
        <Center><Button onClick={handlePrint} my={"xl"}>Print</Button></Center>
        <div ref={componentRef}>
        <Invoice
            loan_number={loan_number}
            payment_amount={payment_amount}
            payment_date={payment_date}
            />
        </div>
        </>
        : <h1>404</h1>
        }
    </div>
  );
}

export default InvoicePrint;
