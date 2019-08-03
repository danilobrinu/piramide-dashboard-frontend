import React from 'react';
import { useAppState } from './AppContext';
import { Input, Button, Modal } from '@salesforce/design-system-react';
import * as api from './api/mock';
import { uniqid } from './utils/helpers';

function ChangePasswordModal() {
  const [state, dispatch] = useAppState();
  const changePassword = () => {
    dispatch({ type: 'SET_NOTIFICATIONS', payload: [] });

    if (!state.password.length || !state.verifyPassword.length || !state.newPassword) {
      dispatch({
        type: 'SET_NOTIFICATIONS',
        payload: [
          ...state.notifications,
          {
            id: uniqid(),
            title: 'No se puede realizar el cambio de contraseña',
            description: 'Es necesario completar todos los campos',
            type: 'first_non_empty',
          },
        ],
      });

      return;
    }

    if (state.newPassword !== state.verifyPassword) {
      dispatch({
        type: 'SET_NOTIFICATIONS',
        payload: [
          ...state.notifications,
          {
            id: uniqid(),
            title: 'No se puede realizar el cambio de contraseña',
            description: 'La nueva contraseña y la contraseña de verificación no coinciden',
            type: 'first_non_empty',
          },
        ],
      });

      return;
    }

    dispatch({
      type: 'setChangePasswordModal',
      payload: {
        ...state.changePasswordModal,
        open: false,
      },
    });

    dispatch({
      type: 'SET_NOTIFICATIONS',
      payload: [
        ...state.notifications,
        {
          id: uniqid(),
          title: 'Realizando cambio de contraseña',
          description: 'Esta operación puede tomar unos minutos',
          type: 'business_hours',
        },
      ],
    });

    const data = {
      I_KUNNR: state.customer,
      PASSWORD: state.password,
      NEW_PASSWORD: state.newPassword,
      VERIFY_PASSWORD: state.verifyPassword,
    };

    api.changePassword(data).then(({ data: passwordChanged }) => {
      if (!passwordChanged) {
        dispatch({
          type: 'SET_NOTIFICATIONS',
          payload: [
            ...state.notifications,
            {
              id: uniqid(),
              title: 'El cambio de contraseña no se ha realizado satisfactoriamente',
              description:
                'La contraseña es incorrecta o la contraseña ' +
                ' y la contraseña de verificación no coinciden',
              type: 'first_non_empty',
            },
          ],
        });
      } else {
        dispatch({
          type: 'SET_NOTIFICATIONS',

          payload: [
            ...state.notifications,
            {
              id: uniqid(),
              title: 'El cambio de contrañse se ha realizado satisfactoriamente',
              description: 'Se cerrará la sesión. Vuelva a iniciar sesión.',
              type: 'approval',
            },
          ],
        });
        setTimeout(() => {
          window.location.href = '/logout';
        }, 1000);
      }
    });
  };
  const cancelOperation = () => {
    dispatch({
      type: 'SET_CHANGE_PASSWORD_MODAL',
      payload: { ...state.changePasswordModal, open: false },
    });
  };
  const saveOperation = () => changePassword();

  return (
    <Modal
      isOpen={state.changePasswordModal.open}
      footer={[
        <Button key="01" label="Cancel" onClick={cancelOperation} />,
        <Button key="02" label="Save" variant="brand" onClick={saveOperation} />,
      ]}
      onRequestClose={cancelOperation}
      title={state.changePasswordModal.title}
    >
      <section className="slds-p-around_large">
        <div className="slds-m-bottom_large">
          <Input
            id="password"
            label="Contraseña"
            placeholder="Ingrese su contraseña actual"
            type="password"
            value={state.password}
            onChange={(_, { value }) => dispatch({ type: 'SET_PASSWORD', payload: value })}
          />
        </div>
        <div className="slds-m-bottom_large">
          <Input
            id="new-password"
            label="Nueva Contraseña"
            placeholder="Ingrese su nueva contraseña"
            type="password"
            value={state.newPassword}
            onChange={(_, { value }) => dispatch({ type: 'SET_NEW_PASSWORD', payload: value })}
          />
        </div>
        <div className="slds-m-bottom_large">
          <Input
            id="verify-password"
            label="Verificar Nueva Contraseña"
            placeholder="Ingrese su nueva contraseña para verificación"
            type="password"
            value={state.verifyPassword}
            onChange={(_, { value }) => dispatch({ type: 'SET_VERIFY_PASSWORD', payload: value })}
          />
        </div>
      </section>
    </Modal>
  );
}

export default ChangePasswordModal;
