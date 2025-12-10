"use client";

import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import heroDesktop from "../../../../public/images/hero.svg";
import heroMobile from "../../../../public/images/hero-mobile.png";

const Hero = () => {
  return (
    <Box
      rounded={{ base: "16px", lg: "24px" }}
      pt={{ base: 16, lg: 36 }}
      // px={{ base: 4, lg: 12 }}
      mx={{ base: 4, lg: 8 }}
      bg="white"
    >
      <Box
        maxW="954px"
        textAlign="center"
        mx="auto"
        pb={6}
        px={{ base: 4, lg: 0 }}
      >
        <Text
          fontSize={{ base: "32px", lg: "48px" }}
          fontFamily="var(--font-pangaia)"
          fontWeight="200"
          lineHeight={{ base: "44.8px", lg: "57.6px" }}
          mb={6}
          as="h2"
          color="brand.primaryBlack"
        >
          Turn Great Soil Into
          <br />a Global Business
        </Text>
        <Text
          fontSize={{ base: "16px", lg: "18px" }}
          fontWeight="400"
          lineHeight="140%"
          fontFamily="var(--font-inter)"
          textAlign="center"
          maxW={{ base: "296px", lg: "558px" }}
          mx="auto"
          mb={8}
          color="brand.secondaryForeGround"
        >
          Use AI to improve your soil health, tell your farming story with a
          blockchain passport, and sell to global buyers.
        </Text>
        {/* <Button
          variant="solid"
          px="24px"
          py="12px"
          borderRadius="32px"
          fontWeight="normal"
          bg="brand.green"
          color="white"
          onClick={() => {
            const joinSection = document.querySelector("#join-waitlist");
            if (joinSection) {
              joinSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
        >
          Start Now
        </Button> */}
        <a
          href="https://farmer.agrifyafrica.xyz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="solid"
            px="24px"
            py="12px"
            borderRadius="32px"
            fontWeight="normal"
            bg="brand.green"
            color="white"
          >
            Start Now
          </Button>
        </a>
      </Box>

      <Box display={{ base: "none", md: "block" }}>
        <Image
          src={heroDesktop}
          alt="Agrify Hero - Farmers using technology"
          style={{ borderRadius: "24px", width: "100%", height: "auto" }}
        />
      </Box>

      <Box display={{ base: "block", md: "none" }}>
        <Image
          src={heroMobile}
          alt="Agrify Hero - Farmers using technology"
          style={{ borderRadius: "24px", width: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default Hero;
