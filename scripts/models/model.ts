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

export interface ClonedHeaders {
    [key: string]: string;
}

export interface ClonedRequest {
    body: any;
    bodyUsed: boolean;
    cache: string;
    credentials: string;
    destination: string;
    headers: ClonedHeaders;
    integrity: string;
    method: string;
    mode: string;
    redirect: string;
    referrer: string;
    referrerPolicy: string;
    //signal: AbortSignal;
    url: string;
}

export interface ClonedResponse {
    body: any;
    bodyUsed: boolean;
    headers: ClonedHeaders;
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    type: string;
    url: string;
}

export interface CacheDetails {
    request: ClonedRequest;
    response: ClonedResponse;
}