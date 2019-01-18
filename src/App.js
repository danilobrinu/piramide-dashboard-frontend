import React, { Component } from 'react';
import moment from 'moment';

import Dashboard from './Dashboard';

import * as api from './api/mock';
import * as data from './api/data';
import { optionWithIcon } from './utils/helpers';

import './App.css';

window.__INITIAL_STATE__ = window.__INITIAL_STATE__ || {
  // General Data
  purchaseOrder: '',
  orderTypeList: data.orderTypeList,
  orderTypeValue: '',
  orderType: [],
  requesterList: data.requesterList,
  requesterValue: '',
  requester: [],
  receiverList: data.receiverList,
  receiverValue: '',
  receiver: [],
  paymentConditionList: data.paymentConditionList,
  paymentConditionValue: '',
  paymentCondition: [],
  shippingConditionList: data.paymentConditionList,
  shippingConditionValue: '',
  shippingCondition: [],
  reasonTransferList: data.reasonTransferList,
  reasonTransferValue: '',
  reasonTransfer: [],
  transportDate: null,
  deliveryDate: moment()
    .add(2, 'days')
    .toDate(),
  // Advance Payments
  advancePayments: [],
  advancePaymentSelected: [],
  // Sales Order
  products: [],
  productsSelected: [],
  // Add Product Modal
  materialList: data.materialList,
  materialValue: '',
  material: [],
  materialQuantity: 1,
  // Others
  showSidebarInfo: false,
  showAddProductModal: false,
  enabledOrder: false,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = window.__INITIAL_STATE__;
    this.setPurchaseOrder = this.setPurchaseOrder.bind(this);
    this.selectAdvancePayment = this.selectAdvancePayment.bind(this);
    this.setOrderType = this.setOrderType.bind(this);
    this.setRequester = this.setRequester.bind(this);
    this.setReceiver = this.setReceiver.bind(this);
    this.setPaymentCondition = this.setPaymentCondition.bind(this);
    this.setShippingCondition = this.setShippingCondition.bind(this);
    this.setReasonTransfer = this.setReasonTransfer.bind(this);
    this.deliveryDateValidation = this.deliveryDateValidation.bind(this);
    this.setDeliveryDate = this.setDeliveryDate.bind(this);
    this.setTransportDate = this.setTransportDate.bind(this);
    this.setMaterial = this.setMaterial.bind(this);
    this.setMaterialQuantity = this.setMaterialQuantity.bind(this);
    this.selectProducts = this.selectProducts.bind(this);
    this.setShowSidebarInfo = this.setShowSidebarInfo.bind(this);
    this.setShowAddProductModal = this.setShowAddProductModal.bind(this);
    this.setEnabledOrder = this.setEnabledOrder.bind(this);
    this.addProductToOrder = this.addProductToOrder.bind(this);
    this.simulateSaleOrder = this.simulateSaleOrder.bind(this);
    this.createSaleOrder = this.createSaleOrder.bind(this);
  }

  componentDidMount() {
    const {
      orderTypeList,
      requesterList,
      receiverList,
      shippingConditionList,
      paymentConditionList,
      reasonTransferList,
    } = this.state;

    this.setState({
      orderType: [optionWithIcon(orderTypeList[0])],
      requester: [optionWithIcon(requesterList[0])],
      receiver: [optionWithIcon(receiverList[0])],
      shippingCondition: [optionWithIcon(shippingConditionList[0])],
      paymentCondition: [optionWithIcon(paymentConditionList[1])],
      reasonTransfer: [optionWithIcon(reasonTransferList[0])],
    });
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

  deliveryDateValidation({ date = new Date() }) {
    const current = moment(date);
    const min = moment().add(1, 'days');
    const max = moment().add(15, 'days');
    return !current.isBetween(min, max);
  }

  setDeliveryDate(_, { date: deliveryDate }) {
    this.setState({ deliveryDate });
  }

  setTransportDate(_, { date: transportDate }) {
    this.setState({ transportDate });
  }

  setMaterial(_, { value: materialValue = '', selection: material = [] }) {
    this.setState({
      materialValue,
      material,
    });
  }

  setMaterialQuantity(_, { value: materialQuantity = 1 }) {
    this.setState({ materialQuantity });
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

  simulateSaleOrder(e) {
    api.simulateSaleOrder().then(() => {
      this.setEnabledOrder(e, { value: true });
    });
  }

  createSaleOrder(e) {
    api.createSaleOrder().then(() => {
      console.log('Order has been created');
      this.setEnabledOrder(e, { value: false });
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
          deliveryDateValidation={this.deliveryDateValidation}
          setDeliveryDate={this.setDeliveryDate}
          setTransportDate={this.setTransportDate}
          selectAdvancePayment={this.selectAdvancePayment}
          selectProducts={this.selectProducts}
          setShowSidebarInfo={this.setShowSidebarInfo}
          setShowAddProductModal={this.setShowAddProductModal}
          setEnabledOrder={this.setEnabledOrder}
          setMaterial={this.setMaterial}
          setMaterialQuantity={this.setMaterialQuantity}
          addProductToOrder={this.addProductToOrder}
          simulateSaleOrder={this.simulateSaleOrder}
          createSaleOrder={this.createSaleOrder}
        />
      </div>
    );
  }
}

export default App;
