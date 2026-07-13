import { Link } from 'react-router-dom';

import Status from '@Components/custom/buttons/status/Status';
import ArrowRight from '@Svg/icon-arrow-right.svg';
import currencyFormatter from '@Utils/currencyFormatter';

import styles from './Invoice.module.scss';

interface IProps {
  clientName: string;
  invoiceId: string;
  paymentDue: string;
  slug: string;
  status: string;
  total: number;
}

function Invoice(props: IProps): JSX.Element {
  const { invoiceId, slug, paymentDue, clientName, total, status } = props;

  return (
    <Link to={`/invoice/${invoiceId}`}>
      <div className={styles['container']}>
        <p className={styles['container__code']}>
          #<span className={styles['container__code--black']}>{slug}</span>
        </p>
        <p className={styles['container__date']}>Due {paymentDue}</p>
        <p className={styles['container__name']}>{clientName}</p>
        <p className={styles['container__amount']}>£ {currencyFormatter(total)}</p>
        <div className={styles['container__status']}>
          <Status status={status} />
        </div>
        <div className={styles['container__arrowright']}>
          <img src={ArrowRight} alt="" />
        </div>
      </div>
    </Link>
  );
}

export default Invoice;
