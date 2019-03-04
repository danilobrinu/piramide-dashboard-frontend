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
    receiverStreet,
    receiverDistrict,
    receiverProvince,
    paymentCondition,
    shippingCondition,
    receiverCondition,
    reasonTransfer,
    deliveryDate,
    deliveryHour,
    advancePayments,
  } = props;
  const handleClose = () =>
    setFinishCreateOrderModal(current => ({
      ...current,
      open: false,
    }));
  const handleNewSalesOrder = () => {
    handleClose();
    setTimeout(() => window.location.reload(), 300);
  };

  return (
    <Modal
      dismissible={false}
      onRequestClose={handleClose}
      footer={
        finishCreateOrderModal.promptType === 'success' ? (
          <Button
            label="Click para realizar otro pedido"
            onClick={handleNewSalesOrder}
          />
        ) : (
          <Button label="Cerrar" onClick={handleClose} />
        )
      }
      isOpen={finishCreateOrderModal.open}
      prompt={finishCreateOrderModal.promptType}
      size="medium"
      title={finishCreateOrderModal.title}
    >
      <div className="slds-m-around_medium">
        {finishCreateOrderModal.promptType !== 'success' &&
          finishCreateOrderModal.description}
        {finishCreateOrderModal.promptType === 'success' && (
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
        )}
      </div>
    </Modal>
  );
};

export default FinishCreateSalesOrderModal;
