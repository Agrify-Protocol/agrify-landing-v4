
'use client';

import { Loader } from '@/components/common/Loader';
import {
  Box,
  Image as ChakraImage,
  IconButton,
  HStack,
  Text,
  VisuallyHidden,
  useBreakpointValue,
} from '@chakra-ui/react';
import { MdPlayArrow } from 'react-icons/md';
import React, { useState, useRef, useEffect } from 'react';

const Video = () => {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const retryCountRef = useRef(0);
  const maxRetries = 3;
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const isMobile = useBreakpointValue({ base: true, md: false }) ?? true;

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  // Enable immediate playback on non-mobile; require gesture on mobile
  useEffect(() => {
    if (!isMobile) {
      setHasUserInteracted(true);
    } else {
      // On mobile, don't show loader until user interacts
      setLoading(false);
    }
  }, [isMobile]);

  const handleReady = () => {
    setLoading(false);
    setHasError(false);
    retryCountRef.current = 0;
  };

  const handleError = () => {
    if (retryCountRef.current < maxRetries) {
      retryCountRef.current += 1;
      setTimeout(() => {
        videoRef.current?.load();
      }, 1000 * retryCountRef.current);
    } else {
      setLoading(false);
      setHasError(true);
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    // First user tap on mobile: mark interaction and attempt to play
    if (isMobile && !hasUserInteracted) {
      setHasUserInteracted(true);
      setLoading(true);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error?.name !== 'NotAllowedError') {
            setHasError(true);
          }
          setLoading(false);
        });
      } else {
        // If no promise is returned, stop showing loader
        setLoading(false);
      }
      return;
    }

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      setLoading(true);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Playback failed:', error);
          if (error.name === 'NotAllowedError') {
            setIsPlaying(false);
          } else {
            setHasError(true);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }
  };

  const retryVideo = () => {
    if (!videoRef.current) return;
    setLoading(true);
    setHasError(false);
    retryCountRef.current = 0;
    videoRef.current.load();
  };

  const VideoPlaceHolder = () => {
    if (isPlaying || loading) return null;
    return (
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
        _hover={{ opacity: 0.9 }}
      >
        <ChakraImage
          src="/images/video.svg"
          alt="Video thumbnail"
          w="100%"
          h="100%"
          objectFit="cover"
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
    );
  };

  return (
    <Box>
      <Text
        fontSize={{ base: '26px', lg: '48px' }}
        fontWeight="200"
        fontFamily="var(--font-pangaia)"
        lineHeight="121%"
        px="8px"
        // py={{ base: "2px", lg: "16px" }}
        color={'#282828'}
        textAlign="center"
        mt={{ base: '24px', lg: '48px' }}
      >
        Join the Next Cohort of Farmers
      </Text>
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
        {/* <VideoPlaceHolder /> */}
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dwwe0y3e2/video/upload/v1761261277/Buyers_xapeyp.mp4"
          controls
          controlsList="nodownload"
          playsInline
          muted // Always muted on load for autoplay safety
          preload={isMobile ? 'none' : 'auto'}
          crossOrigin="anonymous"
          // poster="/images/video.svg"
          aria-label="Agrify promotional video"
          style={{
            width: '100%',
            height: '90%',
            objectFit: 'cover',
            zIndex: 1,
            transition: 'opacity 0.6s ease-in-out',
            opacity: loading ? 0 : 1,
          }}
          onLoadedMetadata={handleReady}
          onLoadedData={handleReady}
          onCanPlay={handleReady}
          onPlay={handlePlay}
          onPause={handlePause}
          onError={handleError}
          onWaiting={() => setLoading(true)}
          onPlaying={() => setLoading(false)}
          onClick={() => {
            if (isMobile && !hasUserInteracted) setHasUserInteracted(true);
          }}
          onTouchStart={() => {
            if (isMobile && !hasUserInteracted) setHasUserInteracted(true);
          }}
        />
        {loading && (!isMobile || hasUserInteracted) && (
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
            <Text mb={3}>Error loading video. Please try again.</Text>
            <IconButton
              aria-label="Retry loading video"
              icon={<MdPlayArrow />}
              onClick={retryVideo}
              colorScheme="blue"
              size="sm"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Video;
