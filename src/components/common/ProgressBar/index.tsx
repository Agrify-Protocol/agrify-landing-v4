import { Box, Flex } from "@chakra-ui/react";

type ProgressBarProps = {
  percentage: number;
};
const ProgressBar = ({ percentage }: ProgressBarProps) => {
  return (
    <Flex
      mt={"16px"}
      minH={"6px"}
      w={"full"}
      backgroundColor={"white"}
      rounded={"18.97px"}
      alignItems={"center"}
      px={"2px"}
    >
      <Box
        minH={"3px"}
        maxH={"3px"}
        bgColor={"#0CC14C"}
        w={`${percentage}%`}
        rounded={"18.97px"}
      ></Box>
    </Flex>
  );
};

export default ProgressBar;
