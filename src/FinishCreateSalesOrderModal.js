import React from 'react';
import { Button, Modal } from '@salesforce/design-system-react';

import OverviewSalesOrder from './OverviewSalesOrder';

const FinishCreateSalesOrderModal = props => {
  const {
    finishCreateOrderModal,
    setFinishCreateOrderModal,
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
    salesOrderDoc,
  } = props;
  const handleClose = () =>
    setFinishCreateOrderModal({
      ...finishCreateOrderModal,
      open: false,
    });
  const handleNewSalesOrder = () => {
    handleClose();
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <Modal
      dismissible={false}
      onRequestClose={handleClose}
      footer={
        <Button label="Realizar otro pedido" onClick={handleNewSalesOrder} />
      }
      isOpen={finishCreateOrderModal.open}
      prompt={finishCreateOrderModal.promptType}
      size="medium"
      title={finishCreateOrderModal.title}
    >
      <div className="slds-m-around_medium">
        {finishCreateOrderModal.description}
        {finishCreateOrderModal.promptType === 'success' && (
          <div>Nro de Orden: {salesOrderDoc}</div>
        )}
        {finishCreateOrderModal.promptType === 'success' && (
          <OverviewSalesOrder
            products={products}
            purchaseOrder={purchaseOrder}
            orderType={orderType}
            requester={requester}
            receiverCondition={receiverCondition}
            receiverStreet={receiverStreet}
            receiverDistrict={receiverDistrict}
            receiverProvince={receiverProvince}
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
