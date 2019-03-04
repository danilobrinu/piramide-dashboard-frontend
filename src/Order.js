import React from 'react';
import { Button, Tooltip } from '@salesforce/design-system-react';

import Products from './Products';

const Order = props => {
  const {
    products,
    setProducts,
    simulateSalesOrder,
    createSalesOrder,
    setShowAddProductModal,
    overviewSalesOrderModal,
    setOverviewSalesOrderModal,
    orderIsEnabled,
    setOrderIsEnabled,
  } = props;
  const handleClick = () =>
    setOverviewSalesOrderModal({ ...overviewSalesOrderModal, open: true });

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
        <Products
          products={products}
          setProducts={setProducts}
          setOrderIsEnabled={setOrderIsEnabled}
        />
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
  );
};

export default Order;
