function createResponseError(response: any): Error {
    return Object.assign(new Error(response.error), { response });
}

export type ProblemModel = {
    id: number,
    userId: number,
    title: string,
    description: string,
    category: number,
    image: string,
    date: Date,
};

function createImageUrl(id: number): string {
    return `/api/problem/get/image/${id}`;
}

export async function getLatestProblems(count: number, offset?: number) {
    offset = offset || 0;
    let response: Response = await fetch(`/api/posts/get/${offset}/${count}`);
    let json: any = await response.json();

    if ('error' in json) {
        throw createResponseError(response);
    }

    return json.problems.map((model: ProblemModel) => ({
        image: createImageUrl(model.id),
        date: model.date,
        ...model
    }));
}