import React from 'react';
import { useAppState } from './AppContext';
import {
  Modal,
  Button,
  Combobox,
  comboboxFilterAndLimit,
  Input,
} from '@salesforce/design-system-react';
import { optionsWithIcon, uniqid } from './utils/helpers';

function AddProductModal() {
  const [state, dispatch] = useAppState();
  const cancelOperation = () => {
    dispatch({
      type: 'SET_MATERIALS',
      payload: {
        ...state.materials,
        inputValue: '',
        selection: [],
      },
    });
    dispatch({ type: 'SET_MATERIAL_QUANTITY', payload: 1 });
    dispatch({ type: 'SET_SHOW_ADD_PRODUCT_MODAL', payload: false });
  };
  const saveOperation = () => {
    if (!state.materials.selection.length) return;

    const product = {
      id: uniqid(),
      name: state.materials.selection[0].label,
      code: state.materials.selection[0].value,
      value: state.materials.selection[0].value,
      weight: 0,
      unity: 'UN',
      amount: 0,
      igv: 0,
      quantity: state.materialQuantity,
    };

    dispatch({
      type: 'SET_PRODUCTS',
      payload: {
        ...state.products,
        options: [...state.products.options, product],
      },
    });
    dispatch({
      type: 'SET_MATERIALS',
      payload: {
        ...state.materials,
        inputValue: '',
        selection: [],
      },
    });
    dispatch({ type: 'SET_MATERIAL_QUANTITY', payload: 1 });
    dispatch({ type: 'SET_SHOW_ADD_PRODUCT_MODAL', payload: false });
    dispatch({ type: 'SET_ORDER_IS_ENABLED', payload: false });
  };

  return (
    <Modal
      isOpen={state.showAddProductModal}
      footer={
        <>
          <Button label="Cancelar" onClick={cancelOperation} />
          <Button label="Guardar" variant="brand" onClick={saveOperation} />
        </>
      }
      onRequestClose={cancelOperation}
      heading="Agregar Producto"
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
                      dispatch({
                        type: 'SET_MATERIALS',
                        payload: {
                          ...state.materials,
                          inputValue,
                        },
                      }),
                    onRequestRemoveSelectedOption: () =>
                      dispatch({
                        type: 'SET_MATERIALS',
                        payload: {
                          ...state.materials,
                          inputValue: '',
                          selection: [],
                        },
                      }),
                    onSelect: (_, { selection }) =>
                      dispatch({
                        type: 'SET_MATERIALS',
                        payload: {
                          ...state.materials,
                          selection,
                        },
                      }),
                  }}
                  labels={{
                    label: 'Producto',
                    placeholder: 'Buscar Producto',
                  }}
                  options={comboboxFilterAndLimit({
                    inputValue: state.materials.inputValue,
                    options: optionsWithIcon(state.materials.options),
                    selection: state.materials.selection,
                  })}
                  selection={state.materials.selection}
                  value={state.materials.inputValue}
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
                  onChange={(_, { value }) =>
                    dispatch({ type: 'SET_MATERIAL_QUANTITY', payload: value })
                  }
                  step={1}
                  value={state.materialQuantity}
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

export default AddProductModal;
