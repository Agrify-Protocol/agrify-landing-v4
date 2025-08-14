// 'use client';

// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { Box, VStack, HStack, Text, Image } from '@chakra-ui/react';
// import DashedText from '@/components/common/DashedText';
// import useRenderSteps from '@/utils/hooks/useRenderSteps';
// import { useInView } from 'react-intersection-observer';
// import { useStickyScroll } from '@/utils/hooks/useStickyScroll';
// import { motion, AnimatePresence } from 'framer-motion';

// interface Step {
//   id: string;
//   title: string;
//   description: string;
// }

// // --- Data (Colocated and improved structure) ---
// const HOW_IT_WORKS_STEPS: Step[] = [
//   {
//     id: '01',
//     title: 'Receive Regenerative Tasks',
//     description:
//       'Farmers get personalized farming guidance in their own language, directly on their phones.',
//   },
//   {
//     id: '02',
//     title: 'Upload Proof of Completion',
//     description:
//       'They share photos, voice notes, or text to show how the crop is grown, verified by GPS and timestamp.',
//   },
//   {
//     id: '03',
//     title: 'Generate a Traceability Story',
//     description:
//       'AgUnity builds a digital passport that tells the real story of how food was produced.',
//   },
//   {
//     id: '04',
//     title: 'Sell to Sustainable Buyers',
//     description:
//       'With verified stories, farmers can connect directly with global buyers looking for ethical, climate-smart produce.',
//   },
// ];

// const STEP_IMAGES = [
//   {
//     id: '01',
//     src: '/images/how_it_works.svg',
//     alt: 'Farmers receiving regenerative tasks on mobile',
//   },
//   {
//     id: '02',
//     src: '/images/second_step.svg',
//     alt: 'Uploading proof of task completion',
//   },
//   {
//     id: '03',
//     src: '/images/third_step.svg',
//     alt: 'Digital traceability story generation',
//   },
//   {
//     id: '04',
//     src: '/images/fourth_step.svg',
//     alt: 'Connecting with sustainable buyers',
//   },
// ];

// // **FIX**: Defines the return type of the `useRenderSteps` hook

// // --- Memoized Presentational Components ---

// const Header: React.FC = React.memo(() => (
//   <Box mb={8}>
//     <Box w="fit-content" mb={4}>
//       <DashedText text="Regenerative Intelligence" />
//     </Box>
//     <Text
//       fontSize={{ base: '26px', lg: '48px' }}
//       fontWeight="200"
//       fontFamily="var(--font-pangaia)"
//       lineHeight="121%"
//       color="brand.primaryBlack"
//     >
//       How It Works
//     </Text>
//   </Box>
// ));

// Header.displayName = 'Header';

// const StepImage = React.memo(({ src, alt }: { src: string; alt: string }) => (
//   <Image
//     src={src}
//     alt={alt}
//     borderRadius="lg"
//     objectFit="cover"
//     w="100%"
//     maxH={{ base: '300px', lg: '500px' }}
//     transition="opacity 0.3s ease"
//     // loading="lazy"
//   />
// ));

// StepImage.displayName = 'StepImage';

// interface StepsLayoutProps {
//   renderStep: (step: Step, isActive?: boolean) => React.ReactNode;
//   activeStep: Step;
//   nonActiveSteps: Step[];
//   currentImageSrc: string;
//   currentImageAlt: string;
//   isMobile: boolean;
// }

// const StepsLayout = React.memo(
//   ({
//     renderStep,
//     activeStep,
//     nonActiveSteps,
//     currentImageSrc,
//     currentImageAlt,
//     isMobile,
//   }: StepsLayoutProps) => {
//     const StepContent = (
//       <VStack spacing={8} align="stretch" flex="1" minW="0">
//         {renderStep(activeStep, true)}
//         <VStack spacing={6} align="stretch" opacity={0.5}>
//           {nonActiveSteps.map((step) => renderStep(step, false))}
//         </VStack>
//       </VStack>
//     );

//     if (isMobile) {
//       return (
//         <VStack spacing={8} align="stretch">
//           {StepContent}
//           <StepImage src={currentImageSrc} alt={currentImageAlt} />
//         </VStack>
//       );
//     }

//     return (
//       <HStack spacing={12} align="flex-start">
//         {StepContent}
//         <Box flex="1" minW="0">
//           <StepImage src={currentImageSrc} alt={currentImageAlt} />
//         </Box>
//       </HStack>
//     );
//   }
// );

// StepsLayout.displayName = 'StepsLayout';

// // --- Main Component ---

// export default function HowItWorks() {
//   const containerRef = useRef(null);
//   const stickyContentRef = useRef(null);
//   const [isLastStepComplete, setIsLastStepComplete] = useState(false);

//   const { ref: inViewRef, inView } = useInView({ threshold: 0.1 });

//   const {
//     renderStep,
//     isMobile,
//     activeStep,
//     nonActiveSteps,
//     activeStepIndex,
//     progress,
//     isRunning,
//   } = useRenderSteps(HOW_IT_WORKS_STEPS, inView);

//   useEffect(() => {
//     let timeoutId: ReturnType<typeof setTimeout>;

//     const completedNow =
//       activeStepIndex === HOW_IT_WORKS_STEPS.length - 1 && progress >= 100;

//     if (completedNow) {
//       timeoutId = setTimeout(() => {
//         setIsLastStepComplete(true);
//       }, 1000);
//     } else {
//       setIsLastStepComplete(false);
//     }

//     return () => clearTimeout(timeoutId);
//   }, [activeStepIndex, progress]);

//   const { isSticky } = useStickyScroll({
//     containerRef,
//     contentRef: stickyContentRef,
//     isEnabled: isRunning,
//     isLastStepCompleted: isLastStepComplete,
//   });

//   const currentImage = useMemo(
//     () => STEP_IMAGES[activeStepIndex],
//     [activeStepIndex]
//   );

//   return (
//     <motion.div
//       ref={containerRef}
//       style={{
//         marginTop: '60px',
//         paddingLeft: '16px',
//         paddingRight: '16px',
//         width: '100%',
//         position: 'relative',
//       }}
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{
//         duration: 0.8,
//         ease: [0.4, 0, 0.2, 1],
//         type: 'spring',
//         stiffness: 100,
//         damping: 20,
//       }}
//     >
//       <div
//         ref={inViewRef}
//         style={{
//           position: 'absolute',
//           top: '20vh',
//           height: '60vh',
//         }}
//       />
//       <motion.div
//         ref={stickyContentRef}
//         style={{
//           maxWidth: '72rem',
//           margin: '0 auto',
//           backgroundColor: 'white',
//           borderRadius: '0.75rem',
//           padding: '1rem',
//           position: isSticky ? 'sticky' : 'relative',
//           top: isSticky ? '20px' : 'auto',
//           zIndex: isSticky ? 1000 : 'auto',
//         }}
//         animate={{
//           boxShadow: isSticky
//             ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
//             : '0 0 0 0 rgba(0, 0, 0, 0)',
//           borderWidth: isSticky ? '1px' : '0px',
//           borderColor: isSticky ? 'rgba(243, 244, 246, 1)' : 'rgba(0, 0, 0, 0)',
//           y: isSticky ? 0 : 20,
//           scale: isSticky ? 1 : 0.98,
//         }}
//         transition={{
//           duration: 0.6,
//           ease: [0.4, 0, 0.2, 1],
//           type: 'spring',
//           stiffness: 200,
//           damping: 30,
//         }}
//       >
//         <AnimatePresence>
//           {isSticky && (
//             <motion.div
//               initial={{ opacity: 0, scaleX: 0 }}
//               animate={{
//                 opacity: [0.7, 1, 0.7],
//                 scaleX: [0, 1, 1],
//                 backgroundColor: [
//                   'rgba(34, 197, 94, 1)',
//                   'rgba(22, 163, 74, 1)',
//                   'rgba(34, 197, 94, 1)',
//                 ],
//               }}
//               exit={{ opacity: 0, scaleX: 0 }}
//               transition={{
//                 opacity: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
//                 backgroundColor: {
//                   repeat: Infinity,
//                   duration: 1.5,
//                   ease: 'easeInOut',
//                 },
//                 scaleX: { duration: 0.3, ease: 'easeOut' },
//               }}
//               style={{
//                 position: 'absolute',
//                 top: '-10px',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 width: '60px',
//                 height: '4px',
//                 borderRadius: '9999px',
//                 transformOrigin: 'center',
//               }}
//             />
//           )}
//         </AnimatePresence>

//         {/* Pulsing border animation when sticky */}
//         <motion.div
//           style={{
//             position: 'absolute',
//             inset: 0,
//             borderRadius: 'inherit',
//             pointerEvents: 'none',
//           }}
//           animate={
//             isSticky
//               ? {
//                   borderColor: [
//                     'rgba(229, 231, 235, 1)',
//                     'rgba(134, 239, 172, 1)',
//                     'rgba(229, 231, 235, 1)',
//                   ],
//                 }
//               : {}
//           }
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             ease: 'easeInOut',
//           }}
//           initial={{
//             borderWidth: '1px',
//             borderStyle: 'solid',
//             borderColor: 'transparent',
//           }}
//         />

//         <Header />
//         <StepsLayout
//           renderStep={renderStep}
//           activeStep={activeStep}
//           nonActiveSteps={nonActiveSteps}
//           currentImageSrc={currentImage.src}
//           currentImageAlt={currentImage.alt}
//           isMobile={isMobile as boolean}
//         />
//       </motion.div>
//     </motion.div>
//   );
// }

"use client";

import React, { useMemo, useState } from "react";
import { Box, VStack, Text, Image } from "@chakra-ui/react";
import DashedText from "@/components/common/DashedText";
// import useRenderSteps from '@/utils/hooks/useRenderSteps';
// import { useInView } from "react-intersection-observer";
// import { useStickyScroll } from '@/utils/hooks/useStickyScroll';
import { motion, AnimatePresence } from "framer-motion";

interface Step {
  id: string;
  title: string;
  description: string;
}

// --- Data (Colocated and improved structure) ---
const HOW_IT_WORKS_STEPS: Step[] = [
  {
    id: "01",
    title: "Receive Regenerative Tasks",
    description:
      "Farmers get personalized farming guidance in their own language, directly on their phones.",
  },
  {
    id: "02",
    title: "Upload Proof of Completion",
    description:
      "They share photos, voice notes, or text to show how the crop is grown, verified by GPS and timestamp.",
  },
  {
    id: "03",
    title: "Generate a Traceability Story",
    description:
      "AgUnity builds a digital passport that tells the real story of how food was produced.",
  },
  {
    id: "04",
    title: "Sell to Sustainable Buyers",
    description:
      "With verified stories, farmers can connect directly with global buyers looking for ethical, climate-smart produce.",
  },
];

const STEP_IMAGES = [
  {
    id: "01",
    src: "/images/how_it_works.svg",
    alt: "Farmers receiving regenerative tasks on mobile",
  },
  {
    id: "02",
    src: "/images/second_step.svg",
    alt: "Uploading proof of task completion",
  },
  {
    id: "03",
    src: "/images/third_step.svg",
    alt: "Digital traceability story generation",
  },
  {
    id: "04",
    src: "/images/fourth_step.svg",
    alt: "Connecting with sustainable buyers",
  },
];

// --- Memoized Presentational Components ---

const Header: React.FC = React.memo(() => (
  <Box mb={8}>
    <Box w="fit-content" mb={4}>
      <DashedText text="Regenerative Intelligence" />
    </Box>
    <Text
      fontSize={{ base: "26px", lg: "48px" }}
      fontWeight="200"
      fontFamily="var(--font-pangaia)"
      lineHeight="121%"
      color="brand.primaryBlack"
    >
      How It Works
    </Text>
  </Box>
));

Header.displayName = "Header";

const StepImage = React.memo(({ src, alt }: { src: string; alt: string }) => (
  <Image
    src={src}
    alt={alt}
    borderRadius="lg"
    objectFit="cover"
    w="100%"
    maxH={{ base: "300px", lg: "500px" }}
    transition="opacity 0.3s ease"
    // loading="lazy"
  />
));

StepImage.displayName = "StepImage";

// Clickable step component - matching original Item component typography
const ClickableStep = React.memo(
  ({
    step,
    isActive,
    onClick,
  }: {
    step: Step;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <motion.div
      onClick={onClick}
      style={{ cursor: "pointer" }}
      whileHover={{ x: 2 }}
      transition={{ duration: 0.2 }}
    >
      <Box opacity={isActive ? "100%" : "40%"}>
        <Text
          fontFamily="var(--font-inter)"
          mb={"12px"}
          fontWeight={500}
          fontSize={"18px"}
          opacity={"40%"}
        >
          {step.id}
        </Text>
        <Text
          fontFamily="var(--font-inter)"
          fontWeight={500}
          fontSize={"20px"}
          mb={"12px"}
        >
          {step.title}
        </Text>
        <Text fontFamily="var(--font-inter)" lineHeight={"120%"}>
          {step.description}
        </Text>
      </Box>
    </motion.div>
  )
);

ClickableStep.displayName = "ClickableStep";

// --- Main Component ---

export default function HowItWorks() {
  // State for click-to-activate functionality
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const currentImage = useMemo(
    () => STEP_IMAGES[activeStepIndex],
    [activeStepIndex]
  );

  // Commented out progressive rendering logic
  // const containerRef = useRef(null);
  // const stickyContentRef = useRef(null);
  // const [isLastStepComplete, setIsLastStepComplete] = useState(false);

  // const { ref: inViewRef, inView } = useInView({ threshold: 0.1 });

  // const {
  //   renderStep,
  //   isMobile,
  //   activeStep,
  //   nonActiveSteps,
  //   activeStepIndex,
  //   progress,
  //   isRunning,
  // } = useRenderSteps(HOW_IT_WORKS_STEPS, inView);

  // useEffect(() => {
  //   let timeoutId: ReturnType<typeof setTimeout>;

  //   const completedNow =
  //     activeStepIndex === HOW_IT_WORKS_STEPS.length - 1 && progress >= 100;

  //   if (completedNow) {
  //     timeoutId = setTimeout(() => {
  //       setIsLastStepComplete(true);
  //     }, 1000);
  //   } else {
  //     setIsLastStepComplete(false);
  //   }

  //   return () => clearTimeout(timeoutId);
  // }, [activeStepIndex, progress]);

  // const { isSticky } = useStickyScroll({
  //   containerRef,
  //   contentRef: stickyContentRef,
  //   isEnabled: isRunning,
  //   isLastStepCompleted: isLastStepComplete,
  // });

  return (
    <motion.div
      id="how-it-works"
      style={{
        marginTop: "60px",
        paddingLeft: "16px",
        paddingRight: "16px",
        width: "100%",
        position: "relative",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      {/* Commented out sticky scroll elements */}
      {/* <div
        ref={inViewRef}
        style={{
          position: 'absolute',
          top: '20vh',
          height: '60vh',
        }}
      /> */}

      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "0.75rem",
          padding: "1rem",
        }}
      >
        {/* Commented out sticky animations */}
        {/* <AnimatePresence>
          {isSticky && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: [0.7, 1, 0.7],
                scaleX: [0, 1, 1],
                backgroundColor: [
                  'rgba(34, 197, 94, 1)',
                  'rgba(22, 163, 74, 1)',
                  'rgba(34, 197, 94, 1)',
                ],
              }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{
                opacity: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
                backgroundColor: {
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut',
                },
                scaleX: { duration: 0.3, ease: 'easeOut' },
              }}
              style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '4px',
                borderRadius: '9999px',
                transformOrigin: 'center',
              }}
            />
          )}
        </AnimatePresence> */}

        {/* Commented out pulsing border animation */}
        {/* <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
          }}
          animate={
            isSticky
              ? {
                  borderColor: [
                    'rgba(229, 231, 235, 1)',
                    'rgba(134, 239, 172, 1)',
                    'rgba(229, 231, 235, 1)',
                  ],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          initial={{
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'transparent',
          }}
        /> */}

        <Header />

        {/* Original progressive rendering container - kept but non-functional */}
        <div
          style={{
            position: "absolute",
            top: "20vh",
            height: "60vh",
            opacity: 0,
            pointerEvents: "none",
          }}
        />

        {/* Simple side-by-side layout exactly like your screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <Box
            display="flex"
            flexDirection={{ base: "column", lg: "row" }}
            gap={{ base: 8, lg: 20 }}
            alignItems="flex-start"
            w="full"
          >
            {/* Steps List - left side on desktop, top on mobile */}
            <VStack
              spacing={4}
              align="stretch"
              flex={{ base: "none", lg: "1" }}
              w={{ base: "full", lg: "50%" }}
              minW="0"
              mb={{ base: 8, lg: 0 }}
            >
              {HOW_IT_WORKS_STEPS.map((step, index) => (
                <ClickableStep
                  key={step.id}
                  step={step}
                  isActive={index === activeStepIndex}
                  onClick={() => setActiveStepIndex(index)}
                />
              ))}
            </VStack>

            {/* Image - right side on desktop, bottom on mobile */}
            <Box
              flex={{ base: "none", lg: "1" }}
              w={{ base: "full", lg: "50%" }}
              minW="0"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <StepImage src={currentImage.src} alt={currentImage.alt} />
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>
        </motion.div>

        {/* Original progressive layout - commented out */}
        {/* <StepsLayout
          renderStep={renderStep}
          activeStep={activeStep}
          nonActiveSteps={nonActiveSteps}
          currentImageSrc={currentImage.src}
          currentImageAlt={currentImage.alt}
          isMobile={isMobile as boolean}
        /> */}
      </div>
    </motion.div>
  );
}

// TODO: Implement GSAP scroll-triggered animations
// - Use ScrollTrigger to animate steps as they come into view
// - Consider parallax effects for images
// - Add smooth transitions between steps based on scroll position
// - Maintain responsive behavior for mobile/desktop
