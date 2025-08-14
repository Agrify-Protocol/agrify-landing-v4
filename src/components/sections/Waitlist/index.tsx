"use client";

import { pangaia, suisse } from "@/fonts";
import { Box, Stack, Text } from "@chakra-ui/react";
import CustomButton from "@/components/common/CustomButton";
import CustomInput from "@/components/common/CustomInput";
import CountryModal from "./CountryModal";
import useWaitlistLogic from "./controller/useWaitlistLogic";
import close from "../../../../public/icons/hamburger-close.svg";
import Image from "next/image";

const Waitlist = () => {
  const {
    isInputInvalid,
    userDetails,
    setIsInputInvalid,
    handleInputOnchange,
    setOpenCountryModal,
    selectedCountry,
    isLoading,
    joinWaitList,
    openCountryModal,
    setSelectedCountry,
    farmLocationModalOpen,
    setFarmLocationModalOpen,
    selectedFarmLocation,
    setSelectedFarmLocation,
    checkIfBtnDisabled,
  } = useWaitlistLogic();

  return (
    <Box
      my={{ base: "80px", lg: "200px" }}
      as="form"
      maxW="558px"
      mx="auto"
      px={{ base: "11px", lg: 0 }}
    >
      <Text
        as="h3"
        fontWeight="200"
        fontSize={{ base: "24px", lg: "40px" }}
        fontFamily={pangaia.style.fontFamily}
        textAlign="center"
      >
        Join the Waitlist
      </Text>
      <Stack my={{ base: 6, lg: 10 }} spacing={4}>
        <CustomInput
          value={userDetails.full_name}
          label="Full Name"
          id="full_name"
          placeholder="Enter Name"
          isInvalid={isInputInvalid.full_name}
          errorMessage="Full name must be at least 4 characters long and may not contain numbers."
          setIsInputInvalid={setIsInputInvalid}
          onChange={(e) => {
            handleInputOnchange(e);
          }}
          isLoading={isLoading}
        />
        <CustomInput
          value={userDetails.email}
          label="Email Address"
          id="email"
          type="email"
          placeholder="Enter email address"
          isInvalid={isInputInvalid.email}
          errorMessage="Email address must be valid."
          onChange={(e) => handleInputOnchange(e)}
          setIsInputInvalid={setIsInputInvalid}
          isLoading={isLoading}
        />
        <CustomInput
          value={userDetails.phone_number}
          label="Phone Number"
          id="phone_number"
          type="tel"
          placeholder="Enter phone number"
          onChange={(e) => handleInputOnchange(e)}
          isInvalid={isInputInvalid.phone_number}
          errorMessage="Phone number must have at least 6 digits, containing only numbers."
          setOpenCountryModal={setOpenCountryModal}
          setIsInputInvalid={setIsInputInvalid}
          selectedCountry={selectedCountry}
          isLoading={isLoading}
        />
        <Box
          onClick={() => (isLoading ? null : setFarmLocationModalOpen(true))}
          cursor={isLoading ? "not-allowed" : "pointer"}
        >
          <Text mb={2}>Farm Location</Text>
          <Box
            bgColor="white"
            display="flex"
            alignItems="center"
            boxSizing="border-box"
            justifyContent="space-between"
            rounded="16px"
            border="1px solid #E2E8F0"
            transition="all 0.1s ease-in-out"
            _hover={{
              border: "1px solid #C8C8C8",
            }}
            padding={3}
          >
            <Text
              fontSize="14px"
              color={
                selectedFarmLocation.name.common ? "black" : "brand.darkGrey"
              }
            >
              {selectedFarmLocation.name.common
                ? selectedFarmLocation.name.common
                : "Select your farm location"}
            </Text>
            {selectedFarmLocation.name.common ? (
              <Box
                maxW="20px"
                onClick={(e) => {
                  e.stopPropagation();
                  isLoading
                    ? null
                    : setSelectedFarmLocation({
                        name: {
                          common: "",
                        },
                      });
                }}
              >
                <Image src={close} alt="close icon" />
              </Box>
            ) : null}
          </Box>
        </Box>
        <CustomInput
          label="Farm size (In Hectares)"
          id="farm_size"
          placeholder="Enter Farm size"
          value={userDetails.farm_size}
          isInvalid={isInputInvalid.farm_size}
          errorMessage="Farm size must contain numbers only."
          onChange={(e) => handleInputOnchange(e)}
          setIsInputInvalid={setIsInputInvalid}
          isLoading={isLoading}
        />
      </Stack>
      <CustomButton
        text="Join the Waitlist"
        variant="solid"
        isDisabled={checkIfBtnDisabled()}
        w="100%"
        fontSize="16px"
        isLoading={isLoading}
        fontWeight={{ base: "400", lg: "500" }}
        letterSpacing={{ base: "0.2%", lg: "-2%" }}
        fontFamily={suisse.style.fontFamily}
        onClick={(e: any) => {
          e.preventDefault();
          joinWaitList();
        }}
      />
      <CountryModal
        isOpen={openCountryModal}
        onClose={() => setOpenCountryModal(false)}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        title="Select a country"
        name="country_code"
      />
      <CountryModal
        isOpen={farmLocationModalOpen}
        onClose={() => setFarmLocationModalOpen(false)}
        selectedCountry={selectedFarmLocation}
        setSelectedCountry={setSelectedFarmLocation}
        title="Select your farm location"
        name="farm_location"
      />
    </Box>
  );
};

export default Waitlist;
