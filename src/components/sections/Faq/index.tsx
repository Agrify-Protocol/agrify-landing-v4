'use client';

import { pangaia, suisse } from '@/fonts';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';
import plusIcon from '../../../../public/icons/add.svg';
import minusIcon from '../../../../public/icons/minus.svg';
import Image from 'next/image';
import questions from './mock.json';
import DashedText from '@/components/common/DashedText';

const Faq = () => {
  return (
    <Box
      rounded={{ base: '16px', lg: '24px' }}
      // bgColor={'#FFFFFF'}
      px={{ base: '16px', lg: '60px' }}
      py={{ base: '16px', lg: '32px' }}
      mx={{ base: 4, lg: 8 }}
      mb={{ base: '40px', lg: '80px' }}
    >
      <Box w={'fit-content'}>
        <DashedText text="Support" />
      </Box>
      <Box
        display="flex"
        flexDir={{ base: 'column', lg: 'row' }}
        gap={{ base: 10, lg: 0 }}
        justifyContent="space-between"
      >
        <Box>
          <Text
            fontFamily={pangaia.style.fontFamily}
            fontWeight="200"
            fontSize={{ base: '32px', lg: '48px' }}
            letterSpacing="-0.6%"
          >
            FAQ
          </Text>
        </Box>
        <Box width={{ base: '100%', lg: '630px' }}>
          <Accordion allowMultiple>
            {questions.map((item, index) => (
              <AccordionItem
                key={item.title}
                border="none"
                borderBottom="1px dashed #0F0F0F26"
                mb={index !== questions.length - 1 ? 8 : 0}
                width="100%"
              >
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      _hover={{ backgroundColor: 'transparent' }}
                      display="flex"
                      gap={4}
                      px={{ base: 0, lg: 4 }}
                    >
                      {isExpanded ? (
                        <Image
                          src={minusIcon}
                          alt="minus icon to close accordion"
                        />
                      ) : (
                        <Image
                          src={plusIcon}
                          alt="plus icon to expand accordion"
                        />
                      )}
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontFamily={suisse.style.fontFamily}
                        fontWeight="300"
                        fontSize={{ base: '16px', lg: '18px' }}
                        letterSpacing="-2%"
                      >
                        {item.title}
                      </Box>
                    </AccordionButton>
                    <AccordionPanel
                      pb={4}
                      fontSize={{ base: '16px', lg: '18px' }}
                    >
                      {item.answer}
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};

export default Faq;
