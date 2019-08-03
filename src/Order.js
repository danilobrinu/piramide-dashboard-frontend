import React from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { useAppState } from './AppContext';
import { Button, Tooltip } from '@salesforce/design-system-react';
import * as api from './api/mock';
import { uniqid } from './utils/helpers';

////////////////////////////////////////////////////////////////////////////////////////////////////

import Products from './Products';

////////////////////////////////////////////////////////////////////////////////////////////////////

function Order() {
  const [state, dispatch] = useAppState();
  const validateAllSteps = (notifications = false) => {
    dispatch({ type: 'SET_NOTIFICATIONS', payload: [] });

    const validateStep1 = () => {
      let valid = !!state.requester.selection.length;

      if (!valid && notifications) {
        dispatch({
          type: 'SET_NOTIFICATIONS',
          payload: [
            ...state.notifications,
            {
              id: uniqid(),
              title: 'El paso 1 no se ha completado.',
              description: 'Es necesario completar los campos.',
              type: 'return_order',
            },
          ],
        });
      }

      return valid;
    };
    const validateStep2 = () => {
      if (!state.shippingCondition.selection.length) {
        if (notifications) {
          dispatch({
            type: 'SET_NOTIFICATIONS',
            payload: [
              ...state.notifications,
              {
                id: uniqid(),
                title: 'El paso 2 no se ha completado.',
                description: 'Es necesario completar los campos.',
                type: 'return_order',
              },
            ],
          });
        }

        return false;
      }

      let valid = true;

      switch (state.shippingCondition.selection[0].value) {
        case '01':
          switch (state.receiverCondition) {
            case '01':
              valid = !!state.requester.selection.length;
              break;
            case '02':
              valid =
                !!state.receiverDocument.length &&
                !!state.receiverName.length &&
                !!state.receiverStreet.length &&
                !!state.receiverDoor.length &&
                !!state.receiverDepartment.selection.length &&
                !!state.receiverProvince.selection.length &&
                !!state.receiverDistrict.selection.length;
              break;
            default:
              valid = true;
              break;
          }
          break;
        case '02':
          valid =
            !!state.vehiclePlate.length &&
            !!state.vehicleDriver.length &&
            !!state.vehicleLicense.length;
          break;
        default:
          valid = true;
          break;
      }

      if (!valid && notifications) {
        dispatch({
          type: 'SET_NOTIFICATIONS',
          payload: [
            ...state.notifications,
            {
              id: uniqid(),
              title: 'El paso 2 no se ha completado.',
              description: 'Es necesario completar los campos.',
              type: 'return_order',
            },
          ],
        });
      }

      return valid;
    };
    const validateStep3 = () => {
      const valid = !!state.orderType.selection.length;

      if (!valid && notifications) {
        dispatch({
          type: 'SET_NOTIFICATIONS',
          payload: [
            ...state.notifications,
            {
              id: uniqid(),
              title: 'El paso 3 no se ha completado.',
              description: 'Es necesario completar los campos.',
              type: 'return_order',
            },
          ],
        });
      }

      return valid;
    };
    const validateStep4 = () => {
      if (!state.paymentCondition.selection.length) {
        if (notifications) {
          dispatch({
            type: 'SET_NOTIFICATIONS',
            payload: [
              ...state.notifications,
              {
                id: uniqid(),
                title: 'El paso 4 no se ha completado.',
                description: 'Es necesario completar los campos.',
                type: 'return_order',
              },
            ],
          });
        }

        return false;
      }

      let valid = true;

      switch (state.paymentCondition.selection[0].length) {
        case 'C000':
          valid = true;
          break;
        default:
          valid = true;
          break;
      }

      if (!valid && notifications) {
        dispatch({
          type: 'SET_NOTIFICATIONS',
          payload: [
            ...state.notifications,
            {
              id: uniqid(),
              title: 'El paso 4 no se ha completado.',
              description: 'Es necesario completar los campos.',
              type: 'return_order',
            },
          ],
        });
      }

      return valid;
    };
    const validateStep5 = () => {
      const valid =
        !!state.purchaseOrder.length &&
        !!state.deliveryDate &&
        (state.shippingCondition.selection[0] === '02' ? !!state.deliveryHour : true);

      if (!valid && notifications) {
        dispatch({
          type: 'SET_NOTIFICATIONS',
          payload: [
            ...state.notifications,
            {
              id: uniqid(),
              title: 'El paso 5 no se ha completado.',
              description: 'Es necesario completar los campos.',
              type: 'return_order',
            },
          ],
        });
      }

      return valid;
    };

    const step1IsValid = validateStep1();
    const step2IsValid = validateStep2();
    const step3IsValid = validateStep3();
    const step4IsValid = validateStep4();
    const step5IsValid = validateStep5();
    const isValid = step1IsValid && step2IsValid && step3IsValid && step4IsValid && step5IsValid;

    if (isValid && notifications) {
      dispatch({
        type: 'SET_NOTIFICATIONS',
        payload: [
          ...state.notifications,
          {
            id: uniqid(),
            title: 'Todo esta completo.',
            description: 'Ya puede agregar productos a su pedido.',
            type: 'reward',
          },
        ],
      });
    }

    return isValid;
  };
  const toItems = products =>
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
  const getFirstNameAndLastName = (fullName, size = 40) => {
    if (fullName.length <= size) {
      return fullName.split(' ');
    } else {
      var firstName = [];
      var lastName = [];
      var splits = fullName.split(' ');
      for (var i = 0; i < splits.length; i++) {
        const firstNameSize =
          lodash.reduce([...splits, splits[i]], (acc, word) => acc + word.length, 0) +
          firstName.length;
        if (firstNameSize <= size) {
          firstName.push(splits[i]);
        } else {
          lastName.push(splits[i]);
        }
      }

      return [firstName.join(' '), lastName.join(' ').substr(0, 40)];
    }
  };
  // Simulate Sales Order
  const simulateSalesOrder = () => {
    dispatch({ type: 'SET_NOTIFICATIONS', payload: [] });

    if (!validateAllSteps()) {
      dispatch({
        type: 'SET_NOTIFICATIONS',
        payload: [
          ...state.notifications,
          {
            id: uniqid(),
            title: 'La cotización no se ha realizado satisfactoriamente',
            description: 'Para cotizar es necesario completar todos los pasos',
            type: 'first_non_empty',
          },
        ],
      });

      return;
    }

    if (!state.products.options.length) {
      dispatch({
        type: 'SET_NOTIFICATIONS',
        payload: [
          ...state.notifications,
          {
            id: uniqid(),
            title: 'La cotización no se ha realizado satisfactoriamente',
            description: 'No hay productos en el pedido',
            type: 'first_non_empty',
          },
        ],
      });

      return;
    }

    dispatch({
      type: 'SET_NOTIFICATIONS',
      payload: [
        ...state.notifications,
        {
          id: uniqid(),
          title: 'Realizando cotización',
          description: 'Esta operación puede tomar unos minutos',
          type: 'business_hours',
        },
      ],
    });

    const salesOrder = {
      I_HEADER: {
        DOC_TYPE: state.orderType.selection[0].value,
        SALES_ORG: '1000',
        DISTR_CHAN: state.distributionChannel,
        DIVISION: '10',
        REQ_DATE_H: moment(state.deliveryDate).format(state.sapDateFormat),
        PURCH_NO_C: state.purchaseOrder,
        SOLICITANTE: state.requester.selection[0].value,
        DESTINATARIO: state.requester.selection[0].value,
        SHIP_COND: state.shippingCondition.selection[0].value,
        PMNTTRMS: state.paymentCondition.selection[0].value,
        CUST_GRP2: state.reasonTransfer.selection[0].value,
      },
      IT_ITEMS: toItems(state.products.options),
    };
    let errors = [];

    api.simulateSalesOrder(salesOrder).then(({ data }) => {
      if (!data['ET_CONDITION'].length || !data['ET_ITEM_WEIGTH'].length) {
        dispatch({
          type: 'SET_NOTIFICATIONS',
          payload: [
            ...state.notifications,
            {
              id: uniqid(),
              title: 'La cotización tuvo algunos problemas.',
              description: 'Los productos del pedido no tienen precio, stock o peso.',
              type: 'first_non_empty',
            },
          ],
        });
        return;
      }

      lodash.each(lodash.groupBy(data['ET_CONDITION'], 'ITM_NUMBER'), (info, ITM_NUMBER) => {
        try {
          const index = +ITM_NUMBER / 10 - 1;
          const amount = +lodash.find(info, { COND_TYPE: 'ZPRB' }).CONDVALUE;
          const igv = +lodash.find(info, { COND_TYPE: 'MWST' }).CONDVALUE;

          dispatch({
            type: 'SET_PRODUCTS',
            payload: {
              ...state.products,
              options: lodash.map(state.products.options, (product, key) => {
                if (index !== key) return product;

                return {
                  ...product,
                  amount,
                  igv,
                };
              }),
            },
          });
        } catch (e) {
          const index = +ITM_NUMBER / 10;
          errors = [
            ...errors,
            {
              id: uniqid(),
              title: `El producto Nro: ${index} no tiene stock o precio.`,
              description: 'No se pudo determinar el monto e IGV.',
              type: 'first_non_empty',
            },
          ];
        }
      });

      lodash.each(data['ET_ITEM_WEIGTH'], info => {
        try {
          const { ITM_NUMBER, BRGEW } = info;
          const index = +ITM_NUMBER / 10 - 1;
          const weight = +BRGEW;

          dispatch({
            type: 'SET_PRODUCTS',
            payload: {
              ...state.products,
              options: lodash.map(state.products.options, (product, key) => {
                if (index !== key) return product;

                return {
                  ...product,
                  weight,
                };
              }),
            },
          });
        } catch (e) {
          const { ITM_NUMBER } = info;
          const index = +ITM_NUMBER / 10 - 1;
          errors = [
            ...errors,
            {
              id: uniqid(),
              title: `El producto Nro: ${index} no tiene peso.`,
              description: 'No se pudo determinar el peso.',
              type: 'first_non_empty',
            },
          ];
        }
      });

      const hasErrors = !!errors.length;

      if (hasErrors) {
        dispatch({
          type: 'SET_NOTIFICATIONS',
          payload: [
            ...state.notifications,
            {
              id: uniqid(),
              title: 'La cotización no se ha realizado satisfactoriamente.',
              description: 'Algunos productos no tienen stock, precio o peso.',
              type: 'first_non_empty',
            },
            ...errors,
          ],
        });
      } else {
        dispatch({
          type: 'SET_NOTIFICATIONS',
          payload: [
            ...state.notifications,
            {
              id: uniqid(),
              title: 'La cotización se ha realizado satisfactoriamente.',
              description: 'Ya puede proceder a crear el pedido.',
              type: 'approval',
            },
          ],
        });
      }

      dispatch({ type: 'SET_ORDER_IS_ENABLED', payload: !hasErrors });
    });
  };
  // Create Sales Order
  const createSalesOrder = () => {
    if (!state.orderIsEnabled) return;

    dispatch({ type: 'SET_NOTIFICATIONS', payload: [] });

    dispatch({
      type: 'SET_START_CREATE_SALES_ORDER_MODAL',
      payload: {
        ...state.startCreateSalesOrderModal,
        open: true,
      },
    });

    let salesOrder = {
      I_HEADER: {
        DOC_TYPE: state.orderType.selection[0].value,
        SALES_ORG: '1000',
        DISTR_CHAN: state.distributionChannel,
        DIVISION: '10',
        REQ_DATE_H: moment(state.deliveryDate).format(state.sapDateFormat),
        PURCH_NO_C: state.purchaseOrder,
        SOLICITANTE: state.requester.selection[0].value,
        DESTINATARIO: state.requester.selection[0].value,
        SHIP_COND: state.shippingCondition.selection[0].value,
        PMNTTRMS: state.paymentCondition.selection[0].value,
        CUST_GRP2: state.reasonTransfer.selection[0].value,
      },
      IT_ITEMS: toItems(state.products.options),
    };

    if (
      state.paymentCondition.selection[0].value === 'C000' &&
      !!state.advancePayments.selection.length
    ) {
      salesOrder.I_ANTICIPO = state.advancePayments.selection[0].value;
    }

    if (state.shippingCondition.selection[0].value === '01') {
      if (state.receiverCondition === '01') {
        api.createSalesOrder(salesOrder).then(({ data: salesOrderDoc }) => {
          if (salesOrderDoc) {
            dispatch({
              type: 'SET_FINISH_CREATE_ORDER_MODAL',
              payload: {
                ...state.finishCreateOrderModal,
                title: `Pedido #${salesOrderDoc}`,
                promptType: 'success',
                description: 'El pedido se ha creado satisfactoriamente.',
                open: true,
              },
            });
          } else {
            dispatch({
              type: 'SET_FINISH_CREATE_ORDER_MODAL',
              payload: {
                ...state.finishCreateOrderModal,
                promptType: 'error',
                description: 'El pedido no se ha creado satisfactoriamente.',
                open: true,
              },
            });
          }

          dispatch({
            type: 'setStartCreateSalesOrderModal',
            payload: {
              ...state.startCreateSalesOrderModal,
              open: false,
            },
          });
        });
      } else {
        const [firstName, lastName] = getFirstNameAndLastName(state.receiverName);
        const receiver = {
          PI_PERSONALDATA: {
            FIRSTNAME: firstName,
            LASTNAME: lastName,
            CITY: state.receiverProvince.selection[0].value,
            DISTRICT: state.receiverDistrict.selection[0].value,
            STREET: state.receiverStreet,
            HOUSE_NO: state.receiverDoor,
            COUNTRY: 'PE',
            REGION: state.receiverDepartment.selection[0].value,
            LANGU_P: 'ES',
            CURRENCY: 'PEN',
          },
          PI_OPT_PERSONALDATA: {
            TRANSPZONE: state.receiverDistrict.selection[0].TRANSPZONE,
          },
          PI_ADRS_REFERENCE: state.receiverReference,
          I_VTWEG: state.distributionChannel,
          I_KUNNR:
            state.distributionChannel === '30' ? state.requester.selection[0].value : '0020001841',
        };

        api.createReceiver(receiver).then(({ data: receiverDoc }) => {
          if (!receiverDoc) {
            dispatch({
              type: 'SET_START_CREATE_SALES_ORDER_MODAL',
              payload: {
                ...state.startCreateSalesOrderModal,
                open: false,
              },
            });

            dispatch({
              type: 'SET_FINISH_CREATE_ORDER_MODAL',
              payload: {
                ...state.finishCreateOrderModal,
                promptType: 'error',
                description:
                  'El pedido no se ha creado satisfactoriamente.' +
                  'No se pudo crear el destinatario.',
                open: true,
              },
            });

            return;
          }

          salesOrder.I_HEADER.DESTINATARIO = receiverDoc;

          api.createSalesOrder(salesOrder).then(({ data: salesOrderDoc }) => {
            dispatch({
              type: 'SET_START_CREATE_SALES_ORDER_MODAL',
              payload: {
                ...state.startCreateSalesOrderModal,
                open: false,
              },
            });

            if (salesOrderDoc) {
              dispatch({
                type: 'SET_FINISH_CREATE_ORDER_MODAL',
                payload: {
                  ...state.finishCreateOrderModal,

                  title: `Pedido #${salesOrderDoc}`,
                  promptType: 'success',
                  description: 'El pedido se ha creado satisfactoriamente.',
                  open: true,
                },
              });
            } else {
              dispatch({
                type: 'SET_FINISH_CREATE_ORDER_MODAL',
                payload: {
                  ...state.finishCreateOrderModal,

                  promptType: 'error',
                  description: 'El pedido no se ha creado satisfactoriamente.',
                  open: true,
                },
              });
            }
          });
        });
      }
    } else {
      salesOrder.I_HEADER.DESTINATARIO = '0020001841';
      salesOrder.I_VEHICLE = {
        TNDR_TRKID: state.vehiclePlate,
        BRUTO: state.vehicleGrossWeight,
        TARA: state.vehicleTare,
        MEINS: 'KG',
        TNDR_CRNM: state.vehicleDriver,
        EXTI1: state.vehicleLicense,
      };
      salesOrder.I_REQ_TIME = moment(state.deliveryHour).format('HH:mm:ss');

      api.createSalesOrder(salesOrder).then(({ data: salesOrderDoc }) => {
        dispatch({
          type: 'SET_START_CREATE_SALES_ORDER_MODAL',
          payload: {
            ...state.startCreateSalesOrderModal,
            open: false,
          },
        });

        if (salesOrderDoc) {
          dispatch({
            type: 'SET_FINISH_CREATE_ORDER_MODAL',
            payload: {
              ...state.finishCreateOrderModal,
              title: `Pedido #${salesOrderDoc}`,
              promptType: 'success',
              description: 'El pedido se ha creado satisfactoriamente.',
              open: true,
            },
          });
        } else {
          dispatch({
            type: 'SET_FINISH_CREATE_ORDER_MODAL',
            payload: {
              ...state.finishCreateOrderModal,
              promptType: 'error',
              description: 'El pedido no se ha creado satisfactoriamente.',
              open: true,
            },
          });
        }
      });
    }
  };
  const handleClick = () =>
    dispatch({
      type: 'SET_OVERVIEW_SALES_ORDER_MODAL',
      payload: {
        ...state.overviewSalesOrderModal,
        open: true,
      },
    });

  return (
    <section
      className="slds-popover slds-popover_walkthrough slds-popover_walkthrough-alt slds-size_12-of-12 slds-m-top_small"
      role="dialog"
    >
      <header className="slds-popover__header slds-p-vertical_medium">
        <div className="slds-grid slds-grid_align-spread">
          <h2 className="slds-text-heading_medium">Pedido</h2>
          <Tooltip align="left" content="Resumen del Pedido">
            <Button
              iconCategory="action"
              iconName="info"
              iconSize="large"
              variant="icon"
              inverse
              onClick={handleClick}
            />
          </Tooltip>
        </div>
      </header>
      <div className="slds-popover__body">
        <Products />
      </div>
      <footer className="slds-popover__footer">
        <div className="slds-grid slds-grid_vertical-align-center">
          <Button
            id="add-product"
            className="slds-col_bump-left"
            label="Agregar Producto"
            onClick={() => dispatch({ type: 'SET_SHOW_ADD_PRODUCT_MODAL', payload: true })}
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
            disabled={!state.orderIsEnabled}
            onClick={createSalesOrder}
          />
        </div>
      </footer>
    </section>
  );
}

export default Order;
