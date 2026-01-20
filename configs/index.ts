import { type PlaywrightTestConfig } from '@playwright/test';
import { kongManagerConfig } from './kong-manager';
import { konnectConfig } from './konnect';

export  const enum PRUDUCT {
    KONG_MANAGER = 'kong-manager',
    KONNECT = 'konnect',
}

export const getProductName = (): PRUDUCT => {
    return process.env.PRODUCT as PRUDUCT;
}
export const getConfigs = (): PlaywrightTestConfig => {
    switch (getProductName()) {
        case PRUDUCT.KONNECT:
            return konnectConfig;
        default:
            return kongManagerConfig;
    }
}
