import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@Components/custom/button/Button';
import FormFeedbackNew from '@Components/form/feedback-new/Form';
import Modal from '@Components/modal/Modal';
import IconArrowLeft from '@Svg/shared/icon-arrow-left.svg';

import styles from './_UtilityBar.module.scss';

function UtilityBar() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.bar}>
      <div className={styles.bar__nav}>
        <Link to="/">
          <div className={styles.bar__link}>
            <img src={IconArrowLeft} alt="" />
            <p>Go Back</p>
          </div>
        </Link>
        <h3>Roadmap</h3>
      </div>
      <div className={styles.bar__btn}>
        <Button text="+ Add Feedback" onClick={() => setModalOpen(true)} disabled={false} classList={['bg-magenta']} />
      </div>
      <Modal handleClose={() => setModalOpen(false)} modalOpen={modalOpen}>
        <FormFeedbackNew setModalOpen={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default UtilityBar;
