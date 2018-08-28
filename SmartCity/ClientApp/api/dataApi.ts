function createResponseError(response: any): Error {
    return Object.assign(new Error(response.error), { response });
}

/* region EVN */
export type EVNModel = {
    region: string,
    cec: string,
    details: string,
    startDateTime: Date,
    endDateTime: Date,
};

export async function getEVNData(): Promise<EVNModel[]> {
    let response: Response = await fetch("/api/data/evn");
    let json = await response.json();

    if (json.error) {
        throw createResponseError(response);
    }

    let values: string[][] = json.data;
    return values.map(item => ({
        region: item[0],
        cec: item[1],
        details: item[2],
        ...parseENVDates(item)
    } as EVNModel));
}

function parseENVDates(item: string[]): { startDateTime: Date, endDateTime: Date } {
    let startTime = item[3];
    let endTime = item[4];
    
    let startDate = item[5];
    let endDate = item[6];

    let startDateTime: Date = new Date(parseBulgarianDate(startDate) + parseBulgarianTime(startTime));
    let endDateTime: Date = new Date(parseBulgarianDate(endDate) + parseBulgarianTime(endTime));
    
    return {
        startDateTime,
        endDateTime,
    };
}

function parseBulgarianDate(date: string, separator: string = "."): number {
    let [day, month, year] = date.split(separator).map(x => Number(x));
    return (new Date(year, month, day)).getTime();
}

function parseBulgarianTime(time: string, separator: string = ":"): number {
    let [hours, minutes] = time.split(separator).map(x => Number(x));
    return hours * 60 * 60 * 1000 + minutes * 60 * 1000;
}
/* endregion EVN */

/* region VIK */
export type VIKModel = {
    message: string,
};

export async function getVIKData(): Promise<VIKModel[]> {
    let response: Response = await fetch("/api/data/vik");
    let json: any = await response.json();
    if (json.error) {
        throw new Error(json.error);
    } else {
        let messages: string[] = json.data;
        return messages.map(message => ({ message }));
    }
}
/* endregion VIK */

/* region NEWS */
export type NewsItemModel = {
    date: string,
    description: string,
    link: string,
    picture: string,
    title: string,
};

export async function getNewsData(category: number): Promise<NewsItemModel[]> {
    let response: Response = await fetch("/api/data/news?category=" + category);
    let json: any = await response.json();
    if (json.error) {
        throw new Error(json.error);
    } else {
        let news: any[] = json.data;
        return news;
    }
}
/* endregion NEWS */

/* region HEATING */
export type HeatingMessageModel = {
    title: string,
    content: string,
};

export async function getHeatingData(): Promise<HeatingMessageModel[]> {
    let response: Response = await fetch("/api/data/heating");
    let json: any = await response.json();
    if (json.error) {
        throw new Error(json.error);
    } else {
        let messages: HeatingMessageModel[] = json.data;
        return messages;
    }
}
/* endregion HEATING */
/* endregion NEWS */

/* region AIR */

export type AirTableModel = {
    table: AirCellModel[][],
    totalCondition: number
};

export type AirCellModel = {
    condition: number,
    value: number
};

export async function getAirData(): Promise<AirTableModel> {
    let response: Response = await fetch("/api/data/air");
    let json: any = await response.json();
    if (json.error) {
        throw new Error(json.error);
    } else {
        let air: any = json.data;
        return air;
    }
}
/* endregion AIR */