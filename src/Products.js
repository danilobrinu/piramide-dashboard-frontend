import React, { Component } from 'react';
import lodash from 'lodash';
import {
  DataTable,
  DataTableCell,
  DataTableColumn,
  DataTableRowActions,
  Dropdown,
} from '@salesforce/design-system-react';

const DataTableCellResponsive = ({ children, ...props }) => (
  <td data-label={props.label}>{children}</td>
);

DataTableCellResponsive.displayName = DataTableCell.displayName;

class DataTableRowActionsResponsive extends DataTableRowActions {
  render() {
    const defaultDropdownProps = {
      align: 'right',
      buttonClassName: 'slds-button_icon-x-small',
      buttonVariant: 'icon',
      iconCategory: 'utility',
      iconName: 'down',
      iconSize: 'small',
      iconVariant: 'border-filled',
      assistiveText: this.props.assistiveText,
      className: this.props.className,
      options: this.props.options,
      hint: !this.props.noHint,
      id: this.props.id,
    };

    const props = this.props.dropdown ? this.props.dropdown.props : {};
    const dropdownProps = {
      ...defaultDropdownProps,
      ...props,
      onSelect: this.handleSelect,
    };

    return (
      <td
        data-label="Actions"
        onClick={this.handleClick}
        style={{ overflow: 'visible' }}
      >
        <Dropdown {...dropdownProps} />
      </td>
    );
  }
}

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.handleRowAction = this.handleRowAction.bind(this);
  }

  handleRowAction(product, action) {
    const { products, setProducts, setOrderIsEnabled } = this.props;

    switch (action.value) {
      case '2':
        // delete
        setProducts({
          ...products.options,
          options: [
            ...lodash.filter(products.options, p => p.id !== product.id),
          ],
        });
        setOrderIsEnabled(false);
        break;
      default:
        break;
    }
  }

  render() {
    const { products, setProducts } = this.props;

    if (!products.options.length) {
      return (
        <div className="slds-p-around_small">
          No se han agregado productos al pedido.
        </div>
      );
    }

    return (
      <DataTable
        className="slds-max-medium-table_stacked-horizontal slds-text-color_default"
        items={products.options}
        onRowChange={(_, { selection }) =>
          setProducts({ ...products, selection })
        }
        selection={products.selection}
        selectRows="checkbox"
        fixedLayout
      >
        <DataTableColumn label="Producto" primaryColumn property="name">
          <DataTableCellResponsive />
        </DataTableColumn>
        <DataTableColumn label="Cantidad" property="quantity">
          <DataTableCellResponsive />
        </DataTableColumn>
        <DataTableColumn label="Peso" property="weight">
          <DataTableCellResponsive />
        </DataTableColumn>
        <DataTableColumn label="Unidad" property="unity">
          <DataTableCellResponsive />
        </DataTableColumn>
        <DataTableColumn label="Monto" property="amount">
          <DataTableCellResponsive />
        </DataTableColumn>
        <DataTableRowActionsResponsive
          options={[
            {
              id: 1,
              label: 'Eliminar',
              value: '2',
            },
          ]}
          onAction={this.handleRowAction}
          dropdown={
            <Dropdown
              length="5"
              menuPosition="relative"
              nubbinPosition="bottom right"
            />
          }
        />
      </DataTable>
    );
  }
}
