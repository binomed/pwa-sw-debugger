export interface CacheEntry {
    cacheKey: string;
    cacheValues: CacheValue[];
}

export interface CacheValue {
    url: string;
    type: string;
    status: number;
    'content-type': string | null;
    size: string | null;
    'last-modified': string | null;
}