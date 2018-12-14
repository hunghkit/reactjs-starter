export const initStore = (process.env.NODE_ENV === 'production' || typeof window === 'undefined') ? require('./prod').default : require('./dev').default; // eslint-disalbe-line

export default initStore;
