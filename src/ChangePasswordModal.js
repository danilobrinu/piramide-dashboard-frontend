import React, { Component } from 'react';
import { Input, Button, Modal } from '@salesforce/design-system-react';

export default class ChangePasswordModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.cancelOperation = this.cancelOperation.bind(this);
    this.saveOperation = this.saveOperation.bind(this);
  }

  cancelOperation() {
    const { setChangePasswordModal } = this.props;
    setChangePasswordModal(current => ({
      ...current,
      open: false,
    }));
  }

  saveOperation() {
    const { changePassword } = this.props;
    changePassword();
  }

  render() {
    const {
      changePasswordModal,
      password,
      setPassword,
      verifyPassword,
      setVerifyPassword,
      newPassword,
      setNewPassword,
    } = this.props;

    return (
      <Modal
        isOpen={changePasswordModal.open}
        footer={[
          <Button key="01" label="Cancel" onClick={this.cancelOperation} />,
          <Button
            key="02"
            label="Save"
            variant="brand"
            onClick={this.saveOperation}
          />,
        ]}
        onRequestClose={this.cancelOperation}
        title={changePasswordModal.title}
      >
        <section className="slds-p-around_large">
          <div className="slds-m-bottom_large">
            <Input
              id="password"
              label="Contraseña"
              placeholder="Ingrese su contraseña actual"
              type="password"
              value={password}
              onChange={(_, { value }) => setPassword(value)}
            />
          </div>
          <div className="slds-m-bottom_large">
            <Input
              id="verify-password"
              label="Verificar Contraseña"
              placeholder="Ingrese su contraseña actual"
              type="password"
              value={verifyPassword}
              onChange={(_, { value }) => setVerifyPassword(value)}
            />
          </div>
          <div className="slds-m-bottom_large">
            <Input
              id="new-password"
              label="Nueva Contraseña"
              placeholder="Ingrese su nueva contraseña"
              type="password"
              value={newPassword}
              onChange={(_, { value }) => setNewPassword(value)}
            />
          </div>
        </section>
      </Modal>
    );
  }
}
