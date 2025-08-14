import React from 'react';
import { Box, Text, Flex, Button } from '@chakra-ui/react';
import HeroImages from './HeroImages';

const Hero = () => {
  return (
    <Box
      rounded={{ base: '16px', lg: '24px' }}
      pt={{ base: 16, lg: 36 }}
      px={{ base: 4, lg: 12 }}
      mx={{ base: 4, lg: 8 }}
      backgroundImage="url('/images/hero.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Flex justify="center" flexDirection={'column'} align="center" w="100%">
        <Text
          fontSize={{ base: '26px', lg: '48px' }}
          fontWeight="200"
          fontFamily="var(--font-pangaia)"
          textAlign="center"
          lineHeight="121%"
          maxW={{ base: '357px', lg: '850px' }}
          px="8px"
          py="16px"
          color={'brand.primaryBlack'}
        >
          Improve the Traceability of Your Food Product with Regenerative
          Intelligence
        </Text>
        <Text
          fontSize={{ base: '16px', lg: '18px' }}
          fontWeight="400"
          lineHeight="140%"
          fontFamily="var(--font-inter)"
          textAlign="center"
          maxW={{ base: '296px', lg: '558px' }}
          px="8px"
          py="16px"
          color={'brand.secondaryForeGround'}
        >
          Agrify is an agentic AI that helps farmers document how their food is
          grown, then transforms that journey into a verified traceability
          passport.
        </Text>
        <Button
          variant="solid"
          px="24px"
          py="12px"
          borderRadius="32px"
          fontWeight="normal"
          bg="brand.green"
          color="white"
        >
          Talk to Us
        </Button>
      </Flex>
      <HeroImages />
    </Box>
  );
};

export default Hero;
