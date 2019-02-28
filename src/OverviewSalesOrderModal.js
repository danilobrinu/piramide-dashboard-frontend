import React from 'react';
import { Modal } from '@salesforce/design-system-react';

import OverviewSalesOrder from './OverviewSalesOrder';

const OverviewSalesOrderModal = props => {
  const {
    overviewSalesOrderModal,
    setOverviewSalesOrderModal,
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
    setOverviewSalesOrderModal({ ...overviewSalesOrderModal, open: false });

  return (
    <Modal
      dismissible={true}
      onRequestClose={handleClose}
      isOpen={overviewSalesOrderModal.open}
      prompt={overviewSalesOrderModal.promptType}
      size="medium"
      title={overviewSalesOrderModal.title}
    >
      <div className="slds-m-around_medium">
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
      </div>
    </Modal>
  );
};

export default OverviewSalesOrderModal;
