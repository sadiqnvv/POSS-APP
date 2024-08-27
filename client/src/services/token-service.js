const fetchWithToken = async (url, options = {}) => {
    let user = JSON.parse(localStorage.getItem("posUser"));

    if (!user || !user.accessToken) {
        window.location.href = '/login';
        throw new Error("No access token found!");
    }

    let res = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            "Authorization": `Bearer ${user.accessToken}`
        }
    });

    if (res.status === 401 && user.refreshToken) {
        const refreshRes = await fetch(process.env.REACT_APP_SERVER_URL + "/api/refresh-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refreshToken: user.refreshToken })
        });

        if (refreshRes.status === 200) {
            const { accessToken } = await refreshRes.json();

            user.accessToken = accessToken;
            localStorage.setItem("posUser", JSON.stringify(user));

            res = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    "Authorization": `Bearer ${accessToken}`
                }
            });
        } else {
            window.location.href = '/login';
            throw new Error("Failed to refresh token");
        }
    }

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Network response was not ok: ${errorText}`);
    }

    try {
        return await res.json();
    } catch (error) {
        throw new Error(`Failed to parse JSON: ${error.message}`);
    }
};

export default fetchWithToken;
