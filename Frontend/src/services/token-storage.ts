/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface RememberedUser {
    loginName: string;
}

interface AuthTokenService {
    setAccessToken: (token: string) => void;
    getAccessToken: () => any;
    getRefreshToken: () => string;
    clearToken: () => void;
    setRefreshToken: (token: any) => void;
}

function clearToken() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

const encodeToken = (token: string | any) => {
    try {
        const tokenWithBrowserData = encodeURIComponent(
            JSON.stringify({ tkvrt: token })
        );
        const tokenWithBrowserDataEncoded = btoa(tokenWithBrowserData);
        const tokenWithBrowserDataEncodedSplit = [
            tokenWithBrowserDataEncoded.substring(0, 20),
            tokenWithBrowserDataEncoded.substring(20),
        ]
            .reverse()
            .join("");

        return tokenWithBrowserDataEncodedSplit;
    } catch (e) {
        console.log("Error encoding token", e);
        return token;
    }
};

const decodeToken = (token: string) => {
    if (!token) return "";

    try {
        const tokenWithBrowserDataEncodedSplit = [
            token.substring(0, token.length - 20),
            token.substring(token.length - 20),
        ]
            .reverse()
            .join("");
        const tokenWithBrowserData = decodeURIComponent(
            atob(tokenWithBrowserDataEncodedSplit)
        );
        const { tkvrt } = JSON.parse(tokenWithBrowserData);

        return tkvrt;
    } catch (e) {
        console.log("Error decoding token", e);

        clearToken();
        return token;
    }
};

function setAccessToken(token: string) {
    try {
        localStorage.setItem("accessToken", encodeToken(token));
    } catch (e) {
        console.log("Local store error", e);
    }
}

function getAccessToken(): string {
    let accessToken = "";

    try {
        accessToken = decodeToken(localStorage.getItem("accessToken") || "");
    } catch (e) {
        console.log("Local store error", e);
    }

    return accessToken;
}

function getRefreshToken(): string {
    let refreshToken = "";

    try {
        refreshToken = decodeToken(localStorage.getItem("refreshToken") || "");
    } catch (e) {
        console.log("Local store error", e);
    }

    return refreshToken;
}

function setRefreshToken(token: string) {
    try {
        localStorage.setItem("refreshToken", encodeToken(token));
    } catch (e) {
        console.log("Local store error", e);
    }
}

const TokenService: AuthTokenService = {
    setAccessToken,
    getAccessToken,
    getRefreshToken,
    clearToken,
    setRefreshToken,
};

export default TokenService;
