import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import moment from 'moment';
import {
  Input,
  Combobox,
  comboboxFilterAndLimit,
  Dropdown,
  Datepicker,
  Timepicker,
  Button,
  Radio,
  RadioButtonGroup,
  ProgressRing,
} from '@salesforce/design-system-react';

import * as api from './api/mock';
import * as data from './api/data';
import { optionsWithIcon, optionWithIcon } from './utils/helpers';

import AdvancePayments from './AdvancePayments';
import AddProductModal from './AddProductModal';
import Products from './Products';

import './App.css';

const steps = [
  {
    title: 'Solicitante',
  },
  {
    title: 'Condición de entrega',
  },
  {
    title: 'Clase de pedido',
  },
  {
    title: 'Condición de Pago',
  },
  {
    title: 'Datos Generales',
  },
];
const abbreviatedWeekDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
const weekDays = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];
const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
const today = 'Hoy día';

const App = () => {
  const distributionChannel = '10';
  const sapDateFormat = 'YYYYMMDD';
  const [currentStep, setCurrentStep] = useState(0);
  const [requester, setRequester] = useState({
    inputValue: '',
    options: data.requesterList,
    selection: [optionWithIcon(data.requesterList[0])],
  });
  const [receiver, setReceiver] = useState({
    inputValue: '',
    options: data.receiverList,
    selection: [],
  });
  const [receiverCondition, setReceiverCondition] = useState('01');
  const [shippingCondition, setShippingCondition] = useState({
    inputValue: '',
    options: data.shippingConditionList,
    selection: [],
  });
  const [orderType, setOrderType] = useState({
    inputValue: '',
    options: data.packingConditionList,
    selection: [],
  });
  const [paymentCondition, setPaymentCondition] = useState({
    inputValue: '',
    options: data.paymentConditionList,
    selection: [optionWithIcon(data.paymentConditionList[0])],
  });
  const [advancePayments, setAdvancePayments] = useState({
    options: data.advancePayments,
    selection: [],
  });
  const [purchaseOrder, setPurchaseOrder] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [deliveryHour, setDeliveryHour] = useState(null);
  const deliveryDateValidation = ({ date = new Date() }) => {
    const current = moment(date);
    const min = moment().add(1, 'days');
    const max = moment().add(15, 'days');
    return !current.isBetween(min, max);
  };
  const [materials, setMaterials] = useState({
    inputValue: '',
    options: data.materialList,
    selection: [],
  });
  const [materialQuantity, setMaterialQuantity] = useState(1);
  const [products, setProducts] = useState({
    options: [],
    selection: [],
  });
  const [orderIsEnabled, setOrderIsEnabled] = useState(false);
  // Add Product Modal
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  // Vehicle
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleGrossWeight, setVehicleGrossWeight] = useState('');
  const [vehicleTare, setVehicleTare] = useState('');
  const [vehicleDriver, setVehicleDriver] = useState('');
  const [vehicleLicense, setVehicleLicense] = useState('');
  // Receiver
  const [receiverDocument, setReceiverDocument] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverStreet, setReceiverStreet] = useState('');
  const [receiverDoor, setReceiverDoor] = useState('');
  const [receiverDepartment, setReceiverDepartment] = useState({
    inputValue: '',
    options: [],
    selection: [],
  });
  const [receiverProvince, setReceiverProvince] = useState({
    inputValue: '',
    options: [],
    selection: [],
  });
  const [receiverDistrict, setReceiverDistrict] = useState({
    inputValue: '',
    options: [],
    selection: [],
  });
  const [receiverReference, setReceiverReference] = useState('');
  // Steps
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);
  // Simulate Sales Order
  const productsToITItems = products =>
    lodash.map(products, (product, index) => {
      const { value, quantity: qty } = product;
      const ITM_NUMBER = lodash.padStart(((index + 1) * 10).toString(), 6, '0');
      const MATERIAL = value;
      const PLANT = '1000';
      const TARGET_QTY = lodash.padStart((qty * 1000).toString(), 20, '0');
      return {
        ITM_NUMBER,
        MATERIAL,
        PLANT,
        TARGET_QTY,
      };
    });
  const simulateSalesOrder = () => {
    // if (!stepsIsComplete()) {
    //   alert('Por favor completar todos los pasos con la información necesaria');
    // }

    const salesOrder = {
      I_HEADER: {
        DOC_TYPE: orderType.selection[0].value,
        SALES_ORG: '1000',
        DISTR_CHAN: distributionChannel,
        DIVISION: '10',
        REQ_DATE_H: moment(deliveryDate).format(sapDateFormat),
        PURCH_NO_C: purchaseOrder,
        SOLICITANTE: requester.selection[0].value,
        DESTINATARIO: requester.selection[0].value,
      },
      IT_ITEMS: productsToITItems(products.options),
    };

    api.simulateSalesOrder(salesOrder).then(({ data }) => {
      console.log(
        data['ET_CONDITION'],
        lodash.groupBy(data['ET_CONDITION'], 'ITM_NUMBER')
      );

      if (!data['ET_CONDITION'].length && !data['ET_ITEM_WEIGTH'].length) {
        alert(
          'Los productos selecionados no tienen precio o stock por favor cambiarlos por otros productos.'
        );
        return;
      }

      lodash.each(
        lodash.groupBy(data['ET_CONDITION'], 'ITM_NUMBER'),
        (info, ITM_NUMBER) => {
          try {
            const amount = lodash.find(
              info,
              field => field['COND_TYPE'] === 'ZPRB'
            )['CONDVALUE'];
            const igv = lodash.find(
              info,
              field => field['COND_TYPE'] === 'MWST'
            )['CONDVALUE'];
            const index = +ITM_NUMBER / 10 - 1;
            const newProducts = products.options;
            newProducts[index] = {
              ...newProducts[index],
              amount,
              igv,
            };
            setProducts({ ...products, options: newProducts });
          } catch (e) {
            alert(
              `El producto nro ${+ITM_NUMBER /
                10} no tiene precio o stock por favor cambiarlo por otro producto.`
            );
          }
        }
      );

      console.log(data['ET_ITEM_WEIGTH']);

      lodash.each(data['ET_ITEM_WEIGTH'], row => {
        const { ITM_NUMBER, BRGEW } = row;
        const index = +ITM_NUMBER / 10 - 1;
        const weight = BRGEW;
        const newProducts = products.options;
        newProducts[index] = {
          ...newProducts[index],
          weight,
        };
        setProducts({ ...products, options: newProducts });
      });

      setOrderIsEnabled(true);
    });
  };
  // Create Sales Order
  const createSalesOrder = () => {
    let salesOrder = {
      I_HEADER: {
        DOC_TYPE: orderType.selection[0].value,
        SALES_ORG: '1000',
        DISTR_CHAN: distributionChannel,
        DIVISION: '10',
        REQ_DATE_H: moment(deliveryDate).format(sapDateFormat),
        PURCH_NO_C: purchaseOrder,
        SOLICITANTE: requester.selection[0].value,
        DESTINATARIO: requester.selection[0].value,
      },
      IT_ITEMS: productsToITItems(products),
    };

    // if (paymentCondition.selection[0].value === 'C000') {
    //   salesOrder['I_ANTICIPO'] = advancePayments.selection[0].value;
    // }

    if (shippingCondition.selection[0].value === '01') {
      api.createSalesOrder(salesOrder).then(({ data }) => {
        alert(`El nro de pedido es ${data}`);
      });
    } else {
      salesOrder['I_VEHICLE'] = {
        TNDR_TRKID: vehiclePlate,
        BRUTO: vehicleGrossWeight,
        TARA: vehicleTare,
        MEINS: 'KG',
        TNDR_CRNM: vehicleDriver,
        EXIT1: vehicleLicense,
      };
      salesOrder['I_REQ_TIME'] = moment(deliveryHour).format('HH:mm:ss');

      api.createSalesOrder(salesOrder).then(() => {
        alert(`El nro de pedido es 197001051`);
      });
    }
  };
  // Check Steps
  const stepsIsComplete = () => {
    const step1IsValid = () => {
      return !!requester.selection.length;
    };
    const step2IsValid = () => {};
    const step3IsValid = () => {};
    const step4IsValid = () => {};
    const step5IsValid = () => {};

    return (
      !!orderType.selection.length &&
      !!distributionChannel.length &&
      !!deliveryDate &&
      !!purchaseOrder.length &&
      !!requester.selection.length &&
      !!receiver.selection.length &&
      !!products.options.length
    );
  };

  useEffect(() => {
    console.log(products);
  }, [products.options]);

  return (
    <div className="slds-grid" style={{ height: '100vh' }}>
      <div className="slds-col">
        <div
          className="slds-grid 	slds-grid_align-spread"
          style={{
            height: 56,
            padding: 4,
            boxShadow: '0 0 2px rgba(0,0,0,.18)',
          }}
        >
          <Button
            className="slds-button_icon-size"
            iconCategory="standard"
            iconName="flow"
            iconSize="large"
            variant="icon"
          />
          <Dropdown
            iconCategory="utility"
            iconName="user"
            iconSize="large"
            buttonVariant="icon"
            buttonClassName="slds-button_icon-size"
            nubbinPosition="top right"
            onSelect={() => {}}
            options={[
              { label: 'Perfil', value: '01' },
              { type: 'divider' },
              { label: 'Cerrar Sesión', value: '00' },
            ]}
          />
        </div>
        <div className="slds-m-around_small">
          {/* Order Info */}
          <section
            className="slds-popover slds-popover_walkthrough slds-size_12-of-12"
            role="dialog"
          >
            <header className="slds-popover__header slds-p-vertical_medium">
              <h2 className="slds-text-heading_medium">
                Información del Pedido
              </h2>
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
                              options: optionsWithIcon(
                                shippingCondition.options
                              ),
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
                                  maxLength="20"
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
                                  maxLength="20"
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
                                  maxLength="20"
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
                                  maxLength="20"
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
                                    noOptionsFound:
                                      'No se encontraron coincidencias',
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
                                    noOptionsFound:
                                      'No se encontraron coincidencias',
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
                                    noOptionsFound:
                                      'No se encontraron coincidencias',
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
                                  maxLength="20"
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
                              value={vehicleTare}
                              onInput={({ target: { value } }) =>
                                setVehicleTare(value)
                              }
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
                            placeholder: 'Buscar Solicitante',
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
                              options: optionsWithIcon(
                                paymentCondition.options
                              ),
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
                          onInput={({ target: { value } }) =>
                            setPurchaseOrder(value)
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
                                placeholder="Seleccione una hora"
                                onDateChange={date => setDeliveryHour(date)}
                                strValue=""
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
                    onClick={() => setProducts({ options: [''] })}
                  />
                )}
              </div>
            </footer>
          </section>
          {/* Order */}
          <section
            className="slds-popover slds-popover_walkthrough slds-size_12-of-12 slds-m-top_small"
            role="dialog"
          >
            <header className="slds-popover__header slds-p-vertical_medium">
              <h2 className="slds-text-heading_medium">Pedido</h2>
            </header>
            <div className="slds-popover__body">
              <Products products={products} setProducts={setProducts} />
            </div>
            <footer className="slds-popover__footer">
              <div className="slds-grid slds-grid_vertical-align-center">
                <Button
                  id="add-product"
                  className="slds-col_bump-left"
                  label="Agregar Producto"
                  onClick={() => setShowAddProductModal(true)}
                />
                <Button
                  id="simulate-sales-order"
                  className="slds-col_bump-left"
                  label="Cotizar"
                  variant="brand"
                  onClick={simulateSalesOrder}
                />
                <Button
                  id="create-sales-order"
                  className="slds-col_bump-left"
                  label="Crear"
                  variant="success"
                  disabled={!orderIsEnabled}
                  onClick={createSalesOrder}
                />
              </div>
            </footer>
          </section>
        </div>
      </div>
      <div
        className="slds-panel slds-size_medium slds-panel_docked slds-panel_docked-left"
        aria-hidden="false"
      >
        <div className="slds-panel__header">
          <h2
            className="slds-panel__header-title slds-text-heading_small slds-truncate"
            title="Panel Header"
          >
            Información general del pedido
          </h2>
          <Button
            iconCategory="utility"
            iconName="close"
            variant="icon"
            onClick={e => {}}
          />
        </div>
        <div className="slds-panel__body slds-p-around_none">
          <div
            className="slds-grid slds-grid_align-center slds-p-around_medium"
            style={{ backgroundColor: '#f7f8fc' }}
          >
            <RadioButtonGroup>
              <Radio
                key="progress"
                label="Progreso"
                value="1"
                checked={true}
                variant="button-group"
              />
              <Radio
                key="overview"
                label="Resumen"
                value="1"
                checked={false}
                variant="button-group"
              />
            </RadioButtonGroup>
          </div>
          <ul className="slds-p-around_medium">
            {lodash.map(steps, (step, index) => (
              <li key={index} style={{ paddingTop: 8, paddingBottom: 8 }}>
                <div className="slds-grid slds-grid_vertical-align-center">
                  <ProgressRing
                    value={100}
                    theme={index <= currentStep ? 'complete' : null}
                    hasIcon
                    icon={
                      <div
                        className={
                          index <= currentStep
                            ? 'slds-text-color_inverse'
                            : 'slds-text-body_regular'
                        }
                      >
                        {index + 1}
                      </div>
                    }
                  />
                  <div className="slds-m-left_x-small">{step.title}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AddProductModal
        materials={materials}
        setMaterials={setMaterials}
        materialQuantity={materialQuantity}
        setMaterialQuantity={setMaterialQuantity}
        products={products}
        setProducts={setProducts}
        showAddProductModal={showAddProductModal}
        setShowAddProductModal={setShowAddProductModal}
        setOrderIsEnabled={setOrderIsEnabled}
      />
    </div>
  );
};

export default App;
