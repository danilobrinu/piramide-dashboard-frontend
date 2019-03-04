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
    receiverCondition,
    receiverStreet,
    receiverDistrict,
    receiverProvince,
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
      onRequestClose={handleClose}
      isOpen={overviewSalesOrderModal.open}
      size="medium"
      title={overviewSalesOrderModal.title}
    >
      <OverviewSalesOrder
        products={products}
        purchaseOrder={purchaseOrder}
        orderType={orderType}
        requester={requester}
        receiverStreet={receiverStreet}
        receiverDistrict={receiverDistrict}
        receiverProvince={receiverProvince}
        paymentCondition={paymentCondition}
        shippingCondition={shippingCondition}
        receiverCondition={receiverCondition}
        reasonTransfer={reasonTransfer}
        deliveryDate={deliveryDate}
        deliveryHour={deliveryHour}
        advancePayments={advancePayments}
      />
    </Modal>
  );
};

export default OverviewSalesOrderModal;
