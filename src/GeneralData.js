import React, { Component } from 'react';
import moment from 'moment';
import {
  Input,
  Combobox,
  comboboxFilterAndLimit,
  Datepicker,
} from '@salesforce/design-system-react';
import { optionsWithIcon } from './utils/helpers'

class GeneralData extends Component {
  render() {
    const {
      purchaseOrder,
      setPurchaseOrder,
      orderTypeList,
      orderTypeValue,
      orderType,
      setOrderType,
      requesterList,
      requesterValue,
      requester,
      setRequester,
      receiverList,
      receiverValue,
      receiver,
      setReceiver,
      paymentConditionList,
      paymentConditionValue,
      paymentCondition,
      setPaymentCondition,
      shippingConditionList,
      shippingConditionValue,
      shippingCondition,
      setShippingCondition,
      reasonTransferList,
      reasonTransferValue,
      reasonTransfer,
      setReasonTransfer,
      deliveryDate,
      deliveryDateValidation,
      setDeliveryDate,
      transportDate,
      setTransportDate,
    } = this.props;

    return (
      <fieldset className="slds-form slds-form_compound">
        <div className="slds-form-element__control">
          <div className="slds-form-element__row">
            <div className="slds-size_1-of-1">
              <Input
                id="purchase-order"
                maxLength="20"
                label="Orden de Compra"
                placeholder="Ingresar Orden de Compra"
                value={purchaseOrder}
                onInput={e => setPurchaseOrder(e, { value: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="slds-form-element__row">
            <div className="slds-size_1-of-1">
              <Combobox
                id="order-type"
                events={{
                  onChange: (e, { value }) => setOrderType(e, { value }),
                  onRequestRemoveSelectedOption: (e, _) => setOrderType(e, {}),
                  onSelect: (e, { selection }) => setOrderType(e, { selection }),
                }}
                labels={{
                  label: 'Clase de Pedido',
                  placeholder: 'Buscar Clase de Pedido',
                }}
                options={comboboxFilterAndLimit({
                  inputValue: orderTypeValue,
                  options: optionsWithIcon(orderTypeList),
                  selection: orderType,
                })}
                selection={orderType}
                value={orderTypeValue}
                variant="inline-listbox"
                required
              />
            </div>
          </div>
          <div className="slds-form-element__row">
            <div className="slds-size_1-of-1">
              <Combobox
                id="requester"
                events={{
                  onChange: (e, { value }) => setRequester(e, { value }),
                  onRequestRemoveSelectedOption: (e, _) => setRequester(e, {}),
                  onSelect: (e, { selection }) => setRequester(e, { selection }),
                }}
                labels={{
                  label: 'Solicitante',
                  placeholder: 'Buscar Solicitante',
                }}
                options={comboboxFilterAndLimit({
                  inputValue: requesterValue,
                  options: optionsWithIcon(requesterList),
                  selection: requester,
                })}
                selection={requester}
                value={requesterValue}
                variant="inline-listbox"
                required
              />
            </div>
          </div>
          <div className="slds-form-element__row">
            <div className="slds-size_1-of-1">
              <Combobox
                id="receiver"
                events={{
                  onChange: (e, { value }) => setReceiver(e, { value }),
                  onRequestRemoveSelectedOption: (e, _) => setReceiver(e, {}),
                  onSelect: (e, { selection }) => setReceiver(e, { selection }),
                }}
                labels={{
                  label: 'Destinatario',
                  placeholder: 'Buscar Destinatario',
                }}
                options={comboboxFilterAndLimit({
                  inputValue: receiverValue,
                  options: optionsWithIcon(receiverList),
                  selection: receiver,
                })}
                selection={receiver}
                value={receiverValue}
                variant="inline-listbox"
                required
              />
            </div>
          </div>
          <div className="slds-form-element__row">
            <div className="slds-size_1-of-1">
              <Combobox
                id="payment-condition"
                events={{
                  onChange: (e, { value }) => setPaymentCondition(e, { value }),
                  onRequestRemoveSelectedOption: (e, _) => setPaymentCondition(e, {}),
                  onSelect: (e, { selection }) => setPaymentCondition(e, { selection }),
                }}
                labels={{
                  label: 'Condición de pago',
                  placeholder: 'Buscar Condición de pago',
                }}
                options={comboboxFilterAndLimit({
                  inputValue: paymentConditionValue,
                  options: optionsWithIcon(paymentConditionList),
                  selection: paymentCondition,
                })}
                selection={paymentCondition}
                value={paymentConditionValue}
                variant="inline-listbox"
                required
              />
            </div>
          </div>
          <div className="slds-form-element__row">
            <div className="slds-size_1-of-1">
              <Datepicker
                id="delivery-date"
                labels={{
                  label: 'Fecha de entrega',
                  placeholder: 'Elija una Fecha',
                  abbreviatedWeekDays: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                  weekDays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                  months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                  today: 'Hoy día',
                }}
                triggerClassName="slds-size_1-of-1"
                formatter={(date = '') => date && moment(date).format('DD/MM/YYYY')}
                parser={str => moment(str, 'DD/MM/YYYY').toDate()}
                onChange={(e, { date }) => setDeliveryDate(e, { date })}
                value={deliveryDate}
                dateDisabled={deliveryDateValidation}
                required
              />
            </div>
          </div>
          <div className="slds-form-element__row">
            <div className="slds-size_1-of-1">
              <Combobox
                id="shipping-condition"
                events={{
                  onChange: (e, { value }) => setShippingCondition(e, { value }),
                  onRequestRemoveSelectedOption: (e, _) => setShippingCondition(e, {}),
                  onSelect: (e, { selection }) => setShippingCondition(e, { selection }),
                }}
                labels={{
                  label: 'Condición de Expedición',
                  placeholder: 'Buscar Condición de Expedición',
                }}
                options={comboboxFilterAndLimit({
                  inputValue: shippingConditionValue,
                  options: optionsWithIcon(shippingConditionList),
                  selection: shippingCondition,
                })}
                selection={shippingCondition}
                value={shippingConditionValue}
                variant="inline-listbox"
                required
              />
            </div>
          </div>
          <div className="slds-form-element__row">
            <div className="slds-size_1-of-1">
              <Combobox
                id="reason-transfer"
                events={{
                  onChange: (e, { value }) => setReasonTransfer(e, { value }),
                  onRequestRemoveSelectedOption: (e, _) => setReasonTransfer(e, {}),
                  onSelect: (e, { selection }) => setReasonTransfer(e, { selection }),
                }}
                labels={{
                  label: 'Motivo de Traslado',
                  placeholder: 'Buscar Motivo de Traslado',
                }}
                options={comboboxFilterAndLimit({
                  inputValue: reasonTransferValue,
                  options: optionsWithIcon(reasonTransferList),
                  selection: reasonTransfer,
                })}
                selection={reasonTransfer}
                value={reasonTransferValue}
                variant="inline-listbox"
                required
              />
            </div>
          </div>
          <div className="slds-form-element__row">
            <div className="slds-size_1-of-1">
              <Datepicker
                id="transport-date"
                labels={{
                  label: 'Cita de Transporte',
                  placeholder: 'Elija una Fecha',
                }}
                triggerClassName="slds-size_1-of-1"
                formatter={(date = '') =>  date && moment(date).format('DD/MM/YYYY')}
                parser={str => moment(str, 'DD/MM/YYYY').toDate()}
                onChange={(e, { date }) => setTransportDate(e, { date })}
                value={transportDate}
                required
              />
            </div>
          </div>
        </div>
      </fieldset>
    );
  }
}

export default GeneralData;
