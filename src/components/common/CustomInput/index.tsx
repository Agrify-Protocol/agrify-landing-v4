import { inter } from "@/fonts";
import { Box, InputGroup, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import "./input.css";
import getCountryCodeValue from "@/components/sections/Waitlist/controller/getCountryCodeValue";
import getBorderColor from "@/utils/getBorderColor";

interface CustomInputProp {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  value: any;
  onChange: (e?: any) => void;
  setOpenCountryModal?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCountry?: any;
  setIsInputInvalid?: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  options?: { title: string; key: string }[];
}

const CustomInput = ({
  label,
  id,
  placeholder,
  type = "text",
  onChange,
  setOpenCountryModal,
  isInvalid,
  errorMessage,
  selectedCountry,
  setIsInputInvalid,
  isLoading,
  options,
  value,
}: CustomInputProp) => {
  const [telInputActive, setTelInputActive] = useState(false);

  return (
    <InputGroup
      display="flex"
      flexDir="column"
      gap={2}
      fontFamily={inter.style.fontFamily}
      zIndex={0}
    >
      <Text as="label" htmlFor={id}>
        {label}
      </Text>
      {type === "tel" ? (
        <>
          <Box
            bgColor="white"
            display="flex"
            alignItems="center"
            boxSizing="border-box"
            rounded="16px"
            border={getBorderColor(isInvalid, telInputActive)}
            transition="all 0.1s ease-in-out"
            _hover={{
              border: isInvalid ? "1px solid #dc143c" : "1px solid #C8C8C8",
            }}
            padding={2}
          >
            <button
              type="button"
              onClick={() =>
                isLoading
                  ? null
                  : setOpenCountryModal && setOpenCountryModal(true)
              }
              style={{
                fontSize: "24px",
                outline: "none",
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "16px",
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {selectedCountry.flag}
              <Text fontSize="14px">
                {getCountryCodeValue(selectedCountry.idd)}
              </Text>
            </button>
            <input
              id={id}
              name={id}
              value={value}
              placeholder={placeholder}
              style={{
                marginLeft: "8px",
                outline: "none",
                width: "100%",
                backgroundColor: "transparent",
                transition: "border-width 0.3s",
              }}
              className="custom-tel-input"
              onFocus={() => {
                setTelInputActive(true);
              }}
              onBlur={() => {
                setTelInputActive(false);
                setIsInputInvalid &&
                  setIsInputInvalid((prev: any) => ({ ...prev, [id]: false }));
              }}
              type={type}
              onChange={onChange}
              readOnly={isLoading}
            />
          </Box>
          {isInvalid ? (
            <Text fontSize="12px" color="#dc143c">
              {errorMessage}
            </Text>
          ) : null}
        </>
      ) : null}
      {["text", "email"].includes(type) ? (
        <Box>
          <input
            className={`custom-text-input ${
              isInvalid ? "error-text-input-border" : "text-input-border"
            }`}
            style={{
              transition: "all 0.1s ease-in-out",
              width: "100%",
            }}
            id={id}
            name={id}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={() =>
              setIsInputInvalid &&
              setIsInputInvalid((prev: any) => ({ ...prev, [id]: false }))
            }
            readOnly={isLoading}
          />
          {isInvalid ? (
            <Text fontSize="12px" color="#dc143c">
              {errorMessage}
            </Text>
          ) : null}
        </Box>
      ) : null}
      {type === "select" ? (
        <Box>
          <select
            className={`custom-text-input ${
              isInvalid ? "error-text-input-border" : "text-input-border"
            }`}
            style={{
              transition: "all 0.1s ease-in-out",
              width: "100%",
            }}
            id={id}
            name={id}
            disabled={isLoading}
            onChange={onChange}
            value={value}
            onBlur={() =>
              setIsInputInvalid &&
              setIsInputInvalid((prev: any) => ({ ...prev, [id]: false }))
            }
          >
            {options?.map((item) => (
              <option key={item.key} value={item.key}>
                {item.title}
              </option>
            ))}
          </select>
          {isInvalid ? (
            <Text fontSize="12px" color="#dc143c">
              {errorMessage}
            </Text>
          ) : null}
        </Box>
      ) : null}
      {type === "text-area" ? (
        <Box>
          <textarea
            className={`custom-text-input ${
              isInvalid ? "error-text-input-border" : "text-input-border"
            }`}
            style={{
              transition: "all 0.1s ease-in-out",
              width: "100%",
            }}
            id={id}
            name={id}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={() =>
              setIsInputInvalid &&
              setIsInputInvalid((prev: any) => ({ ...prev, [id]: false }))
            }
            readOnly={isLoading}
          />
          {isInvalid ? (
            <Text fontSize="12px" color="#dc143c">
              {errorMessage}
            </Text>
          ) : null}
        </Box>
      ) : null}
    </InputGroup>
  );
};

export default CustomInput;
