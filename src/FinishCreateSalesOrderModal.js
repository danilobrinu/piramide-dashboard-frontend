import React from 'react';
import { Modal } from '@salesforce/design-system-react';

import OverviewSalesOrder from './OverviewSalesOrder';

const FinishCreateSalesOrderModal = props => {
  const {
    finishCreateOrderModal,
    setFinishCreateOrderModal,
    products,
    purchaseOrder,
    orderType,
    requester,
    paymentCondition,
    shippingCondition,
    reasonTransfer,
    deliveryDate,
    deliveryHour,
    advancePayments,
  } = props;
  const handleClose = () =>
    setFinishCreateOrderModal({
      ...finishCreateOrderModal,
      open: false,
    });

  return (
    <Modal
      dismissible={false}
      onRequestClose={handleClose}
      isOpen={finishCreateOrderModal.open}
      prompt={finishCreateOrderModal.promptType}
      size="medium"
      title={finishCreateOrderModal.title}
    >
      <div className="slds-m-around_medium">
        {finishCreateOrderModal.description}
        {finishCreateOrderModal.promptType === 'success' && (
          <OverviewSalesOrder
            products={products}
            purchaseOrder={purchaseOrder}
            orderType={orderType}
            requester={requester}
            paymentCondition={paymentCondition}
            shippingCondition={shippingCondition}
            reasonTransfer={reasonTransfer}
            deliveryDate={deliveryDate}
            deliveryHour={deliveryHour}
            advancePayments={advancePayments}
          />
        )}
      </div>
    </Modal>
  );
};

export default FinishCreateSalesOrderModal;
