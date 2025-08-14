import { Progress } from '@chakra-ui/react';

interface SmoothProgressBarProps {
  isActive: boolean;
  progress: number;
}

export default function SmoothProgressBar({
  isActive,
  progress,
}: SmoothProgressBarProps) {
  if (!isActive) return null;

  return (
    <Progress
      value={progress}
      size="sm"
      colorScheme="green"
      mt={3}
      borderRadius="full"
      sx={{
        '& > div': {
          transition: 'width 0.6s ease-in-out',
        },
      }}
    />
  );
}
