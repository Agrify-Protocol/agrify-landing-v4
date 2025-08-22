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

// "use client";

// import { Loader } from "@/components/common/Loader";
// import {
//   Box,
//   Image as ChakraImage,
//   IconButton,
//   HStack,
//   Text,
//   VisuallyHidden,
//   useBreakpointValue
// } from "@chakra-ui/react";
// import { MdForward10, MdReplay10, MdPlayArrow } from "react-icons/md";
// import React, { useState, useRef, useEffect } from "react";

// const Video = () => {
//   const [loading, setLoading] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [hasError, setHasError] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const retryCountRef = useRef(0);
//   const maxRetries = 3;

//   // Use Chakra UI's responsive hook instead of user agent sniffing
//   const isMobile = useBreakpointValue({ base: true, md: false }) ?? true;

//   // Clear any pending timeouts on unmount
//   useEffect(() => {
//     return () => {
//       if (videoRef.current) {
//         videoRef.current.pause();
//         videoRef.current.src = "";
//         videoRef.current.load();
//       }
//     };
//   }, []);

//   // Simplified event handlers
//   const handleCanPlay = () => {
//     setLoading(false);
//     setHasError(false);
//     retryCountRef.current = 0;
//   };

//   const handleError = () => {
//     if (retryCountRef.current < maxRetries) {
//       retryCountRef.current += 1;
//       setTimeout(() => {
//         if (videoRef.current) {
//           videoRef.current.load();
//         }
//       }, 1000 * retryCountRef.current);
//     } else {
//       setLoading(false);
//       setHasError(true);
//     }
//   };

//   const handlePlay = () => setIsPlaying(true);
//   const handlePause = () => setIsPlaying(false);

//   // Video control functions
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

//   const togglePlayPause = () => {
//     if (!videoRef.current) return;

//     if (isPlaying) {
//       videoRef.current.pause();
//     } else {
//       // For mobile, we need to ensure playback starts with user interaction
//       const playPromise = videoRef.current.play();

//       if (playPromise !== undefined) {
//         playPromise
//           .then(() => {
//             // Playback started successfully
//           })
//           .catch(error => {
//             console.log("Playback failed:", error);
//             // Handle specific mobile playback restrictions
//             if (error.name === 'NotAllowedError') {
//               // Show play button to let user initiate playback
//               setIsPlaying(false);
//             } else {
//               setHasError(true);
//             }
//           });
//       }
//     }
//   };

//   const retryVideo = () => {
//     if (!videoRef.current) return;

//     setLoading(true);
//     setHasError(false);
//     retryCountRef.current = 0;

//     // Reset and reload the video
//     videoRef.current.src = videoRef.current.src;
//     videoRef.current.load();
//   };

//   // Placeholder component
//   const VideoPlaceHolder = () => {
//     if (isPlaying || loading) return null;

//     return (
//       <Box
//         position="absolute"
//         top={0}
//         left={0}
//         w="100%"
//         h="100%"
//         zIndex={2}
//         cursor="pointer"
//         onClick={togglePlayPause}
//         role="button"
//         tabIndex={0}
//         aria-label="Play video"
//         onKeyDown={(e) => {
//           if (e.key === "Enter" || e.key === " ") {
//             e.preventDefault();
//             togglePlayPause();
//           }
//         }}
//         _focus={{
//           outline: "2px solid",
//           outlineColor: "blue.500",
//           outlineOffset: "2px",
//         }}
//         _hover={{
//           opacity: 0.9,
//         }}
//       >
//         <ChakraImage
//           src="/images/video.svg"
//           alt="Video thumbnail"
//           w="100%"
//           h="100%"
//           objectFit="cover"
//           role="presentation"
//         />
//         <Box
//           position="absolute"
//           top="50%"
//           left="50%"
//           transform="translate(-50%, -50%)"
//           bg="rgba(0, 0, 0, 0.7)"
//           borderRadius="50%"
//           p={4}
//         >
//           <MdPlayArrow size={48} color="white" />
//         </Box>
//       </Box>
//     );
//   };

//   return (
//     <Box
//       as="section"
//       position="relative"
//       rounded={{ base: "16px", lg: "24px" }}
//       overflow="hidden"
//       px={{ base: "16px", lg: "60px" }}
//       py={{ base: "16px", lg: "32px" }}
//       mx={{ base: 4, lg: 8 }}
//       mt={{ base: "2px", lg: "94px" }}
//       h={{ base: "auto", lg: "600px" }}
//       aria-label="Video player"
//     >
//       <VideoPlaceHolder />

//       <video
//         ref={videoRef}
//         src="https://res.cloudinary.com/dwwe0y3e2/video/upload/v1754756417/Agrify_Ad_uvggx0.mp4"
//         // controls={false}
//         controls
//         controlsList="nodownload"
//         playsInline
//         webkit-playsinline="true"
//         muted={isMobile} // Muted helps with mobile autoplay restrictions
//         preload={isMobile ? "metadata" : "auto"}
//         aria-label="Agrify promotional video"
//         style={{
//           width: "100%",
//           height: "90%",
//           objectFit: "cover",
//           position: "relative",
//           zIndex: 1,
//           transition: "opacity 0.6s ease-in-out",
//           opacity: loading ? 0 : 1,
//         }}
//         onCanPlay={handleCanPlay}
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
//         {/* <IconButton
//           aria-label="Rewind 10 seconds"
//           icon={<MdReplay10 size={24} />}
//           onClick={rewind10}
//           colorScheme="yellow"
//           isRound
//           isDisabled={loading || hasError}
//           _focus={{
//             outline: "2px solid",
//             outlineColor: "yellow.500",
//             outlineOffset: "2px",
//           }}
//         />

//         <IconButton
//           aria-label={isPlaying ? "Pause video" : "Play video"}
//           icon={isPlaying ? <Box w={6} h={6} bg="white" /> : <MdPlayArrow size={24} />}
//           onClick={togglePlayPause}
//           colorScheme="blue"
//           isRound
//           isDisabled={hasError}
//           _focus={{
//             outline: "2px solid",
//             outlineColor: "blue.500",
//             outlineOffset: "2px",
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
//             outline: "2px solid",
//             outlineColor: "green.500",
//             outlineOffset: "2px",
//           }}
//         /> */}
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
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdPlayArrow } from "react-icons/md";
import React, { useState, useRef, useEffect } from "react";

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
          if (error?.name !== "NotAllowedError") {
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
          console.log("Playback failed:", error);
          if (error.name === "NotAllowedError") {
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
          if (e.key === "Enter" || e.key === " ") {
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
        playsInline
        muted // Always muted on load for autoplay safety
        preload={isMobile ? "none" : "auto"}
        crossOrigin="anonymous"
        poster="/images/video.svg"
        aria-label="Agrify promotional video"
        style={{
          width: "100%",
          height: "90%",
          objectFit: "cover",
          zIndex: 1,
          transition: "opacity 0.6s ease-in-out",
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
  );
};

export default Video;
