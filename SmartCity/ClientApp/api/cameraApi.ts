export type Camera = {
    key: string,
    title: string,
    description: string,
    stream: (callback: (error: Error | null, url?: string) => void) => (() => void),
};

export const getAllCameras = () => cameras;
export const getCamera = (cameraId: string) => cameras.filter(x => x.key === cameraId)[0];

const cameras: Camera[] = [{
    key: 'burgas-port',
    title: 'Бургаско пристанище',
    description: 'Бургаското пристанище на Бургас',
    stream(callback: (error: Error | null, url?: string) => void): () => void {
        callback(null, 'http://83.228.123.116/GetData.cgi');
        return () => {};
    }
}, {
    key: 'burgas-sea-casino',
    title: 'Морско Казино',
    description: 'Бургаското Морско Казино на Бургас',
    stream(callback: (error: Error | null, url?: string) => void): () => void {
        return createImageStream('http://84.54.180.249:1500/oneshotimage.jpg', 10000, callback);
    }
}, {
    key: 'burgas-municipality',
    title: 'Община Бургас',
    description: 'Бургаската Община на Бургас',
    stream(callback: (error: Error | null, url?: string) => void): () => void {
        callback(null, 'http://84.54.135.77/axis-cgi/mjpg/video.cgi');
        return () => {};
    }
}, {
    key: 'burgas-windsurf',
    title: 'Бургас Уиндсърф Клуб',
    description: 'Бургаския Уиндсърф клуб на Бургас',
    stream(callback: (error: Error | null, url?: string) => void): () => void {
        callback(null, 'http://5.104.177.125:8080/?action=stream');
        return () => {};
    }
}];

function replaceTimestamps(url: string): string {
    return url.replace('{TIMESTAMP}', Date.now().toString());
}

function createImageStream(url: string, refreshMs: number, callback: (error: Error | null, url?: string) => void): () => void {
    let isCancelled: boolean = false;
    let processNext = async () => {
        let blob: Blob | null = null;
        try {
            let stampedUrl = replaceTimestamps(url);
            let response = await fetch(stampedUrl);
            blob = await response.blob();
        } catch (e) {
            if (!isCancelled) {
                callback(e, void 0);
            }
        }
        if (!isCancelled) {
            let url = URL.createObjectURL(blob as Blob);
            callback(null, url);
            setTimeout(processNext, refreshMs);
            return;
        }
    };
    processNext();
    return () => {
        isCancelled = true;
    };
}