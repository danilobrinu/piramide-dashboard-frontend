import React, { Component } from 'react';
import {
  Tabs,
  TabsPanel,
  Button,
  ButtonStateful,
  ButtonGroup,
} from '@salesforce/design-system-react';
import GeneralData from './GeneralData';
// Keep this code - Next Implementation
// import AdvancePayments from './AdvancePayments';
import Products from './Products';
import SidebarInfo from './SidebarInfo';
import AddProductModal from './AddProductModal';

class Dashboard extends Component {
  render() {
    const {
      // General Data
      //-- Purchase Order
      purchaseOrder,
      setPurchaseOrder,
      //-- Order Type
      orderTypeList,
      orderTypeValue,
      orderType,
      setOrderType,
      //-- Requester
      requesterList,
      requesterValue,
      requester,
      setRequester,
      //-- Receiver
      receiverList,
      receiverValue,
      receiver,
      setReceiver,
      //-- Payment Condition
      paymentConditionList,
      paymentConditionValue,
      paymentCondition,
      setPaymentCondition,
      // -- Delivery Date
      deliveryDate,
      deliveryDateValidation,
      setDeliveryDate,
      // -- Transport Date
      transportDate,
      setTransportDate,
      //-- Shipping Condition
      shippingConditionList,
      shippingConditionValue,
      shippingCondition,
      setShippingCondition,
      //-- Reason Transfer
      reasonTransferList,
      reasonTransferValue,
      reasonTransfer,
      setReasonTransfer,
      // Keep this code - Next Implementation
      // AdvancePayments
      // advancePayments,
      // advancePaymentSelected,
      // selectAdvancePayment,
      // Products
      products,
      productsSelected,
      selectProducts,
      // Add Product Modal
      materialList,
      materialValue,
      material,
      setMaterial,
      materialQuantity,
      setMaterialQuantity,
      // Others
      showSidebarInfo,
      setShowSidebarInfo,
      showAddProductModal,
      setShowAddProductModal,
      enabledOrder,
      setEnabledOrder,
      addProductToOrder,
      deleteProductFromOrder,
      // Sale Order
      simulateSaleOrder,
      createSaleOrder,
    } = this.props;

    return (
      <>
        <header className="slds-size_1-of-1 slds-is-relative slds-theme_default slds-border_bottom slds-p-around_small">
          <div className="slds-grid">
            <ButtonStateful
              iconCategory="utility"
              iconName="flow"
              iconVariant="border-filled"
              variant="icon"
              onClick={e => setShowSidebarInfo(e, { value: !showSidebarInfo })}
              active={showSidebarInfo}
            />
            <div className="slds-grid slds-col_bump-left">
              <ButtonGroup>
                <Button
                  iconCategory="utility"
                  iconName="add"
                  iconPosition="left"
                  iconSize="small"
                  title="Agregar Producto al Pedido"
                  label={
                    <span>
                      <span className="slds-show_large">Agregar</span> Producto
                    </span>
                  }
                  onClick={(e) => setShowAddProductModal(e, { value: true })}
                />
                <Button title="Cotizar Pedido" label="Cotizar" onClick={(e) => simulateSaleOrder(e)} />
                <Button
                  disabled={!enabledOrder}
                  title="Crear Orden"
                  label={
                    <span>
                      <span className="slds-show_large">Crear</span> Pedido
                    </span>
                  }
                  variant="brand"
                  onClick={(e) => createSaleOrder(e)}
                />
              </ButtonGroup>
              <Button
                iconCategory="utility"
                iconName="logout"
                iconVariant="border-filled"
                variant="icon"
                onClick={() => {}}
              />
            </div>
          </div>
        </header>
        <div className="slds-grid slds-is-relative">
          <SidebarInfo
            showSidebarInfo={showSidebarInfo}
            setShowSidebarInfo={setShowSidebarInfo}
            purchaseOrder={purchaseOrder}
            orderType={orderType}
            requester={requester}
            receiver={receiver}
            paymentCondition={paymentCondition}
            shippingCondition={shippingCondition}
            reasonTransfer={reasonTransfer}
            deliveryDate={deliveryDate}
            transportDate={transportDate}
            // Keep this code - Next Implementation
            // advancePaymentSelected={advancePaymentSelected}
            products={products}
          />
          <AddProductModal
            materialList={materialList}
            materialValue={materialValue}
            material={material}
            setMaterial={setMaterial}
            materialQuantity={materialQuantity}
            setMaterialQuantity={setMaterialQuantity}
            showAddProductModal={showAddProductModal}
            setShowAddProductModal={setShowAddProductModal}
            addProductToOrder={addProductToOrder}
            setEnabledOrder={setEnabledOrder}
          />
          <Tabs className="main">
            <TabsPanel label="Datos Generales">
              <div className="slds-scrollable">
                <div className="slds-p-around_medium">
                  <GeneralData
                    purchaseOrder={purchaseOrder}
                    setPurchaseOrder={setPurchaseOrder}
                    orderTypeList={orderTypeList}
                    orderTypeValue={orderTypeValue}
                    orderType={orderType}
                    setOrderType={setOrderType}
                    requesterList={requesterList}
                    requesterValue={requesterValue}
                    requester={requester}
                    setRequester={setRequester}
                    receiverList={receiverList}
                    receiverValue={receiverValue}
                    receiver={receiver}
                    setReceiver={setReceiver}
                    paymentConditionList={paymentConditionList}
                    paymentConditionValue={paymentConditionValue}
                    paymentCondition={paymentCondition}
                    setPaymentCondition={setPaymentCondition}
                    deliveryDate={deliveryDate}
                    deliveryDateValidation={deliveryDateValidation}
                    setDeliveryDate={setDeliveryDate}
                    transportDate={transportDate}
                    setTransportDate={setTransportDate}
                    shippingConditionList={shippingConditionList}
                    shippingConditionValue={shippingConditionValue}
                    shippingCondition={shippingCondition}
                    setShippingCondition={setShippingCondition}
                    reasonTransferList={reasonTransferList}
                    reasonTransferValue={reasonTransferValue}
                    reasonTransfer={reasonTransfer}
                    setReasonTransfer={setReasonTransfer}
                  />
                </div>
              </div>
            </TabsPanel>
            {/* <TabsPanel label="Anticipos">
              <div className="slds-scrollable">
                <AdvancePayments
                  items={advancePayments}
                  selectItem={selectAdvancePayment}
                  selectedItem={advancePaymentSelected}
                />
              </div>
            </TabsPanel> */}
            <TabsPanel label="Productos">
              <div className="slds-scrollable">
                <Products
                  items={products}
                  selectItem={selectProducts}
                  selectedItems={productsSelected}
                  deleteProductFromOrder={deleteProductFromOrder}
                />
              </div>
            </TabsPanel>
          </Tabs>
        </div>
      </>
    );
  }
}

export default Dashboard;
