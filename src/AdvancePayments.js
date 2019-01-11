import React, { Component } from 'react';

import {
  DataTable,
  DataTableColumn,
  DataTableCell,
} from '@salesforce/design-system-react';

const DataTableCellResponsive = ({ children, ...props }) => (
  <td data-label={props.label}>{children}</td>
);

DataTableCellResponsive.displayName = DataTableCell.displayName;

export default class AdvancePayments extends Component {
  render() {
    const { items, selectItem, selectedItem } = this.props;

    return (
      <DataTable
        className="slds-max-medium-table_stacked-horizontal"
        items={items}
        onRowChange={selectItem}
        selection={selectedItem}
        selectRows="radio"
      >
        <DataTableColumn label="Serie" primaryColumn property="serie">
          <DataTableCellResponsive />
        </DataTableColumn>
        <DataTableColumn label="Importe" property="amount">
          <DataTableCellResponsive />
        </DataTableColumn>
        <DataTableColumn label="Saldo" property="balance">
          <DataTableCellResponsive />
        </DataTableColumn>
        <DataTableColumn label="Fecha" property="date">
          <DataTableCellResponsive />
        </DataTableColumn>
      </DataTable>
    );
  }
}
