import type { IInvoice } from '@Services/ApiServiceClient';

import Invoice from '@Components/invoices/invoice/Invoice';
import IllustrationEmpty from '@Svg/illustration-empty.svg';

import styles from './InvoiceList.module.scss';

interface IProps {
  invoices: IInvoice[] | undefined;
}

function InvoiceList(props: IProps): JSX.Element {
  const { invoices } = props;
  const invoicesList = invoices?.map((el) => (
    <Invoice
      key={el.id}
      invoiceId={el.id}
      slug={el.slug}
      paymentDue={el.paymentDue}
      clientName={el.clientName}
      total={el.total}
      status={el.status}
    />
  ));

  const noInvoices = (
    <>
      <img src={IllustrationEmpty} alt="" />
      <h2>There is nothing here</h2>
      <p>
        Create an invoice by clicking the <b>New Invoice</b> button and get started
      </p>
    </>
  );

  const containerClassname = invoices ? 'container__invoices' : 'container__noInvoices';

  return (
    <div className={styles['container']}>
      <div className={styles[`${containerClassname}`]}>{invoices ? invoicesList : noInvoices}</div>
    </div>
  );
}

export default InvoiceList;
