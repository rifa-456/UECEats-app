import axios from 'axios';
import { appConfig } from '@/constants/appConfig';
import { getStoredToken } from './authStorage';

const strapiClient = axios.create({
    baseURL: appConfig.strapiBaseUrl,
});

strapiClient.interceptors.request.use(async (config) => {
    const token = await getStoredToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default strapiClient;