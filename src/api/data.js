import { uid } from '../utils/helpers';

export const orderTypeList = [
  {
    id: uniqid(),
    label: 'Venta cobro embalaje',
    subTitle: '-',
    type: 'marketing_actions',
    value: 'ZPNE',
  },
  {
    id: uniqid(),
    label: 'Ped. desp. nacional',
    subTitle: '-',
    type: 'marketing_actions',
    value: 'ZPVN',
  },
];

export const requesterList = [
  {
    id: uniqid(),
    label: 'LA VIGA SAC',
    subTitle: 'TOMAS MARSANO 2813, SANTIAGO DE SURCO - LIMA',
    type: 'account',
    value: '4000000007',
    // FROM SAP
    KUNN2: '4000000007',
    NAME: 'LA VIGA SAC',
    STREET: 'AV. TOMAS MARSANO 2813',
    DISTRICT: 'SANTIAGO DE SURCO',
    CITY: 'LIMA',
  },
];

export const receiverList = [
  {
    id: uniqid(),
    label: 'AV. TOMAS MARSANO 2813, SANTIAGO DE SURCO - LIMA',
    subTitle: 'LA VIGA SAC',
    type: 'account',
    value: '4000000007',
    // FROM SAP
    KUNN2: '4000000007',
    NAME: 'LA VIGA SAC',
    STREET: 'AV. TOMAS MARSANO 2813',
    DISTRICT: 'SANTIAGO DE SURCO',
    CITY: 'LIMA',
  },
];

export const shippingConditionList = [
  {
    id: uniqid(),
    label: 'Entrega al cliente',
    subTitle: '-',
    type: 'account',
    value: '01',
  },
  {
    id: uniqid(),
    label: 'Cliente recoge',
    subTitle: '-',
    type: 'account',
    value: '02',
  },
];

export const paymentConditionList = [
  {
    id: uniqid(),
    label: 'CONTADO CONTRA ENTREGA',
    subTitle: '-',
    type: 'currency',
    value: 'C000',
  },
  {
    id: uniqid(),
    label: 'FACTURA 5 DIAS',
    subTitle: '-',
    type: 'currency',
    value: 'C005',
  },
  {
    id: uniqid(),
    label: 'FACTURA 7 DIAS',
    subTitle: '-',
    type: 'currency',
    value: 'C007',
  },
  {
    id: uniqid(),
    label: 'FACTURA 10 DIAS',
    subTitle: '-',
    type: 'currency',
    value: 'C010',
  },
  {
    id: uniqid(),
    label: 'FACTURA 15 DIAS',
    subTitle: '-',
    type: 'currency',
    value: 'C015',
  },
  {
    id: uniqid(),
    label: 'FACTURA 30 DIAS',
    subTitle: '-',
    type: 'currency',
    value: 'C030',
  },
  {
    id: uniqid(),
    label: 'FACTURA 45 DIAS',
    subTitle: '-',
    type: 'currency',
    value: 'C045',
  },
  {
    id: uniqid(),
    label: 'FACTURA 60 DIAS',
    subTitle: '-',
    type: 'currency',
    value: 'C060',
  },
  {
    id: uniqid(),
    label: 'FACTURA 75 DIAS',
    subTitle: '-',
    type: 'currency',
    value: 'C075',
  },
  {
    id: uniqid(),
    label: 'FACTURA 90 DIAS',
    subTitle: '-',
    type: 'currency',
    value: 'C090',
  },
];

export const reasonTransferList = [
  {
    id: uniqid(),
    label: 'Venta Sujeta a Confirmación de Cliente',
    subTitle: '-',
    type: 'account',
    value: 'B',
  },
  {
    id: uniqid(),
    label: 'Otros: Venta ET',
    subTitle: '-',
    type: 'account',
    value: 'M',
  },
  {
    id: uniqid(),
    label: 'Venta',
    subTitle: '-',
    type: 'account',
    value: 'A',
  },
];

export const packingConditionList = [
  {
    id: uniqid(),
    label: 'Entrega en parihuela',
    subTitle: '-',
    type: 'account',
    value: 'ZPNE',
  },
  {
    id: uniqid(),
    label: 'Entrega a granel o con zuncho',
    subTitle: '-',
    type: 'account',
    value: 'ZPVN',
  },
];

export const advancePayments = [
  {
    id: '001',
    serie: '0100001',
    amount: '120,000.00',
    balance: '1,500.00',
    date: '01.03.2019',
  },
  {
    id: '002',
    serie: '0100002',
    amount: '85,000.00',
    balance: '45,800.00',
    date: '01.04.2019',
  },
  {
    id: '003',
    serie: '0100050',
    amount: '25,000.00',
    balance: '25,000.00',
    date: '31.07.2019',
  },
  {
    id: '004',
    serie: '0100101',
    amount: '135,500.00',
    balance: '23,415.12',
    date: '31.12.2019',
  },
];

export const materialList = [
  {
    id: uniqid(),
    label: 'HUECO 12 PIRAMIDE',
    subTitle: '-',
    type: 'product_item',
    value: '000000000400000000',
    // FROM SAP
    MATERIAL: '000000000400000000',
    MATERIAL_DESC: 'HUECO 12 PIRAMIDE',
  },
  {
    id: uniqid(),
    label: 'HUECO 15 LISO - PIRAMIDE NUEVO',
    subTitle: '-',
    type: 'product_item',
    value: '000000000400000008',
    // FROM SAP
    MATERIAL: '000000000400000008',
    MATERIAL_DESC: 'HUECO 15 LISO - PIRAMIDE NUEVO',
  },
  {
    id: uniqid(),
    label: 'HUECO 12 P1',
    subTitle: '-',
    type: 'product_item',
    value: '000000000400000017',
    // FROM SAP
    MATERIAL: '000000000400000017',
    MATERIAL_DESC: 'HUECO 12 P1',
  },
  {
    id: uniqid(),
    label: 'CARAVISTA 06',
    subTitle: '-',
    type: 'product_item',
    value: '000000000400000018',
    // FROM SAP
    MATERIAL: '000000000400000018',
    MATERIAL_DESC: 'CARAVISTA 06',
  },
  {
    id: uniqid(),
    label: 'BANDEJA 25L P1',
    subTitle: '-',
    type: 'product_item',
    value: '000000000400000062',
    // FROM SAP
    MATERIAL: '000000000400000062',
    MATERIAL_DESC: 'BANDEJA 25L P1',
  },
  {
    id: uniqid(),
    label: 'BOVEDILLA 15 P1',
    subTitle: '-',
    type: 'product_item',
    value: '000000000400000063',
    // FROM SAP
    MATERIAL: '000000000400000063',
    MATERIAL_DESC: 'BOVEDILLA 15 P1',
  },
  {
    id: uniqid(),
    label: 'PANDERETA LISA HERCULES 2.2',
    subTitle: '-',
    type: 'product_item',
    value: '000000000400000211',
    // FROM SAP
    MATERIAL: '000000000400000211',
    MATERIAL_DESC: 'PANDERETA LISA HERCULES 2.2',
  },
  {
    id: uniqid(),
    label: 'PASTELERO P1',
    subTitle: '-',
    type: 'product_item',
    value: '000000000400000215',
    // FROM SAP
    MATERIAL: '000000000400000215',
    MATERIAL_DESC: 'PASTELERO P1',
  },
  {
    id: uniqid(),
    label: 'HUECO 08 P1',
    subTitle: '-',
    type: 'product_item',
    value: '000000000400000229',
    // FROM SAP
    MATERIAL: '000000000400000229',
    MATERIAL_DESC: 'HUECO 08 P1',
  },
  {
    id: uniqid(),
    label: 'KING KONG 18H PIRAMIDE P1',
    subTitle: '-',
    type: 'product_item',
    value: '000000000400000230',
    // FROM SAP
    MATERIAL: '000000000400000230',
    MATERIAL_DESC: 'KING KONG 18H PIRAMIDE P1',
  },
  {
    id: uniqid(),
    label: 'CARAVISTA 09 P1',
    subTitle: '-',
    type: 'product_item',
    value: '000000000400000254',
    // FROM SAP
    MATERIAL: '000000000400000254',
    MATERIAL_DESC: 'CARAVISTA 09 P1',
  },
  {
    id: uniqid(),
    label: 'KING KONG 18H PIRAMIDE P1',
    subTitle: '-',
    type: 'product_item',
    value: '000000000400000261',
    // FROM SAP
    MATERIAL: '000000000400000261',
    MATERIAL_DESC: 'KING KONG 18H PIRAMIDE P1',
  },
  {
    id: uniqid(),
    label: 'HUECO 15 LISO - PIRAMIDE SDD',
    subTitle: '-',
    type: 'product_item',
    value: '000000000400000262',
    // FROM SAP
    MATERIAL: '000000000400000262',
    MATERIAL_DESC: 'HUECO 15 LISO - PIRAMIDE SDD',
  },
  {
    id: uniqid(),
    label: 'LADRILLO',
    subTitle: '-',
    type: 'product_item',
    value: '000000000400000264',
    // FROM SAP
    MATERIAL: '000000000400000264',
    MATERIAL_DESC: 'LADRILLO',
  },
];

const departmentList = [];

const provinceList = [];

const districtList = [];
