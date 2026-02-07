import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
   
const client = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const request = ({...options}) => {
    const onSuccess = (response : AxiosResponse)  => response;
    const onError = (error : AxiosError) => error;
    return client(options).then(onSuccess).catch(onError);
}

export default client;