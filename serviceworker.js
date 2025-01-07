self.addEventListener('push', function(event) {
    const data = event.data.json();

    const options = {
        body: data.body,
        icon: 'caminho/para/o/icon.png',
        badge: 'caminho/para/o/badge.png',
        data: {
            url: data.url
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    const url = event.notification.data.url;
    event.notification.close();

    // Abrir a URL associada à notificação
    event.waitUntil(
        clients.openWindow(url)
    );
});
