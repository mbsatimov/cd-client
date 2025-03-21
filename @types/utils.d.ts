type RequestConfig<Data = undefined> = Data extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : { data: Data; config?: import('axios').AxiosRequestConfig };

interface BaseResponse {
  message: string;
}
