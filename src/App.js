import React, { Component } from 'react';
import lodash from 'lodash';
import moment from 'moment';

import Dashboard from './Dashboard';

import * as api from './api';
import * as data from './api/data';
import { optionWithIcon } from './utils/helpers';

import './App.css';

window.__INITIAL_STATE__ = window.__INITIAL_STATE__ || {
  // General Data
  purchaseOrder: '1234567890',
  distributionChannel: '10',
  orderTypeList: data.orderTypeList,
  orderTypeValue: '',
  orderType: [],
  packingConditionList: data.packingConditionList,
  packingConditionValue: '',
  packingCondition: [],
  requesterList: data.requesterList,
  requesterValue: '',
  requester: [],
  receiverList: data.receiverList,
  receiverValue: '',
  receiver: [],
  paymentConditionList: data.paymentConditionList,
  paymentConditionValue: '',
  paymentCondition: [],
  shippingConditionList: data.shippingConditionList,
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
  sapDateFormat: 'YYYYMMDD',
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
    this.validSimulateSaleOrder = this.validSimulateSaleOrder.bind(this);
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

  setDeliveryDate(e, { date: deliveryDate }) {
    const { sapDateFormat } = this.state;
    const data = {
      I_FECHA_ENTREGA: moment(deliveryDate).format(sapDateFormat),
    };

    api.factoryDate(data).then(({ data }) => {
      const deliveryDate = moment(data, sapDateFormat).toDate();
      this.setState({ deliveryDate });
      this.setEnabledOrder(e, { value: false });
    });
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

  addProductToOrder(e, { product }) {
    const { products } = this.state;

    this.setState({
      products: [
        ...products.map(product => ({ ...product, weight: 0, amount: 0 })),
        product,
      ],
    });

    this.setEnabledOrder(e, { value: false });
  }

  validSimulateSaleOrder() {
    const {
      orderType,
      distributionChannel,
      deliveryDate,
      purchaseOrder,
      requester,
      receiver,
      products,
    } = this.state;

    return (
      !!orderType.length &&
      !!distributionChannel.length &&
      !!deliveryDate &&
      !!purchaseOrder.length &&
      !!requester.length &&
      !!receiver.length &&
      !!products.length
    );
  }

  simulateSaleOrder(e) {
    const {
      orderType,
      distributionChannel,
      deliveryDate,
      sapDateFormat,
      purchaseOrder,
      requester,
      receiver,
      products,
    } = this.state;
    const productsToItems = products =>
      lodash.map(products, (product, index) => {
        const { value, quantity: qty } = product;
        const ITM_NUMBER = lodash.padStart(
          ((index + 1) * 10).toString(),
          6,
          '0'
        );
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
    const data = {
      I_HEADER: {
        DOC_TYPE: orderType[0].value,
        SALES_ORG: '1000',
        DISTR_CHAN: distributionChannel,
        DIVISION: '10',
        REQ_DATE_H: moment(deliveryDate).format(sapDateFormat),
        PURCH_NO_C: purchaseOrder,
        SOLICITANTE: requester[0].value,
        DESTINATARIO: receiver[0].value,
      },
      IT_ITEMS: productsToItems(products),
    };

    if (!this.validSimulateSaleOrder())
      return alert('Completar los campos que estan como obligatorios');

    api.simulateSaleOrder(data).then(({ data }) => {
      console.log(
        data['ET_CONDITION'],
        lodash.groupBy(data['ET_CONDITION'], 'ITM_NUMBER')
      );

      lodash.each(
        lodash.groupBy(data['ET_CONDITION'], 'ITM_NUMBER'),
        (info, ITM_NUMBER) => {
          const amount = lodash.find(
            info,
            field => field['COND_TYPE'] === 'ZPRB'
          )['CONDVALUE'];
          const igv = lodash.find(info, field => field['COND_TYPE'] === 'MWST')[
            'CONDVALUE'
          ];
          const index = +ITM_NUMBER / 10 - 1;
          const newProducts = products;
          newProducts[index] = {
            ...newProducts[index],
            amount,
            igv,
          };
          this.setState({
            products: newProducts,
          });
        }
      );

      lodash.each(data['ET_ITEM_WEIGTH'], row => {
        const { ITM_NUMBER, BRGEW } = row;
        const index = +ITM_NUMBER / 10 - 1;
        const weight = BRGEW;
        const newProducts = products;
        newProducts[index] = {
          ...newProducts[index],
          weight,
        };
        this.setState({
          products: newProducts,
        });
      });

      this.setEnabledOrder(e, { value: true });
    });
  }

  createSaleOrder(e) {
    const {
      orderType,
      distributionChannel,
      deliveryDate,
      sapDateFormat,
      purchaseOrder,
      requester,
      receiver,
      products,
      enabledOrder,
    } = this.state;
    const productsToItems = products =>
      lodash.map(products, (product, index) => {
        const { value, quantity: qty } = product;
        const ITEM_NUMBER = lodash.padStart(
          ((index + 1) * 10).toString(),
          6,
          '0'
        );
        const MATERIAL = value;
        const PLANT = '1000';
        const TARGET_QTY = lodash.padStart((qty * 100).toString(), 20, '0');
        return {
          ITEM_NUMBER,
          MATERIAL,
          PLANT,
          TARGET_QTY,
        };
      });
    const data = {
      I_HEADER: {
        DOC_TYPE: orderType[0].value,
        SALES_ORG: '1000',
        DISTR_CHAN: distributionChannel,
        REQ_DATE_H: moment(deliveryDate).format(sapDateFormat),
        PURCH_NO_C: purchaseOrder,
        SOLICITANTE: requester[0].value,
        DESTINATARIO: receiver[0].value,
      },
      IT_ITEMS: productsToItems(products),
    };

    if (!enabledOrder)
      return alert('Es necesario cotizar antes de crear el pedido.');

    api.createSaleOrder(data).then(({ data }) => {
      console.log(data);

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
