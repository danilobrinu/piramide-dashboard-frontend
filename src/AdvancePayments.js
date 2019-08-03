import React from 'react';
import { useAppState } from './AppContext';
import { DataTable, DataTableColumn, DataTableCell } from '@salesforce/design-system-react';

const DataTableCellResponsive = ({ children, ...props }) => (
  <td data-label={props.label}>{children}</td>
);

DataTableCellResponsive.displayName = DataTableCell.displayName;

function AdvancePayments() {
  const [state, dispatch] = useAppState();

  if (!state.advancePayments.options.length) {
    return (
      <div className="slds-p-around_small">
        No hay anticipos, pero puede realizar el pedido sin determinar el anticipo.
      </div>
    );
  }

  return (
    <DataTable
      className="slds-max-medium-table_stacked-horizontal slds-text-color_default"
      items={state.advancePayments.options}
      onRowChange={(_, { selection }) =>
        dispatch({
          type: 'setAdvancePayments',
          payload: {
            ...state.advancePayments,
            selection,
          },
        })
      }
      selection={state.advancePayments.selection}
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

export default AdvancePayments;
