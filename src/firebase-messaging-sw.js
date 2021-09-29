

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener('push', (e) => {
    let data = e.data.json().data;
    e.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
        })
    )
})

self.addEventListener('notificationclick', (e) => {
    e.notification.close();
    clients.openWindow('https://bme3-pdf.web.app');
})