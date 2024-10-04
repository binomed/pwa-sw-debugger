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

export interface Icon {
    src: string;
    sizes: string;
    type: string;
    purpose: string;
    base64: string;
}

export interface ManifestData {
    path: string;
    hasManifest: boolean;
    manifest: Manifest;
}
export interface Manifest {
    name: string;
    short_name: string;
    description: string;
    icons: Icon[];
    start_url: string;
    display: string;
    orientation: string;
    background_color: string;
    theme_color: string;
    dir: string;
    lang: string;
    scope: string;
    serviceworker: string;
}