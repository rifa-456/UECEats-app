import type {StrapiDefaultOptions} from 'strapi-ts-sdk/dist/infra/strapi-sdk/src';
import type {UserType} from '@/types/strapiTypes';
import {ProviderAuth, Strapi, UserAuth, UserBase} from 'strapi-ts-sdk';
import {config} from "@/constants/config";

const defaults: StrapiDefaultOptions = {
    url: config.strapiBaseUrl || 'http://localhost:1337',
    prefix: '/api',
    store: {
        key: 'authToken',
        useLocalStorage: true,
        cookieOptions: { path: '/' },
    },
    axiosOptions: {},
};
export const strapiClient = new Strapi({ ...defaults });

export const userAuth = new UserAuth<UserType>(strapiClient);
export const providerAuth = new ProviderAuth<UserType>(strapiClient, userAuth);
export const userBase = new UserBase<UserType>(strapiClient);