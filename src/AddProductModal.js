import React, { Component } from 'react';
import {
  Modal,
  Button,
  Combobox,
  comboboxFilterAndLimit,
  Input,
} from '@salesforce/design-system-react';

const uid = () => (+new Date() * Math.random()).toString(16).replace('.', '');

const MockProductList = [
  {
    id: uid(),
    label: 'Ladrillo King King 15H',
    code: '04-0000033',
    // quantity: 8000,
    // weight: 4000,
    // unity: 'UN',
    // amount: 2500,
  },
  {
    id: uid(),
    label: 'Ladrillo Caravista',
    code: '04-0000200',
    // quantity: 3000,
    // weight: 5000,
    // unity: 'UN',
    // amount: 4200,
  },
  {
    id: uid(),
    label: 'Ladrillo Caravista',
    code: '04-0000200',
    // quantity: 3000,
    // weight: 5000,
    // unity: 'UN',
    // amount: 4200,
  },
  // {
  //   id: 'd7679cdd',
  //   name: 'Acme - 800 Widgets',
  //   code: 'Acme',
  //   quantity: '6/11/18',
  //   unity: 'Value Proposition',
  //   confidence: '85%',
  //   amount: '$970,000',
  //   contact: 'jrogers@acme.com',
  // },
];

export default class AddProductModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productValue: '',
      products: MockProductList,
      product: [],
      quantity: 1,
    };

    this.setQuantity = this.setQuantity.bind(this);
    this.setProduct = this.setProduct.bind(this);
  }

  setQuantity(_, { number: quantity = 1 }) {
    this.setState({ quantity });
  }

  setProduct(_, { value: productValue = '', selection: product = [] }) {
    this.setState({ productValue, product });
  }

  cancelOperation(e) {
    this.setShowAddProductModal(e, { value: false });
  }

  saveOperation(e) {
    if (!this.state.product.length) return;

    const { setShowAddProductModal, addProductToOrder } = this.props;
    const { product: productSelection, quantity } = this.state;
    const product = {
      id: uid(),
      name: productSelection[0].label,
      code: productSelection[0].code,
      weight: 0,
      unity: 'UN',
      amount: 0,
      quantity,
    };

    this.setProduct(e, {});
    this.setQuantity(e, {});
    addProductToOrder(e, { product });
    setShowAddProductModal(e, { value: false });
  }

  render() {
    const { showAddProductModal } = this.props;

    return (
      <Modal
        isOpen={showAddProductModal}
        footer={
          <>
            <Button label="Cancel" onClick={e => this.cancelOperation(e)} />
            <Button
              label="Save"
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
                    id="product"
                    events={{
                      onChange: (e, { value }) => this.setProduct(e, { value }),
                      onRequestRemoveSelectedOption: (e, _) => this.setProduct(e, {}),
                      onSelect: (e, { selection }) => this.setProduct(e, { selection }),
                    }}
                    labels={{
                      label: 'Producto',
                      placeholder: 'Buscar Producto',
                    }}
                    options={comboboxFilterAndLimit({
                      inputValue: this.state.productValue,
                      options: this.state.products,
                      selection: this.state.product,
                    })}
                    selection={this.state.product}
                    value={this.state.productValue}
                    variant="inline-listbox"
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
                    onChange={(e, data) => this.setQuantity(e, data)}
                    step={1}
                    value={this.state.quantity}
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
