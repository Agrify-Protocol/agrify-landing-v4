const getCountryCodeValue = (countryIdd: {
  root?: string | undefined;
  suffixes?: string[] | undefined;
}) => {
  if (countryIdd.suffixes && countryIdd.suffixes.length > 2) {
    return `${countryIdd.root ?? ""}`;
  }
  return `${countryIdd.root ?? ""}${countryIdd.suffixes ?? ""}`;
};

export default getCountryCodeValue;
