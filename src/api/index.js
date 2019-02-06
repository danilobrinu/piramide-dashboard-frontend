import axios from 'axios';

export const simulateSaleOrder = input =>
  axios.post('/order/simulate', input).then(({ data }) => data);

export const createSaleOrder = input =>
  axios.post('/order/new', input).then(({ data }) => data);

export const factoryDate = input =>
  axios.post('/date/factorydate', input).then(({ data }) => data);

export const packaging = input =>
  axios.post('/packaging', input).then(({ data }) => data);

export const createReceiver = input =>
  axios.post('/receiver/new', input).then(({ data }) => data);
