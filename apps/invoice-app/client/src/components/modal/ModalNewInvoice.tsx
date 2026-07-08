import FormButtons from './FormButtons';
import SidePanel from './SidePanel';

import styles from './ModalNewInvoice.module.scss';

function ModalNewInvoice(): JSX.Element {
  return (
    <SidePanel title="New Invoice">
      <FormButtons>
        <div className={styles['btnsLayout']}>
          <FormButtons.DiscardBtn />
          <FormButtons.SaveDraftBtn />
          <FormButtons.SaveSendBtn />
        </div>
      </FormButtons>
    </SidePanel>
  );
}

export default ModalNewInvoice;
