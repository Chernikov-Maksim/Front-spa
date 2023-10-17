export const getRefreshToken = async (token: string) => {
    return fetch(`${process.env.BASE_API_URL}/auth/refresh`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const isAuthorization = async (
    accessToken: string | undefined,
    refreshToken: string | undefined
): Promise<{ isAuth: boolean; accessToken?: string; refreshToken?: string }> => {
    if (!accessToken || !refreshToken) {
        return { isAuth: false };
    }

    try {
        const response = await fetch(`${process.env.BASE_API_URL}/users/current`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();

        if (response?.ok && data?.id) {
            return { isAuth: true };
        }

        if (data.message === "Expired token") {
            console.log("refreshToken ", refreshToken);
            const refreshResponse = await getRefreshToken(refreshToken);

            const refreshData = await refreshResponse.json();
            console.log("refreshData ", refreshData);
            if (refreshResponse?.ok && refreshData) {
                return { isAuth: true, refreshToken: refreshData.refreshToken, accessToken: refreshData.accessToken };
            }
        }

        return { isAuth: false };
    } catch (error) {
        return { isAuth: false };
    }
};
