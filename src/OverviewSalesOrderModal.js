import React from 'react';
import { useAppState } from './AppContext';
import { Modal } from '@salesforce/design-system-react';

////////////////////////////////////////////////////////////////////////////////////////////////////

import OverviewSalesOrder from './OverviewSalesOrder';

////////////////////////////////////////////////////////////////////////////////////////////////////

function OverviewSalesOrderModal() {
  const [state, dispatch] = useAppState();
  const handleClose = () =>
    dispatch({
      type: 'SET_OVERVIEW_SALES_ORDER_MODAL',
      payload: {
        ...state.overviewSalesOrderModal,
        open: false,
      },
    });

  return (
    <Modal
      onRequestClose={handleClose}
      isOpen={state.overviewSalesOrderModal.open}
      size="medium"
      heading={state.overviewSalesOrderModal.title}
    >
      <OverviewSalesOrder />
    </Modal>
  );
}

export default OverviewSalesOrderModal;
