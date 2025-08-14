import { Box, Center, Spinner, Image as ChakraImage } from '@chakra-ui/react';
import React from 'react';

interface LoaderProps {
  logoSrc: string;
}

export const Loader: React.FC<LoaderProps> = ({ logoSrc }) => {
  return (
    <Center
      position="absolute"
      top={0}
      left={0}
      w="100%"
      h="100%"
      bg="rgba(255,255,255,0.7)"
      zIndex={2}
    >
      <Box position="relative" w="100px" h="100px">
        <Spinner
          thickness="6px"
          speed="0.9s"
          emptyColor="gray.200"
          color="green.500"
          size="xl"
          w="100px"
          h="100px"
        />

        <ChakraImage
          src={logoSrc}
          alt="Loading logo"
          boxSize="50px"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      </Box>
    </Center>
  );
};
