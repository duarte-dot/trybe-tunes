const USER_KEY = 'user';

export const clearSession = () => localStorage.removeItem(USER_KEY);

export default clearSession;
