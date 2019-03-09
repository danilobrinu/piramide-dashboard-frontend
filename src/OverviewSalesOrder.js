import React from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { PEN, KG } from './utils/formats';

const OverviewOrder = props => {
  const {
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

  const subTotal = lodash.reduce(
    products.options,
    (acc, product) => acc + product.amount,
    0
  );
  const igv = lodash.reduce(
    products.options,
    (acc, product) => acc + product.igv,
    0
  );
  const total = subTotal + igv;
  const weight = lodash.reduce(
    products.options,
    (acc, product) => acc + product.weight,
    0
  );

  const purchaseOrderDesc = purchaseOrder;
  const orderTypeDesc =
    !!orderType.selection.length && orderType.selection[0].label;
  const requesterDesc =
    !!requester.selection.length && requester.selection[0].label;
  const receiverDistrictDesc =
    !!receiverDistrict.selection.length && receiverDistrict.selection[0].label;
  const receiverProvinceDesc =
    !!receiverProvince.selection.length && receiverProvince.selection[0].label;
  const requesterAddressDesc =
    !!requester.selection.length && requester.selection[0].subTitle;
  const receiverDesc =
    !!shippingCondition.selection.length &&
    shippingCondition.selection[0].value === '01'
      ? receiverCondition === '01'
        ? requesterAddressDesc
        : `${receiverStreet}, ${receiverDistrictDesc} - ${receiverProvinceDesc}`
      : 'Piramide';
  const paymentConditionDesc =
    !!paymentCondition.selection.length && paymentCondition.selection[0].label;
  const shippingConditionDesc =
    !!shippingCondition.selection.length &&
    shippingCondition.selection[0].label;
  const deliveryDateDesc =
    !!deliveryDate && moment(deliveryDate).format('DD/MM/YYYY');
  const deliveryHourDesc =
    !!deliveryHour && moment(deliveryHour).format('HH:mm');
  const reasonTransferDesc =
    !!reasonTransfer.selection.length && reasonTransfer.selection[0].label;

  const advancePayment =
    !!advancePayments.selection.length && advancePayments.selection[0];

  const totalDesc = PEN(total);
  const subTotalDesc = PEN(subTotal);
  const igvDesc = PEN(igv);
  const weightDesc = KG(weight);

  return (
    <>
      <section className="slds-p-around_medium">
        {/* Info */}
        <div className="slds-text-title_caps slds-m-bottom_x-small">
          Información
        </div>
        <div className="slds-box slds-m-bottom_small">
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">
              Orden de Compra
            </span>
            <span className="slds-truncate slds-col_bump-left">
              {purchaseOrderDesc}
            </span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">
              Clase de Pedido
            </span>
            <span className="slds-truncate slds-col_bump-left">
              {orderTypeDesc}
            </span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">
              Solicitante
            </span>
            <span className="slds-truncate slds-col_bump-left">
              {requesterDesc}
            </span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">
              Destinatario
            </span>
            <span className="slds-truncate slds-col_bump-left">
              {receiverDesc}
            </span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">
              Condición de Pago
            </span>
            <span className="slds-truncate slds-col_bump-left">
              {paymentConditionDesc}
            </span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">
              Condición de Entrega
            </span>
            <span className="slds-truncate slds-col_bump-left">
              {shippingConditionDesc}
            </span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">
              Fecha de entrega
            </span>
            <span className="slds-truncate slds-col_bump-left">
              {deliveryDateDesc}
            </span>
          </div>
          {!!deliveryHourDesc && (
            <div className="slds-grid slds-wrap">
              <span className="slds-truncate slds-text-title_bold">
                Hora de Cita
              </span>
              <span className="slds-truncate slds-col_bump-left">
                {deliveryHourDesc}
              </span>
            </div>
          )}
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">
              Motivo de Traslado
            </span>
            <span className="slds-truncate slds-col_bump-left">
              {reasonTransferDesc}
            </span>
          </div>
        </div>
        {/* Anticipo */}
        {advancePayment && (
          <>
            <div className="slds-text-title_caps slds-m-bottom_x-small">
              Anticipo
            </div>
            <div className="slds-box slds-m-bottom_small">
              <div className="slds-grid slds-wrap">
                <span className="slds-truncate slds-text-title_bold">
                  Serie
                </span>
                <span className="slds-truncate slds-col_bump-left">
                  {advancePayment.serie}
                </span>
              </div>
              <div className="slds-grid slds-wrap">
                <span className="slds-truncate slds-text-title_bold">
                  Importe
                </span>
                <span className="slds-truncate slds-col_bump-left">
                  {PEN(advancePayment.amount)}
                </span>
              </div>
              <div className="slds-grid slds-wrap">
                <span className="slds-truncate slds-text-title_bold">
                  Saldo
                </span>
                <span className="slds-truncate slds-col_bump-left">
                  {PEN(advancePayment.balance)}
                </span>
              </div>
              <div className="slds-grid slds-wrap">
                <span className="slds-truncate slds-text-title_bold">
                  Fecha de vencimiento
                </span>
                <span className="slds-truncate slds-col_bump-left">
                  {moment(advancePayment).format()}
                </span>
              </div>
            </div>
          </>
        )}
        {/* Pedido */}
        <div className="slds-text-title_caps slds-m-bottom_x-small">Pedido</div>
        <div className="slds-box">
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">SubTotal</span>
            <span className="slds-truncate slds-col_bump-left">
              {subTotalDesc}
            </span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">IGV</span>
            <span className="slds-truncate slds-col_bump-left">{igvDesc}</span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">Total</span>
            <span className="slds-truncate slds-col_bump-left">
              {totalDesc}
            </span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">Peso</span>
            <span className="slds-truncate slds-col_bump-left">
              {weightDesc}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default OverviewOrder;
