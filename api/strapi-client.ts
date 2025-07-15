import Strapi from "strapi-sdk-js";
import { config } from '@/utils/config';

const strapiUrl = config.strapiBaseUrl as string;

export const strapiSdk = new Strapi({
  url: strapiUrl.replace(/\/$/, ""),
});