import { useToast } from "@chakra-ui/react";

interface CustomToastProps {
  type: "success" | "error";
  desc: string;
}

const useCustomToast = () => {
  const toast = useToast();
  
  const customToast = ({ type, desc }: CustomToastProps) => {
    toast({
      title: type === "success" ? "Success!" : "Error!",
      position: "top-right",
      description: desc,
      status: type,
      duration: 9000,
      isClosable: true,
    });
  };

  return customToast;
};

export default useCustomToast;
