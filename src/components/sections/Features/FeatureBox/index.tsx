import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type FeatureBoxProps = {
  title: string;
  tittleTwo?: string;
  description: string;
  image: string;
  isLarge?: boolean;
};

const FeatureBox = ({
  title,
  tittleTwo,
  image,
  description,
  isLarge = false,
}: FeatureBoxProps) => {
  const titleProps = {
    fontFamily: "var(--font-inter)",
    fontWeight: 500,
    fontSize: "26px",
    lineHeight: "110%",
    w: isLarge ? "30%" : "auto",
  };

  return (
    <Box backgroundColor="white" px="40px" py="51px" rounded="24px">
      <Flex
        flexDir={isLarge ? "row" : "column"}
        justify={isLarge ? "space-between" : "flex-start"}
        
      >
        <Text
          {...titleProps}
          mb={!tittleTwo ? "16px" : undefined}
        >
          {title}
        </Text>

        {tittleTwo && (
          <Text
            {...titleProps}
            mb="16px"
          >
            {tittleTwo}
          </Text>
        )}

        <Text
          fontFamily="var(--font-inter)"
          mb="43px"
          w={isLarge ? "60%" : "auto"}
          textAlign={isLarge ? "right" : "unset"}
        >
          {description}
        </Text>
      </Flex>

      <Image
        src={image}
        alt=""
        width={0}
        height={0}
        style={{
          width: isLarge ? "50%" : "100%",
          height: "auto",
          marginLeft: isLarge ? "25%" : "",
          marginRight: isLarge ? "25%" : "",
        }}
      />
    </Box>
  );
};

export default FeatureBox;
