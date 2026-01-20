export const isMacOS = () => {
    return process.platform === 'darwin';
};

export const isWindows = () => {
    return process.platform === 'win32';
};

export const getCurrnentTimestamp = (): number => {
    return new Date().getTime();
};
