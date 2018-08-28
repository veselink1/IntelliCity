const palette = require('google-material-color') as any;

export default {
    get(color: string, shade: string): string {
        return palette.get(color, shade);
    }
};