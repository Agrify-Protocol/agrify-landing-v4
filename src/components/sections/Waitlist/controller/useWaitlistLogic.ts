"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import countryList from "../../../../const/countryList.json";
import getCountryCodeValue from "./getCountryCodeValue";
import {
  validateEmail,
  validateFarmSize,
  validateNameInput,
  validatePhoneNumber,
} from "@/utils/validationSchema";
import { sendGAEvent } from "@next/third-parties/google";
import useApiCall from "@/utils/hooks/useApiCall";

interface UserDetailsProp {
  full_name: string;
  phone_number: string;
  email: string;
  farm_country?: string;
  farm_size: string;
}

const useWaitlistLogic = () => {
  const router = useRouter();
  const { apiCall } = useApiCall();
  const [farmLocationModalOpen, setFarmLocationModalOpen] = useState(false);
  const [selectedFarmLocation, setSelectedFarmLocation] = useState({
    name: {
      common: "",
    },
  });
  const [openCountryModal, setOpenCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryList[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetailsProp>({
    full_name: "",
    phone_number: "",
    email: "",
    farm_country: "",
    farm_size: "",
  });
  const [isInputInvalid, setIsInputInvalid] = useState({
    full_name: false,
    phone_number: false,
    email: false,
    farm_size: false,
  });

  const handleInputOnchange = (e: {
    target: {
      name: string;
      value: string;
    };
  }) => {
    const setIsValidFn = (fn: (e: any) => void) => {
      setIsInputInvalid((prev) => ({
        ...prev,
        [e.target.name]: fn(e.target.value),
      }));
    };
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    switch (e.target.name) {
      case "full_name":
        return setIsValidFn(validateNameInput);
      case "email":
        return setIsValidFn(validateEmail);
      case "phone_number":
        return setIsValidFn(validatePhoneNumber);
      case "farm_size":
        return setIsValidFn(validateFarmSize);
      default:
        break;
    }
  };

  const joinWaitList = () => {
    sendGAEvent("event", "join-waitlist", { value: "join" });

    const userNumber =
      userDetails.phone_number.charAt(0) === "0"
        ? userDetails.phone_number.slice(1)
        : userDetails.phone_number;
    const newUserDetails = {
      ...userDetails,
      phone_number: `${getCountryCodeValue(selectedCountry?.idd)}${userNumber}`,
      farm_country: selectedFarmLocation.name.common,
    };

    apiCall(
      `${process.env.NEXT_PUBLIC_BASE_URL}/waitlist/join`,
      newUserDetails,
      {
        success: "You've been added to our waitlist.",
        error: "Something went wrong. Try again.",
      },
      setIsLoading,
      () => {
        setUserDetails({
          full_name: "",
          phone_number: "",
          email: "",
          farm_country: "",
          farm_size: "",
        });
        router.push("/waitlist-confirmed");
      },
      null
    );
  };

  const checkIfBtnDisabled = () => {
    delete userDetails?.farm_country;
    return (
      Object.values(isInputInvalid).some((value) => value === true) ||
      Object.values(userDetails).some((value) => value === "") ||
      !selectedFarmLocation.name.common
    );
  };

  return {
    isInputInvalid,
    setIsInputInvalid,
    handleInputOnchange,
    setOpenCountryModal,
    selectedCountry,
    userDetails,
    isLoading,
    joinWaitList,
    openCountryModal,
    setSelectedCountry,
    farmLocationModalOpen,
    setFarmLocationModalOpen,
    selectedFarmLocation,
    setSelectedFarmLocation,
    checkIfBtnDisabled,
  };
};

export default useWaitlistLogic;
