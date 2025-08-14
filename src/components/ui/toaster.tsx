// "use client"

// import {
//   Toaster as ChakraToaster,
//   Portal,
//   Spinner,
//   Stack,
//   Toast,
//   createToaster,
// } from "@chakra-ui/react"

// export const toaster = createToaster({
//   placement: "bottom-end",
//   pauseOnPageIdle: true,
// })

// export const Toaster = () => {
//   return (
//     <Portal>
//       <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
//         {(toast) => (
//           <Toast.Root width={{ md: "sm" }}>
//             {toast.type === "loading" ? (
//               <Spinner size="sm" color="blue.solid" />
//             ) : (
//               <Toast.Indicator />
//             )}
//             <Stack gap="1" flex="1" maxWidth="100%">
//               {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
//               {toast.description && (
//                 <Toast.Description>{toast.description}</Toast.Description>
//               )}
//             </Stack>
//             {toast.action && (
//               <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
//             )}
//             {toast.closable && <Toast.CloseTrigger />}
//           </Toast.Root>
//         )}
//       </ChakraToaster>
//     </Portal>
//   )
// }

'use client';

import {
  useToast,
  Portal,
  Spinner,
  Stack,
  Box,
  Text,
  Button,
  CloseButton,
} from '@chakra-ui/react';
import { useCallback } from 'react';

export const Toaster = () => {
  const toast = useToast();

  // Show toast handler
  const showCustomToast = useCallback(
    ({
      type = 'success',
      title,
      description,
      actionLabel,
      onAction,
    }: {
      type?: 'success' | 'error' | 'warning' | 'info' | 'loading';
      title?: string;
      description?: string;
      actionLabel?: string;
      onAction?: () => void;
    }) => {
      toast({
        duration: type === 'loading' ? null : 5000,
        isClosable: true,
        render: ({ onClose }) => (
          <Box
            display="flex"
            alignItems="center"
            bg="white"
            boxShadow="lg"
            borderRadius="md"
            p={3}
            maxW={{ md: 'sm' }}
          >
            {type === 'loading' ? (
              <Spinner size="sm" color="blue.500" mr={3} />
            ) : (
              <Box
                w={2}
                h={2}
                borderRadius="full"
                bg={
                  type === 'success'
                    ? 'green.400'
                    : type === 'error'
                    ? 'red.400'
                    : type === 'warning'
                    ? 'yellow.400'
                    : 'blue.400'
                }
                mr={3}
              />
            )}
            <Stack spacing={1} flex="1" maxW="100%">
              {title && (
                <Text fontWeight="bold" fontSize="sm">
                  {title}
                </Text>
              )}
              {description && (
                <Text fontSize="sm" noOfLines={2}>
                  {description}
                </Text>
              )}
            </Stack>
            {actionLabel && onAction && (
              <Button
                size="sm"
                variant="outline"
                ml={3}
                onClick={() => {
                  onAction();
                  onClose();
                }}
              >
                {actionLabel}
              </Button>
            )}
            <CloseButton ml={2} onClick={onClose} />
          </Box>
        ),
      });
    },
    [toast]
  );

  return (
    <Portal>
      {/* Example triggers */}
      <Button
        onClick={() =>
          showCustomToast({
            type: 'loading',
            title: 'Loading',
            description: 'Please wait...',
          })
        }
        mr={2}
      >
        Show Loading Toast
      </Button>

      <Button
        onClick={() =>
          showCustomToast({
            type: 'success',
            title: 'Success',
            description: 'Your request completed successfully.',
            actionLabel: 'Undo',
            onAction: () => alert('Action clicked!'),
          })
        }
      >
        Show Success Toast
      </Button>
    </Portal>
  );
};
