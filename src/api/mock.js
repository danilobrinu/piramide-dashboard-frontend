import moment from 'moment';
import {
  orderTypeList,
  requesterList,
  receiverList,
  shippingConditionList,
  paymentConditionList,
  reasonTransferList,
  materialList,
  advancePayments,
} from './data';

export const getOrderTypeList = () => {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(orderTypeList), 300);
  });
};

export const getRequesterList = () => {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(requesterList), 300);
  });
};

export const getReceiverList = () => {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(receiverList), 300);
  });
};

export const getShippingConditionList = () => {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(shippingConditionList), 300);
  });
};

export const getPaymentConditionList = () => {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(paymentConditionList), 300);
  });
};

export const getReasonTransferList = () => {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(reasonTransferList), 300);
  });
};

export const getAdvancePayments = () => {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(advancePayments), 300);
  });
};

export const getMaterialList = () => {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(materialList), 300);
  });
};

export const validDeliveryDate = (
  input = {
    I_FECHA_ENTREGA: '20181218',
  }
) => {
  return new Promise((resolve, _) => {
    const output = {
      E_DATE: moment().format('YYYYMMDD'),
      E_MSG: [],
    };
    setTimeout(() => resolve(output), 300);
  });
};

export const simulateSaleOrder = (
  input = {
    I_HEADER: {
      DOCT_TYPE: 'ZPNE',
      SALES_ORG: '1000',
      DISTR_CHAN: '10',
      DIVISION: '10',
      REQ_DATE_H: '20181218',
      PURCH_NO_C: 'OC 1234567890',
      SOLICITANTE: '4000000007',
      DESTINATARIO: '4000000007',
    },
    I_ITEMS: [
      {
        ITM_NUMBER: '000010',
        MATERIAL: '0400000229',
        PLANT: '1000',
        TARGET_QTY: '00000000000000200000',
      },
    ],
  }
) => {
  return new Promise((resolve, _) => {
    const data = {
      ET_MSG: [],
    };
    setTimeout(() => resolve(data), 300);
  });
};

export const createSaleOrder = (
  input = {
    I_HEADER: {
      DOCT_TYPE: 'ZPNE',
      SALES_ORG: '1000',
      DISTR_CHAN: '10',
      DIVISION: '10',
      REQ_DATE_H: '20181218',
      PURCH_NO_C: 'OC 1234567890',
      SOLICITANTE: '4000000007',
      DESTINATARIO: '4000000007',
    },
    I_ITEMS: [
      {
        ITM_NUMBER: '000010',
        MATERIAL: '0400000229',
        PLANT: '1000',
        TARGET_QTY: '00000000000000200000',
      },
    ],
  }
) => {
  return new Promise((resolve, _) => {
    const output = {
      ET_MSG: [],
    };
    setTimeout(() => resolve(output), 300);
  });
};
