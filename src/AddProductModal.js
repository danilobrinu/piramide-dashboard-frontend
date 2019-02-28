import React, { Component } from 'react';
import {
  Modal,
  Button,
  Combobox,
  comboboxFilterAndLimit,
  Input,
} from '@salesforce/design-system-react';
import { optionsWithIcon, uniqid } from './utils/helpers';

export default class AddProductModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.cancelOperation = this.cancelOperation.bind(this);
    this.saveOperation = this.saveOperation.bind(this);
  }

  cancelOperation() {
    const {
      materials,
      setMaterials,
      setMaterialQuantity,
      setShowAddProductModal,
    } = this.props;
    setMaterials({ ...materials, inputValue: '', selection: [] });
    setMaterialQuantity(1);
    setShowAddProductModal(false);
  }

  saveOperation() {
    const {
      materials,
      setMaterials,
      materialQuantity,
      setMaterialQuantity,
      products,
      setProducts,
      setOrderIsEnabled,
      setShowAddProductModal,
    } = this.props;

    if (!materials.selection.length) return;

    const product = {
      id: uniqid(),
      name: materials.selection[0].label,
      code: materials.selection[0].value,
      value: materials.selection[0].value,
      weight: 0,
      unity: 'UN',
      amount: 0,
      igv: 0,
      quantity: materialQuantity,
    };

    setMaterials({ ...materials, inputValue: '', selection: [] });
    setMaterialQuantity(1);
    setProducts({ ...products, options: [...products.options, product] });
    setShowAddProductModal(false);
    setOrderIsEnabled(false);
  }

  render() {
    const {
      showAddProductModal,
      materials,
      setMaterials,
      materialQuantity,
      setMaterialQuantity,
    } = this.props;

    return (
      <Modal
        isOpen={showAddProductModal}
        footer={
          <>
            <Button label="Cancelar" onClick={this.cancelOperation} />
            <Button
              label="Guardar"
              variant="brand"
              onClick={this.saveOperation}
            />
          </>
        }
        onRequestClose={this.cancelOperation}
        title="Agregar Producto"
      >
        <section className="slds-p-around_large">
          <fieldset className="slds-form slds-form_compound">
            <div className="slds-form-element__control">
              <div className="slds-form-element__row">
                <div className="slds-size_1-of-1">
                  <Combobox
                    id="material"
                    events={{
                      onChange: (_, { value: inputValue }) =>
                        setMaterials({ ...materials, inputValue }),
                      onRequestRemoveSelectedOption: () =>
                        setMaterials({
                          ...materials,
                          inputValue: '',
                          selection: [],
                        }),
                      onSelect: (_, { selection }) =>
                        setMaterials({ ...materials, selection }),
                    }}
                    labels={{
                      label: 'Producto',
                      placeholder: 'Buscar Producto',
                    }}
                    options={comboboxFilterAndLimit({
                      inputValue: materials.inputValue,
                      options: optionsWithIcon(materials.options),
                      selection: materials.selection,
                    })}
                    selection={materials.selection}
                    value={materials.inputValue}
                    variant="inline-listbox"
                    menuPosition="relative"
                    required
                  />
                </div>
              </div>
              <div className="slds-form-element__row">
                <div className="slds-size_1-of-1">
                  <Input
                    id="quantity"
                    label="Cantidad"
                    onChange={(_, { value }) => setMaterialQuantity(value)}
                    step={1}
                    value={materialQuantity}
                    variant="counter"
                    required
                  />
                </div>
              </div>
            </div>
          </fieldset>
        </section>
      </Modal>
    );
  }
}
