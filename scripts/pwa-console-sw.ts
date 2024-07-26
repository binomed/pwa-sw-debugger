// Copy and paste the one you need

// Check current registration 
export function getCurrentRegistration(): Promise<ServiceWorkerRegistration | undefined> {
    return navigator.serviceWorker.getRegistration();
};

getCurrentRegistration().then(registration => console.log('Registration : ', registration));

// Unregister the current registration and clean caches
export function cancelCurrentRegistration(): void {
    let temporaryRegistration: ServiceWorkerRegistration | undefined = undefined;
    getCurrentRegistration()
        .then((registration: ServiceWorkerRegistration | undefined) => {
            if (!registration) {
                console.log('no service worker');
                return;
            }
            temporaryRegistration = registration;
            return caches.keys();
        })
        .then((cacheKeys: string[] | undefined) => {
            if (!cacheKeys) {
                return;
            }
            // clean all caches
            console.log('will delete all data from cache')
            const arrayDeletePromises: Promise<[string, boolean]>[] = [];
            for (let cacheKey of cacheKeys) {
                arrayDeletePromises.push(new Promise((resolve: (value: [string, boolean]) => void, reject) => {
                    caches.delete(cacheKey).then((removed: boolean) => resolve([cacheKey, removed]));
                }))
            }
            return Promise.all(arrayDeletePromises);
        })
        .then((deletions: [string, boolean][] | undefined) => {
            if (!deletions) {
                return;
            }
            console.log('All datas from cache and caches are now deleted')
            for (let [cacheKey, cacheDelete] of deletions) {
                console.log(`-Data for cache '${cacheKey} was removed : ${cacheDelete}'`);
            }

            if (temporaryRegistration)
                return temporaryRegistration.unregister();
        })
        .then((unregistered: boolean | undefined) => {
            if (unregistered) {

                console.log(`service worker is not register anymore : ${unregistered}`)
            } else {
                console.log(`service worker was not unregister`)

            }
        });


}


// Force update registration
export function forceUpdate(): Promise<void> {
    return navigator.serviceWorker.getRegistration()
        .then(async (registration) => {
            if (!registration) {
                console.log('no service worker');
                return;
            }
            return registration.update();
        })
        .then(updated => {

            console.log(`service worker update : ${updated}`)
            return updated;
        });

}



// List of Caches
caches.keys().then(cacheEntries => console.log(`List of all caches : [${cacheEntries.join(',')}]`));

// List of Caches and Entries
caches.keys().then(async (cacheEntries) => {
    for (let cacheKey of cacheEntries) {
        console.log(`List of entries for cache '${cacheKey}'`);
        const entries = await caches.open(cacheKey).then(cache => cache.keys());
        for (let entry of entries) {
            console.log('-->', entry.url);
        }
    }
});

//List of Caches and Entries and Data
caches.keys().then(async (cacheEntries) => {
    for (let cacheKey of cacheEntries) {
        console.log(`List of entries for cache '${cacheKey}'`);
        const cache = await caches.open(cacheKey);
        const entries = await cache.keys();
        for (let entry of entries) {
            const response = await cache.match(entry);
            console.log(`-->${entry.url}`, response);
        }
    }
});

// List all datas from a cache
caches.open('cacheKey')
    .then(async (cache) => {
        const entries = await cache.keys();
        console.log(`List of entries for cache`);
        for (let entry of entries) {
            const response = await cache.match(entry);
            console.log(`-->${entry.url}`, response);
        }
    });


// List all text datas from a cache
caches.open('cacheKey')
    .then(async (cache) => {
        const entries = await cache.keys();
        console.log(`List of entries for cache`);
        for (let entry of entries) {
            const response = await cache.match(entry);
            const text = response?.text();
            console.log(`-->${entry.url}`, text);
        }
    });

// Clean all caches
caches.keys().then(async (cacheEntries) => {
    for (let cacheKey of cacheEntries) {
        const cacheDelete = await caches.delete(cacheKey);
        console.log(`Data for cache '${cacheKey} removed : ${cacheDelete}'`);
    }
});