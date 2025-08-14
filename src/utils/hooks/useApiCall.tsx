import axios from "axios";
import useCustomToast from "./useCustomToast";

const useApiCall = () => {
  const customToast = useCustomToast();
  const apiCall = async (
    url: string,
    body: any,
    toastDesc: {
      success: string;
      error: string;
    },
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    onSuccess: (response?: any) => void,
    onError: (() => void) | null
  ) => {
    setIsLoading(true);
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      axios
        .post(url, body)
        .then((response) => {
          // console.log("THEN response", response);
          if (response?.status <= 400) {
            customToast({
              type: "success",
              desc: response?.data?.message ?? toastDesc.success,
            });
            onSuccess(response);
          } else {
            customToast({
              type: "error",
              desc: response?.data?.error ?? toastDesc.error,
            });
            onError?.();
          }
        })
        .catch(() => {
          // console.log("catch block");
          customToast({
            type: "error",
            desc: toastDesc.error,
          });
          onError?.();
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return { apiCall };
};

export default useApiCall;
