import {
    PlaywrightWorkerArgs,
    PlaywrightWorkerOptions,
    WorkerFixture
} from '@playwright/test';
import { getCurrnentTimestamp } from '../helpers/util-helper';

export type UniqueStr = (separate?: string) => string;
type FixtureDeps = PlaywrightWorkerArgs & PlaywrightWorkerOptions;
export const uniqueStr: WorkerFixture<UniqueStr, FixtureDeps> = async (
    { browserName },
    use,
    workerInfo
): Promise<void> => {
    const currentSeconds = Math.floor(getCurrnentTimestamp() / 1000);
    const content = [process.platform, browserName, workerInfo.workerIndex, currentSeconds];
    await use((separate: string = ''): string => content.join(separate));
};
