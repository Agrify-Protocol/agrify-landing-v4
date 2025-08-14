import {
  Tooltip as ChakraTooltip,
  Portal,
  TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react';
import * as React from 'react';

export interface TooltipProps extends Omit<ChakraTooltipProps, 'children'> {
  showArrow?: boolean;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  content: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props) {
    const {
      showArrow = true,
      children,
      disabled,
      portalled = true,
      content,
      portalRef,
      ...rest
    } = props;

    if (disabled) return <>{children}</>;

    const tooltipContent = (
      <ChakraTooltip label={content} hasArrow={showArrow} {...rest}>
        {children}
      </ChakraTooltip>
    );

    if (portalled && portalRef) {
      return <Portal containerRef={portalRef}>{tooltipContent}</Portal>;
    }

    if (portalled) {
      return <Portal>{tooltipContent}</Portal>;
    }

    return tooltipContent;
  }
);
