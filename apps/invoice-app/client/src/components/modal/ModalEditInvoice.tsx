import type { IInvoice } from '#Services/ApiServiceClient';

import FormButtons from './FormButtons';
import SidePanel from './SidePanel';

import styles from './ModalEditInvoice.module.scss';

interface IProps {
  invoice: IInvoice;
}

function ModalEditInvoice(props: IProps): JSX.Element {
  const { invoice } = props;
  return (
    <SidePanel title="Edit" invoice={invoice}>
      <FormButtons>
        <div className={styles['btns']}>
          <FormButtons.CancelBtn />
          <FormButtons.SaveChangesBtn />
        </div>
      </FormButtons>
    </SidePanel>
  );
}

export default ModalEditInvoice;
