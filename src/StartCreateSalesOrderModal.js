import React from 'react';
import { Modal } from '@salesforce/design-system-react';

const StartCreateSalesOrderModal = props => {
  const { startCreateOrderModal } = props;

  return (
    <Modal
      dismissible={false}
      isOpen={startCreateOrderModal.open}
      prompt={startCreateOrderModal.promptType}
      size="medium"
      title={startCreateOrderModal.title}
    >
      <div className="slds-m-around_medium">
        {startCreateOrderModal.description}
      </div>
    </Modal>
  );
};

export default StartCreateSalesOrderModal;
