import { Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useInterval } from '@chakra-ui/react';
import SmoothProgressBar from '@/components/home/_components/ProgressBar';

export default function useRenderSteps(
  steps: Array<{ id: string; title: string; description: string }>,
  isInView: boolean
) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const arrayLength = steps.length - 1;
  const canHandleClickFunction = arrayLength === stepCount && progress >= 100;

  const activeStep = useMemo(
    () => steps[activeStepIndex],
    [activeStepIndex, steps]
  );

  const nonActiveSteps = useMemo(() => {
    return steps.filter((_, index) => index !== activeStepIndex);
  }, [activeStepIndex, steps]);

  useInterval(
    () => {
      if (progress < 100) {
        setProgress((p) => {
          const next = p + 33.34;
          return next >= 100 ? 100 : next;
        });
      } else if (activeStepIndex < steps.length - 1) {
        setProgress(0);
        setActiveStepIndex((prev) => prev + 1);
        setStepCount((prev) => prev + 1);
      }
    },
    isInView && isRunning ? 1000 : null
  );

  const handleStepClick = (index: number) => {
    if (!canHandleClickFunction) return;
    setActiveStepIndex(index - 1);
    setIsRunning(false);
  };

  const renderStep = (
    step: { id: string; title: string; description: string },
    isActive = false
  ) => (
    <Box
      key={step.id}
      cursor={'pointer'}
      onClick={() => handleStepClick(Number(step.id))}
    >
      <Text
        fontSize="sm"
        fontWeight="bold"
        color={isActive ? 'green.500' : 'gray.400'}
      >
        {step.id}
      </Text>
      <Text
        fontSize="lg"
        fontWeight="semibold"
        color={isActive ? 'black' : 'gray.500'}
      >
        {step.title}
      </Text>
      <Text fontSize="sm" color={isActive ? 'gray.700' : 'gray.500'}>
        {step.description}
      </Text>

      <SmoothProgressBar isActive={isActive} progress={progress} />
    </Box>
  );

  return {
    activeStepIndex,
    setActiveStepIndex,
    progress,
    setProgress,
    isMobile,
    activeStep,
    nonActiveSteps,
    renderStep,
    canHandleClickFunction,
    isRunning,
  };
}
