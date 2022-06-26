import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FormFieldType } from "../../Enums/FormEnum";
import MaskedFormField from "../common/FormField/MaskedFormField";
import { CreditCardFormModel, CreditCardFormInterface } from "./staticData";
import styles from "../../../styles/Home.module.css";

const Main = () => {
  const [isFormIncomplete, setIsFormIncomplete] = useState(true);
  const [backendResponse, setBackendResponse] = useState<null | {
    requestId: string;
    amount: string;
  }>(null);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValidating, isValid },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    !isValidating && disableChecker();
  }, [isValidating, isValid]);

  const handleSubmitForm = async (data: unknown) => {
    const res = await axios.post("/api/submitValue", data);
    if (res.status === 200) {
      setBackendResponse(res.data);
    } else if (res.status >= 400) {
      setBackendResponse(null);
    }
  };

  const disableChecker = () => {
    if (!isValid) {
      return setIsFormIncomplete(true);
    }
    const formValues = getValues();
    const formKeys = Object.values(formValues);
    const emptyFields: string[] = [];

    if (!formKeys.length) {
      return setIsFormIncomplete(true);
    }

    formKeys.forEach((el) => !el && emptyFields.push(el));

    if (isValid && !emptyFields.length) {
      return setIsFormIncomplete(false);
    }
  };

  const generateForm = (inputField: CreditCardFormInterface) => {
    if (inputField.fieldType === FormFieldType.Masked) {
      return (
        <MaskedFormField
          key={inputField.inputName}
          inputField={inputField}
          register={register}
          errors={errors}
          setValue={setValue}
        />
      );
    }
    return (
      <TextField
        fullWidth
        key={inputField.inputName}
        id={inputField.inputName}
        color="primary"
        {...register(inputField.inputName, inputField.validate)}
        error={!!errors[inputField.inputName]?.message}
        helperText={errors[inputField.inputName]?.message as string}
        variant="outlined"
        placeholder={inputField.inputPlaceholder}
        label={inputField.labelName}
        className={styles.customField}
      />
    );
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className={styles.customForm}
    >
      {CreditCardFormModel.map((el) => generateForm(el))}
      <button
        type="submit"
        disabled={isFormIncomplete}
        className={`${styles.customButton} ${
          isFormIncomplete ? styles.buttonDisabled : ""
        }`}
      >
        Save
      </button>

      {backendResponse ? (
        <div>
          <h3>Form Saved Successfully!</h3>
          <p>{`requestId: ${backendResponse.requestId}`}</p>
          <p>{`amount: $${backendResponse.amount}`}</p>
        </div>
      ) : null}
    </form>
  );
};

export default Main;
