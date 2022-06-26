import { TextField } from "@material-ui/core";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import InputMask from "react-input-mask";
import { CreditCardFormInterface } from "../../Main/staticData";
import styles from "../../../../styles/Home.module.css";

interface MyProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  inputField: CreditCardFormInterface;
  setValue: UseFormSetValue<FieldValues>;
}

const MaskedFormField = ({
  inputField,
  errors,
  register,
  setValue,
}: MyProps) => {
  return (
    <InputMask
      mask={inputField.maskChar!}
      type={inputField.inputType}
      {...register(inputField.inputName, {
        ...inputField.validate,
        onBlur: (event) => setValue(inputField.inputName, event.target.value),
      })}
      placeholder={inputField.inputPlaceholder}
      className={styles.customField}
    >
      <TextField
        fullWidth
        color="primary"
        {...register(inputField.inputName, inputField.validate)}
        error={!!errors[inputField.inputName]?.message}
        helperText={errors[inputField.inputName]?.message as string}
        variant="outlined"
        placeholder={inputField.inputPlaceholder}
        label={inputField.labelName}
        name={inputField.inputName}
      />
    </InputMask>
  );
};

export default MaskedFormField;
