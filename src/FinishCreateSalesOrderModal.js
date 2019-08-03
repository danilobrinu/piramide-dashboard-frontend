import React from 'react';
import { useAppState } from './AppContext';
import { Button, Modal } from '@salesforce/design-system-react';

////////////////////////////////////////////////////////////////////////////////////////////////////

import OverviewSalesOrder from './OverviewSalesOrder';

////////////////////////////////////////////////////////////////////////////////////////////////////

const FinishCreateSalesOrderModal = props => {
  const [state, dispatch] = useAppState();
  const handleClose = () =>
    dispatch({
      type: 'SET_FINISH_CREATE_SALES_ORDER_MODAL',
      payload: { ...state.finishCreateSalesOrderModal, open: false },
    });
  const handleNewSalesOrder = () => {
    handleClose();
    setTimeout(() => window.location.reload(), 300);
  };

  return (
    <Modal
      dismissible={false}
      onRequestClose={handleClose}
      footer={
        state.finishCreateSalesOrderModal.promptType === 'success' ? (
          <Button label="Click para realizar otro pedido" onClick={handleNewSalesOrder} />
        ) : (
          <Button label="Cerrar" onClick={handleClose} />
        )
      }
      isOpen={state.finishCreateSalesOrderModal.open}
      prompt={state.finishCreateSalesOrderModal.promptType}
      size="medium"
      title={state.finishCreateSalesOrderModal.title}
    >
      <div className="slds-m-around_medium">
        {state.finishCreateSalesOrderModal.promptType !== 'success' &&
          state.finishCreateSalesOrderModal.description}
        {state.finishCreateSalesOrderModal.promptType === 'success' && <OverviewSalesOrder />}
      </div>
    </Modal>
  );
};

export default FinishCreateSalesOrderModal;
