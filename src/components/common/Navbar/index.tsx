// "use client";

// import {
//   Box,
//   List,
//   ListItem,
//   Text,
//   Button,
//   Drawer,
//   DrawerBody,
//   DrawerContent,
// } from "@chakra-ui/react";
// import Image from "next/image";
// import logo from "../../../../public/icons/logo.svg";
// import hamburger from "../../../../public/icons/hamburger.svg";
// import hamburgerClose from "../../../../public/icons/hamburger-close.svg";
// import Link from "next/link";
// import { useState } from "react";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);
//   const handleClose = () => {
//     setIsClosing(true);
//     setTimeout(() => {
//       setIsMenuOpen(false);
//       setIsClosing(false);
//     }, 300);
//   };

//   return (
//     <>
//       <>
//         {/* Desktop Navbar */}
//         <Box
//           px={16}
//           fontFamily={"body"}
//           display={{ base: "none", lg: "flex" }}
//           alignItems="center"
//           justifyContent="space-between"
//           paddingTop={10}
//           paddingBottom={4}
//           position="sticky"
//           top={0}
//           background="rgba(245, 245, 247, 0.1)"
//           backdropFilter="blur(12px)"
//           zIndex={10}
//         >
//           <Link
//             href="/"
//             style={{ outline: "none", display: "block", width: "fit-content" }}
//           >
//             <Image src={logo} alt="Agrify logo " />
//           </Link>
//           <Box>
//             <List mx={"0"} display="flex" gap={4}>
//                      <ListItem
//                   _hover={{
//                     textColor: "brand.green",
//                   }}
//                   cursor="pointer"
//                   onClick={() => {
//                     const howItWorksSection =
//                       document.querySelector("#how-it-works");
//                     if (howItWorksSection) {
//                       howItWorksSection.scrollIntoView({
//                         behavior: "smooth",
//                         block: "start",
//                       });
//                     }
//                   }}
//                 >
//                   <Text>Features</Text>
//                 </ListItem>
//               <ListItem
//                 _hover={{
//                   textColor: "brand.green",
//                 }}
//                 cursor="pointer"
//                 as="a"
//                 href="https://marketplace.agrifyafrica.xyz/projects"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Text>Marketplace</Text>
//               </ListItem>
//             </List>
//           </Box>
//           <Button
//             variant="outline"
//             style={{
//               padding: "12px 24px",
//               borderRadius: "32px",
//               fontWeight: "normal",
//             }}
//               onClick={() => {
//                     const joinSection =
//                       document.querySelector("#join-waitlist");
//                     if (joinSection) {
//                       joinSection.scrollIntoView({
//                         behavior: "smooth",
//                         block: "start",
//                       });
//                     }
//                   }}
//           >
//             Talk to Us
//           </Button>
//         </Box>

//         {/* Mobile Navbar */}
//         <Box
//           px={4}
//           pt={6}
//           pb={4}
//           display={{ base: "flex", lg: "none" }}
//           justifyContent="space-between"
//           position="sticky"
//           top={0}
//           background="rgba(245, 245, 247, 0.1)"
//           backdropFilter="blur(12px)"
//           zIndex={10}
//         >
//           <Link
//             href="/"
//             style={{ outline: "none", display: "block", width: "fit-content" }}
//           >
//             <Image src={logo} alt="Agrify logo " />
//           </Link>
//           <Box py={2} onClick={() => setIsMenuOpen(true)}>
//             <Image src={hamburger} alt="hamburger menu icon" />
//           </Box>
//         </Box>

//         {/* Drawer */}
//         <Drawer
//           isOpen={isMenuOpen}
//           onClose={handleClose}
//           size="full"
//           isFullHeight
//           placement="top"
//         >
//           <DrawerContent
//             className={`drawer-content ${isClosing ? "closing" : ""}`}
//             boxShadow="none"
//           >
//             <DrawerBody px={4} pt={6} pb={4}>
//               <Box
//                 justifyContent="space-between"
//                 alignItems="center"
//                 display="flex"
//                 mb="56px"
//               >
//                 <Box>
//                   <Link
//                     href="/"
//                     style={{
//                       width: "91.81px",
//                       outline: "none",
//                       display: "block",
//                     }}
//                   >
//                     <Image src={logo} alt="agrify logo icon" />
//                   </Link>
//                 </Box>
//                 <Box py={2} onClick={handleClose}>
//                   <Image src={hamburgerClose} alt="close hamburger menu icon" />
//                 </Box>
//               </Box>
//               <List mx={"0"} display="flex" gap={4} flexDirection="column">
//                 <ListItem
//                   _hover={{
//                     textColor: "brand.green",
//                   }}
//                   cursor="pointer"
//                   onClick={() => {
//                     const howItWorksSection =
//                       document.querySelector("#how-it-works");
//                     if (howItWorksSection) {
//                       howItWorksSection.scrollIntoView({
//                         behavior: "smooth",
//                         block: "start",
//                       });
//                     }
//                   }}
//                 >
//                   <Text>Features</Text>
//                 </ListItem>
//                 <ListItem
//                   as="a"
//                   href="https://marketplace.agrifyafrica.xyz/projects"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Text>Marketplace</Text>
//                 </ListItem>
//                 <Button
//                   variant="outline"
//                   style={{
//                     padding: "12px 24px",
//                     borderRadius: "32px",
//                     fontWeight: "normal",
//                   }}
//                      onClick={() => {
//                     const joinSection =
//                       document.querySelector("#join-waitlist");
//                     if (joinSection) {
//                       joinSection.scrollIntoView({
//                         behavior: "smooth",
//                         block: "start",
//                       });
//                     }
//                   }}
//                 >
//                   Talk to Us
//                 </Button>
//               </List>
//             </DrawerBody>
//           </DrawerContent>
//         </Drawer>
//       </>
//     </>
//   );
// };

// export default Navbar;


"use client";

import {
  Box,
  List,
  ListItem,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
} from "@chakra-ui/react";
import Image from "next/image";
import logo from "../../../../public/icons/logo.svg";
import hamburger from "../../../../public/icons/hamburger.svg";
import hamburgerClose from "../../../../public/icons/hamburger-close.svg";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleMobileNavClick = (sectionId: string) => {
    // Close the drawer first
    handleClose();
    // Wait for drawer to close, then scroll
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 350); // Slightly longer than the drawer close animation
  };

  return (
    <>
      <>
        {/* Desktop Navbar */}
        <Box
          px={16}
          fontFamily={"body"}
          display={{ base: "none", lg: "flex" }}
          alignItems="center"
          justifyContent="space-between"
          paddingTop={10}
          paddingBottom={4}
          position="sticky"
          top={0}
          background="rgba(245, 245, 247, 0.1)"
          backdropFilter="blur(12px)"
          zIndex={10}
        >
          <Link
            href="/"
            style={{ outline: "none", display: "block", width: "fit-content" }}
          >
            <Image src={logo} alt="Agrify logo " />
          </Link>
          <Box>
            <List mx={"0"} display="flex" gap={4}>
              <ListItem
                _hover={{
                  textColor: "brand.green",
                }}
                cursor="pointer"
                onClick={() => scrollToSection("#how-it-works")}
              >
                <Text>Features</Text>
              </ListItem>
              <ListItem
                _hover={{
                  textColor: "brand.green",
                }}
                cursor="pointer"
                as="a"
                href="https://marketplace.agrifyafrica.xyz/projects"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text>Marketplace</Text>
              </ListItem>
            </List>
          </Box>
          <Button
            variant="outline"
            style={{
              padding: "12px 24px",
              borderRadius: "32px",
              fontWeight: "normal",
            }}
            onClick={() => scrollToSection("#join-waitlist")}
          >
            Talk to Us
          </Button>
        </Box>

        {/* Mobile Navbar */}
        <Box
          px={4}
          pt={6}
          pb={4}
          display={{ base: "flex", lg: "none" }}
          justifyContent="space-between"
          position="sticky"
          top={0}
          background="rgba(245, 245, 247, 0.1)"
          backdropFilter="blur(12px)"
          zIndex={10}
        >
          <Link
            href="/"
            style={{ outline: "none", display: "block", width: "fit-content" }}
          >
            <Image src={logo} alt="Agrify logo " />
          </Link>
          <Box py={2} onClick={() => setIsMenuOpen(true)}>
            <Image src={hamburger} alt="hamburger menu icon" />
          </Box>
        </Box>

        {/* Drawer */}
        <Drawer
          isOpen={isMenuOpen}
          onClose={handleClose}
          size="full"
          isFullHeight
          placement="top"
        >
          <DrawerContent
            className={`drawer-content ${isClosing ? "closing" : ""}`}
            boxShadow="none"
          >
            <DrawerBody px={4} pt={6} pb={4}>
              <Box
                justifyContent="space-between"
                alignItems="center"
                display="flex"
                mb="56px"
              >
                <Box>
                  <Link
                    href="/"
                    style={{
                      width: "91.81px",
                      outline: "none",
                      display: "block",
                    }}
                  >
                    <Image src={logo} alt="agrify logo icon" />
                  </Link>
                </Box>
                <Box py={2} onClick={handleClose}>
                  <Image src={hamburgerClose} alt="close hamburger menu icon" />
                </Box>
              </Box>
              <List mx={"0"} display="flex" gap={4} flexDirection="column">
                <ListItem
                  _hover={{
                    textColor: "brand.green",
                  }}
                  cursor="pointer"
                  onClick={() => handleMobileNavClick("#how-it-works")}
                >
                  <Text>Features</Text>
                </ListItem>
                <ListItem
                  as="a"
                  href="https://marketplace.agrifyafrica.xyz/projects"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text>Marketplace</Text>
                </ListItem>
                <Button
                  variant="outline"
                  style={{
                    padding: "12px 24px",
                    borderRadius: "32px",
                    fontWeight: "normal",
                  }}
                  onClick={() => handleMobileNavClick("#join-waitlist")}
                >
                  Talk to Us
                </Button>
              </List>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
};

export default Navbar;