import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
// import Link from "next/link";
import logo from "../../../../public/icons/logo.svg";
import React from "react";

const Footer = () => {
  return (
    <Box
      bgColor={"#ffffff"}
      py={{ base: "40px", lg: "80px" }}
      px={{ base: "16px", lg: "60px" }}
    >
      <Box my={{ base: "20px", lg: "40px" }} textAlign="center">
        <Image src={logo} width={100} height={100} alt="Agrify logo" />
      </Box>
      {/* <Link
        href="/"
        style={{ outline: "none", display: "block", width: "fit-content" }}
      >
        <Image src={logo} alt="Agrify logo " />
      </Link> */}
      <Flex
        // px={{ base: '16px', lg: '60px' }}
        justify={"space-between"}
        alignItems={"center"}
        mb={{ base: "20px", lg: "40px" }}
        flexDir={{ base: "column", lg: "row" }}
      >
        <Box w={{ base: "100%", lg: "474px" }}>
          <Text
            fontFamily="var(--font-inter)"
            color={"#A5A5A5"}
            lineHeight={"140%"}
          >
            Agrify is a mobile-first AI assistant for smallholder farmers. It
            helps you grow more sustainably, guides you in your own language,
            verifies your work, and turns your harvest into a story buyers can
            trust. With just $3 and your voice, you can access traceable export
            markets and get paid faster, safer, and smarter.
          </Text>

          <Flex
            border={"1px"}
            borderColor={"#CFCFCF"}
            w={"fit-content"}
            rounded={"43px"}
            mt={"24px"}
          >
            <Box
              borderRight={"1px"}
              borderColor={"#CFCFCF"}
              py={"10px"}
              px={"15px"}
            >
              <Image src={"/images/UK.svg"} width={59} height={24} alt="" />
            </Box>
            <Box py={"10px"} px={"15px"}>
              <Image
                src={"/images/Nigeria.svg"}
                width={91}
                height={24}
                alt=""
              />
            </Box>
          </Flex>
        </Box>

        {/* <Flex
          flexDir={{ base: "column", lg: "row" }}
          gap={"24px"}
          mt={{ base: "24px", lg: "44px" }}
          justifyContent={{ base: "flex-start", lg: "flex-end" }}
          width={{ base: "100%", lg: "fit-content" }}
        >
          <Flex gap={"16px"}>
            <Image alt="" src={"/icons/linkedin.svg"} width={18} height={18} />
            <Text fontFamily="var(--font-inter)">LinkedIn</Text>
          </Flex>
          <Flex gap={"16px"}>
            <Image alt="" src={"/icons/twitter.svg"} width={18} height={18} />
            <Text fontFamily="var(--font-inter)">Twitter</Text>
          </Flex>
          <Flex gap={"16px"}>
            <Image alt="" src={"/icons/whatsapp.svg"} width={18} height={18} />
            <Text fontFamily="var(--font-inter)">Whatsapp</Text>
          </Flex>
        </Flex> */}
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          gap={"24px"}
          mt={{ base: "24px", lg: "44px" }}
          justifyContent={{ base: "flex-start", lg: "flex-end" }}
          width={{ base: "100%", lg: "fit-content" }}
        >
          <Flex
            gap={"16px"}
            as="a"
            href="https://www.linkedin.com/company/agrify-technologies/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            cursor="pointer"
            _hover={{
                  textColor: "brand.green",
                }}
            transition="opacity 0.2s ease"
          >
            <Image
              alt="LinkedIn"
              src={"/icons/linkedin.svg"}
              width={18}
              height={18}
            />
            <Text fontFamily="var(--font-inter)">LinkedIn</Text>
          </Flex>

          <Flex
            gap={"16px"}
            as="a"
            href="https://x.com/agrifyafrica"
            target="_blank"
            rel="noopener noreferrer"
            cursor="pointer"
           _hover={{
                  textColor: "brand.green",
                }}
            transition="opacity 0.2s ease"
          >
            <Image
              alt="Twitter/X"
              src={"/icons/twitter.svg"}
              width={18}
              height={18}
            />
            <Text fontFamily="var(--font-inter)">Twitter</Text>
          </Flex>

          <Flex
            gap={"16px"}
            as="a"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            cursor="pointer"
            _hover={{
                  textColor: "brand.green",
                }}
            transition="opacity 0.2s ease"
          >
            <Image
              alt="WhatsApp"
              src={"/icons/whatsapp.svg"}
              width={18}
              height={18}
            />
            <Text fontFamily="var(--font-inter)">Whatsapp</Text>
          </Flex>
        </Flex>
      </Flex>
      <Image
        alt=""
        src={"/images/Logo-Large.svg"}
        width={0}
        height={0}
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </Box>
  );
};

export default Footer;
