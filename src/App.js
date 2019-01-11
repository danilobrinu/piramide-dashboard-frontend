import React, { Component } from 'react';
import './App.css';

import Dashboard from './Dashboard';

const uid = () => (+new Date() * Math.random()).toString(16).replace('.', '');

const MockOrderTypeList = [
  {
    id: uid(),
    label: 'Venta cobro embalaje',
    subTitle: '-',
    code: 'ZPNE',
    type: 'marketing_actions',
  },
  {
    id: uid(),
    label: 'Ped. desp. nacional',
    subTitle: '-',
    code: 'ZPVN',
    type: 'marketing_actions',
  },
];
const MockRequeterList = [
  {
    id: uid(),
    label: 'LA VIGA SAC',
    subTitle: 'LA VIGA SAC - AV. TOMAS MARSANO 2813, SANTIAGO DE SURCO - LIMA',
    code: '4000000007',
    type: 'account',
  },
];
const MockReceiverList = [
  {
    id: uid(),
    label: 'LA VIGA SAC',
    subTitle: 'LA VIGA SAC - AV. TOMAS MARSANO 2813, SANTIAGO DE SURCO - LIMA',
    code: '4000000007',
    type: 'account',
  },
];
const MockPaymentConditionList = [
  {
    id: uid(),
    label: 'CONTADO CONTRA ENTREGA',
    subTitle: '-',
    code: 'C000',
    type: 'currency',
  },
  {
    id: uid(),
    label: 'FACTURA 5 DIAS',
    subTitle: '-',
    code: 'C005',
    type: 'currency',
  },
  {
    id: uid(),
    label: 'FACTURA 7 DIAS',
    subTitle: '-',
    code: 'C007',
    type: 'currency',
  },
  {
    id: uid(),
    label: 'FACTURA 10 DIAS',
    subTitle: '-',
    code: 'C010',
    type: 'currency',
  },
  {
    id: uid(),
    label: 'FACTURA 15 DIAS',
    subTitle: '-',
    code: 'C015',
    type: 'currency',
  },
  {
    id: uid(),
    label: 'FACTURA 30 DIAS',
    subTitle: '-',
    code: 'C030',
    type: 'currency',
  },
  {
    id: uid(),
    label: 'FACTURA 45 DIAS',
    subTitle: '-',
    code: 'C045',
    type: 'currency',
  },
  {
    id: uid(),
    label: 'FACTURA 60 DIAS',
    subTitle: '-',
    code: 'C060',
    type: 'currency',
  },
  {
    id: uid(),
    label: 'FACTURA 75 DIAS',
    subTitle: '-',
    code: 'C075',
    type: 'currency',
  },
  {
    id: uid(),
    label: 'FACTURA 90 DIAS',
    subTitle: '-',
    code: 'C090',
    type: 'currency',
  },
];
const MockShippingConditions = [
  {
    id: uid(),
    label: 'LA VIGA SAC',
    subTitle: 'LA VIGA SAC - AV. TOMAS MARSANO 2813, SANTIAGO DE SURCO - LIMA',
    code: '4000000007',
    type: 'account',
  },
];
const MockReasonTransferList = [
  {
    id: uid(),
    label: 'LA VIGA SAC',
    subTitle: 'LA VIGA SAC - AV. TOMAS MARSANO 2813, SANTIAGO DE SURCO - LIMA',
    code: '4000000007',
    type: 'account',
  },
];
const MockAdvancePaymentList = [
  {
    id: '001',
    serie: '0100001',
    amount: '120,000.00',
    balance: '1,500.00',
    date: '01.03.2019',
  },
  {
    id: '002',
    serie: '0100002',
    amount: '85,000.00',
    balance: '45,800.00',
    date: '01.04.2019',
  },
  {
    id: '003',
    serie: '0100050',
    amount: '25,000.00',
    balance: '25,000.00',
    date: '31.07.2019',
  },
  {
    id: '004',
    serie: '0100101',
    amount: '135,500.00',
    balance: '23,415.12',
    date: '31.12.2019',
  },
];
const MockProductList = [
  {
    id: uid(),
    name: 'Ladrillo King King 15H',
    code: '04-0000033',
    quantity: 8000,
    weight: 4000,
    unity: 'UN',
    amount: 2500,
  },
  {
    id: uid(),
    name: 'Ladrillo Caravista',
    code: '04-0000200',
    quantity: 3000,
    weight: 5000,
    unity: 'UN',
    amount: 4200,
  },
  {
    id: uid(),
    name: 'Ladrillo Caravista',
    code: '04-0000200',
    quantity: 3000,
    weight: 5000,
    unity: 'UN',
    amount: 4200,
  },
  // {
  //   id: 'd7679cdd',
  //   name: 'Acme - 800 Widgets',
  //   code: 'Acme',
  //   quantity: '6/11/18',
  //   unity: 'Value Proposition',
  //   confidence: '85%',
  //   amount: '$970,000',
  //   contact: 'jrogers@acme.com',
  // },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // General Data
      purchaseOrder: '',
      orderTypeList: MockOrderTypeList,
      orderTypeValue: '',
      orderType: [],
      requesterList: MockRequeterList,
      requesterValue: '',
      requester: [],
      receiverList: MockReceiverList,
      receiverValue: '',
      receiver: [],
      paymentConditionList: MockPaymentConditionList,
      paymentConditionValue: '',
      paymentCondition: [],
      shippingConditionList: MockShippingConditions,
      shippingConditionValue: '',
      shippingCondition: [],
      reasonTransferList: MockReasonTransferList,
      reasonTransferValue: '',
      reasonTransfer: [],
      transportDate: null,
      deliveryDate: null,
      // Advance Payments
      advancePayments: MockAdvancePaymentList,
      advancePaymentSelected: [],
      // Sales Order
      products: MockProductList,
      productsSelected: [],
      // Others
      showSidebarInfo: false,
      showAddProductModal: false,
      enabledOrder: false,
    };

    this.setPurchaseOrder = this.setPurchaseOrder.bind(this);
    this.selectAdvancePayment = this.selectAdvancePayment.bind(this);
    this.setOrderType = this.setOrderType.bind(this);
    this.setRequester = this.setRequester.bind(this);
    this.setReceiver = this.setReceiver.bind(this);
    this.setPaymentCondition = this.setPaymentCondition.bind(this);
    this.setShippingCondition = this.setShippingCondition.bind(this);
    this.setReasonTransfer = this.setReasonTransfer.bind(this);
    this.setDeliveryDate = this.setDeliveryDate.bind(this);
    this.setTransportDate = this.setTransportDate.bind(this);
    this.selectProducts = this.selectProducts.bind(this);
    this.setShowSidebarInfo = this.setShowSidebarInfo.bind(this);
    this.setShowAddProductModal = this.setShowAddProductModal.bind(this);
    this.setEnabledOrder = this.setEnabledOrder.bind(this);
    this.addProductToOrder = this.addProductToOrder.bind(this);
  }

  setPurchaseOrder(_, { value: purchaseOrder = '' }) {
    this.setState({ purchaseOrder });
  }

  setOrderType(_, { value: orderTypeValue = '', selection: orderType = [] }) {
    this.setState({
      orderTypeValue,
      orderType,
    });
  }

  setRequester(_, { value: requesterValue = '', selection: requester = [] }) {
    this.setState({
      requesterValue,
      requester,
    });
  }

  setReceiver(_, { value: receiverValue = '', selection: receiver = [] }) {
    this.setState({
      receiverValue,
      receiver,
    });
  }

  setPaymentCondition(
    _,
    { value: paymentConditionValue = '', selection: paymentCondition = [] }
  ) {
    this.setState({
      paymentConditionValue,
      paymentCondition,
    });
  }

  setShippingCondition(
    _,
    { value: shippingConditionValue = '', selection: shippingCondition = [] }
  ) {
    this.setState({
      shippingConditionValue,
      shippingCondition,
    });
  }

  setReasonTransfer(
    _,
    { value: reasonTransferValue = '', selection: reasonTransfer = [] }
  ) {
    this.setState({
      reasonTransferValue,
      reasonTransfer,
    });
  }

  setDeliveryDate(_, { date: deliveryDate }) {
    this.setState({ deliveryDate });
  }

  setTransportDate(_, { date: transportDate }) {
    this.setState({ transportDate });
  }

  selectAdvancePayment(_, { selection: advancePaymentSelected }) {
    this.setState({ advancePaymentSelected });
  }

  selectProducts(_, { selection: productsSelected }) {
    this.setState({ productsSelected });
  }

  setShowSidebarInfo(_, { value: showSidebarInfo = false }) {
    this.setState({ showSidebarInfo });
  }

  setShowAddProductModal(_, { value: showAddProductModal = false }) {
    this.setState({ showAddProductModal });
  }

  setEnabledOrder(_, { value: enabledOrder = false }) {
    this.setState({ enabledOrder });
  }

  addProductToOrder(_, { product }) {
    const { products } = this.state;

    this.setState({
      products: [
        ...products.map(product => ({ ...product, weight: 0, amount: 0 })),
        product,
      ],
    });
  }

  render() {
    return (
      <div className="App slds-grid slds-grid_vertical">
        <Dashboard
          {...this.state}
          setPurchaseOrder={this.setPurchaseOrder}
          setOrderType={this.setOrderType}
          setRequester={this.setRequester}
          setReceiver={this.setReceiver}
          setPaymentCondition={this.setPaymentCondition}
          setShippingCondition={this.setShippingCondition}
          setReasonTransfer={this.setReasonTransfer}
          setDeliveryDate={this.setDeliveryDate}
          setTransportDate={this.setTransportDate}
          selectAdvancePayment={this.selectAdvancePayment}
          selectProducts={this.selectProducts}
          setShowSidebarInfo={this.setShowSidebarInfo}
          setShowAddProductModal={this.setShowAddProductModal}
          setEnabledOrder={this.setEnabledOrder}
          addProductToOrder={this.addProductToOrder}
        />
      </div>
    );
  }
}

export default App;
