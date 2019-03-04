import React from 'react';
import moment from 'moment';
import {
  Input,
  Combobox,
  comboboxFilterAndLimit,
  Datepicker,
  Timepicker,
  Button,
  Radio,
  RadioButtonGroup,
} from '@salesforce/design-system-react';
import { optionsWithIcon } from './utils/helpers';

import AdvancePayments from './AdvancePayments';

const Steps = props => {
  const {
    steps,
    currentStep,
    requester,
    setRequester,
    shippingCondition,
    setShippingCondition,
    receiverCondition,
    setReceiverCondition,
    receiverDocument,
    setReceiverDocument,
    receiverName,
    setReceiverName,
    receiverStreet,
    setReceiverStreet,
    receiverDoor,
    setReceiverDoor,
    receiverDepartment,
    setReceiverDepartment,
    receiverProvince,
    setReceiverProvince,
    receiverDistrict,
    setReceiverDistrict,
    receiverReference,
    setReceiverReference,
    vehiclePlate,
    setVehiclePlate,
    vehicleGrossWeight,
    setVehicleGrossWeight,
    vehicleTare,
    setVehicleTare,
    vehicleDriver,
    setVehicleDriver,
    vehicleLicense,
    setVehicleLicense,
    orderType,
    setOrderType,
    paymentCondition,
    setPaymentCondition,
    advancePayments,
    setAdvancePayments,
    purchaseOrder,
    setPurchaseOrder,
    deliveryDate,
    deliveryDateValidation,
    setDeliveryDate,
    deliveryHour,
    setDeliveryHour,
    prevStep,
    nextStep,
    validateAllSteps,
    abbreviatedWeekDays,
    weekDays,
    months,
    today,
  } = props;

  return (
    <section
      className="slds-popover slds-popover_walkthrough slds-popover_walkthrough-alt slds-size_12-of-12"
      role="dialog"
    >
      <header className="slds-popover__header slds-p-vertical_medium">
        <h2 className="slds-text-heading_medium">Información del Pedido</h2>
      </header>
      <div className="slds-popover__body">
        {currentStep === 0 && (
          <fieldset className="slds-form-element slds-form_compound">
            <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
              {steps[currentStep].title}
            </legend>
            <div className="slds-form-element__control">
              <div className="slds-form-element__row">
                <div className="slds-size_1-of-1">
                  <Combobox
                    id="requester"
                    classNameContainer="slds-text-color_default"
                    events={{
                      onChange: (_, { value: inputValue }) =>
                        setRequester({ ...requester, inputValue }),
                      onRequestRemoveSelectedOption: () =>
                        setRequester({
                          ...requester,
                          inputValue: '',
                          selection: [],
                        }),
                      onSelect: (_, { selection }) =>
                        setRequester({ ...requester, selection }),
                    }}
                    labels={{
                      placeholder: 'Buscar Solicitante',
                      noOptionsFound: 'No se encontraron coincidencias',
                    }}
                    options={comboboxFilterAndLimit({
                      inputValue: requester.inputValue,
                      options: optionsWithIcon(requester.options),
                      selection: requester.selection,
                    })}
                    selection={requester.selection}
                    value={requester.inputValue}
                    variant="inline-listbox"
                    menuPosition="overflowBoundaryElement"
                    required
                  />
                </div>
              </div>
            </div>
          </fieldset>
        )}
        {currentStep === 1 && (
          <>
            <fieldset className="slds-form-element slds-form_compound">
              <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
                {steps[currentStep].title}
              </legend>
              <div className="slds-form-element__control">
                <div className="slds-form-element__row">
                  <div className="slds-size_1-of-1">
                    <Combobox
                      id="shipping-condition"
                      classNameContainer="slds-text-color_default"
                      events={{
                        onChange: (_, { value: inputValue }) =>
                          setShippingCondition({
                            ...shippingCondition,
                            inputValue,
                          }),
                        onRequestRemoveSelectedOption: () =>
                          setShippingCondition({
                            ...shippingCondition,
                            inputValue: '',
                            selection: [],
                          }),
                        onSelect: (_, { selection }) =>
                          setShippingCondition({
                            ...shippingCondition,
                            selection,
                          }),
                      }}
                      labels={{
                        placeholder: 'Buscar Condición de Entrega',
                        noOptionsFound: 'No se encontraron coincidencias',
                      }}
                      options={comboboxFilterAndLimit({
                        inputValue: shippingCondition.inputValue,
                        options: optionsWithIcon(shippingCondition.options),
                        selection: shippingCondition.selection,
                      })}
                      selection={shippingCondition.selection}
                      value={shippingCondition.inputValue}
                      variant="inline-listbox"
                      menuPosition="overflowBoundaryElement"
                      required
                    />
                  </div>
                </div>
              </div>
            </fieldset>
            {!!shippingCondition.selection.length &&
              shippingCondition.selection[0].value === '01' && (
                <>
                  <fieldset className="slds-form-element slds-form_compound">
                    <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
                      Destinatario
                    </legend>
                    <div className="slds-form-element__control">
                      <div className="slds-form-element__row">
                        <RadioButtonGroup
                          onChange={({ target: { value } }) =>
                            setReceiverCondition(value)
                          }
                        >
                          <Radio
                            label="Dirección del solicitante"
                            value="01"
                            checked={receiverCondition === '01'}
                            variant="button-group"
                          />
                          <Radio
                            label="Otra dirección"
                            value="02"
                            checked={receiverCondition === '02'}
                            variant="button-group"
                          />
                        </RadioButtonGroup>
                      </div>
                    </div>
                  </fieldset>
                  {receiverCondition === '01' && (
                    <fieldset className="slds-form-element slds-form_compound">
                      <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
                        Dirección del Solicitante
                      </legend>
                      <div className="slds-form-element__control">
                        <div className="slds-form-element__row">
                          <div className="slds-form-element">
                            <div className="slds-form-element__control">
                              <span className="slds-form-element__static slds-text-color_inverse">
                                {!!requester.selection.length
                                  ? requester.selection[0].subTitle
                                  : 'No ha seleccionado ningun Solicitante'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  )}
                  {receiverCondition === '02' && (
                    <fieldset className="slds-form-element slds-form_compound">
                      <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
                        Dirección
                      </legend>
                      <div className="slds-form-element__control">
                        <div className="slds-form-element__row">
                          <Input
                            id="receiver-document"
                            className="slds-text-color_default slds-size_1-of-1"
                            maxLength="11"
                            placeholder="DNI o RUC"
                            value={receiverDocument}
                            onInput={({ target: { value } }) =>
                              setReceiverDocument(value)
                            }
                            required
                          />
                        </div>
                        <div className="slds-form-element__row">
                          <Input
                            id="receiver-name"
                            className="slds-text-color_default slds-size_1-of-1"
                            placeholder="Nombre"
                            value={receiverName}
                            onInput={({ target: { value } }) =>
                              setReceiverName(value)
                            }
                            required
                          />
                        </div>
                        <div className="slds-form-element__row">
                          <Input
                            id="receiver-street"
                            className="slds-text-color_default slds-size_1-of-1"
                            placeholder="Calle"
                            value={receiverStreet}
                            onInput={({ target: { value } }) =>
                              setReceiverStreet(value)
                            }
                            required
                          />
                        </div>
                        <div className="slds-form-element__row">
                          <Input
                            id="receiver-document"
                            className="slds-text-color_default slds-size_1-of-1"
                            placeholder="Nro de puerta"
                            value={receiverDoor}
                            onInput={({ target: { value } }) =>
                              setReceiverDoor(value)
                            }
                            required
                          />
                        </div>
                        <div className="slds-form-element__row">
                          <Combobox
                            id="receiver-deparment"
                            classNameContainer="slds-text-color_default slds-size_1-of-1"
                            events={{
                              onChange: (_, { value: inputValue }) =>
                                setReceiverDepartment({
                                  ...receiverDepartment,
                                  inputValue,
                                }),
                              onRequestRemoveSelectedOption: () =>
                                setReceiverDepartment({
                                  ...receiverDepartment,
                                  inputValue: '',
                                  selection: [],
                                }),
                              onSelect: (_, { selection }) =>
                                setReceiverDepartment({
                                  ...receiverDepartment,
                                  selection,
                                }),
                            }}
                            labels={{
                              placeholder: 'Buscar Departamento',
                              noOptionsFound: 'No se encontraron coincidencias',
                            }}
                            options={comboboxFilterAndLimit({
                              inputValue: receiverDepartment.inputValue,
                              options: optionsWithIcon(
                                receiverDepartment.options
                              ),
                              selection: receiverDepartment.selection,
                            })}
                            selection={receiverDepartment.selection}
                            value={receiverDepartment.inputValue}
                            variant="inline-listbox"
                            menuPosition="overflowBoundaryElement"
                            required
                          />
                        </div>
                        <div className="slds-form-element__row">
                          <Combobox
                            id="receiver-province"
                            classNameContainer="slds-text-color_default slds-size_1-of-1"
                            events={{
                              onChange: (_, { value: inputValue }) =>
                                setReceiverProvince({
                                  ...receiverProvince,
                                  inputValue,
                                }),
                              onRequestRemoveSelectedOption: () =>
                                setReceiverProvince({
                                  ...receiverProvince,
                                  inputValue: '',
                                  selection: [],
                                }),
                              onSelect: (_, { selection }) =>
                                setReceiverProvince({
                                  ...receiverProvince,
                                  selection,
                                }),
                            }}
                            labels={{
                              placeholder: 'Buscar Provincia',
                              noOptionsFound: 'No se encontraron coincidencias',
                            }}
                            options={comboboxFilterAndLimit({
                              inputValue: receiverProvince.inputValue,
                              options: optionsWithIcon(
                                receiverProvince.options
                              ),
                              selection: receiverProvince.selection,
                            })}
                            selection={receiverProvince.selection}
                            value={receiverProvince.inputValue}
                            variant="inline-listbox"
                            menuPosition="overflowBoundaryElement"
                            required
                          />
                        </div>
                        <div className="slds-form-element__row">
                          <Combobox
                            id="receiver-district"
                            classNameContainer="slds-text-color_default slds-size_1-of-1"
                            events={{
                              onChange: (_, { value: inputValue }) =>
                                setReceiverDistrict({
                                  ...receiverDistrict,
                                  inputValue,
                                }),
                              onRequestRemoveSelectedOption: () =>
                                setReceiverDistrict({
                                  ...receiverDistrict,
                                  inputValue: '',
                                  selection: [],
                                }),
                              onSelect: (_, { selection }) =>
                                setReceiverDistrict({
                                  ...receiverDistrict,
                                  selection,
                                }),
                            }}
                            labels={{
                              placeholder: 'Buscar Distrito',
                              noOptionsFound: 'No se encontraron coincidencias',
                            }}
                            options={comboboxFilterAndLimit({
                              inputValue: receiverDistrict.inputValue,
                              options: optionsWithIcon(
                                receiverDistrict.options
                              ),
                              selection: receiverDistrict.selection,
                            })}
                            selection={receiverDistrict.selection}
                            value={receiverDistrict.inputValue}
                            variant="inline-listbox"
                            menuPosition="overflowBoundaryElement"
                            required
                          />
                        </div>
                        <div className="slds-form-element__row">
                          <Input
                            id="receiver-reference"
                            className="slds-text-color_default slds-size_1-of-1"
                            placeholder="Referencia"
                            value={receiverReference}
                            onInput={({ target: { value } }) =>
                              setReceiverReference(value)
                            }
                            required
                          />
                        </div>
                      </div>
                    </fieldset>
                  )}
                </>
              )}
            {!!shippingCondition.selection.length &&
              shippingCondition.selection[0].value === '02' && (
                <fieldset className="slds-form-element slds-form_compound">
                  <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
                    Vehículo
                  </legend>
                  <div className="slds-form-element__control">
                    <div className="slds-form-element__row">
                      <Input
                        id="vehicle-plate"
                        className="slds-text-color_default slds-size_1-of-2"
                        maxLength="7"
                        placeholder="Placa"
                        value={vehiclePlate}
                        onInput={({ target: { value } }) =>
                          setVehiclePlate(value)
                        }
                        required
                      />
                      <Input
                        id="vehicle-gross-weight"
                        className="slds-text-color_default slds-size_1-of-2"
                        placeholder="Peso Bruto"
                        minValue={1}
                        maxValue={30000}
                        onChange={(_, { value }) =>
                          setVehicleGrossWeight(value)
                        }
                        value={vehicleGrossWeight}
                        variant="counter"
                        required
                      />
                    </div>
                    <div className="slds-form-element__row">
                      <Input
                        id="vehicle-tare"
                        className="slds-text-color_default slds-size_1-of-1"
                        placeholder="Tara"
                        minValue={1}
                        maxValue={30000}
                        onChange={(_, { value }) => setVehicleTare(value)}
                        value={vehicleTare}
                        variant="counter"
                        required
                      />
                    </div>
                    <div className="slds-form-element__row">
                      <Input
                        id="vehicle-driver"
                        className="slds-text-color_default slds-size_1-of-1"
                        placeholder="Nombre del conductor"
                        value={vehicleDriver}
                        onInput={({ target: { value } }) =>
                          setVehicleDriver(value)
                        }
                        required
                      />
                    </div>
                    <div className="slds-form-element__row">
                      <Input
                        id="vehicle-license"
                        className="slds-text-color_default slds-size_1-of-1"
                        placeholder="Licencia del conductor"
                        value={vehicleLicense}
                        onInput={({ target: { value } }) =>
                          setVehicleLicense(value)
                        }
                        required
                      />
                    </div>
                  </div>
                </fieldset>
              )}
          </>
        )}
        {currentStep === 2 && (
          <fieldset className="slds-form-element slds-form_compound">
            <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
              {steps[currentStep].title}
            </legend>
            <div className="slds-form-element__control">
              <div className="slds-form-element__row">
                <div className="slds-size_1-of-1">
                  <Combobox
                    id="order-type"
                    classNameContainer="slds-text-color_default"
                    events={{
                      onChange: (_, { value: inputValue }) =>
                        setOrderType({ ...orderType, inputValue }),
                      onRequestRemoveSelectedOption: () =>
                        setOrderType({
                          ...orderType,
                          inputValue: '',
                          selection: [],
                        }),
                      onSelect: (_, { selection }) =>
                        setOrderType({ ...orderType, selection }),
                    }}
                    labels={{
                      placeholder: 'Buscar Clase de Pedido',
                      noOptionsFound: 'No se encontraron coincidencias',
                    }}
                    options={comboboxFilterAndLimit({
                      inputValue: orderType.inputValue,
                      options: optionsWithIcon(orderType.options),
                      selection: orderType.selection,
                    })}
                    selection={orderType.selection}
                    value={orderType.inputValue}
                    variant="inline-listbox"
                    menuPosition="overflowBoundaryElement"
                    required
                  />
                </div>
              </div>
            </div>
          </fieldset>
        )}
        {currentStep === 3 && (
          <>
            <fieldset className="slds-form-element slds-form_compound">
              <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
                {steps[currentStep].title}
              </legend>
              <div className="slds-form-element__control">
                <div className="slds-form-element__row">
                  <div className="slds-size_1-of-1">
                    <Combobox
                      id="payment-condition"
                      classNameContainer="slds-text-color_default"
                      events={{
                        onChange: (_, { value: inputValue }) =>
                          setPaymentCondition({
                            ...paymentCondition,
                            inputValue,
                          }),
                        onRequestRemoveSelectedOption: () =>
                          setPaymentCondition({
                            ...paymentCondition,
                            inputValue: '',
                            selection: [],
                          }),
                        onSelect: (_, { selection }) =>
                          setPaymentCondition({
                            ...paymentCondition,
                            selection,
                          }),
                      }}
                      labels={{
                        placeholder: 'Buscar Condición de Pago',
                        noOptionsFound: 'No se encontraron coincidencias',
                      }}
                      options={comboboxFilterAndLimit({
                        inputValue: paymentCondition.inputValue,
                        options: optionsWithIcon(paymentCondition.options),
                        selection: paymentCondition.selection,
                      })}
                      selection={paymentCondition.selection}
                      value={paymentCondition.inputValue}
                      variant="inline-listbox"
                      menuPosition="overflowBoundaryElement"
                      required
                    />
                  </div>
                </div>
              </div>
            </fieldset>
            {!!paymentCondition.selection.length &&
              paymentCondition.selection[0].value === 'C000' && (
                <fieldset className="slds-form-element slds-form_compound">
                  <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
                    Anticipos
                  </legend>
                  <div className="slds-form-element__control">
                    <div className="slds-form-element__row">
                      <div className="slds-size_1-of-1">
                        <AdvancePayments
                          advancePayments={advancePayments}
                          setAdvancePayments={setAdvancePayments}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              )}
          </>
        )}
        {currentStep === 4 && (
          <>
            <fieldset className="slds-form-element slds-form_compound">
              <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
                Orden de Compra
              </legend>
              <div className="slds-form-element__control">
                <div className="slds-form-element__row">
                  <Input
                    id="purchase-order"
                    className="slds-text-color_default slds-size_1-of-1"
                    maxLength="20"
                    placeholder="Order de Compra"
                    value={purchaseOrder}
                    onInput={({ target: { value } }) => setPurchaseOrder(value)}
                    required
                  />
                </div>
              </div>
            </fieldset>
            <fieldset className="slds-form-element slds-form_compound">
              <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
                Fecha de Entrega
              </legend>
              <div className="slds-form-element__control">
                <div className="slds-form-element__row">
                  <Datepicker
                    id="delivery-date"
                    labels={{
                      placeholder: 'Seleccione una Fecha',
                      abbreviatedWeekDays,
                      weekDays,
                      months,
                      today,
                    }}
                    triggerClassName="slds-form-element slds-text-color_default slds-size_1-of-1"
                    formatter={(date = '') =>
                      date && moment(date).format('DD/MM/YYYY')
                    }
                    parser={str => moment(str, 'DD/MM/YYYY').toDate()}
                    onChange={(_, { date }) => setDeliveryDate(date)}
                    value={deliveryDate}
                    dateDisabled={deliveryDateValidation}
                    required
                  />
                </div>
              </div>
            </fieldset>
            {!!shippingCondition.selection.length &&
              shippingCondition.selection[0].value === '02' && (
                <fieldset className="slds-form-element slds-form_compound">
                  <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
                    Hora de Cita
                  </legend>
                  <div className="slds-form-element__control">
                    <div className="slds-form-element__row">
                      <div className="slds-form-element slds-text-color_default slds-size_1-of-1">
                        <Timepicker
                          id="delivery-hour"
                          placeholder="Seleccione una hora"
                          onDateChange={date => setDeliveryHour(date)}
                          strValue={
                            deliveryHour &&
                            moment(deliveryHour).format('HH:mm A')
                          }
                          value={deliveryHour}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              )}
          </>
        )}
      </div>
      <footer className="slds-popover__footer">
        <div className="slds-grid slds-grid_vertical-align-center">
          <span className="slds-text-title">
            {currentStep + 1} de {steps.length}
          </span>
          {currentStep > 0 && (
            <Button
              className="slds-button_inverse slds-col_bump-left"
              label="Volver"
              variant={null}
              onClick={prevStep}
            />
          )}
          {currentStep < steps.length - 1 && (
            <Button
              className="slds-col_bump-left"
              label="Siguiente"
              variant="brand"
              onClick={nextStep}
            />
          )}
          {currentStep === steps.length - 1 && (
            <Button
              className="slds-col_bump-left"
              label="Validar"
              variant="success"
              onClick={() => validateAllSteps(true)}
            />
          )}
        </div>
      </footer>
    </section>
  );
};

export default Steps;
