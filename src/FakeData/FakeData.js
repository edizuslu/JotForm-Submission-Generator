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
      atb === "control_email"
    );
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

  generateAnswer(
    submission,
    type,
    questionID,
    question,
    formId,
    username,
    submissionID
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
          this.getRandomNumber(0, 5000).toString()
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
        const year = this.getRandomNumber(1900, 2050).toString();

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
        const optionsRadio = question.options.split("|");
        this.assign(
          submission,
          [questionID, "answer"],
          optionsRadio[this.getRandomNumber(0, optionsRadio.length - 1)]
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
      default:
    }
  }
}

export default FakeData;
