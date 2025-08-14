const getBorderColor = (isInvalid?: boolean, telInputActive?: boolean) => {
  if (isInvalid) {
    return "1px solid #dc143c";
  } else if (telInputActive) {
    return "1px solid #C8C8C8";
  } else {
    return "1px solid #E2E8F0";
  }
};

export default getBorderColor;
