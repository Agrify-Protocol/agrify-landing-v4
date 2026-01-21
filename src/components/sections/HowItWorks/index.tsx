"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, VStack, Text, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
// import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollToPlugin, ScrollTrigger);

interface Step {
  id: string;
  title: string;
  description: string;
}

// --- Data (Colocated and improved structure) ---
const HOW_IT_WORKS_STEPS: Step[] = [
  {
    id: "01",
    title: "Create your Profile",
    description:
      "Tell us about your farm, crops, and location. This unlocks your Agrify Score.",
  },
  {
    id: "02",
    title: "Follow AI-Guided Tasks",
    description:
      "Use our AI assistant to improve traceability and build a verifiable season record.",
  },
  {
    id: "03",
    title: "Generate Your Produce Passport",
    description:
      "Your farming data is turned into a digital Produce Passport buyers can trust.",
  },
  {
    id: "04",
    title: "Sell on Our Marketplace",
    description:
     "Get connected to buyers around the world and receive secure payment once they purchase.",
  },
];

const STEP_IMAGES = [
  {
    id: "01",
    src: "/images/step-one.webp",
    alt: "Create your Profile",
  },
  {
    id: "02",
    src: "/images/step-two.webp",
    alt: "Follow AI-Guided Tasks",
  },
  {
    id: "03",
    src: "/images/trace-certificate.webp",
    alt: "Generate Your Produce Passport",
  },
  {
    id: "04",
    src: "/images/step-four.webp",
    alt: "Sell Through Our Marketplace",
  },
];

// --- Memoized Presentational Components ---

const Header: React.FC = React.memo(() => (
  <Box mb={8}>
    <Box w="fit-content" mb={4}></Box>
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
    isDesktop,
    onClick,
  }: {
    step: Step;
    isActive: boolean;
    isDesktop?: boolean;
    onClick: () => void;
  }) => (
    <motion.div
      onClick={onClick}
      style={{ cursor: "pointer" }}
      whileHover={{ x: 2 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        id="step"
        opacity={isActive ? "100%" : "40%"}
        bg={isActive ? "white" : "transparent"}
        borderRadius="16px"
        p={4}
        transition="background-color 0.2s ease, box-shadow 0.2s ease"
        boxShadow={isActive ? "sm" : "none"}
      >
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
        {!!isDesktop && (
          <Box
            bg="gray.300"
            borderRadius="full"
            h="4px"
            mt={3}
            opacity={isActive ? "100%" : "0%"}
          >
            <Box
              bg="brand.green"
              borderRadius="full"
              h="full"
              id={`progress-bar-${step.id}`}
              w={0}
            />
          </Box>
        )}
      </Box>
    </motion.div>
  )
);

ClickableStep.displayName = "ClickableStep";

// --- Main Component ---

export default function HowItWorks() {
  // State for click-to-activate functionality
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const lastStepRef = useRef(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const currentImage = useMemo(
    () => STEP_IMAGES[activeStepIndex],
    [activeStepIndex]
  );

  const container = useRef(null);

  // Track viewport to disable animations on small screens
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      // Disable GSAP ScrollTrigger and progress fill on small screens
      if (!isDesktop) {
        const existing = ScrollTrigger.getById("how-it-works");
        if (existing) existing.kill();
        return;
      }

      const tl = gsap.timeline({
        id: "how-it-works",
        scrollTrigger: {
          trigger: container.current,
          start: "top 10%",
          end: "+=" + HOW_IT_WORKS_STEPS.length * 1800, // 1800px scroll per step
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            const progressPerStep = 1 / HOW_IT_WORKS_STEPS.length;
            const currentStep = Math.min(
              HOW_IT_WORKS_STEPS.length - 1,
              Math.floor(self.progress / progressPerStep)
            );
            if (currentStep !== lastStepRef.current) {
              lastStepRef.current = currentStep;
              setActiveStepIndex(currentStep);
            }
          },
        },
      });
      HOW_IT_WORKS_STEPS.forEach((step, i) => {
        // Animate progress bar filling for this step
        tl.to(`#progress-bar-${step.id}`, { width: "100%" }, i);
      });
    },
    { scope: container, dependencies: [isDesktop] }
  );

  const handleClickStep = (index: number) => {
    setActiveStepIndex(index);

    // Desktop-only: Scroll to correct step position
    if (isDesktop) {
      const scrollTrigger = ScrollTrigger.getById("how-it-works");
      if (scrollTrigger) {
        const totalScroll = scrollTrigger.end - scrollTrigger.start;
        const stepSize = totalScroll / HOW_IT_WORKS_STEPS.length;
        const target = scrollTrigger.start + stepSize * index;
        gsap.to(window, {
          duration: 0,
          scrollTo: target,
        });
      }
    }
  };

  return (
    <motion.div
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
      <div
        ref={container}
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          // backgroundColor: "white",
          borderRadius: "0.75rem",
          padding: "1rem",
        }}
      >
        {/* Mobile: show image above heading */}
        <Box display={{ base: "block", lg: "none" }} mb={4}>
          <StepImage src={currentImage.src} alt={currentImage.alt} />
        </Box>
        <Header />

        <div
          style={{
            position: "absolute",
            top: "20vh",
            height: "60vh",
            opacity: 0,
            pointerEvents: "none",
          }}
        />

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
              order={{ base: 1, lg: 0 }}
            >
              {HOW_IT_WORKS_STEPS.map((step, index) => (
                <ClickableStep
                  key={step.id}
                  step={step}
                  isActive={index === activeStepIndex}
                  isDesktop={isDesktop}
                  onClick={() => handleClickStep(index)}
                />
              ))}
            </VStack>

            {/* Image - right side on desktop, bottom on mobile */}
            <Box
              flex={{ base: "none", lg: "1" }}
              w={{ base: "full", lg: "50%" }}
              minW="0"
              order={{ base: 0, lg: 1 }}
              display={{ base: "none", lg: "block" }}
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
      </div>
    </motion.div>
  );
}
