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
    const { advancePayments, setAdvancePayments } = this.props;

    if (!advancePayments.options.length) {
      return (
        <div className="slds-p-around_small">
          No se ha seleccionado ningún anticipo.
        </div>
      );
    }

    return (
      <DataTable
        className="slds-max-medium-table_stacked-horizontal slds-text-color_default"
        items={advancePayments.options}
        onRowChange={(_, { selection }) =>
          setAdvancePayments({ ...advancePayments, selection })
        }
        selection={advancePayments.selection}
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
