import axios, { AxiosResponse } from "axios";
import useCustomToast from "./useCustomToast";

type ApiResponseBase = {
  message?: string;
  error?: string;
  [key: string]: unknown;
};

const useApiCall = () => {
  const customToast = useCustomToast();

  const apiCall = async <
    TRequest extends Record<string, unknown>,
    TResponse extends ApiResponseBase = ApiResponseBase
  >(
    url: string,
    body: TRequest,
    toastDesc: {
      success: string;
      error: string;
    },
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    onSuccess: (response?: AxiosResponse<TResponse>) => void,
    onError: (() => void) | null
  ) => {
    setIsLoading(true);

    if (process.env.NEXT_PUBLIC_BASE_URL) {
      axios
        .post<TResponse>(url, body)
        .then((response) => {
          if (response?.status < 400) {
            customToast({
              type: "success",
              desc: toastDesc.success,
            });
            onSuccess(response);
          } else {
            const errMsg =
              (response?.data?.error as string) ||
              (response?.data?.message as string) ||
              "";

            const isDuplicate = /unique|already exists/i.test(errMsg);
            if (isDuplicate) {
              customToast({
                type: "success",
                desc: "You are already on our waitlist. We will be in touch shortly.",
              });
              onSuccess(response);
              return;
            }

            customToast({
              type: "error",
              desc: errMsg || toastDesc.error,
            });
            onError?.();
          }
        })
        .catch((error) => {
          const serverMessage =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "";
          const isDuplicate = /unique|already exists/i.test(serverMessage);

          if (isDuplicate) {
            customToast({
              type: "success",
              desc: "You are already on our waitlist. We will be in touch shortly.",
            });
            onSuccess();
            return;
          }

          customToast({
            type: "error",
            desc: serverMessage ?? toastDesc.error,
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
