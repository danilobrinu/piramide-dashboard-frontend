import React, { Component } from 'react';
import classNames from 'classnames';
import { Button } from '@salesforce/design-system-react';

export default class SidebarInfo extends Component {
  render() {
    const { showSidebarInfo, setShowSidebarInfo } = this.props;

    return (
      <div
        className={classNames(
          'slds-panel slds-size_medium slds-max-medium-size_1-of-1 slds-panel_docked slds-panel_docked-left sidebar-info',
          { 'slds-is-open': showSidebarInfo }
        )}
        aria-hidden="false"
      >
        <div className="slds-panel__header">
          <h2
            className="slds-panel__header-title slds-text-heading_small slds-truncate"
            title="Resumen del Pedido"
          >
            Resumen del Pedido
          </h2>
          <Button
            iconCategory="utility"
            iconName="close"
            variant="icon"
            onClick={e => setShowSidebarInfo(e, { value: false })}
          />
        </div>
        <div className="slds-panel__body">
          <article className="slds-tile">
            <h2
              className="slds-tile__title slds-text-heading_small slds-truncate"
              title="Salesforce UX"
            >
              <a href="#top">LA VIGA SAC</a>
            </h2>
            <div className="slds-tile__detail">
              <dl className="slds-list_horizontal slds-wrap">
                <dt
                  className="slds-item_label slds-text-color_weak"
                  title="Valor de venta"
                >
                  Subtotal:
                </dt>
                <dd className="slds-item_detail">6,850.00</dd>
                <dt
                  className="slds-item_label slds-text-color_weak"
                  title="IGV"
                >
                  IGV:
                </dt>
                <dd className="slds-item_detail">1,233.00</dd>
                <dt
                  className="slds-item_label slds-text-color_weak"
                  title="Total de venta"
                >
                  Total:
                </dt>
                <dd className="slds-item_detail">8,083.00</dd>
                <dt
                  className="slds-item_label slds-text-color_weak"
                  title="Total de venta"
                >
                  Peso:
                </dt>
                <dd className="slds-item_detail">2 TONELADAS</dd>
              </dl>
            </div>
          </article>
        </div>
      </div>
    );
  }
}
