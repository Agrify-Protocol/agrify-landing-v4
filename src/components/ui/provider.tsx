
"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { main } from "framer-motion/dist/m";

const theme = extendTheme({
  colors: {
    brand: {
      grey: "#F5F5F7",
      darkGrey: "#A6A6A6",
      lightGrey: "#FAFAFA",
      lighterGrey: "#0F0F0F26",
      yellow: "#FFC757",
      green: "#0CC14C",
      navBlack: "#282828",
      primaryBlack: "#011308",
      secondaryForeGround: "#565656",
    },
  },
  fonts: {
    heading: "pangaia",
    body: "inter",
    inter: "var(--font-inter), system-ui, sans-serif",
    pangaia: "var(--font-pangaia), system-ui, sans-serif",
    suisse: "var(--font-suisse), system-ui, sans-serif",
  },
  styles: {
    global: {
      "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      },
      "html, body": {
        fontFamily: "inter",
        color: "brand.primaryBlack",
      },
    },
  },
});


interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
}
