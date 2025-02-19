import backendClient from "./backendClient";

export const signInApi = async (username: string) => {
    const { data } = await backendClient.post("/auth/signin", { username })
    if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
    }

    return data;
};

export const signOutApi = async () => {
    localStorage.removeItem('accessToken');
};