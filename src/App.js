import React from 'react';

////////////////////////////////////////////////////////////////////////////////////////////////////

import * as api from './api/mock';
import * as data from './api/data';
import { optionWithIcon } from './utils/helpers';

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

import { AppStateProvider } from './AppContext';

window.__INITIAL_STATE__ = window.__INITIAL_STATE__ || {
  customer: '4000000007',
  steps: [
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
  ],
  distributionChannel: '10',
  requesterList: data.requesterList,
  shippingConditionList: data.shippingConditionList,
  orderTypeList: data.orderTypeList,
  paymentConditionList: data.paymentConditionList,
  reasonTransferList: data.reasonTransferList,
  advancePayments: [],
  departmentList: data.departmentList,
  provinceList: data.provinceList,
  districtList: data.districtList,
  materialList: data.materialList,
  abbreviatedWeekDays: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
  weekDays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  months: [
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
  ],
  today: 'Hoy día',
  sapDateFormat: 'YYYYMMDD',
};

const initialAppState = {
  customer: window.__INITIAL_STATE__.customer,
  steps: window.__INITIAL_STATE__.steps,
  abbreviatedWeekDays: window.__INITIAL_STATE__.abbreviatedWeekDays,
  weekDays: window.__INITIAL_STATE__.weekDays,
  months: window.__INITIAL_STATE__.months,
  today: window.__INITIAL_STATE__.today,
  distributionChannel: window.__INITIAL_STATE__.distributionChannel,
  sapDateFormat: window.__INITIAL_STATE__.sapDateFormat,
  currentStep: 0,
  receiverCondition: '01',
  materialQuantity: 1,
  purchaseOrder: '',
  deliveryDate: null,
  deliveryHour: null,
  requester: {
    inputValue: '',
    options: window.__INITIAL_STATE__.requesterList,
    selection: [optionWithIcon(window.__INITIAL_STATE__.requesterList[0])],
  },
  shippingCondition: {
    inputValue: '',
    options: window.__INITIAL_STATE__.shippingConditionList,
    selection: [],
  },
  orderType: {
    inputValue: '',
    options: window.__INITIAL_STATE__.orderTypeList,
    selection: [],
  },
  paymentCondition: {
    inputValue: '',
    options: window.__INITIAL_STATE__.paymentConditionList,
    selection: [],
  },
  reasonTransfer: {
    options: window.__INITIAL_STATE__.reasonTransferList,
    selection: [],
  },
  advancePayments: {
    options: window.__INITIAL_STATE__.advancePayments,
    selection: [],
  },
  materials: {
    inputValue: '',
    options: window.__INITIAL_STATE__.materialList,
    selection: [],
  },
  products: {
    options: [],
    selection: [],
  },
  orderIsEnabled: false,
  showAddProductModal: false,
  // Vehicle
  vehiclePlate: '',
  vehicleGrossWeight: 0,
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
    options: window.__INITIAL_STATE__.departmentList,
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
    default: {
      return state;
    }
  }
};

function Dashboard() {
  return (
    <div className="slds-grid" style={{ height: '100vh' }}>
      <div className="slds-col">
        <Navbar logo={<img src={Logo} alt="Piramide Logo" />} handleMenuUser={() => {}} />
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
