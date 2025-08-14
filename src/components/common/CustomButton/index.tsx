"use client";

import { Box, BoxProps } from "@chakra-ui/react";
import CustomerLoader from "../CustomLoader";

interface CustomButtonProp extends BoxProps {
  text: string;
  variant?: "solid" | "outline";
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick: (e?: any) => void;
}

const CustomButton = ({
  text,
  variant = "outline",
  onClick,
  isLoading,
  isDisabled,
  ...rest
}: CustomButtonProp) => {
  return (
    <Box
      as="button"
      name={text}
      rounded="32px"
      cursor={isDisabled || isLoading ? "not-allowed" : "pointer"}
      bgColor={
        isDisabled
          ? "#D3D3D3"
          : variant === "solid"
          ? "brand.green"
          : "transparent"
      }
      border={variant === "solid" ? "1px solid transparent" : "1px solid black"}
      color={variant === "solid" ? "white" : "black"}
      fontSize="14px"
      padding={{ base: "8px 24px 8px 24px", lg: "12px 24px 12px 24px" }}
      transition="all 0.3s ease-in-out"
      _hover={
        isDisabled
          ? {
              border: "1px solid transparent",
              textColor: "white",
              bg: "#D3D3D3",
            }
          : variant === "solid"
          ? {
              border: "1px solid transparent",
              textColor: "white",
              bg: "#0A9B3C",
            }
          : {
              border: "1px solid transparent",
              textColor: "white",
              bg: "brand.green",
            }
      }
      onClick={isDisabled || isLoading ? (e) => e.preventDefault() : onClick}
      {...rest}
    >
      {isLoading ? <CustomerLoader /> : text}
    </Box>
  );
};

export default CustomButton;
