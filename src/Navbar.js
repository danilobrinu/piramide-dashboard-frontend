import React from 'react';
import { Dropdown, Button } from '@salesforce/design-system-react';
import { ReactComponent as Logo } from './logo.svg';

function Navbar() {
  const menuOptions = [
    {
      label: 'Cambiar contraseña',
      value: '01',
    },
    { type: 'divider' },
    {
      label: 'Cerrar sesión',
      value: '00',
    },
  ];
  const handleMenuUser = () => {};

  return (
    <div className="slds-grid slds-grid_align-spread navbar">
      <Button
        className="slds-button_icon-size"
        iconCategory="standard"
        iconName="flow"
        iconSize="large"
        variant="icon"
      />
      <div className="logo-container">
        <Logo />
      </div>
      <Dropdown
        iconCategory="utility"
        iconName="user"
        iconSize="large"
        buttonVariant="icon"
        buttonClassName="slds-button_icon-size"
        align="right"
        onSelect={handleMenuUser}
        options={menuOptions}
      />
    </div>
  );
}

export default Navbar;
