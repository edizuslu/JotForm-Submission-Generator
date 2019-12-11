/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { assign, getRandomNumber } from "../FakeData";

/**
 * Get product quantity
 * @param {boolean} quantityOption
 * @returns {object}
 */
const getQuantity = quantityOption => {
  let quantity = 1;
  let quantityString = "";
  if (quantityOption !== undefined) {
    quantity = getRandomNumber(1, 10);
    quantityString += `, Quantity: ${quantity}`;
  }
  return { quantity, quantityString };
};

/**
 * Get custom option's text
 * @param {boolean} customOption
 * @returns {string}
 */
const getCustomString = customOption => {
  let custom = "";
  let customString = "";
  if (customOption !== undefined) {
    const customName = customOption.name;
    const customs = customOption.properties.split(/\r?\n/);
    const selectedCustom = getRandomNumber(0, customs.length - 1);
    custom = customs[selectedCustom];
    customString += `, ${customName}: ${custom}`;
  }
  return customString;
};

/**
 * Get product array
 * @param {string} price
 * @param {string} currency
 * @param {string} quantityString
 * @param {string} customString
 * @param {string} name
 * @returns {array}
 */
const getProductArray = (
  price,
  currency,
  quantityString,
  customString,
  name
) => {
  const product = [
    `${name} (Amount: ${price} ${currency}${quantityString}${customString})`
  ];
  return product;
};

/**
 * Get shipping cost
 * @param {object} shipping
 * @returns {float}
 */
const getShippingCost = shipping => {
  let shippingCost = 0.0;
  if (shipping !== undefined) {
    shippingCost += parseFloat(JSON.parse(shipping).firstItem);
  }
  return shippingCost;
};

/**
 * Get shipping cost
 * @param {string} price
 * @param {number} quantity
 * @returns {float}
 */
const getTotal = (price, quantity) => {
  return parseFloat(price) * quantity;
};

/**
 * Get coupon
 * @param {object} paymentArray
 * @param {array} coupons
 * @param {float} total
 * @returns {object}
 */
const getCoupons = (paymentArray, coupons, total) => {
  let newTotal = total;
  const newPaymentArray = paymentArray;
  if (coupons !== undefined) {
    const coupon = coupons[0].code;
    const couponRate = 100 / coupons[0].rate;
    const couponAmount = total / couponRate;
    newTotal -= couponAmount;
    newPaymentArray.coupon = coupon;
  }
  return { newTotal, newPaymentArray };
};

/**
 * Get taxes
 * @param {object} paymentArray
 * @param {array} taxes
 * @param {float} total
 * @returns {object}
 */
const getTaxes = (paymentArray, taxes, total) => {
  let updated = total;
  const updatedPaymentArray = paymentArray;
  if (taxes !== undefined) {
    const taxRate = 100 / taxes[0].rate;
    const taxAmount = total / taxRate;
    updated += taxAmount;
    updatedPaymentArray.tax = taxAmount;
  }
  return { updated, updatedPaymentArray };
};

/**
 * Get taxes
 * @param {object} selectedProduct
 * @param {object} taxes
 * @param {object} coupons
 * @returns {array}
 */
const getPaymentArray = (selectedProduct, taxes, coupons) => {
  const { name, price, options, shipping } = selectedProduct;
  const productOptions = JSON.parse(`[${options}]`)[0];

  const quantityOption = productOptions[0];
  const { quantity, quantityString } = getQuantity(quantityOption);

  const customOption = productOptions[1];
  const { customString } = getCustomString(customOption);

  const { currency } = selectedProduct;
  const product = getProductArray(
    price,
    currency,
    quantityString,
    customString,
    name
  );

  let paymentArray = { product, currency };

  let total = getTotal(price, quantity);
  const shippingCost = getShippingCost(shipping);

  const { newTotal, newPaymentArray } = getCoupons(
    paymentArray,
    coupons,
    total
  );
  total = newTotal;
  paymentArray = newPaymentArray;

  const { updated, updatedPaymentArray } = getTaxes(paymentArray, taxes, total);
  total = updated;
  paymentArray = updatedPaymentArray;

  paymentArray.shipping = shippingCost;
  paymentArray.subtotal = total;
  paymentArray.total = total + shippingCost;
  return paymentArray;
};

/**
 * Get taxes
 * @param {array} products
 * @param {number} selected
 * @param {object} question
 * @returns {object}
 */
const getSelectedProduct = (products, selected, question) => {
  const { currency, payment, paymentType, product } = question;
  products[selected].currency = currency;
  products[selected].gateway = "payment";
  products[selected].payment = payment;
  products[selected].paymentType = paymentType;
  products[selected].product = product;
  products[selected].selectedIndex = selected;
  return products[selected];
};

/**
 * Get taxes
 * @param {number} questionID
 * @param {number} submission
 * @param {object} question
 * @param {object} properties
 * @returns {object}
 */
const getProduct = (questionID, submission, question, properties) => {
  const { products } = properties;
  const randomProduct = getRandomNumber(0, products.length);
  const selectedProduct = getSelectedProduct(products, randomProduct, question);
  const { pid } = selectedProduct;
  assign(submission, [questionID, "answer", "0"], {
    id: pid
  });
  assign(submission, [questionID, "answer", "1"], selectedProduct);
  return { selectedProduct };
};

/**
 * Assign payment data to submission object
 * @param {object} submission
 * @param {string} questionID
 * @param {string} question
 * @param {string} form
 */
export const generatePayment = (submission, questionID, question, form) => {
  const { properties } = form;
  const { selectedProduct } = getProduct(
    questionID,
    submission,
    question,
    properties
  );
  const { taxes, coupons } = properties;
  const paymentArray = getPaymentArray(selectedProduct, taxes, coupons);
  assign(submission, [questionID, "answer", "paymentArray"], paymentArray);
};
