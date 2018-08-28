function createResponseError(response: any): Error {
    return Object.assign(new Error(response.error), { response });
}

export async function getStatusAsync(): Promise<{ authenticated: boolean, email?: string, accessToken?: string }> {
    let response = await fetch('/api/account/status');
    let json = await response.json();

    if (json.error) {
        throw createResponseError(response);
    }

    return {
        authenticated: json.authenticated,
        email: json.email,
    };
}

export async function loginFacebookAsync(accessToken: string): Promise<boolean> {
    let response = await fetch('/api/account/facebook/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken })
    });

    let json = await response.json();
    if (json.error) {
        throw createResponseError(response);
    }

    return json.success;
}

export async function logoutAsync(): Promise<boolean> {
    let response = await fetch('/api/account/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    let json = await response.json();
    if (json.error) {
        throw createResponseError(response);
    }

    return json.success;
}