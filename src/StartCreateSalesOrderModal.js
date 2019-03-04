import React from 'react';
import { Modal, Spinner } from '@salesforce/design-system-react';

const StartCreateSalesOrderModal = props => {
  const {
    startCreateSalesOrderModal: { open, promptType, title, description },
  } = props;

  return (
    <Modal
      dismissible={false}
      isOpen={open}
      prompt={promptType}
      size="medium"
      title={title}
    >
      <div className="slds-m-around_medium">
        {description}
        <div className="slds-is-relative slds-grid" style={{ height: 64 }}>
          <Spinner size="small" variant="base" />
        </div>
      </div>
    </Modal>
  );
};

export default StartCreateSalesOrderModal;
