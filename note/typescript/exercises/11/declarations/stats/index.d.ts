declare module 'stats' {
    type TComparator<T> = (a: T, b: T) => number
    type TStatsResult<T> = T | null
    type TStatIndexFunction = <T>(input: T[], comparator: TComparator<T>) => number
    type TStatElementFunction = <T>(input: T[], comparator: TComparator<T>) => T
    export const getMaxIndex: TStatIndexFunction;
    export const getMinIndex: TStatIndexFunction;
    export const getMedianIndex: TStatIndexFunction;
    export const getMaxElement: TStatElementFunction;
    export const getMinElement: TStatElementFunction;
    export const getMedianElement: TStatElementFunction;
    export const getAverageValue: <T, O>(input: T[], getValue: (item: T) => O) => O;
}