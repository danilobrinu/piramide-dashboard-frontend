import React from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { useAppState } from './AppContext';
import { PEN, KG } from './utils/formats';

function OverviewOrder() {
  const [state] = useAppState();

  const subTotal = lodash.reduce(state.products.options, (acc, product) => acc + product.amount, 0);
  const igv = lodash.reduce(state.products.options, (acc, product) => acc + product.igv, 0);
  const total = subTotal + igv;
  const weight = lodash.reduce(state.products.options, (acc, product) => acc + product.weight, 0);

  const purchaseOrderDesc = state.purchaseOrder;
  const orderTypeDesc = !!state.orderType.selection.length && state.orderType.selection[0].label;
  const requesterDesc = !!state.requester.selection.length && state.requester.selection[0].label;
  const receiverDistrictDesc =
    !!state.receiverDistrict.selection.length && state.receiverDistrict.selection[0].label;
  const receiverProvinceDesc =
    !!state.receiverProvince.selection.length && state.receiverProvince.selection[0].label;
  const requesterAddressDesc =
    !!state.requester.selection.length && state.requester.selection[0].subTitle;
  const receiverDesc =
    !!state.shippingCondition.selection.length &&
    state.shippingCondition.selection[0].value === '01'
      ? state.receiverCondition === '01'
        ? requesterAddressDesc
        : `${state.receiverStreet}, ${receiverDistrictDesc} - ${receiverProvinceDesc}`
      : 'PIRAMIDE';
  const paymentConditionDesc =
    !!state.paymentCondition.selection.length && state.paymentCondition.selection[0].label;
  const shippingConditionDesc =
    !!state.shippingCondition.selection.length && state.shippingCondition.selection[0].label;
  const deliveryDateDesc = !!state.deliveryDate && moment(state.deliveryDate).format('DD/MM/YYYY');
  const deliveryHourDesc = !!state.deliveryHour && moment(state.deliveryHour).format('HH:mm');
  const reasonTransferDesc =
    !!state.reasonTransfer.selection.length && state.reasonTransfer.selection[0].label;

  const advancePayment =
    !!state.advancePayments.selection.length && state.advancePayments.selection[0];

  const totalDesc = PEN(total);
  const subTotalDesc = PEN(subTotal);
  const igvDesc = PEN(igv);
  const weightDesc = KG(weight);

  return (
    <>
      <section className="slds-p-around_medium">
        {!!state.requester.selection.length && (
          <div className="slds-text-heading_large slds-text-color_success slds-m-bottom_medium">
            {state.requester.selection[0].label}
          </div>
        )}
        {/* Info */}
        <div className="slds-text-title_caps slds-m-bottom_x-small">Información</div>
        <div className="slds-box slds-m-bottom_small">
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">Orden de Compra</span>
            <span className="slds-truncate slds-col_bump-left">{purchaseOrderDesc}</span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">Clase de Pedido</span>
            <span className="slds-truncate slds-col_bump-left">{orderTypeDesc}</span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">Solicitante</span>
            <span className="slds-truncate slds-col_bump-left">{requesterDesc}</span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">Destinatario</span>
            <span className="slds-truncate slds-col_bump-left">{receiverDesc}</span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">Condición de Pago</span>
            <span className="slds-truncate slds-col_bump-left">{paymentConditionDesc}</span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">Condición de Entrega</span>
            <span className="slds-truncate slds-col_bump-left">{shippingConditionDesc}</span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">Fecha de entrega</span>
            <span className="slds-truncate slds-col_bump-left">{deliveryDateDesc}</span>
          </div>
          {!!deliveryHourDesc && (
            <div className="slds-grid slds-wrap">
              <span className="slds-truncate slds-text-title_bold">Hora de Cita</span>
              <span className="slds-truncate slds-col_bump-left">{deliveryHourDesc}</span>
            </div>
          )}
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">Motivo de Traslado</span>
            <span className="slds-truncate slds-col_bump-left">{reasonTransferDesc}</span>
          </div>
        </div>
        {/* Anticipo */}
        {advancePayment && (
          <>
            <div className="slds-text-title_caps slds-m-bottom_x-small">Anticipo</div>
            <div className="slds-box slds-m-bottom_small">
              <div className="slds-grid slds-wrap">
                <span className="slds-truncate slds-text-title_bold">Serie</span>
                <span className="slds-truncate slds-col_bump-left">{advancePayment.serie}</span>
              </div>
              <div className="slds-grid slds-wrap">
                <span className="slds-truncate slds-text-title_bold">Importe</span>
                <span className="slds-truncate slds-col_bump-left">
                  {PEN(advancePayment.amount)}
                </span>
              </div>
              <div className="slds-grid slds-wrap">
                <span className="slds-truncate slds-text-title_bold">Saldo</span>
                <span className="slds-truncate slds-col_bump-left">
                  {PEN(advancePayment.balance)}
                </span>
              </div>
              <div className="slds-grid slds-wrap">
                <span className="slds-truncate slds-text-title_bold">Fecha de vencimiento</span>
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
            <span className="slds-truncate slds-col_bump-left">{subTotalDesc}</span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">IGV</span>
            <span className="slds-truncate slds-col_bump-left">{igvDesc}</span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">Total</span>
            <span className="slds-truncate slds-col_bump-left">{totalDesc}</span>
          </div>
          <div className="slds-grid slds-wrap">
            <span className="slds-truncate slds-text-title_bold">Peso</span>
            <span className="slds-truncate slds-col_bump-left">{weightDesc}</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default OverviewOrder;
