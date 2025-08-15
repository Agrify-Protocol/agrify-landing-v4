// 'use client';

// import { Loader } from '@/components/common/Loader';
// import {
//   Box,
//   Image as ChakraImage,
//   IconButton,
//   HStack,
//   Text,
//   VisuallyHidden,
// } from '@chakra-ui/react';
// import { MdForward10, MdReplay10, MdPlayArrow } from 'react-icons/md';
// import React, { useState, useRef, useEffect } from 'react';

// const Video = () => {
//   const [loading, setLoading] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [hasError, setHasError] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     // Detect mobile device
//     const checkMobile = () => {
//       setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
//     };

//     checkMobile();
//     window.addEventListener('resize', checkMobile);

//     return () => {
//       window.removeEventListener('resize', checkMobile);
//       if (loadingTimeoutRef.current) {
//         clearTimeout(loadingTimeoutRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (video) {
//       // Set loading timeout - if video doesn't load in 10 seconds, show error
//       loadingTimeoutRef.current = setTimeout(() => {
//         if (loading) {
//           setLoading(false);
//           setHasError(true);
//         }
//       }, 10000);

//       if (video.readyState >= 3) {
//         setLoading(false);
//         if (loadingTimeoutRef.current) {
//           clearTimeout(loadingTimeoutRef.current);
//         }
//       }
//     }
//   }, [loading]);

//   const handlePlay = () => setIsPlaying(true);
//   const handlePause = () => setIsPlaying(false);

//   const handleLoadStart = () => {
//     setLoading(true);
//     setHasError(false);
//   };

//   const handleCanPlay = () => {
//     setLoading(false);
//     setHasError(false);
//     if (loadingTimeoutRef.current) {
//       clearTimeout(loadingTimeoutRef.current);
//     }
//   };

//   const handleLoadedData = () => {
//     setLoading(false);
//     setHasError(false);
//     if (loadingTimeoutRef.current) {
//       clearTimeout(loadingTimeoutRef.current);
//     }
//   };

//   const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
//     console.error('Video error:', e);
//     setLoading(false);
//     setHasError(true);
//     if (loadingTimeoutRef.current) {
//       clearTimeout(loadingTimeoutRef.current);
//     }
//   };

//   const rewind10 = () => {
//     if (videoRef.current) {
//       videoRef.current.currentTime = Math.max(
//         videoRef.current.currentTime - 10,
//         0
//       );
//     }
//   };

//   const forward10 = () => {
//     if (videoRef.current) {
//       videoRef.current.currentTime = Math.min(
//         videoRef.current.currentTime + 10,
//         videoRef.current.duration
//       );
//     }
//   };

//   const togglePlayPause = async () => {
//     if (videoRef.current) {
//       try {
//         if (isPlaying) {
//           videoRef.current.pause();
//         } else {
//           // For mobile, we might need to reload the video source
//           if (isMobile && hasError) {
//             videoRef.current.load();
//             setLoading(true);
//             setHasError(false);
//           }
//           await videoRef.current.play();
//         }
//       } catch (error) {
//         console.error('Play error:', error);
//         setHasError(true);
//         setLoading(false);
//       }
//     }
//   };

//   const retryVideo = () => {
//     if (videoRef.current) {
//       setLoading(true);
//       setHasError(false);
//       videoRef.current.load();
//     }
//   };

//   const VideoPlaceHolder = () => {
//     return (
//       <>
//         {!isPlaying && !loading && (
//           <Box
//             position="absolute"
//             top={0}
//             left={0}
//             w="100%"
//             h="100%"
//             zIndex={2}
//             cursor="pointer"
//             onClick={togglePlayPause}
//             role="button"
//             tabIndex={0}
//             aria-label="Play video"
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' || e.key === ' ') {
//                 e.preventDefault();
//                 togglePlayPause();
//               }
//             }}
//             _focus={{
//               outline: '2px solid',
//               outlineColor: 'blue.500',
//               outlineOffset: '2px',
//             }}
//             _hover={{
//               opacity: 0.9,
//             }}
//           >
//             <ChakraImage
//               src="/images/video.svg"
//               alt=""
//               w="100%"
//               h="100%"
//               objectFit="cover"
//               role="presentation"
//             />
//             <Box
//               position="absolute"
//               top="50%"
//               left="50%"
//               transform="translate(-50%, -50%)"
//               bg="rgba(0, 0, 0, 0.7)"
//               borderRadius="50%"
//               p={4}
//             >
//               <MdPlayArrow size={48} color="white" />
//             </Box>
//           </Box>
//         )}
//       </>
//     );
//   };

//   return (
//     <Box
//       as="section"
//       position="relative"
//       rounded={{ base: '16px', lg: '24px' }}
//       overflow="hidden"
//       px={{ base: '16px', lg: '60px' }}
//       py={{ base: '16px', lg: '32px' }}
//       mx={{ base: 4, lg: 8 }}
//       mt={{ base: '2px', lg: '94px' }}
//       h={{ base: 'auto', lg: '600px' }}
//       aria-label="Video player"
//     >
//       <VideoPlaceHolder />

//       <video
//         ref={videoRef}
//         src="https://res.cloudinary.com/dwwe0y3e2/video/upload/v1754756417/Agrify_Ad_uvggx0.mp4"
//         controls
//         controlsList="nodownload"
//         preload={isMobile ? "none" : "metadata"}
//         playsInline
//         webkit-playsinline="true"
//         muted={isMobile}
//         aria-label="Agrify promotional video"
//         style={{
//           width: '100%',
//           height: '90%',
//           objectFit: 'cover',
//           position: 'relative',
//           zIndex: 1,
//           transition: 'opacity 0.6s ease-in-out',
//           opacity: loading ? 0 : 1,
//         }}
//         onLoadStart={handleLoadStart}
//         onCanPlay={handleCanPlay}
//         onLoadedData={handleLoadedData}
//         onPlay={handlePlay}
//         onPause={handlePause}
//         onError={handleError}
//         onWaiting={() => setLoading(true)}
//         onPlaying={() => setLoading(false)}
//       />

//       {loading && (
//         <Box
//           position="absolute"
//           top={0}
//           left={0}
//           w="100%"
//           h="100%"
//           zIndex={3}
//           bg="rgba(0, 0, 0, 0.8)"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <Loader logoSrc="/icons/logo.svg" />
//           <VisuallyHidden>Loading video content</VisuallyHidden>
//         </Box>
//       )}

//       {hasError && (
//         <Box
//           position="absolute"
//           top="50%"
//           left="50%"
//           transform="translate(-50%, -50%)"
//           zIndex={3}
//           textAlign="center"
//           p={4}
//           bg="rgba(0, 0, 0, 0.8)"
//           borderRadius="md"
//           color="white"
//         >
//           <Text mb={3}>Error loading video. Please try again.</Text>
//           <IconButton
//             aria-label="Retry loading video"
//             icon={<MdPlayArrow />}
//             onClick={retryVideo}
//             colorScheme="blue"
//             size="sm"
//           />
//         </Box>
//       )}

//       <HStack
//         spacing={4}
//         justify="center"
//         mt={4}
//         role="group"
//         aria-label="Video playback controls"
//       >
//         <IconButton
//           aria-label="Rewind 10 seconds"
//           icon={<MdReplay10 size={24} />}
//           onClick={rewind10}
//           colorScheme="yellow"
//           isRound
//           isDisabled={loading || hasError}
//           _focus={{
//             outline: '2px solid',
//             outlineColor: 'yellow.500',
//             outlineOffset: '2px',
//           }}
//         />
//         <IconButton
//           aria-label="Forward 10 seconds"
//           icon={<MdForward10 size={24} />}
//           onClick={forward10}
//           colorScheme="green"
//           isRound
//           isDisabled={loading || hasError}
//           _focus={{
//             outline: '2px solid',
//             outlineColor: 'green.500',
//             outlineOffset: '2px',
//           }}
//         />
//       </HStack>
//     </Box>
//   );
// };

// export default Video;

"use client";

import { Loader } from "@/components/common/Loader";
import {
  Box,
  Image as ChakraImage,
  IconButton,
  HStack,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { MdForward10, MdReplay10, MdPlayArrow } from "react-icons/md";
import React, { useState, useRef, useEffect } from "react";

const Video = () => {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const firstLoadRef = useRef(true); // Track first load attempt

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearLoadingTimeout();
    };
  }, []);

  // Clear timeout helper
  const clearLoadingTimeout = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video && !isMobile) {
      // Set loading timeout - if video doesn't load in 10 seconds, show error
      loadingTimeoutRef.current = setTimeout(() => {
        if (loading) {
          setLoading(false);
          setHasError(true);
        }
      }, 10000);

      if (video.readyState >= 3) {
        setLoading(false);
        clearLoadingTimeout();
      }
    }
  }, [loading, isMobile]);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const handleLoadStart = () => {
    // Only set loading if user has interacted or it's desktop
    if (!isMobile || userInteracted) {
      setLoading(true);
      clearLoadingTimeout();

      // Set longer timeout for mobile (20s) vs desktop (12s)
      const timeoutDuration = isMobile ? 20000 : 12000;
      loadingTimeoutRef.current = setTimeout(() => {
        if (loading) {
          setLoading(false);
          setHasError(true);
        }
      }, timeoutDuration);
    }
    setHasError(false);
  };

  const handleCanPlay = () => {
    setLoading(false);
    setHasError(false);
    clearLoadingTimeout();
  };

  const handleLoadedData = () => {
    setLoading(false);
    setHasError(false);
    clearLoadingTimeout();
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Video error:", e);

    // Special handling for first load attempt on mobile
    if (isMobile && firstLoadRef.current) {
      firstLoadRef.current = false;
      return;
    }

    setLoading(false);
    setHasError(true);
    clearLoadingTimeout();
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

  const togglePlayPause = async () => {
    if (videoRef.current) {
      try {
        // Mark that user has interacted
        if (!userInteracted) {
          setUserInteracted(true);
        }

        if (isPlaying) {
          videoRef.current.pause();
        } else {
          clearLoadingTimeout();
          
          // Special handling for mobile first attempt
          if (isMobile && firstLoadRef.current) {
            videoRef.current.load();
            setLoading(true);
            setHasError(false);
            firstLoadRef.current = false;
            
            // Set longer timeout for first mobile attempt
            loadingTimeoutRef.current = setTimeout(() => {
              setLoading(false);
              setHasError(true);
            }, 20000);
          }

          await videoRef.current.play();
        }
      } catch (error) {
        console.error("Play error:", error);
        // Only show error if it's not a user gesture issue
        if (
          typeof error === "object" &&
          error !== null &&
          "name" in error &&
          (error as { name?: string }).name !== "NotAllowedError"
        ) {
          setHasError(true);
        }
        setLoading(false);
      }
    }
  };

  const retryVideo = () => {
    if (videoRef.current) {
      setUserInteracted(true);
      setLoading(true);
      setHasError(false);
      firstLoadRef.current = false; // Mark first attempt completed

      clearLoadingTimeout();

      // Set timeout for retry attempt (20s for mobile)
      const timeoutDuration = isMobile ? 20000 : 10000;
      loadingTimeoutRef.current = setTimeout(() => {
        setLoading(false);
        setHasError(true);
      }, timeoutDuration);

      videoRef.current.load();
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
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                togglePlayPause();
              }
            }}
            _focus={{
              outline: "2px solid",
              outlineColor: "blue.500",
              outlineOffset: "2px",
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
      rounded={{ base: "16px", lg: "24px" }}
      overflow="hidden"
      px={{ base: "16px", lg: "60px" }}
      py={{ base: "16px", lg: "32px" }}
      mx={{ base: 4, lg: 8 }}
      mt={{ base: "2px", lg: "94px" }}
      h={{ base: "auto", lg: "600px" }}
      aria-label="Video player"
    >
      <VideoPlaceHolder />

      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dwwe0y3e2/video/upload/v1754756417/Agrify_Ad_uvggx0.mp4"
        controls
        controlsList="nodownload"
        preload={isMobile ? "none" : "metadata"}
        playsInline
        webkit-playsinline="true"
        muted={isMobile}
        aria-label="Agrify promotional video"
        style={{
          width: "100%",
          height: "90%",
          objectFit: "cover",
          position: "relative",
          zIndex: 1,
          transition: "opacity 0.6s ease-in-out",
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
            outline: "2px solid",
            outlineColor: "yellow.500",
            outlineOffset: "2px",
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
            outline: "2px solid",
            outlineColor: "green.500",
            outlineOffset: "2px",
          }}
        />
      </HStack>
    </Box>
  );
};

export default Video;