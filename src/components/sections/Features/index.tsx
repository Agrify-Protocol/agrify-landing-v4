import DashedText from '@/components/common/DashedText';
import { Box, Flex, space, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import FeatureBox from './FeatureBox';

const Features = () => {
  return (
    <Box
      mt={{ base: '40px', lg: '120px' }}
      minW={{ base: '361px' }}
      maxW={{ lg: '1024px' }}
      mx={'auto'}
      px={{ base: '16px', lg: '18px' }}
    >
      <Box w="fit-content">
        <DashedText text="Features" />
      </Box>
      <Text
        fontSize={{ base: '26px', lg: '48px' }}
        fontWeight="200"
        fontFamily="var(--font-pangaia)"
        lineHeight="121%"
        px="8px"
        py={{ base: '2px', lg: '16px' }}
        color={'brand.primaryBlack'}
      >
        With Agrify, food businesses get
      </Text>

      <Flex
        flexDir={{ base: 'column', lg: 'row' }}
        mt={{ base: '20px', lg: '40px' }}
        mb={'32px'}
        gap={'32px'}
      >
        <FeatureBox
          title="Climate-smart"
          tittleTwo="guidance in your pocket"
          description="Our agentic assistant analyses your soil, weather and crop choice to deliver daily, local-language tasks that boost yield and capture vital field data. You can also ask any questions to help your farm succeed."
          image="/images/Agent.svg"
        />
        <FeatureBox
          title="Proof that travels with your produce"
          description="Each verified task feeds a digital passport that links GPS, photos, and harvest dates to a tamper-proof record on chain. Buyers can scan the QR code and instantly see how and where your food was grown."
          image="/images/tomatoes.svg"
        />
      </Flex>
      <FeatureBox
        title="Income from Regenerative practices"
        description="As your practices build healthier soil, Agrify measures the carbon you lock away. These verified tonnes convert into Green Coins, high-integrity credits you can sell to climate-focused companies for extra income."
        image="/images/marketplace.svg"
      />
    </Box>
  );
};

export default Features;
