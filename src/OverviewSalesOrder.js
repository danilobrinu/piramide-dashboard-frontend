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
    paymentCondition,
    shippingCondition,
    deliveryDate,
    deliveryHour,
    advancePayments,
  } = props;
  const subTotal = lodash.reduce(
    products,
    (acc, product) => acc + product.amount,
    0
  );
  const igv = lodash.reduce(products, (acc, product) => acc + product.igv, 0);
  const total = subTotal + igv;
  const peso = lodash.reduce(
    products,
    (acc, product) => acc + product.weight,
    0
  );

  return (
    <>
      <article className="slds-tile">
        <h2
          className="slds-tile__title slds-text-heading_small slds-truncate"
          title="Salesforce UX"
        >
          <a href="#top">Datos Generales</a>
        </h2>
        <div className="slds-tile__detail">
          <dl className="slds-list_horizontal slds-wrap">
            <dt
              className="slds-item_label slds-text-color_weak"
              title="Valor de venta"
            >
              Ordén de Compra:
            </dt>

            <dd className="slds-item_detail">{purchaseOrder}</dd>
            <dt className="slds-item_label slds-text-color_weak" title="IGV">
              Clase de Pedido:
            </dt>
            <dd className="slds-item_detail">
              {orderType.length ? orderType[0].label : ''}
            </dd>
            <dt
              className="slds-item_label slds-text-color_weak"
              title="Total de venta"
            >
              Solicitante:
            </dt>
            <dd className="slds-item_detail">
              {requester.length ? requester[0].label : ''}
            </dd>
            <dt
              className="slds-item_label slds-text-color_weak"
              title="Total de venta"
            >
              Destinatario:
            </dt>
            {/* <dd className="slds-item_detail">
              {receiver.length ? receiver[0].label : ''}
            </dd> */}
            <dt
              className="slds-item_label slds-text-color_weak"
              title="Total de venta"
            >
              Condición de pago:
            </dt>
            <dd className="slds-item_detail">
              {paymentCondition.length ? paymentCondition[0].label : ''}
            </dd>
            <dt
              className="slds-item_label slds-text-color_weak"
              title="Total de venta"
            >
              Fecha de entrega:
            </dt>
            <dd className="slds-item_detail">
              {deliveryDate ? moment(deliveryDate).format('DD/MM/YYYY') : ''}
            </dd>
            <dt
              className="slds-item_label slds-text-color_weak"
              title="Total de venta"
            >
              Condición de expedición:
            </dt>
            <dd className="slds-item_detail">
              {shippingCondition.length ? shippingCondition[0].label : ''}
            </dd>
            <dt
              className="slds-item_label slds-text-color_weak"
              title="Total de venta"
            >
              Motivo de traslado:
            </dt>
            {/* <dd className="slds-item_detail">
              {reasonTransfer.length ? reasonTransfer[0].label : ''}
            </dd> */}
            <dt
              className="slds-item_label slds-text-color_weak"
              title="Hora de Cita"
            >
              Hora de Cita:
            </dt>
            <dd className="slds-item_detail">
              {deliveryHour ? moment(deliveryHour).format('HH:mm') : ''}
            </dd>
          </dl>
        </div>
      </article>
      <article className="slds-tile">
        <h2
          className="slds-tile__title slds-text-heading_small slds-truncate"
          title="Salesforce UX"
        >
          <a href="#top">Anticipo</a>
        </h2>
        {advancePayments.selection.length ? (
          <div className="slds-tile__detail">
            <dl className="slds-list_horizontal slds-wrap">
              <dt
                className="slds-item_label slds-text-color_weak"
                title="Valor de venta"
              >
                Serie:
              </dt>
              <dd className="slds-item_detail">
                {advancePayments.selection[0].serie}
              </dd>
              <dt className="slds-item_label slds-text-color_weak" title="IGV">
                Importe:
              </dt>
              <dd className="slds-item_detail">
                {advancePayments.selection[0].amount}
              </dd>
              <dt
                className="slds-item_label slds-text-color_weak"
                title="Total de venta"
              >
                Saldo:
              </dt>
              <dd className="slds-item_detail">
                {advancePayments.selection[0].balance}
              </dd>
              <dt
                className="slds-item_label slds-text-color_weak"
                title="Total de venta"
              >
                Fecha:
              </dt>
              <dd className="slds-item_detail">
                {advancePayments.selection[0].date}
              </dd>
            </dl>
          </div>
        ) : (
          <div>No se ha seleccionado ningún anticipo</div>
        )}
      </article>
      <article className="slds-tile">
        <h2
          className="slds-tile__title slds-text-heading_small slds-truncate"
          title="Salesforce UX"
        >
          <a href="#top">Pedido</a>
        </h2>
        <div className="slds-tile__detail">
          <dl className="slds-list_horizontal slds-wrap">
            <dt
              className="slds-item_label slds-text-color_weak"
              title="Valor de venta"
            >
              Subtotal:
            </dt>
            <dd className="slds-item_detail">{PEN(subTotal)}</dd>
            <dt className="slds-item_label slds-text-color_weak" title="IGV">
              IGV:
            </dt>
            <dd className="slds-item_detail">{PEN(igv)}</dd>
            <dt
              className="slds-item_label slds-text-color_weak"
              title="Total de venta"
            >
              Total:
            </dt>
            <dd className="slds-item_detail">{PEN(total)}</dd>
            <dt
              className="slds-item_label slds-text-color_weak"
              title="Total de venta"
            >
              Peso:
            </dt>
            <dd className="slds-item_detail">{KG(peso)}</dd>
          </dl>
        </div>
      </article>
    </>
  );
};

export default OverviewOrder;