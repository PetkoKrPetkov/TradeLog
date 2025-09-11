import { getAccessToken } from "../utils/authUtils";

async function requester(method, url, data, options = {}) {
    const fetchOptions = { ...options };

    const accessToken = getAccessToken();

    if (accessToken) {
        fetchOptions.headers = {
            ...fetchOptions.headers,
            'X-Authorization': accessToken,
        };
    }

    fetchOptions.method = method;

    if (data !== undefined) {
        const isFormData = (typeof FormData !== 'undefined') && (data instanceof FormData);
        if (isFormData) {
            fetchOptions.body = data; // browser sets correct Content-Type
        } else {
            fetchOptions.headers = {
                ...fetchOptions.headers,
                'Content-Type': 'application/json',
            };
            fetchOptions.body = JSON.stringify(data);
        }
    }

    const response = await fetch(url, fetchOptions);

    if (response.status === 204) {
        return;
    }

    let result;
    try {
        result = await response.json();
    } catch (_e) {
        result = { message: 'Invalid JSON response' };
    }

    if (!response.ok) {
        // Global 401 handling: clear persisted auth
        if (response.status === 401) {
            try { localStorage.removeItem('auth'); } catch (_) {}
        }
        throw result;
    }

    return result;
};

export const get = (url, options) => requester('GET', url, undefined, options);
export const post = (url, data, options) => requester('POST', url, data, options);
export const put = (url, data, options) => requester('PUT', url, data, options);
export const del = (url, options) => requester('DELETE', url, undefined, options);
