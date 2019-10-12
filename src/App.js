import React, { useEffect } from 'react';
import lodash from 'lodash';

////////////////////////////////////////////////////////////////////////////////////////////////////

import { optionWithIcon, optionsWithIcon } from './utils/helpers';

////////////////////////////////////////////////////////////////////////////////////////////////////

import Navbar from './Navbar';
import Steps from './Steps';
import Order from './Order';
import StartCreateSalesOrderModal from './StartCreateSalesOrderModal';
import FinishCreateSalesOrderModal from './FinishCreateSalesOrderModal';
import OverviewSalesOrderModal from './OverviewSalesOrderModal';
import AddProductModal from './AddProductModal';
import ChangePasswordModal from './ChangePasswordModal';
import Notifications from './Notifications';

////////////////////////////////////////////////////////////////////////////////////////////////////

import './App.css';
import { ReactComponent as Logo } from './logo.svg';

////////////////////////////////////////////////////////////////////////////////////////////////////

import { AppStateProvider, useAppState } from './AppContext';

const initialAppState = {
  customer: window.__INITIAL_DATA__.customer,
  steps: window.__INITIAL_DATA__.steps,
  abbreviatedWeekDays: window.__INITIAL_DATA__.abbreviatedWeekDays,
  weekDays: window.__INITIAL_DATA__.weekDays,
  months: window.__INITIAL_DATA__.months,
  today: window.__INITIAL_DATA__.today,
  distributionChannel: window.__INITIAL_DATA__.distributionChannel,
  sapDateFormat: window.__INITIAL_DATA__.sapDateFormat,
  currentStep: 0,
  receiverCondition: '01',
  materialQuantity: 1,
  purchaseOrder: '',
  deliveryDate: null,
  deliveryHour: null,
  requester: {
    inputValue: '',
    options: window.__INITIAL_DATA__.requesterList,
    selection: [optionWithIcon(window.__INITIAL_DATA__.requesterList[0])],
  },
  shippingCondition: {
    inputValue: '',
    options: window.__INITIAL_DATA__.shippingConditionList,
    selection: [],
  },
  orderType: {
    inputValue: '',
    options: window.__INITIAL_DATA__.orderTypeList,
    selection: [],
  },
  paymentCondition: {
    inputValue: '',
    options: window.__INITIAL_DATA__.paymentConditionList,
    selection: [],
  },
  reasonTransfer: {
    options: window.__INITIAL_DATA__.reasonTransferList,
    selection: [],
  },
  advancePayments: {
    options: window.__INITIAL_DATA__.advancePayments,
    selection: [],
  },
  materials: {
    inputValue: '',
    options: window.__INITIAL_DATA__.materialList,
    selection: [],
  },
  products: {
    options: [],
    selection: [],
  },
  orderIsEnabled: false,
  showAddProductModal: false,
  showSidebarInfo: false,
  // Vehicle
  vehiclePlate: '',
  vehicleGrossWeight: '',
  vehicleTare: '',
  vehicleDriver: '',
  vehicleLicense: '',
  // Receiver
  receiverDocument: '',
  receiverName: '',
  receiverStreet: '',
  receiverDoor: '',
  receiverDepartment: {
    inputValue: '',
    options: window.__INITIAL_DATA__.departmentList,
    selection: [],
  },
  receiverProvince: {
    inputValue: '',
    options: [],
    selection: [],
  },
  receiverDistrict: {
    inputValue: '',
    options: [],
    selection: [],
  },
  receiverReference: '',
  // Order
  startCreateSalesOrderModal: {
    title: 'Creando Pedido',
    promptType: 'info',
    description:
      'Esta operacion puede tomar unos minutos, porfavor espere ' +
      'y no cierre y/o actualize la pagina',
    open: false,
  },
  finishCreateSalesOrderModal: {
    title: 'Pedido',
    promptType: 'success',
    description: '',
    open: false,
  },
  overviewSalesOrderModal: {
    title: 'Resumen del Pedido',
    open: false,
  },
  // Notifications
  notifications: [],
  // Change password
  password: '',
  verifyPassword: '',
  newPassword: '',
  changePasswordModal: {
    title: 'Cambiar contraseña',
    open: false,
  },
};
const appStateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_STEP': {
      return { ...state, currentStep: action.payload };
    }
    case 'SET_REQUESTER': {
      return { ...state, requester: action.payload };
    }
    case 'SET_SHIPPING_CONDITION': {
      return { ...state, shippingCondition: action.payload };
    }
    case 'SET_RECEIVER_CONDITION': {
      return { ...state, receiverCondition: action.payload };
    }
    case 'SET_RECEIVER_DOCUMENT': {
      return { ...state, receiverDocument: action.payload };
    }
    case 'SET_RECEIVER_NAME': {
      return { ...state, receiverName: action.payload };
    }
    case 'SET_RECEIVER_STREET': {
      return { ...state, receiverStreet: action.payload };
    }
    case 'SET_RECEIVER_DOOR': {
      return { ...state, receiverDoor: action.payload };
    }
    case 'SET_RECEIVER_DEPARTMENT': {
      return { ...state, receiverDepartment: action.payload };
    }
    case 'SET_RECEIVER_PROVINCE': {
      return { ...state, receiverProvince: action.payload };
    }
    case 'SET_RECEIVER_DISTRICT': {
      return { ...state, receiverDistrict: action.payload };
    }
    case 'SET_RECEIVER_REFERENCE': {
      return { ...state, receiverReference: action.payload };
    }
    case 'SET_VEHICLE_PLATE': {
      return { ...state, vehiclePlate: action.payload };
    }
    case 'SET_VEHICLE_GROSS_WEIGHT': {
      return { ...state, vehicleGrossWeight: action.payload };
    }
    case 'SET_VEHICLE_TARE': {
      return { ...state, vehicleTare: action.payload };
    }
    case 'SET_VEHICLE_DRIVER': {
      return { ...state, vehicleDriver: action.payload };
    }
    case 'SET_VEHICLE_LICENSE': {
      return { ...state, vehicleLicense: action.payload };
    }
    case 'SET_ORDER_TYPE': {
      return { ...state, orderType: action.payload };
    }
    case 'SET_REASON_TRANSFER': {
      return { ...state, reasonTransfer: action.payload };
    }
    case 'SET_PAYMENT_CONDITION': {
      return { ...state, paymentCondition: action.payload };
    }
    case 'SET_PURCHASE_ORDER': {
      return { ...state, purchaseOrder: action.payload };
    }
    case 'SET_DELIVERY_DATE': {
      return { ...state, deliveryDate: action.payload };
    }
    case 'SET_DELIVERY_HOUR': {
      return { ...state, deliveryHour: action.payload };
    }
    case 'SET_MATERIALS': {
      return { ...state, materials: action.payload };
    }
    case 'SET_SHOW_ADD_PRODUCT_MODAL': {
      return { ...state, showAddProductModal: action.payload };
    }
    case 'SET_MATERIAL_QUANTITY': {
      return { ...state, materialQuantity: action.payload };
    }
    case 'SET_PRODUCTS': {
      return { ...state, products: action.payload };
    }
    case 'SET_ORDER_IS_ENABLED': {
      return { ...state, orderIsEnabled: action.payload };
    }
    case 'SET_START_CREATE_SALES_ORDER_MODAL': {
      return { ...state, startCreateSalesOrderModal: action.payload };
    }
    case 'SET_FINISH_CREATE_SALES_ORDER_MODAL': {
      return { ...state, finishCreateSalesOrderModal: action.payload };
    }
    case 'SET_OVERVIEW_SALES_ORDER_MODAL': {
      return { ...state, overviewSalesOrderModal: action.payload };
    }
    case 'SET_CHANGE_PASSWORD_MODAL': {
      return { ...state, changePasswordModal: action.payload };
    }
    case 'SET_PASSWORD': {
      return { ...state, password: action.payload };
    }
    case 'SET_NEW_PASSWORD': {
      return { ...state, newPassword: action.payload };
    }
    case 'SET_VERIFY_PASSWORD': {
      return { ...state, verifyPassword: action.payload };
    }
    case 'SET_SHOW_SIDEBAR_INFO': {
      return { ...state, showSidebarInfo: action.payload };
    }
    case 'CLEAR_NOTIFICATIONS': {
      return { ...state, notifications: [] };
    }
    case 'UNSTACK_NOTIFICATIONS': {
      return { ...state, notifications: [...state.notifications].slice(1) };
    }
    case 'ADD_NOTIFICATION': {
      return { ...state, notifications: [...state.notifications, action.payload] };
    }
    case 'ADD_NOTIFICATIONS': {
      return { ...state, notifications: [...state.notifications, ...action.payload] };
    }
    case 'REMOVE_NOTIFICATION': {
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload.id
        ),
      };
    }
    default: {
      throw new Error(`The ${action.type} action not exists`);
    }
  }
};

function Dashboard() {
  const [state, dispatch] = useAppState();

  useEffect(() => {
    // Set reasonTransfer by shippingCondition and receiverCondition
    if (!state.shippingCondition.selection.length) return;

    switch (state.shippingCondition.selection[0].value) {
      case '01':
        switch (state.receiverCondition) {
          case '02':
            dispatch({
              type: 'SET_REASON_TRANSFER',
              payload: {
                ...state.reasonTransfer,
                selection: lodash.filter(
                  state.reasonTransfer.options,
                  reason => reason.value === 'M'
                ),
              },
            });
            break;
          case '01':
          default:
            dispatch({
              type: 'SET_REASON_TRANSFER',
              payload: {
                ...state.reasonTransfer,
                selection: lodash.filter(
                  state.reasonTransfer.options,
                  reason => reason.value === 'A'
                ),
              },
            });
            break;
        }
        break;
      case '02':
      default:
        dispatch({
          type: 'SET_REASON_TRANSFER',
          payload: {
            ...state.reasonTransfer,
            selection: lodash.filter(state.reasonTransfer.options, reason => reason.value === 'B'),
          },
        });
        break;
    }
    // Don't put state.reasonTransfer in the deps (infinite loop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.receiverCondition, state.shippingCondition.selection, dispatch]);

  useEffect(() => {
    // Set receiverProvince by receiverDepartment
    if (!state.receiverDepartment.selection.length) return;

    const REGION = state.receiverDepartment.selection[0].REGIO;
    const inputValue = '';
    const options = optionsWithIcon(
      lodash.filter(window.__INITIAL_DATA__.provinceList, province => province.REGION === REGION)
    );
    const selection = [];

    dispatch({ type: 'SET_RECEIVER_PROVINCE', payload: { inputValue, options, selection } });
  }, [state.receiverDepartment.selection, dispatch]);

  useEffect(() => {
    // Set receiverDistrict by receiverProvince
    if (!state.receiverProvince.selection.length) return;

    const CITY_CODE = state.receiverProvince.selection[0].CITY_CODE;
    const inputValue = '';
    const options = optionsWithIcon(
      lodash.filter(
        window.__INITIAL_DATA__.districtList,
        district => district.CITY_CODE === CITY_CODE
      )
    );
    const selection = [];

    dispatch({ type: 'SET_RECEIVER_DISTRICT', payload: { inputValue, options, selection } });
  }, [state.receiverProvince.selection, dispatch]);

  useEffect(() => {
    if (!state.notifications.length) return () => 0;
    const timer = setTimeout(() => dispatch({ type: 'UNSTACK_NOTIFICATIONS' }), 1e3 * 5);

    return () => clearTimeout(timer);
  }, [state.notifications, dispatch]);

  return (
    <div className="slds-grid" style={{ height: '100vh' }}>
      <div className="slds-col">
        <Navbar logo={<Logo />} />
        <div className="slds-m-around_small">
          <Steps />
          <Order />
        </div>
      </div>
      <Notifications />
      <AddProductModal />
      <StartCreateSalesOrderModal />
      <FinishCreateSalesOrderModal />
      <OverviewSalesOrderModal />
      <ChangePasswordModal />
    </div>
  );
}

function App() {
  return (
    <AppStateProvider initialState={initialAppState} reducer={appStateReducer}>
      <Dashboard />
    </AppStateProvider>
  );
}

export default App;
