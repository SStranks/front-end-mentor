import type { IInvoice } from '@Services/ApiServiceClient';

import { useState } from 'react';

import InvoiceList from '@Components/invoices/invoice-list/InvoiceList';
import UtilityBar from '@Components/invoices/utilitybar/UtilityBar';
import ContentLayout from '@Layouts/ContentLayout';

export interface IFilterStatus {
  draft: boolean;
  paid: boolean;
  pending: boolean;
}

interface IProps {
  invoices: IInvoice[] | undefined;
}

function Main(props: IProps): JSX.Element {
  let { invoices } = props;
  const [filterStatus, setFilterStatus] = useState<IFilterStatus>({
    draft: true,
    paid: true,
    pending: true,
  });

  invoices = invoices?.filter((invoice) => {
    return filterStatus[invoice.status as keyof IFilterStatus];
  });

  return (
    <ContentLayout>
      <UtilityBar
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        numberInvoicesTotal={invoices?.length}
      />
      <InvoiceList invoices={invoices} />
    </ContentLayout>
  );
}

export default Main;
