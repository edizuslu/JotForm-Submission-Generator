/* eslint-disable no-const-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import faker from "faker";

class FakeData {
  isInputType(atb) {
    return (
      atb === "control_fileupload" ||
      atb === "control_checkbox" ||
      atb === "control_radio" ||
      atb === "control_dropdown" ||
      atb === "control_time" ||
      atb === "control_textarea" ||
      atb === "control_textbox" ||
      atb === "control_datetime" ||
      atb === "control_address" ||
      atb === "control_scale" ||
      atb === "control_rating" ||
      atb === "control_matrix" ||
      atb === "control_phone" ||
      atb === "control_spinner" ||
      atb === "control_number" ||
      atb === "control_fullname" ||
      atb === "control_email" ||
      atb === "control_payment"
    );
  }

  randomColor() {
    const colors = [
      "#99b433",
      "#00a300",
      "#9f00a7",
      "#00aba9",
      "#2d89ef",
      "#ffc40d",
      "#e3a21a",
      "#7fe5f0",
      "#ffc0cb",
      "#ff7373",
      "#66cdaa",
      "#b6fcd5",
      "#81d8d0",
      "#fa8900"
    ];
    return colors[this.getRandomNumber(0, 13)]; // this.getRandomNumber(0, 13)
  }

  randomDay() {
    const day = this.getRandomNumber(1, 12);
    if (day < 10) {
      return `0${day.toString()}`;
    }
    return day.toString();
  }

  randomMonth() {
    const month = this.getRandomNumber(1, 12);
    if (month < 10) {
      return `0${month.toString()}`;
    }
    return month.toString();
  }

  randomHour() {
    const hour = this.getRandomNumber(1, 12);
    if (hour < 10) {
      return `0${hour.toString()}`;
    }
    return hour.toString();
  }

  randomMinute() {
    const minute = this.getRandomNumber(1, 12);
    if (minute < 10) {
      return `0${minute.toString()}`;
    }
    return minute.toString();
  }

  randomSecond() {
    const second = this.getRandomNumber(1, 12);
    if (second < 10) {
      return `0${second.toString()}`;
    }
    return second.toString();
  }

  /**
   * Returns a random submission id.
   */
  getSubmissionID() {
    let submissionID = "";
    for (let x = 0; x < 18; x += 1) {
      if (x === 0) {
        submissionID += this.getRandomNumber(1, 9).toString();
      } else {
        submissionID += this.getRandomNumber(0, 9).toString();
      }
    }
    return submissionID;
  }

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  // eslint-disable-next-line class-methods-use-this
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  // eslint-disable-next-line class-methods-use-this
  getRandomYear(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  isSelectedType(selectedQuestions, answerType) {
    for (let index = 0; index < selectedQuestions.length; index += 1) {
      if (selectedQuestions[index].type === answerType) {
        return true;
      }
    }
    return false;
  }

  assign(obj, keyPath, value) {
    let object = obj;
    const lastKeyIndex = keyPath.length - 1;
    for (let i = 0; i < lastKeyIndex; i += 1) {
      const key = keyPath[i];
      if (!(key in object)) {
        object[key] = {};
      }
      object = object[key];
    }
    object[keyPath[lastKeyIndex]] = value;
  }

  getDefaultQuestions(type) {
    switch (type) {
      case "control_matrix": {
        const mcolumns =
          "Not Satisfied|Somewhat Satisfied|Satisfied|Very Satisfied";
        const mrows = "Service Quality|Cleanliness|Responsiveness|Friendliness";
        const emojiCount = "5";
        return { mcolumns, mrows, emojiCount };
      }
      case "control_rating": {
        const stars = "5";
        return { stars };
      }
      case "control_scale": {
        const scaleAmount = "5";
        return { scaleAmount };
      }
      case "control_dropdown": {
        const options =
          "Type option 1|Type option 2|Type option 3|Type option 4";
        return { options };
      }
      case "control_radio": {
        const options =
          "Type option 1|Type option 2|Type option 3|Type option 4";
        return { options };
      }
      case "control_checkbox": {
        const options =
          "Type option 1|Type option 2|Type option 3|Type option 4";
        return { options };
      }
      case "control_payment": {
        return {
          currency: "USD",
          payment: undefined,
          paymentType: "product",
          product: undefined
        };
      }
      default:
    }
  }

  getPaymentArray(selectedProducts, products, taxes, coupons) {
    let total = 0.0;
    let shippingCost = 0.0;
    let currency = "";
    const product = [];
    for (let index = 0; index < selectedProducts.length; index += 1) {
      const { name, price, options, shipping } = products[
        selectedProducts[index]
      ];
      let quantity = 1;
      let quantityString = "";
      const productOptions = JSON.parse(`[${options}]`)[0];
      const quantityOption = productOptions[0];
      const customOption = productOptions[1];
      if (quantityOption !== undefined) {
        const quantities = quantityOption.properties.split(/\r?\n/);
        const selectedQuantity = this.getRandomNumber(0, quantities.length - 1);
        quantity =
          quantityOption.properties !== "Custom Quantity"
            ? parseInt(quantities[selectedQuantity], 10)
            : this.getRandomNumber(1, 10);
        quantityString += `, Quantity: ${quantity}`;
      }

      let custom = "";
      let customString = "";
      if (customOption !== undefined) {
        const customName = customOption.name;
        const customs = customOption.properties.split(/\r?\n/);
        const selectedCustom = this.getRandomNumber(0, customs.length - 1);
        custom = customs[selectedCustom];
        customString += `, ${customName}: ${custom}`;
      }

      currency = products[selectedProducts[index]].currency;
      product.push(
        `${name} (Amount: ${price} ${currency}${quantityString}${customString})`
      );
      total += parseFloat(price) * quantity;
      if (shipping !== undefined) {
        shippingCost += parseFloat(JSON.parse(shipping).firstItem);
      }
    }

    const paymentArray = { product, currency };
    if (coupons !== undefined) {
      const coupon = coupons[0].code;
      const couponRate = 100 / coupons[0].rate;
      const couponAmount = total / couponRate;
      total -= couponAmount;
      paymentArray.coupon = coupon;
    }

    if (taxes !== undefined) {
      const taxRate = 100 / taxes[0].rate;
      const taxAmount = total / taxRate;
      total += taxAmount;
      paymentArray.tax = taxAmount;
    }

    if (shippingCost === 0) {
      paymentArray.total = total;
      return paymentArray;
    }
    paymentArray.shipping = shippingCost;
    paymentArray.subtotal = total;
    paymentArray.total = total + shippingCost;
    return paymentArray;
  }

  generateAnswer(
    submission,
    type,
    questionID,
    question,
    formId,
    username,
    submissionID,
    submissionQuestions,
    form
  ) {
    switch (type) {
      case "control_email": {
        this.assign(submission, [questionID, "answer"], faker.internet.email());
        break;
      }
      case "control_fullname": {
        this.assign(
          submission,
          [questionID, "answer", "first"],
          faker.name.firstName()
        );
        this.assign(
          submission,
          [questionID, "answer", "last"],
          faker.name.lastName()
        );
        break;
      }
      case "control_number": {
        this.assign(
          submission,
          [questionID, "answer"],
          this.getRandomNumber(0, 5000).toString()
        );
        break;
      }
      case "control_spinner": {
        this.assign(
          submission,
          [questionID, "answer"],
          this.getRandomNumber(0, 250).toString()
        );
        break;
      }
      case "control_phone": {
        const countryCode = faker.random.number();
        const number = faker.phone.phoneNumber();
        this.assign(submission, [questionID, "answer", "area"], countryCode);
        this.assign(submission, [questionID, "answer", "phone"], number);
        break;
      }

      case "control_matrix": {
        const mcolumns = question.mcolumns.split("|");
        const mrows = question.mrows.split("|");
        const { emojiCount } = question;
        for (let i = 0; i < mrows.length; i += 1) {
          this.assign(
            submission,
            [questionID, "answer", mrows[i]],
            mcolumns[this.getRandomNumber(0, emojiCount - 1)]
          );
        }

        break;
      }

      case "control_rating": {
        const { stars } = question;
        this.assign(
          submission,
          [questionID, "answer"],
          this.getRandomNumber(1, stars).toString()
        );
        break;
      }

      case "control_scale": {
        const { scaleAmount } = question;
        this.assign(
          submission,
          [questionID, "answer"],
          this.getRandomNumber(1, scaleAmount).toString()
        );
        break;
      }

      case "control_address": {
        const addrLine1 = faker.address.streetAddress();
        const addrLine2 = faker.address.secondaryAddress();
        const city = faker.address.city();
        const country = faker.address.country();
        const postal = faker.address.zipCode();
        const state = faker.address.state();
        this.assign(
          submission,
          [questionID, "answer", "addr_line1"],
          addrLine1
        );
        this.assign(
          submission,
          [questionID, "answer", "addr_line2"],
          addrLine2
        );
        this.assign(submission, [questionID, "answer", "city"], city);
        this.assign(submission, [questionID, "answer", "country"], country);
        this.assign(submission, [questionID, "answer", "postal"], postal);
        this.assign(submission, [questionID, "answer", "state"], state);
        break;
      }

      case "control_datetime": {
        const month = this.randomMonth();
        const day = this.randomDay();
        const year = this.getRandomYear(2000, 2020);
        console.log("Year : ");
        console.log(year);

        this.assign(submission, [questionID, "answer", "day"], month);
        this.assign(submission, [questionID, "answer", "month"], day);
        this.assign(submission, [questionID, "answer", "year"], year);
        break;
      }
      case "control_textbox": {
        this.assign(submission, [questionID, "answer"], faker.lorem.sentence());
        break;
      }
      case "control_textarea": {
        this.assign(submission, [questionID, "answer"], faker.lorem.sentence());
        break;
      }
      case "control_time": {
        let ampm;
        if (this.getRandomNumber(1, 2) === 1) {
          ampm = "AM";
        } else {
          ampm = "PM";
        }
        const hourSelect = this.randomHour();
        const minuteSelect = this.randomMinute();

        this.assign(submission, [questionID, "answer", "ampm"], ampm);
        this.assign(
          submission,
          [questionID, "answer", "hourSelect"],
          hourSelect
        );
        this.assign(
          submission,
          [questionID, "answer", "minuteSelect"],
          minuteSelect
        );
        break;
      }
      case "control_dropdown": {
        const optionsDropdown = question.options.split("|");
        this.assign(
          submission,
          [questionID, "answer"],
          optionsDropdown[this.getRandomNumber(0, optionsDropdown.length - 1)]
        );
        break;
      }
      case "control_radio": {
        console.log("Questions Options : ");
        console.log(question.options);
        // Yes Please! - Pick me up on arrival|No Thanks - I'll make my own way there

        const optionsRadio = question.options.split("|");
        this.assign(
          submission,
          [questionID, "answer"],
          optionsRadio[this.getRandomNumber(0, optionsRadio.length)]
        );
        break;
      }
      case "control_checkbox": {
        const optionsCheckbox = question.options.split("|");
        const checkBoxArray = [];
        checkBoxArray.push(
          optionsCheckbox[this.getRandomNumber(0, optionsCheckbox.length - 1)]
        );
        this.assign(submission, [questionID, "answer"], checkBoxArray);
        break;
      }
      case "control_fileupload": {
        const url = "https://www.jotform.com/uploads/";

        const formID = `${formId}/`;

        const fileName = faker.system.commonFileName();

        const userName = `${username}/`;

        const submissionId = `${submissionID}/`;

        const fileArray = [];

        fileArray.push(url + userName + formID + submissionId + fileName);
        this.assign(submission, [questionID, "answer"], fileArray);
        break;
      }
      case "control_payment": {
        if (form.properties !== undefined) {
          const { products, taxes, coupons } = form.properties;
          const { currency, payment, paymentType, product } = question;
          const selectedProducts = [];
          const productCount = products !== undefined ? products.length : 0;
          let id = 0;
          for (let index = 0; index < productCount; index += 1) {
            if (Math.random() < 0.5) {
              const { pid } = products[index];
              selectedProducts.push(index);
              this.assign(submission, [questionID, "answer", id.toString()], {
                id: pid
              });
              id += 1;
            }
          }
          for (let index = 0; index < productCount; index += 1) {
            if (selectedProducts.includes(index)) {
              products[index].currency = currency;
              products[index].gateway = "payment";
              products[index].payment = payment;
              products[index].paymentType = paymentType;
              products[index].product = product;
              this.assign(
                submission,
                [questionID, "answer", id.toString()],
                products[index]
              );
              id += 1;
            }
          }
          const paymentArray = this.getPaymentArray(
            selectedProducts,
            products,
            taxes,
            coupons
          );
          this.assign(
            submission,
            [questionID, "answer", "paymentArray"],
            paymentArray
          );
          break;
        }
        break;
      }
      default:
    }
  }
}

export default FakeData;
