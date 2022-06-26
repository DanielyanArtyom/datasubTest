import isCreditCard from "validator/lib/isCreditCard";
import { FormFieldType, FormsElements } from "../../Enums/FormEnum";
import moment from "moment";

export interface CreditCardFormInterface {
  fieldType: string;
  inputName: string;
  inputType: string;
  inputPlaceholder: string;
  labelName: string;
  validate: any;
  maskChar?: string;
}

const checkDate = (inputedDate: String) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() - 2000;
  let valueMonth = Number(inputedDate.slice(0, 2));
  let valueYear = Number(inputedDate.slice(3));

  if (valueMonth > 12) {
    return "Incorrect Input";
  }

  if (valueYear > year || (valueYear === year && valueMonth > month)) {
    return true;
  } else {
    return `Expiration date should be later than ${moment().format("MM/YY")}`;
  }
};

const validateAmount = (value: string) => {
  if (/^\d+$/.test(value)) {
    return Number(value) > 0 ? true : "Amount should be  greater than 0";
  }
  return "Incorrect Input";
};

export const CreditCardFormModel = [
  {
    fieldType: FormFieldType.Masked,
    maskChar: "9999 9999 9999 9999",
    inputName: FormsElements.Card_Number,
    inputType: "text",
    inputPlaceholder: "Card Number",
    labelName: "Card Number",
    validate: {
      required: "Card Number is required",
      validate: (value: string) =>
        isCreditCard(value) || "Incorrect card number",
    },
  },
  {
    fieldType: FormFieldType.Masked,
    maskChar: "99/99",
    inputName: FormsElements.Card_Expiration_date,
    inputType: "text",
    inputPlaceholder: "Expiration Date",
    labelName: "Expiration Date",
    validate: {
      required: "Field is Required!",
      maxLength: {
        value: 5,
        message: "incorrect-input",
      },
      validate: (value: string) => checkDate(value),
    },
  },
  {
    fieldType: FormFieldType.Masked,
    maskChar: "999",
    inputName: FormsElements.Card_CVC,
    inputType: "text",
    inputPlaceholder: "CVC/CVV*",
    labelName: "CVC/CVV",
    validate: {
      required: "Field is Required!",
      minLength: {
        value: 3,
        message: "Incorrect Input",
      },
      validate: (value: string) => /^\d+$/.test(value) || "Incorrect Input",
    },
  },
  {
    fieldType: FormFieldType.Standard,
    inputName: FormsElements.Amount,
    inputType: "number",
    inputPlaceholder: "Amount",
    labelName: "Amount",
    validate: {
      required: "Field is Required!",
      validate: (value: string) => validateAmount(value),
    },
  },
];
