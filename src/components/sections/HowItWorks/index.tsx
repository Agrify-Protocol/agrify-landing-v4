'use client';

import { Box, VStack, HStack, Text, Image } from '@chakra-ui/react';
import DashedText from '@/components/common/DashedText';
import useRenderSteps from '@/utils/hooks/useRenderSteps';
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo, useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, Easing } from 'framer-motion';

const steps = [
  {
    id: '01',
    title: 'Receive Regenerative Tasks',
    description:
      'Farmers get personalized farming guidance in their own language, directly on their phones.',
  },
  {
    id: '02',
    title: 'Upload Proof of Completion',
    description:
      'They share photos, voice notes, or text to show how the crop is grown, verified by GPS and timestamp.',
  },
  {
    id: '03',
    title: 'Generate a Traceability Story',
    description:
      'AgUnity builds a digital passport that tells the real story of how food was produced.',
  },
  {
    id: '04',
    title: 'Sell to Sustainable Buyers',
    description:
      'With verified stories, farmers can connect directly with global buyers looking for ethical, climate-smart produce.',
  },
];

const stepImages = [
  { id: '01', src: '/images/how_it_works.svg' },
  { id: '02', src: '/images/how_it_works.svg' },
  { id: '03', src: '/images/tomatoes.png' },
  { id: '04', src: '/images/how_it_works.svg' },
];

const stepAnimationVariants = {
  enter: {
    y: -20,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut' as Easing,
    },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: 'easeIn' as Easing,
    },
  },
};

const MotionDiv = motion.div;

export default function HowItWorks() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const {
    renderStep,
    isMobile,
    activeStep,
    nonActiveSteps,
    activeStepIndex,
    progress,
    canHandleClickFunction,
  } = useRenderSteps(steps, inView);

  const [isFixed, setIsFixed] = useState(false);

  const isLastStep = activeStepIndex === steps.length - 1;
  const isLastStepComplete = isLastStep && progress >= 100;
  const topGap = 20;

  const fixedBoxRef = useRef<HTMLDivElement>(null);
  const [fixedBoxHeight, setFixedBoxHeight] = useState(0);

  useLayoutEffect(() => {
    if (fixedBoxRef.current && isFixed) {
      setFixedBoxHeight(fixedBoxRef.current.offsetHeight + topGap);
    } else {
      setFixedBoxHeight(0);
    }
  }, [isFixed, activeStepIndex, progress]);

  const imageToRender = useMemo(
    () => stepImages[activeStepIndex],
    [activeStepIndex]
  );

  useEffect(() => {
    if (inView && !isLastStepComplete && !canHandleClickFunction) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  }, [inView, isLastStepComplete, canHandleClickFunction]);

  useEffect(() => {
    if (isFixed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFixed]);

  const Header = () => (
    <>
      <Box w="fit-content">
        <DashedText text="Regenerative Intelligence" />
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
        How It Works
      </Text>
    </>
  );

  const RenderStepMobile = () => (
    <VStack spacing={8} align="stretch">
      {renderStep(activeStep, true)}

      <Image
        src={imageToRender.src}
        alt="Step preview"
        borderRadius="lg"
        objectFit="cover"
        w="100%"
      />

      <VStack spacing={6} align="stretch" opacity={0.5}>
        {nonActiveSteps.map((step) => renderStep(step))}
      </VStack>
    </VStack>
  );

  const RenderStepDesktop = () => (
    <HStack spacing={10} align="flex-start">
      <VStack spacing={8} align="stretch" flex="1">
        {renderStep(activeStep, true)}
        <VStack spacing={6} align="stretch" opacity={0.5}>
          {nonActiveSteps.map((step) => renderStep(step))}
        </VStack>
      </VStack>

      <Box flex="1">
        <Image
          src={imageToRender.src}
          alt="Step preview"
          borderRadius="lg"
          objectFit="cover"
          w="100%"
        />
      </Box>
    </HStack>
  );

  const RenderStepByScreenResolution = () => (
    <Box
      ref={fixedBoxRef}
      position={isFixed ? 'fixed' : 'relative'}
      top={isFixed ? `${topGap}px` : 'auto'}
      left={isFixed ? '50%' : 'auto'}
      transform={isFixed ? 'translateX(-50%)' : 'none'}
      zIndex={10}
      bg={isFixed ? 'white' : ''}
      maxW="6xl"
      mx="auto"
      p={6}
      w="100%"
    >
      <Header />
      {isMobile ? <RenderStepMobile /> : <RenderStepDesktop />}
    </Box>
  );

  return (
    <Box
      mt={{ base: '44px', lg: '94px' }}
      minW={{ base: '376px' }}
      maxW={{ lg: '1024px' }}
      mx="auto"
      ref={ref}
      w="100%"
      px={{ base: '16px', lg: '18px' }}
      py={isFixed ? `${fixedBoxHeight}px` : 0}
    >
      <RenderStepByScreenResolution />
    </Box>
  );
}
