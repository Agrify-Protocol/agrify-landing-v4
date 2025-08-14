import { Flex } from "@chakra-ui/react";
import React from "react";
import { GoDotFill } from "react-icons/go";

type DashedTextProps = {
  text: string;
};

const DashedText = ({ text }: DashedTextProps) => {
  return (
    <Flex
      as="h3"
      fontWeight="600"
      color="brand.darkGrey"
      fontFamily="var(--font-inter)"
      textAlign="center"
      mb={6}
      border={1}
      borderStyle={"dashed"}
      borderColor={"#D8DEE4"}
      w={"fit-content"}
      mx={"auto"}
      rounded={32}
      py={"6px"}
      px={"8px"}
      alignItems={"center"}
      gap={"4.5px"}
    >
      <GoDotFill color="#FFCE04" size={20} />
      {text}
    </Flex>
  );
};

export default DashedText;
