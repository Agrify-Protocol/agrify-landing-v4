const getCountryCodeValue = (countryIdd: {
  root?: string | undefined;
  suffixes?: string[] | undefined;
}) => {
  const root = countryIdd.root ?? "";
  const suffix =
    Array.isArray(countryIdd.suffixes) && countryIdd.suffixes.length > 0
      ? countryIdd.suffixes[0]
      : "";

  return `${root}${suffix}`;
};

export default getCountryCodeValue;
