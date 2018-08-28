declare function getFbSdk(callback: (fb: any) => void): void;

async function getFacebookSdkAsync(): Promise<any> {
    return new Promise(resolve => {
        getFbSdk(resolve);
    });
}

export type AccountStatus = 'connected' | 'not_authorized' | 'unknown';

export type AuthResponse = {
    accessToken: string,
    expriesIn: string,
    signedRequest: string,
    userID: string,
};

export type LoginResponse = {
    status: AccountStatus,
    authResponse?: AuthResponse,
};

export type UserResponse = {
    id: string,
    [key: string]: string,
};

function createResponseError(response: any): Error {
    return Object.assign(new Error(response.error), { response });
}

export function getLoginStatusAsync(): Promise<LoginResponse> {
    return new Promise(async (resolve, reject) => {
        try {
            let FB = await getFacebookSdkAsync();
            FB.getLoginStatus((response: any) => {
                if ('error' in response) {
                    reject(createResponseError(response));
                }
                resolve(response);
            });
        } catch (e) {
            reject(e);
        }
    });
}

export function loginAsync(scopes: string[]): Promise<LoginResponse> {
    return new Promise(async (resolve, reject) => {
        try {
            let FB = await getFacebookSdkAsync();
            FB.login((response: any) => {
                if ('error' in response) {
                    reject(createResponseError(response));
                }
                resolve(response);
            }, { scope: scopes.join(',') });
        } catch (e) {
            reject(e);
        }
    });
}

export function getMeAsync<T>(fields: (keyof T)[]): Promise<UserResponse & T> {
    return new Promise(async (resolve, reject) => {
        try {
            let FB = await getFacebookSdkAsync();
            FB.api('/me', (response: any) => {
                if ('error' in response) {
                    reject(createResponseError(response));
                }
                resolve(response);
            }, { fields: fields.join(',') });
        } catch (e) {
            reject(e);
        }
    });
} 

export type FBLocation = {
    city: string,
    country: string,
    latitude: number,
    longtitude: number,
};

export type FBPlace = {
    name: string,
    id: string,
    location: FBLocation,
};

export type FBEvent = {
    description: string,
    end_time: string,
    id: string,
    name: string,
    place: FBPlace,
    start_time: string,
    picture: string,
};

export async function getUpcomingEventsAsync(accessToken: string, keywords: string[], cities: string[], limit: number = 25): Promise<FBEvent[]> {
    let query = createSearchQuery(keywords);
    let response = await fetch(`https://graph.facebook.com/search?q=${query}&type=event&limit=${limit}&access_token=${accessToken}`);
    let json: any = await response.json();
    
    if (json.error) {
        throw new Error(json.error);
    }

    let events: FBEvent[] = json.data;
    cities = cities.map(x => x.toLowerCase());

    let upcomingEvents = events.filter(e => 
        Date.parse(e.start_time) > Date.now() 
        && e.place && e.place.location && e.place.location.city
        && cities.indexOf(e.place.location.city.toLowerCase()) > -1);

    for (let event of upcomingEvents) {
        let picture = await getEventPictureAsync(accessToken, event.id);
        event.picture = picture;
    }

    return upcomingEvents;
}

function createSearchQuery(keywords: string[]): string {
    return keywords
        .map(k => encodeURIComponent(k))
        .join('+');
}

export function createEventUrl(eventId: string): string {
    return `https://www.facebook.com/events/${eventId}/`;
}

export async function getEventPictureAsync(accessToken: string, eventId: string): Promise<string> {
    let response = await fetch(`https://graph.facebook.com/v2.10/${eventId}?fields=cover&access_token=${accessToken}`);
    let json: any = await response.json();
    
    if (json.error) {
        throw new Error(json.error);
    }

    return json.cover.source;
}