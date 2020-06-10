// This enabled module augmentation mode.
import 'date-wizard';

declare module 'date-wizard' {
    // Add your module extensions here.
    interface DateDetails {
        hours: number;
        minutes: number;
        seconds: number;
    }

    export function pad(num:number): string
}
