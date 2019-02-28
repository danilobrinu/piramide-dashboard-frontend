import React from 'react';
import { Modal } from '@salesforce/design-system-react';

const StartCreateSalesOrderModal = props => {
  const { startCreateSalesOrderModal } = props;

  return (
    <Modal
      dismissible={false}
      isOpen={startCreateSalesOrderModal.open}
      prompt={startCreateSalesOrderModal.promptType}
      size="medium"
      title={startCreateSalesOrderModal.title}
    >
      <div className="slds-m-around_medium">
        {startCreateSalesOrderModal.description}
      </div>
    </Modal>
  );
};

export default StartCreateSalesOrderModal;
