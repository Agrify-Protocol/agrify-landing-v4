import { useMemo, useState } from "react";
import {
  validateEmail,
  validateNameInput,
  validateTextInput,
} from "../validationSchema";

const useInvestInNatureFormLogic = (defaultEmail: string | null) => {
  const isEmailValid = useMemo(() => {
    return defaultEmail !== null && validateEmail(defaultEmail);
  }, [defaultEmail]);

  const [fields, setFields] = useState([
    {
      title: "Email Address",
      placeholder: "Enter Email Address",
      id: "email",
      type: "email",
      value: defaultEmail,
      isInValid: isEmailValid,
      errorMessage: "Email address must be valid.",
    },
    {
      title: "First Name",
      placeholder: "Enter First Name",
      type: "text",
      id: "firstName",
      value: "",
      errorMessage:
        "First name must be at least 4 characters long and may not contain numbers.",
      isInValid: false,
    },
    {
      title: "Last Name",
      placeholder: "Enter Last Name",
      id: "lastName",
      type: "text",
      value: "",
      errorMessage:
        "Last name must be at least 4 characters long and may not contain numbers.",
      isInValid: false,
    },
    {
      title: "Company Name",
      id: "companyName",
      placeholder: "Enter Farm Name",
      type: "text",
      value: "",
      isInValid: false,
    },
    {
      title: "Select Your Role",
      id: "role",
      placeholder: "Select Your Role",
      type: "select",
      value: "financier",
      options: [
        { title: "Nature Investor/Financier", key: "financier" },
        { title: "Corporate Insetting", key: "insetting" },
        { title: "Project Developer", key: "developer" },
        { title: "Off-taker", key: "off-taker" },
        { title: "I don't know yet , currently exploring", key: "explorer" },
      ],
      isInValid: false,
    },
    {
      title: "How interested are you in working with Agrify?",
      id: "interest",
      errorMessage:
        "Interest must be at least 4 characters long.",
      placeholder: "Indicate Your Interest",
      type: "text-area",
      value: "",
      isInValid: false,
    },
  ]);

  const isInvalid = fields.reduce(
    (acc, item) => ({ ...acc, [item.id]: item.isInValid }),
    {}
  );

  const finalObj = fields.reduce(
    (acc, item) => ({ ...acc, [item.id]: item.value }),
    {}
  );

  const validateInput = (id: string, value: string) => {
    switch (id) {
      case "firstName":
      case "lastName":
        return validateNameInput(value);
      case "interest":
        return validateTextInput(value);
      case "email":
        return validateEmail(value);
      default:
        return false;
    }
  };

  const handleFormOnChange = (
    e: { target: { name: string; value: string } },
    index: number,
    id: string
  ) => {
    setFields((prev) => {
      const updatedFields = [...prev];
      updatedFields[index] = {
        ...updatedFields[index],
        value: e.target.value,
        isInValid:
          e.target.value === "" ? false : validateInput(id, e.target.value),
      };
      return updatedFields;
    });
  };

  return { fields, handleFormOnChange, finalObj, isInvalid };
};

export default useInvestInNatureFormLogic;
