import React from 'react';
import { Dropdown, Button } from '@salesforce/design-system-react';

const Navbar = props => {
  const { logo, handleMenuUser } = props;
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

  return (
    <div className="slds-grid slds-grid_align-spread navbar">
      <Button
        className="slds-button_icon-size"
        iconCategory="standard"
        iconName="flow"
        iconSize="large"
        variant="icon"
      />
      <div className="logo-container">{logo}</div>
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
};

export default Navbar;
