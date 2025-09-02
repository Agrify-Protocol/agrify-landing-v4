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
import { Country } from "../CountryModal";

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
  // const [selectedFarmLocation, setSelectedFarmLocation] = useState({
  //   name: {
  //     common: '',
  //   },
  // });

  const [selectedFarmLocation, setSelectedFarmLocation] = useState<Country>({
    flag: "",
    name: { common: "" },
    idd: { root: "", suffixes: [] },
  });
  const [openCountryModal, setOpenCountryModal] = useState(false);
  // const [selectedCountry, setSelectedCountry] = useState(countryList[0]);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countryList[0] ?? null
  );
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
    const { name, value } = e.target;

    setUserDetails((prev) => ({ ...prev, [name]: value }));

    const validators: Record<string, (value: string) => boolean> = {
      full_name: validateNameInput,
      email: validateEmail,
      phone_number: validatePhoneNumber,
      farm_size: validateFarmSize,
    };

    const validator = validators[name];
    if (validator) {
      setIsInputInvalid((prev) => ({
        ...prev,
        [name]: validator(value),
      }));
    }
  };

  const joinWaitList = () => {
    sendGAEvent("event", "join-waitlist", { value: "join" });

    const newUserDetails = {
      ...userDetails,
      phone_number: userDetails.phone_number,
      farm_country: selectedFarmLocation.name.common,
      farm_size: 0,
    };

    apiCall(
      `${process.env.NEXT_PUBLIC_BASE_URL}/waitlist/join`,
      newUserDetails,
      {
        success:
          "Application Received. Someone from our team will contact you shortly",
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
        // Stay on the page after success; no redirect
      },
      null
    );
  };

  const checkIfBtnDisabled = () => {
    // Require fields present in the form
    const requiredFields: Array<keyof UserDetailsProp> = [
      "full_name",
      "phone_number",
      "email",
    ];

    const hasInvalid = Object.values(isInputInvalid).some(
      (value) => value === true
    );
    const hasEmptyRequired = requiredFields.some(
      (key) => userDetails[key] === ""
    );
    const farmLocationMissing = !selectedFarmLocation.name.common;

    return hasInvalid || hasEmptyRequired || farmLocationMissing;
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
