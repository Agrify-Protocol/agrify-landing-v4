import ProgressBar from "@/components/common/ProgressBar";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

type ItemProps = {
  index: string;
  title: string;
  description: string;
  active: boolean;
};

const Item = ({ index, description, title, active }: ItemProps) => {
  return (
    <Box opacity={active ? "100%" : "40%"}>
      <Text
        fontFamily="var(--font-inter)"
        mb={"12px"}
        fontWeight={500}
        fontSize={"18px"}
        opacity={"40%"}
      >
        {index}
      </Text>
      <Text
        fontFamily="var(--font-inter)"
        fontWeight={500}
        fontSize={"20px"}
        mb={"12px"}
      >
        {title}
      </Text>
      <Text fontFamily="var(--font-inter)" lineHeight={"120%"}>
        {description}
      </Text>
      {active && <ProgressBar percentage={5} />}
    </Box>
  );
};

export default Item;
