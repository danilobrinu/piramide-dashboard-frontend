import React from 'react';
import { useAppState } from './AppContext';
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

function Dashboard() {
  const [state, dispatch] = useAppState();

  return (
    <>
      <header className="slds-size_1-of-1 slds-is-relative slds-theme_default slds-border_bottom slds-p-around_small">
        <div className="slds-grid">
          <ButtonStateful
            iconCategory="utility"
            iconName="flow"
            iconVariant="border-filled"
            variant="icon"
            onClick={() =>
              dispatch({ type: 'SET_SHOW_SIDEBAR_INFO', payload: !state.showSidebarInfo })
            }
            active={state.showSidebarInfo}
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
                onClick={() => dispatch({ type: 'SET_SHOW_ADD_PRODUCT_MODAL', payload: true })}
              />
              <Button
                title="Cotizar Pedido"
                label="Cotizar"
                onClick={e => state.simulateSaleOrder(e)}
              />
              <Button
                disabled={!state.enabledOrder}
                title="Crear Orden"
                label="Grabar"
                variant="brand"
                onClick={e => state.createSaleOrder(e)}
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
        <SidebarInfo />
        <AddProductModal />
        <Tabs className="main">
          <TabsPanel label="Datos Generales">
            <div className="slds-scrollable">
              <div className="slds-p-around_medium">
                <GeneralData />
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
              <Products />
            </div>
          </TabsPanel>
        </Tabs>
      </div>
    </>
  );
}

export default Dashboard;
