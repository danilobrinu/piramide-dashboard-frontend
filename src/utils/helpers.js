import React from 'react';
import lodash from 'lodash';
import { Icon } from '@salesforce/design-system-react';

export const optionsWithIcon = items =>
  lodash.map(items, item => ({
    ...item,
    ...{
      icon: <Icon category="standard" name={item.type} />,
    },
  }));

export const optionWithIcon = item => ({
  ...item,
  ...{
    icon: <Icon category="standard" name={item.type} />,
  },
});

export const uid = () =>
  (+new Date() * Math.random()).toString(16).replace('.', '');
