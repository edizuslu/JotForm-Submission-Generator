/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { generateEmail } from "./GenerateFunctions/generateEmail";
import { generateFullname } from "./GenerateFunctions/generateFullname";
import { generateNumber } from "./GenerateFunctions/generateNumber";
import { generateSpinner } from "./GenerateFunctions/generateSpinner";
import { generatePhone } from "./GenerateFunctions/generatePhone";
import { generateMatrix } from "./GenerateFunctions/generateMatrix";
import { generateRating } from "./GenerateFunctions/generateRating";
import { generateScale } from "./GenerateFunctions/generateScale";
import { generateAddress } from "./GenerateFunctions/generateAddress";
import { generateDatetime } from "./GenerateFunctions/generateDatetime";
import { generateTextbox } from "./GenerateFunctions/generateTextbox";
import { generateTextarea } from "./GenerateFunctions/generateTextarea";
import { generateTime } from "./GenerateFunctions/generateTime";
import { generateDropdown } from "./GenerateFunctions/generateDropdown";
import { generateRadio } from "./GenerateFunctions/generateRadio";
import { generateCheckbox } from "./GenerateFunctions/generateCheckbox";
import { generateFileupload } from "./GenerateFunctions/generateFileupload";
import { generatePayment } from "./GenerateFunctions/generatePayment";

const mcolumns = "Not Satisfied|Somewhat Satisfied|Satisfied|Very Satisfied";
const mrows = "Service Quality|Cleanliness|Responsiveness|Friendliness";
const emojiCount = "5";
const stars = "5";
const scaleAmount = "5";
const options = "Type option 1|Type option 2|Type option 3|Type option 4";
const paymentDefault = {
  currency: "USD",
  payment: undefined,
  paymentType: "product",
  product: undefined
};

export const formElementsMap = {
  control_email: { generateFunction: generateEmail },
  control_fullname: { generateFunction: generateFullname },
  control_number: { generateFunction: generateNumber },
  control_spinner: { generateFunction: generateSpinner },
  control_phone: { generateFunction: generatePhone },
  control_matrix: {
    generateFunction: generateMatrix,
    defaultData: { mcolumns, mrows, emojiCount }
  },
  control_rating: {
    generateFunction: generateRating,
    defaultData: { stars }
  },
  control_scale: {
    generateFunction: generateScale,
    defaultData: { scaleAmount }
  },
  control_address: { generateFunction: generateAddress },
  control_datetime: { generateFunction: generateDatetime },
  control_textbox: { generateFunction: generateTextbox },
  control_textarea: { generateFunction: generateTextarea },
  control_time: { generateFunction: generateTime },
  control_dropdown: {
    generateFunction: generateDropdown,
    defaultData: { options }
  },
  control_radio: { generateFunction: generateRadio, defaultData: { options } },
  control_checkbox: {
    generateFunction: generateCheckbox,
    defaultData: { options }
  },
  control_fileupload: { generateFunction: generateFileupload },
  control_payment: {
    generateFunction: generatePayment,
    defaultData: { paymentDefault }
  }
};
