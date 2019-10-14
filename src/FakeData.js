/* eslint-disable class-methods-use-this */
import faker from "faker";

class FakeData {
  isSubmissionAttribute(atb) {
    return (
      atb === "name" ||
      atb === "order" ||
      atb === "text" ||
      atb === "type" ||
      atb === "range" ||
      atb === "maxValue" ||
      atb === "dcolumns" ||
      atb === "emojiCount" ||
      atb === "inputType" ||
      atb === "mcolumns" ||
      atb === "mrows" ||
      atb === "toggleText" ||
      atb === "starStyle" ||
      atb === "starts" ||
      atb === "scaleAmount" ||
      atb === "stars"
    );
  }

  assignSubmissionInfo(submission, submissionID, formID) {
    this.assign(submission, ["id"], submissionID);
    this.assign(submission, ["form_id"], formID);
    this.assign(submission, ["ip"], this.randomIP());
    this.assign(submission, ["created_at"], this.randomDateTime());
    this.assign(submission, ["status"], "ACTIVE");
    this.assign(submission, ["new"], "1");
    this.assign(submission, ["flag"], "0");
    this.assign(submission, ["notes"], "");
    this.assign(submission, ["updated_at"], null);
  }

  randomIP() {
    return faker.internet.ip();
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

  randomDateTime() {
    const month = this.randomMonth();
    const day = this.randomDay();
    const year = this.getRandomNumber(1900, 2050).toString();

    const hour = this.randomHour();
    const minute = this.randomMinute();
    const second = this.randomSecond();

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
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
    return Math.floor(Math.random() * (max - min) + min);
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

  generateAnswer(
    answerType,
    object,
    answers,
    index,
    questions,
    formId,
    username,
    submissionID
  ) {
    switch (answerType) {
      case "control_email": {
        this.assign(object, [answers, index, "answer"], faker.internet.email());
        break;
      }
      case "control_fullname": {
        this.assign(
          object,
          [answers, index, "answer", "first"],
          faker.name.firstName()
        );
        this.assign(
          object,
          [answers, index, "answer", "last"],
          faker.name.lastName()
        );
        break;
      }
      case "control_number": {
        this.assign(
          object,
          [answers, index, "answer"],
          this.getRandomNumber(0, 5000).toString()
        );
        this.assign(object, [answers, index, "maxValue"], "");
        break;
      }
      case "control_spinner": {
        this.assign(
          object,
          [answers, index, "answer"],
          this.getRandomNumber(0, 5000).toString()
        );
        this.assign(object, [answers, index, "maxValue"], "");
        break;
      }
      case "control_phone": {
        const countryCode = faker.random.number();
        const number = faker.phone.phoneNumber();
        this.assign(object, [answers, index, "answer", "area"], countryCode);
        this.assign(object, [answers, index, "answer", "phone"], number);
        this.assign(
          object,
          [answers, index, "prettyFormat"],
          `(${countryCode}) ${number}`
        );
        break;
      }

      case "control_matrix": {
        const mcolumns = questions.mcolumns.split("|");
        const mrows = questions.mrows.split("|");
        const { emojiCount } = questions;

        for (let i = 0; i < mrows.length; i += 1) {
          this.assign(
            object,
            [answers, index, "answer", mrows[i]],
            mcolumns[this.getRandomNumber(0, emojiCount - 1)]
          );
        }

        break;
      }

      case "control_rating": {
        const { stars } = questions;
        this.assign(
          object,
          [answers, index, "answer"],
          this.getRandomNumber(1, stars).toString()
        );
        break;
      }

      case "control_scale": {
        const { scaleAmount } = questions;
        this.assign(
          object,
          [answers, index, "answer"],
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
          object,
          [answers, index, "answer", "addr_line1"],
          addrLine1
        );
        this.assign(
          object,
          [answers, index, "answer", "addr_line2"],
          addrLine2
        );
        this.assign(object, [answers, index, "answer", "city"], city);
        this.assign(object, [answers, index, "answer", "country"], country);
        this.assign(object, [answers, index, "answer", "postal"], postal);
        this.assign(object, [answers, index, "answer", "state"], state);

        this.assign(
          object,
          [answers, index, "prettyFormat"],
          `StreetAddress: ${addrLine1} <br>` +
            `Street Address Line 2: ${addrLine2} <br>` +
            `City: ${city} <br>` +
            `State / Province: ${state} <br>` +
            `Postal / Zip Code: ${postal}<br>`
        );

        break;
      }

      case "control_datetime": {
        const month = this.randomMonth();
        const day = this.randomDay();
        const year = this.getRandomNumber(1900, 2050).toString();

        this.assign(object, [answers, index, "answer", "day"], month);
        this.assign(object, [answers, index, "answer", "month"], day);
        this.assign(object, [answers, index, "answer", "year"], year);

        this.assign(
          object,
          [answers, index, "prettyFormat"],
          `${month}-${day}-${year}`
        );
        break;
      }
      case "control_textbox": {
        this.assign(object, [answers, index, "answer"], faker.lorem.sentence());
        break;
      }
      case "control_textarea": {
        this.assign(object, [answers, index, "answer"], faker.lorem.sentence());
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

        this.assign(object, [answers, index, "answer", "ampm"], ampm);
        this.assign(
          object,
          [answers, index, "answer", "hourSelect"],
          hourSelect
        );
        this.assign(
          object,
          [answers, index, "answer", "minuteSelect"],
          minuteSelect
        );

        this.assign(
          object,
          [answers, index, "prettyFormat"],
          `${hourSelect}:${minuteSelect} ${ampm}`
        );
        break;
      }
      case "control_dropdown": {
        const optionsDropdown = questions.options.split("|");
        this.assign(
          object,
          [answers, index, "answer"],
          optionsDropdown[this.getRandomNumber(0, optionsDropdown.length - 1)]
        );
        break;
      }
      case "control_radio": {
        const optionsRadio = questions.options.split("|");
        this.assign(
          object,
          [answers, index, "answer"],
          optionsRadio[this.getRandomNumber(0, optionsRadio.length - 1)]
        );
        break;
      }
      case "control_checkbox": {
        const optionsCheckbox = questions.options.split("|");
        const checkBoxArray = [];
        checkBoxArray.push(
          optionsCheckbox[this.getRandomNumber(0, optionsCheckbox.length - 1)]
        );
        this.assign(object, [answers, index, "answer"], checkBoxArray);
        let prettyFormat = "";
        for (let i = 0; index < checkBoxArray.length; i += 1) {
          if (i === 0) {
            prettyFormat += checkBoxArray[i];
          } else {
            prettyFormat += `; ${checkBoxArray[i]}`;
          }
        }
        this.assign(object, [answers, index, "prettyFormat"], prettyFormat);
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
        this.assign(
          object,
          [answers, index, "prettyFormat"],
          `<a href="${url}${userName}${formID}${submissionId}${fileName}" ` +
            `target="_blank"` +
            `title="${fileName}">${fileName}</a>`
        );
        this.assign(object, [answers, index, "answer"], fileArray);
        break;
      }
      default:
    }
  }
}

export default FakeData;
