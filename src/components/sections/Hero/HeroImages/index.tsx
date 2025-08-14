import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const HeroImages = () => {
  const yajiSize = useBreakpointValue({
    base: { width: 97.7, height: 145 },
    md: { width: 205.19, height: 307.78 },
  });

  const phoneSize = useBreakpointValue({
    base: { width: 200.3, height: 432.24 },
    md: { width: 260, height: 530.11 },
  });

  const basketSize = useBreakpointValue({
    base: { width: 147, height: 101 },
    md: { width: 238.3, height: 163.82 },
  });

  return (
    <Box mt={103} w={{ base: '100%', md: 'fit-content' }} mx={'auto'}>
      <Flex
        alignItems={'end'}
        w={{ base: '100%', md: 'fit-content' }}
        justifyContent={'center'}
      >
        <Box position={'relative'} left={{ base: '15px', md: '30px' }}>
          <Image
            src={'/images/yaji.svg'}
            alt="yaji"
            width={yajiSize?.width}
            height={yajiSize?.height}
            objectFit="cover"
          />
        </Box>
        <Box zIndex={1} position={'relative'} right={{ base: '-5px', lg: '0' }}>
          <Image
            src={'/images/phone.svg'}
            alt="phone"
            width={phoneSize?.width}
            height={phoneSize?.height}
          />
        </Box>
        <Box position={'relative'} right={{ base: '3px', md: '30px' }}>
          <Image
            src={'/images/basket.svg'}
            alt="basket"
            width={basketSize?.width}
            height={basketSize?.height}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default HeroImages;
