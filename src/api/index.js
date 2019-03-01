import axios from 'axios';

export const simulateSalesOrder = input =>
  axios.post('/salesorder/simulate', input).then(({ data }) => data);

export const createSalesOrder = input =>
  axios.post('/salesorder/new', input).then(({ data }) => data);

export const factoryDate = input =>
  axios.post('/date/factorydate', input).then(({ data }) => data);

export const createReceiver = input =>
  axios.post('/receiver/new', input).then(({ data }) => data);
