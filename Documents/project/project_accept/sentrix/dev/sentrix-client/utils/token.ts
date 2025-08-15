import Cookies from 'js-cookie';

export const setToken = (token: string) => {
    Cookies.set('access-token', token, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: 1,
    });
};

export const getToken = () => {
    return Cookies.get('access-token');
};

export const removeToken = () => {
    return Cookies.remove('access-token', { path: '/' });
};
