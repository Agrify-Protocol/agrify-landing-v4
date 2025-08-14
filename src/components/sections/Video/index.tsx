'use client';

import { Loader } from '@/components/common/Loader';
import {
  Box,
  Image as ChakraImage,
  IconButton,
  HStack,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import { MdForward10, MdReplay10, MdPlayArrow } from 'react-icons/md';
import React, { useState, useRef } from 'react';

const Video = () => {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 3) {
        setLoading(false);
      }
    }
  }, []);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const handleLoadStart = () => {
    setLoading(true);
    setHasError(false);
  };

  const handleCanPlay = () => {
    setLoading(false);
    setHasError(false);
  };

  const handleLoadedData = () => {
    setLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setLoading(false);
    setHasError(true);
  };

  const rewind10 = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        videoRef.current.currentTime - 10,
        0
      );
    }
  };

  const forward10 = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.currentTime + 10,
        videoRef.current.duration
      );
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const VideoPlaceHolder = () => {
    return (
      <>
        {!isPlaying && !loading && (
          <Box
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            zIndex={2}
            cursor="pointer"
            onClick={togglePlayPause}
            role="button"
            tabIndex={0}
            aria-label="Play video"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                togglePlayPause();
              }
            }}
            _focus={{
              outline: '2px solid',
              outlineColor: 'blue.500',
              outlineOffset: '2px',
            }}
            _hover={{
              opacity: 0.9,
            }}
          >
            <ChakraImage
              src="/images/video.svg"
              alt=""
              w="100%"
              h="100%"
              objectFit="cover"
              role="presentation"
            />
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              bg="rgba(0, 0, 0, 0.7)"
              borderRadius="50%"
              p={4}
            >
              <MdPlayArrow size={48} color="white" />
            </Box>
          </Box>
        )}
      </>
    );
  };

  return (
    <Box
      as="section"
      position="relative"
      rounded={{ base: '16px', lg: '24px' }}
      overflow="hidden"
      px={{ base: '16px', lg: '60px' }}
      py={{ base: '16px', lg: '32px' }}
      mx={{ base: 4, lg: 8 }}
      mt={{ base: '2px', lg: '94px' }}
      h={{ base: 'auto', lg: '600px' }}
      aria-label="Video player"
    >
      <VideoPlaceHolder />

      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dwwe0y3e2/video/upload/v1754756417/Agrify_Ad_uvggx0.mp4"
        controls
        controlsList="nodownload"
        preload="metadata"
        aria-label="Agrify promotional video"
        style={{
          width: '100%',
          height: '90%',
          objectFit: 'cover',
          position: 'relative',
          zIndex: 1,
          transition: 'opacity 0.6s ease-in-out',
          opacity: loading ? 0 : 1,
        }}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onLoadedData={handleLoadedData}
        onPlay={handlePlay}
        onPause={handlePause}
        onError={handleError}
        onWaiting={() => setLoading(true)}
        onPlaying={() => setLoading(false)}
      />

      {loading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          zIndex={3}
          bg="rgba(0, 0, 0, 0.8)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Loader logoSrc="/icons/logo.svg" />
          <VisuallyHidden>Loading video content</VisuallyHidden>
        </Box>
      )}

      {hasError && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={3}
          textAlign="center"
          p={4}
          bg="rgba(0, 0, 0, 0.8)"
          borderRadius="md"
          color="white"
        >
          <Text>Error loading video. Please try again.</Text>
        </Box>
      )}

      <HStack
        spacing={4}
        justify="center"
        mt={4}
        role="group"
        aria-label="Video playback controls"
      >
        <IconButton
          aria-label="Rewind 10 seconds"
          icon={<MdReplay10 size={24} />}
          onClick={rewind10}
          colorScheme="yellow"
          isRound
          isDisabled={loading || hasError}
          _focus={{
            outline: '2px solid',
            outlineColor: 'yellow.500',
            outlineOffset: '2px',
          }}
        />
        <IconButton
          aria-label="Forward 10 seconds"
          icon={<MdForward10 size={24} />}
          onClick={forward10}
          colorScheme="green"
          isRound
          isDisabled={loading || hasError}
          _focus={{
            outline: '2px solid',
            outlineColor: 'green.500',
            outlineOffset: '2px',
          }}
        />
      </HStack>
    </Box>
  );
};

export default Video;
