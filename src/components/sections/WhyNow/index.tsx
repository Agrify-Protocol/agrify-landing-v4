'use client';

import { Box, Flex, Text, Image } from '@chakra-ui/react';
import React from 'react';

const WhyNow = () => {
  return (
    <Box
      rounded={{ base: '10px', lg: '24px' }}
      px={{ base: 2, lg: '60px' }}
      py={{ base: 4, lg: '0' }}
      mx={{ base: 4, lg: 8 }}
      mt={{ base: 8, lg: '112px' }}
      bg="beige"
      h={{ base: 'auto', lg: '535px' }}
      overflow={'hidden'}
    >
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align={{ base: 'flex-start', lg: 'center' }}
        gap={{ base: 8, lg: '24px' }}
        h="100%"
        justifyContent={'space-between'}
      >
        <Box w={{ base: '100%', lg: '491px' }}>
          <Flex flexDir={'column'}>
            <Text
              fontSize={{ base: '26px', lg: '48px' }}
              fontWeight="200"
              fontFamily="var(--font-pangaia)"
              pb={{ base: 4, lg: '46px' }}
            >
              Why Now?
            </Text>

            <Text
              fontFamily="var(--font-inter)"
              fontSize={{ base: 'sm', lg: '16px' }}
              lineHeight={'140%'}
              letterSpacing={'-2%'}
            >
              The transparency gap is costing brands millions. Seventy-four
              percent of shoppers say they would switch to a company that offers
              full sourcing transparency, while new EU and US regulations are
              rapidly tightening traceability requirements.
            </Text>

            <Text
              mt={{ base: '20px', lg: '40px' }}
              fontFamily="var(--font-inter)"
              fontSize={{ base: 'sm', lg: '16px' }}
              lineHeight={'140%'}
              letterSpacing={'-2%'}
            >
              Yet most farmers still lack simple, trustworthy tools for logging
              their practices—leaving food brands unable to verify claims and
              vulnerable to lost sales and compliance risks.
            </Text>
          </Flex>
        </Box>

        <Box w={{ base: '100%', lg: '60%' }} mr={{ lg: '-8%', xl: '-5%' }}>
          <Image
            src="/images/why_now_4.png"
            alt="Chill Hibiscus Tea"
            rounded="md"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default WhyNow;
