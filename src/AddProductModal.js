import React, { Component } from 'react';
import {
  Modal,
  Button,
  Combobox,
  comboboxFilterAndLimit,
  Input,
} from '@salesforce/design-system-react';
import { uid, optionsWithIcon } from './utils/helpers';

export default class AddProductModal extends Component {
  cancelOperation(e) {
    const {
      setMaterial,
      setMaterialQuantity,
      setShowAddProductModal,
    } = this.props;
    setMaterial(e, {});
    setMaterialQuantity(e, {});
    setShowAddProductModal(e, { value: false });
  }

  saveOperation(e) {
    if (!this.props.material.length) return;

    const {
      setShowAddProductModal,
      addProductToOrder,
      material,
      setMaterial,
      materialQuantity: quantity,
      setMaterialQuantity,
      setEnabledOrder,
    } = this.props;

    const product = {
      id: uid(),
      name: material[0].label,
      code: material[0].value,
      value: material[0].value,
      weight: 0,
      unity: 'UN',
      amount: 0,
      igv: 0,
      quantity,
    };

    setMaterial(e, {});
    setMaterialQuantity(e, {});
    addProductToOrder(e, { product });
    setShowAddProductModal(e, { value: false });
    setEnabledOrder(e, { value: false });
  }

  render() {
    const {
      showAddProductModal,
      materialList,
      materialValue,
      material,
      setMaterial,
      materialQuantity,
      setMaterialQuantity,
    } = this.props;

    return (
      <Modal
        isOpen={showAddProductModal}
        footer={
          <>
            <Button label="Cancelar" onClick={e => this.cancelOperation(e)} />
            <Button
              label="Guardar"
              variant="brand"
              onClick={e => this.saveOperation(e)}
            />
          </>
        }
        onRequestClose={e => this.cancelOperation(e)}
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
                      onChange: (e, { value }) => setMaterial(e, { value }),
                      onRequestRemoveSelectedOption: (e, _) =>
                        setMaterial(e, {}),
                      onSelect: (e, { selection }) =>
                        setMaterial(e, { selection }),
                    }}
                    labels={{
                      label: 'Producto',
                      placeholder: 'Buscar Producto',
                    }}
                    options={comboboxFilterAndLimit({
                      inputValue: materialValue,
                      options: optionsWithIcon(materialList),
                      selection: material,
                    })}
                    selection={material}
                    value={materialValue}
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
                    minValue={1}
                    maxValue={30000}
                    onChange={(e, data) => setMaterialQuantity(e, data)}
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
