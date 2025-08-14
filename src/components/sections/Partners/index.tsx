'use client';

import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import dltScience from '../../../../public/icons/collaborators/dlt.png';
import nasa from '../../../../public/icons/collaborators/nasa.png';
import hbar from '../../../../public/icons/collaborators/HBAR_Logo.png';
import esa from '../../../../public/icons/collaborators/esa.png';
import fundIt from '../../../../public/icons/collaborators/fund_forward.png';
import fundItActive from '../../../../public/icons/collaborators/fund-it-active.svg';
import parisBlockchainWeek from '../../../../public/icons/collaborators/paris.png';
import xrpLedger from '../../../../public/icons/collaborators/xrp.png';
import gemma from '../../../../public/icons/collaborators/gemma.png';
import mercyCorps from '../../../../public/icons/collaborators/mercy_corps.png';
import xCommons from '../../../../public/icons/collaborators/commons.png';
import '../../animation.css';
import DashedText from '@/components/common/DashedText';

const collaborators = [
  {
    name: 'dlt science foundation',
    icon: dltScience,
    active_icon: null,
  },
  {
    name: 'nasa',
    icon: nasa,
    active_icon: null,
  },
  {
    name: 'the hbar foundation',
    icon: hbar,
    active_icon: null,
  },
  {
    name: 'paris blockchain week',
    icon: parisBlockchainWeek,
    active_icon: null,
  },

  {
    name: 'gemma',
    icon: gemma,
    active_icon: null,
  },
  {
    name: 'mercy corps',
    icon: mercyCorps,
    active_icon: null,
  },
  {
    name: 'x commons',
    icon: xCommons,
    active_icon: null,
  },
  {
    name: 'european space agency',
    icon: esa,
    active_icon: null,
  },
  {
    name: 'xrp ledger',
    icon: xrpLedger,
    active_icon: null,
  },
  {
    name: 'fund it forward',
    icon: fundIt,
    active_icon: fundItActive,
  },
];

const Partners = () => {
  // const [currentItem, setCurrentItem] = useState('');

  // const getCurrentDisplayIcon = (item: {
  //   name: string;
  //   icon: string;
  //   active_icon: string;
  // }) => {
  //   if (currentItem === item.name) {
  //     if (item.active_icon !== null) {
  //       return item.icon;
  //       // return item.active_icon;
  //     } else {
  //       return item.icon;
  //     }
  //   } else {
  //     return item.icon;
  //   }
  // };

  return (
    <Box mt={{ base: '88px', lg: '120px' }} id="climate-change">
      <DashedText text="Partners" />
      <Box
        padding={2}
        // rounded={{ base: "64px", lg: "32px" }}
        bgColor="white"
        overflow="hidden"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          className="animate-marquee"
          alignItems="center"
          gap={{ base: 0, lg: 8 }}
        >
          {Array.from({ length: 10 }, () => collaborators)
            .flat()
            .map((item, index) => (
              <Box
                key={index}
                // onMouseEnter={() => setCurrentItem(item.name)}
                // onMouseLeave={() => setCurrentItem('')}
                onMouseEnter={() => console.log(item.name)}
                onMouseLeave={() => console.log('leave')}
                flexShrink={0}
                transitionDelay="0.1s"
                transitionProperty="opacity"
                _hover={{ opacity: 0.8 }}
                filter="grayscale(100%)"
                //  filter="brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(150%) contrast(100%)"
              >
                <Image
                  src={item.icon}
                  alt={`${item.name} icon`}
                  className="color-gray"
                  style={{ filter: 'grayscale(100%)' }}
                />
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Partners;
