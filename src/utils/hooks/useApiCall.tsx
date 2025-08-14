import axios, { AxiosResponse } from 'axios';
import useCustomToast from './useCustomToast';

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
          if (response?.status <= 400) {
            customToast({
              type: 'success',
              desc: response.data?.message ?? toastDesc.success,
            });
            onSuccess(response);
          } else {
            customToast({
              type: 'error',
              desc: response.data?.error ?? toastDesc.error,
            });
            onError?.();
          }
        })
        .catch(() => {
          customToast({
            type: 'error',
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
