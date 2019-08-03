import React from 'react';
import moment from 'moment';
import { useAppState } from './AppContext';
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

////////////////////////////////////////////////////////////////////////////////////////////////////

import AdvancePayments from './AdvancePayments';

////////////////////////////////////////////////////////////////////////////////////////////////////

function Steps() {
  const [state, dispatch] = useAppState();
  const validateAllSteps = () => true;
  const deliveryDateValidation = () => true;

  return (
    <section
      className="slds-popover slds-popover_walkthrough slds-popover_walkthrough-alt slds-size_12-of-12"
      role="dialog"
    >
      <header className="slds-popover__header slds-p-vertical_medium">
        <h2 className="slds-text-heading_medium">Información del Pedido</h2>
      </header>
      <div className="slds-popover__body">
        {state.currentStep === 0 && (
          <fieldset className="slds-form-element slds-form_compound">
            <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
              {state.steps[state.currentStep].title}
            </legend>
            <div className="slds-form-element__control">
              <div className="slds-form-element__row">
                <div className="slds-size_1-of-1">
                  <Combobox
                    id="state.requester"
                    classNameContainer="slds-text-color_default"
                    events={{
                      onChange: (_, { value: inputValue }) =>
                        dispatch({
                          type: 'SET_REQUESTER',
                          payload: { ...state.requester, inputValue },
                        }),
                      onRequestRemoveSelectedOption: () =>
                        dispatch({
                          type: 'SET_REQUESTER',
                          payload: {
                            ...state.requester,
                            inputValue: '',
                            selection: [],
                          },
                        }),
                      onSelect: (_, { selection }) =>
                        dispatch({
                          type: 'SET_REQUESTER',
                          payload: {
                            ...state.requester,
                            selection,
                          },
                        }),
                    }}
                    labels={{
                      placeholder: 'Buscar Solicitante',
                      noOptionsFound: 'No se encontraron coincidencias',
                    }}
                    options={comboboxFilterAndLimit({
                      inputValue: state.requester.inputValue,
                      options: optionsWithIcon(state.requester.options),
                      selection: state.requester.selection,
                    })}
                    selection={state.requester.selection}
                    value={state.requester.inputValue}
                    variant="inline-listbox"
                    menuPosition="overflowBoundaryElement"
                    required
                  />
                </div>
              </div>
            </div>
          </fieldset>
        )}
        {state.currentStep === 1 && (
          <>
            <fieldset className="slds-form-element slds-form_compound">
              <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
                {state.steps[state.currentStep].title}
              </legend>
              <div className="slds-form-element__control">
                <div className="slds-form-element__row">
                  <div className="slds-size_1-of-1">
                    <Combobox
                      id="shipping-condition"
                      classNameContainer="slds-text-color_default"
                      events={{
                        onChange: (_, { value: inputValue }) =>
                          dispatch({
                            type: 'SET_SHIPPING_CONDITION',
                            payload: {
                              ...state.shippingCondition,
                              inputValue,
                            },
                          }),
                        onRequestRemoveSelectedOption: () =>
                          dispatch({
                            type: 'SET_SHIPPING_CONDITION',
                            payload: {
                              ...state.shippingCondition,
                              inputValue: '',
                              selection: [],
                            },
                          }),
                        onSelect: (_, { selection }) =>
                          dispatch({
                            type: 'SET_SHIPPING_CONDITION',
                            payload: {
                              ...state.shippingCondition,
                              selection,
                            },
                          }),
                      }}
                      labels={{
                        placeholder: 'Buscar Condición de Entrega',
                        noOptionsFound: 'No se encontraron coincidencias',
                      }}
                      options={comboboxFilterAndLimit({
                        inputValue: state.shippingCondition.inputValue,
                        options: optionsWithIcon(state.shippingCondition.options),
                        selection: state.shippingCondition.selection,
                      })}
                      selection={state.shippingCondition.selection}
                      value={state.shippingCondition.inputValue}
                      variant="inline-listbox"
                      menuPosition="overflowBoundaryElement"
                      required
                    />
                  </div>
                </div>
              </div>
            </fieldset>
            {!!state.shippingCondition.selection.length &&
              state.shippingCondition.selection[0].value === '01' && (
                <>
                  <fieldset className="slds-form-element slds-form_compound">
                    <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
                      Destinatario
                    </legend>
                    <div className="slds-form-element__control">
                      <div className="slds-form-element__row">
                        <RadioButtonGroup
                          onChange={({ target: { value } }) =>
                            dispatch({ type: 'SET_RECEIVER_CONDITION', payload: value })
                          }
                        >
                          <Radio
                            label="Dirección del solicitante"
                            value="01"
                            checked={state.receiverCondition === '01'}
                            variant="button-group"
                          />
                          <Radio
                            label="Otra dirección"
                            value="02"
                            checked={state.receiverCondition === '02'}
                            variant="button-group"
                          />
                        </RadioButtonGroup>
                      </div>
                    </div>
                  </fieldset>
                  {state.receiverCondition === '01' && (
                    <fieldset className="slds-form-element slds-form_compound">
                      <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
                        Dirección del Solicitante
                      </legend>
                      <div className="slds-form-element__control">
                        <div className="slds-form-element__row">
                          <div className="slds-form-element">
                            <div className="slds-form-element__control">
                              <span className="slds-form-element__static slds-text-color_inverse">
                                {!!state.requester.selection.length
                                  ? state.requester.selection[0].subTitle
                                  : 'No ha seleccionado ningun Solicitante'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  )}
                  {state.receiverCondition === '02' && (
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
                            value={state.receiverDocument}
                            onChange={(_, { value }) =>
                              dispatch({ type: 'SET_RECEIVER_DOCUMENT', payload: value })
                            }
                            variant="counter"
                            required
                          />
                        </div>
                        <div className="slds-form-element__row">
                          <Input
                            id="receiver-name"
                            className="slds-text-color_default slds-size_1-of-1"
                            placeholder="Nombre"
                            value={state.receiverName}
                            onChange={(_, { value }) =>
                              dispatch({ type: 'SET_RECEIVER_NAME', payload: value })
                            }
                            required
                          />
                        </div>
                        <div className="slds-form-element__row">
                          <Input
                            id="receiver-street"
                            className="slds-text-color_default slds-size_1-of-1"
                            placeholder="Calle"
                            value={state.receiverStreet}
                            onChange={(_, { value }) =>
                              dispatch({ type: 'SET_RECEIVER_STREET', payload: value })
                            }
                            required
                          />
                        </div>
                        <div className="slds-form-element__row">
                          <Input
                            id="receiver-door"
                            className="slds-text-color_default slds-size_1-of-1"
                            placeholder="Nro de puerta"
                            value={state.receiverDoor}
                            onChange={(_, { value }) =>
                              dispatch({ type: 'SET_RECEIVER_DOOR', payload: value })
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
                                dispatch({
                                  type: 'SET_RECEIVER_DEPARTMENT',
                                  payload: {
                                    ...state.receiverDepartment,
                                    inputValue,
                                  },
                                }),
                              onRequestRemoveSelectedOption: () =>
                                dispatch({
                                  type: 'SET_RECEIVER_DEPARTMENT',
                                  payload: {
                                    ...state.receiverDepartment,
                                    inputValue: '',
                                    selection: [],
                                  },
                                }),
                              onSelect: (_, { selection }) =>
                                dispatch({
                                  type: 'SET_RECEIVER_DEPARTMENT',
                                  payload: {
                                    ...state.receiverDepartment,
                                    selection,
                                  },
                                }),
                            }}
                            labels={{
                              placeholder: 'Buscar Departamento',
                              noOptionsFound: 'No se encontraron coincidencias',
                            }}
                            options={comboboxFilterAndLimit({
                              inputValue: state.receiverDepartment.inputValue,
                              options: optionsWithIcon(state.receiverDepartment.options),
                              selection: state.receiverDepartment.selection,
                            })}
                            selection={state.receiverDepartment.selection}
                            value={state.receiverDepartment.inputValue}
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
                                dispatch({
                                  type: 'SET_RECEIVER_PROVINCE',
                                  payload: {
                                    ...state.receiverProvince,
                                    inputValue,
                                  },
                                }),
                              onRequestRemoveSelectedOption: () =>
                                dispatch({
                                  type: 'SET_RECEIVER_PROVINCE',
                                  payload: {
                                    ...state.receiverProvince,
                                    inputValue: '',
                                    selection: [],
                                  },
                                }),
                              onSelect: (_, { selection }) =>
                                dispatch({
                                  type: 'SET_RECEIVER_PROVINCE',
                                  payload: {
                                    ...state.receiverProvince,
                                    selection,
                                  },
                                }),
                            }}
                            labels={{
                              placeholder: 'Buscar Provincia',
                              noOptionsFound: 'No se encontraron coincidencias',
                            }}
                            options={comboboxFilterAndLimit({
                              inputValue: state.receiverProvince.inputValue,
                              options: optionsWithIcon(state.receiverProvince.options),
                              selection: state.receiverProvince.selection,
                            })}
                            selection={state.receiverProvince.selection}
                            value={state.receiverProvince.inputValue}
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
                                dispatch({
                                  type: 'SET_RECEIVER_DISTRICT',
                                  payload: {
                                    ...state.receiverDistrict,
                                    inputValue,
                                  },
                                }),
                              onRequestRemoveSelectedOption: () =>
                                dispatch({
                                  type: 'SET_RECEIVER_DISTRICT',
                                  payload: {
                                    ...state.receiverDistrict,
                                    inputValue: '',
                                    selection: [],
                                  },
                                }),
                              onSelect: (_, { selection }) =>
                                dispatch({
                                  type: 'SET_RECEIVER_DISTRICT',
                                  payload: {
                                    ...state.receiverDistrict,
                                    selection,
                                  },
                                }),
                            }}
                            labels={{
                              placeholder: 'Buscar Distrito',
                              noOptionsFound: 'No se encontraron coincidencias',
                            }}
                            options={comboboxFilterAndLimit({
                              inputValue: state.receiverDistrict.inputValue,
                              options: optionsWithIcon(state.receiverDistrict.options),
                              selection: state.receiverDistrict.selection,
                            })}
                            selection={state.receiverDistrict.selection}
                            value={state.receiverDistrict.inputValue}
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
                            value={state.receiverReference}
                            onChange={(_, { value }) =>
                              dispatch({ type: 'SET_RECEIVER_REFERENCE', payload: value })
                            }
                          />
                        </div>
                      </div>
                    </fieldset>
                  )}
                </>
              )}
            {!!state.shippingCondition.selection.length &&
              state.shippingCondition.selection[0].value === '02' && (
                <fieldset className="slds-form-element slds-form_compound">
                  <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
                    Vehículo
                  </legend>
                  <div className="slds-form-element__control">
                    <div className="slds-form-element__row">
                      <Input
                        id="vehicle-plate"
                        className="slds-text-color_default slds-size_1-of-2"
                        maxLength="6"
                        placeholder="Placa"
                        value={state.vehiclePlate}
                        onChange={(_, { value }) =>
                          dispatch({ type: 'SET_VEHICLE_PLATE', payload: value })
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
                          dispatch({ type: 'SET_VEHICLE_GROSS_WEIGHT', payload: value })
                        }
                        value={state.vehicleGrossWeight}
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
                        onChange={(_, { value }) =>
                          dispatch({ type: 'SET_VEHICLE_TARE', payload: value })
                        }
                        value={state.vehicleTare}
                        variant="counter"
                        required
                      />
                    </div>
                    <div className="slds-form-element__row">
                      <Input
                        id="vehicle-driver"
                        className="slds-text-color_default slds-size_1-of-1"
                        placeholder="Nombre del conductor"
                        value={state.vehicleDriver}
                        onChange={(_, { value }) =>
                          dispatch({ type: 'SET_VEHICLE_DRIVER', payload: value })
                        }
                        required
                      />
                    </div>
                    <div className="slds-form-element__row">
                      <Input
                        id="vehicle-license"
                        className="slds-text-color_default slds-size_1-of-1"
                        placeholder="Licencia del conductor"
                        maxLength="11"
                        value={state.vehicleLicense}
                        onChange={(_, { value }) =>
                          dispatch({ type: 'SET_VEHICLE_LICENSE', payload: value })
                        }
                        required
                      />
                    </div>
                  </div>
                </fieldset>
              )}
          </>
        )}
        {state.currentStep === 2 && (
          <fieldset className="slds-form-element slds-form_compound">
            <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
              {state.steps[state.currentStep].title}
            </legend>
            <div className="slds-form-element__control">
              <div className="slds-form-element__row">
                <div className="slds-size_1-of-1">
                  <Combobox
                    id="order-type"
                    classNameContainer="slds-text-color_default"
                    events={{
                      onChange: (_, { value: inputValue }) =>
                        dispatch({
                          type: 'SET_ORDER_TYPE',
                          payload: {
                            ...state.orderType,
                            inputValue,
                          },
                        }),
                      onRequestRemoveSelectedOption: () =>
                        dispatch({
                          type: 'SET_ORDER_TYPE',
                          payload: {
                            ...state.orderType,
                            inputValue: '',
                            selection: [],
                          },
                        }),
                      onSelect: (_, { selection }) =>
                        dispatch({
                          type: 'SET_ORDER_TYPE',
                          payload: {
                            ...state.orderType,
                            selection,
                          },
                        }),
                    }}
                    labels={{
                      placeholder: 'Buscar Clase de Pedido',
                      noOptionsFound: 'No se encontraron coincidencias',
                    }}
                    options={comboboxFilterAndLimit({
                      inputValue: state.orderType.inputValue,
                      options: optionsWithIcon(state.orderType.options),
                      selection: state.orderType.selection,
                    })}
                    selection={state.orderType.selection}
                    value={state.orderType.inputValue}
                    variant="inline-listbox"
                    menuPosition="overflowBoundaryElement"
                    required
                  />
                </div>
              </div>
            </div>
          </fieldset>
        )}
        {state.currentStep === 3 && (
          <>
            <fieldset className="slds-form-element slds-form_compound">
              <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
                {state.steps[state.currentStep].title}
              </legend>
              <div className="slds-form-element__control">
                <div className="slds-form-element__row">
                  <div className="slds-size_1-of-1">
                    <Combobox
                      id="payment-condition"
                      classNameContainer="slds-text-color_default"
                      events={{
                        onChange: (_, { value: inputValue }) =>
                          dispatch({
                            ...state.paymentCondition,
                            inputValue,
                          }),
                        onRequestRemoveSelectedOption: () =>
                          dispatch({
                            ...state.paymentCondition,
                            inputValue: '',
                            selection: [],
                          }),
                        onSelect: (_, { selection }) =>
                          dispatch({
                            ...state.paymentCondition,
                            selection,
                          }),
                      }}
                      labels={{
                        placeholder: 'Buscar Condición de Pago',
                        noOptionsFound: 'No se encontraron coincidencias',
                      }}
                      options={comboboxFilterAndLimit({
                        inputValue: state.paymentCondition.inputValue,
                        options: optionsWithIcon(state.paymentCondition.options),
                        selection: state.paymentCondition.selection,
                      })}
                      selection={state.paymentCondition.selection}
                      value={state.paymentCondition.inputValue}
                      variant="inline-listbox"
                      menuPosition="overflowBoundaryElement"
                      required
                    />
                  </div>
                </div>
              </div>
            </fieldset>
            {!!state.paymentCondition.selection.length &&
              state.paymentCondition.selection[0].value === 'C000' && (
                <fieldset className="slds-form-element slds-form_compound">
                  <legend className="slds-form-element__legend slds-form-element__label slds-text-color_inverse">
                    Anticipos
                  </legend>
                  <div className="slds-form-element__control">
                    <div className="slds-form-element__row">
                      <div className="slds-size_1-of-1">
                        <AdvancePayments advancePayments={[]} setAdvancePayments={() => {}} />
                      </div>
                    </div>
                  </div>
                </fieldset>
              )}
          </>
        )}
        {state.currentStep === 4 && (
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
                    value={state.purchaseOrder}
                    onChange={(_, { value }) =>
                      dispatch({ type: 'SET_PURCHASE_ORDER', payload: value })
                    }
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
                      abbreviatedWeekDays: state.abbreviatedWeekDays,
                      weekDays: state.weekDays,
                      months: state.months,
                      today: state.today,
                    }}
                    triggerClassName="slds-form-element slds-text-color_default slds-size_1-of-1"
                    formatter={(date = '') => date && moment(date).format('DD/MM/YYYY')}
                    parser={str => moment(str, 'DD/MM/YYYY').toDate()}
                    onChange={(_, { date }) =>
                      dispatch({ type: 'SET_DELIVERY_DATE', payload: date })
                    }
                    value={state.deliveryDate}
                    dateDisabled={deliveryDateValidation}
                    required
                  />
                </div>
              </div>
            </fieldset>
            {!!state.shippingCondition.selection.length &&
              state.shippingCondition.selection[0].value === '02' && (
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
                          onDateChange={date =>
                            dispatch({ type: 'SET_DELIVERY_HOUR', payload: date })
                          }
                          strValue={
                            state.deliveryHour && moment(state.deliveryHour).format('HH:mm A')
                          }
                          value={state.deliveryHour}
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
            {state.currentStep + 1} de {state.steps.length}
          </span>
          {state.currentStep > 0 && (
            <Button
              className="slds-button_inverse slds-col_bump-left"
              label="Volver"
              variant={null}
              onClick={() => dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep - 1 })}
            />
          )}
          {state.currentStep < state.steps.length - 1 && (
            <Button
              className="slds-col_bump-left"
              label="Siguiente"
              variant="brand"
              onClick={() => dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep + 1 })}
            />
          )}
          {state.currentStep === state.steps.length - 1 && (
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
}

export default Steps;
