'use client';

import { useState, useEffect, RefObject } from 'react';

interface StickyScrollOptions {
  containerRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  isEnabled: boolean;
  isLastStepCompleted: boolean;
}

interface StickyScrollReturn {
  isSticky: boolean;
  shouldAnimate: boolean;
}

export function useStickyScroll({
  containerRef,
  contentRef,
  isEnabled,
  isLastStepCompleted,
}: StickyScrollOptions): StickyScrollReturn {
  const [isSticky, setIsSticky] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Effect for IntersectionObserver to detect sticky state
  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !isEnabled) return;

    const container = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const { boundingClientRect, rootBounds } = entry;

        const viewportHeight = rootBounds?.height || window.innerHeight;
        const { top, bottom, height } = boundingClientRect;

        // Consider the element entering when its top is within the top 20% of viewport
        const isEntering = top < viewportHeight * 0.2 && bottom > 0;

        // Consider the element sticking when top has scrolled past the top and bottom is still in view
        const isSticking =
          top <= 0 && bottom >= Math.min(height, viewportHeight * 0.2);

        if (!isLastStepCompleted) {
          setShouldAnimate(isEntering);
          setIsSticky(isSticking);
        } else {
          setShouldAnimate(false);
          setIsSticky(false);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.8, 1.0],
        rootMargin: '0px',
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, contentRef, isEnabled, isLastStepCompleted]);

  // Effect for locking page scroll when content is sticky
  useEffect(() => {
    if (!isSticky || !isLastStepCompleted) return;

    const originalScrollBehavior =
      document.documentElement.style.scrollBehavior;
    const scrollPosition = window.pageYOffset;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    document.documentElement.style.scrollBehavior = 'auto';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
      window.scrollTo(0, scrollPosition);
    };
  }, [isSticky, isLastStepCompleted]);

  // Effect for managing container height to prevent layout jumps
  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content || !isEnabled) {
      if (container) container.style.minHeight = 'auto';
      return;
    }

    const updateHeight = () => {
      const contentHeight = content.offsetHeight || 0;
      const minScrollHeight = window.innerHeight * 2;
      container.style.minHeight = `${Math.max(
        contentHeight,
        minScrollHeight
      )}px`;
    };

    if (isSticky) {
      updateHeight();
      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(content);
      return () => resizeObserver.disconnect();
    } else {
      container.style.minHeight = 'auto';
    }
  }, [isSticky, isEnabled, containerRef, contentRef]);

  useEffect(() => {
    if (!isSticky) {
      // Reset any scroll lock styles on body when sticky is removed or progress completed
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.documentElement.style.scrollBehavior = '';
      return;
    }

    const preventScroll = (e: WheelEvent | TouchEvent) => {
      e.preventDefault();
    };

    const preventKeyboardScroll = (e: KeyboardEvent) => {
      const scrollKeys = [
        'ArrowUp',
        'ArrowDown',
        'PageUp',
        'PageDown',
        'Home',
        'End',
        ' ',
      ];
      if (scrollKeys.includes(e.key)) {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('keydown', preventKeyboardScroll);

    const originalScrollBehavior =
      document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    const scrollPosition = window.pageYOffset;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';

    return () => {
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('keydown', preventKeyboardScroll);

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
      window.scrollTo(0, scrollPosition);
    };
  }, [isSticky]);

  return { isSticky, shouldAnimate };
}
