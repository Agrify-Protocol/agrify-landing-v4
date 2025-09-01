

"use client";

import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import dltScience from "../../../../public/partners/DLT.png";
import nasa from "../../../../public/partners/Nasa.png";
import hbar from "../../../../public/partners/HBAR.png";
import esa from "../../../../public/partners/ESA.png";
import fundIt from "../../../../public/partners/FIF.png";
import parisBlockchainWeek from "../../../../public/partners/Paris-blockchain.png";
import xrpLedger from "../../../../public/partners/XRP-Ledger.png";
import gemma from "../../../../public/partners/Gemma.png";
import mercyCorps from "../../../../public/partners/Mercy-Corps.png";
import xCommons from "../../../../public/partners/XRPL-Commons.png";
import "../../animation.css";


const collaborators = [
  {
    name: "dlt science foundation",
    icon: dltScience,
    active_icon: null,
  },
  {
    name: "nasa",
    icon: nasa,
    active_icon: null,
  },
  {
    name: "the hbar foundation",
    icon: hbar,
    active_icon: null,
  },
  {
    name: "paris blockchain week",
    icon: parisBlockchainWeek,
    active_icon: null,
  },

  {
    name: "gemma",
    icon: gemma,
    active_icon: null,
  },
   {
    name: "mercy corps",
    icon: mercyCorps,
    active_icon: null,
  },
  {
    name: "x commons",
    icon: xCommons,
    active_icon: null,
  },
  {
    name: "european space agency",
    icon: esa,
    active_icon: null,
  },
  {
    name: "xrp ledger",
    icon: xrpLedger,
    active_icon: null,
  },
  {
    name: "fund it forward",
    icon: fundIt,
    active_icon: null,
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
    <Box mt={{ base: "88px", lg: "120px" }} id="climate-change">
      
      <Text
        fontSize="18px"
        lineHeight="140%"
        fontWeight="normal"
        textAlign="center"
        fontFamily="var(--font-inter)"
        color="#565656"
        mb={4}
      >
        In Collaboration With
      </Text>
      <Box
        padding={2}
        bgColor="white"
        overflow="hidden"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          className="animate-marquee"
          alignItems="center"
          gap={{ base: 6, lg: 8 }}
        >
          {Array.from({ length: 10 }, () => collaborators)
            .flat()
            .map((item, index) => (
              <Box
                key={index}
                // onMouseEnter={() => setCurrentItem(item.name)}
                // onMouseLeave={() => setCurrentItem('')}
                onMouseEnter={() => console.log(item.name)}
                onMouseLeave={() => console.log("leave")}
                flexShrink={0}
                transitionDelay="0.1s"
                transitionProperty="opacity"
                // _hover={{ opacity: 0.8 }}
                filter="grayscale(100%)"
            
              >
                <Image
                  src={item.icon}
                  alt={`${item.name} icon`}
                  
                  
                />
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Partners;
