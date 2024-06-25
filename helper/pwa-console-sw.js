// Copy and paste the one you need

// Check current registration 
navigator.serviceWorker.getRegistration()
.then(registration => console.log('Registration : ', registration));

// Cancel current registation
navigator.serviceWorker.getRegistration()
.then(async (registration)=>{
    if (!registration){
        console.log('no service worker');
        return;
    }
    // clean all caches
    console.log('will delete all data from cache')
    const cachesKeys = await caches.keys();
    for (let cacheKey of cachesKeys){
        const cacheDelete = await caches.delete(cacheKey);
        console.log(`Data for cache '${cacheKey} removed : ${cacheDelete}'`);
    }
    console.log('All datas from cache and caches are now deleted')
    // unregister the service worker
    const unregistered = await registration.unregister();
    console.log(`service worker is not register anymore : ${unregistered}`)
});

// Force update registration
 navigator.serviceWorker.getRegistration()
.then(async (registration)=>{
    if (!registration){
        console.log('no service worker');
        return;
    }
    const updated = await registration.update();
    console.log(`service worker update : ${updated}`);
});


// List of Caches
caches.keys().then(cacheEntries => console.log(`List of all caches : [${cacheEntries.join(',')}]`));

// List of Caches and Entries
caches.keys().then(async (cacheEntries)=>{
    for(let cacheKey of cacheEntries){
        console.log(`List of entries for cache '${cacheKey}'`);
        const entries = await caches.open(cacheKey).then(cache=>cache.keys());
        for(let entry of entries){
            console.log('-->', entry.url);
        }
    }
});

//List of Caches and Entries and Data
caches.keys().then(async (cacheEntries)=>{
    for(let cacheKey of cacheEntries){
        console.log(`List of entries for cache '${cacheKey}'`);
        const cache = await caches.open(cacheKey);
        const entries = await cache.keys();
        for(let entry of entries){
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
    for(let entry of entries){
        const response = await cache.match(entry);
        console.log(`-->${entry.url}`, response);
    }
 });


// List all text datas from a cache
caches.open('cacheKey')
.then(async (cache) => {
    const entries = await cache.keys();
    console.log(`List of entries for cache`);
    for(let entry of entries){
        const response = await cache.match(entry);
        const text = response.text();
        console.log(`-->${entry.url}`, text);
    }
 });

// Clean all caches
caches.keys().then(async (cacheEntries)=>{
    for (let cacheKey of cacheEntries){
        const cacheDelete = await caches.delete(cacheKey);
        console.log(`Data for cache '${cacheKey} removed : ${cacheDelete}'`);
    }
});