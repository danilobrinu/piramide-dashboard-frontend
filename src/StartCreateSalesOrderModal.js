import React from 'react';
import { useAppState } from './AppContext';
import { Modal, Spinner } from '@salesforce/design-system-react';

function StartCreateSalesOrderModal() {
  const [state] = useAppState();

  return (
    <Modal
      disableClose={false}
      isOpen={state.startCreateSalesOrderModal.open}
      prompt={state.startCreateSalesOrderModal.promptType}
      size="medium"
      heading={state.startCreateSalesOrderModal.title}
    >
      <div className="slds-m-around_medium">
        {state.startCreateSalesOrderModal.description}
        <div className="slds-is-relative slds-grid" style={{ height: 64 }}>
          <Spinner size="small" variant="base" />
        </div>
      </div>
    </Modal>
  );
}

export default StartCreateSalesOrderModal;
