self.addEventListener('push', (event) => {
    let pushData = event.data.json();

    if (!pushData || !pushData.title) {
        console.error('Received WebPush with an empty title. Received body: ', pushData);
    }

    self.registration.showNotification(pushData.title, pushData).then(() => {
        // Você pode adicionar alguma análise ou acompanhamento de quando a notificação foi exibida.
    });
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    if (!event.notification.data) {
        console.error('Click on WebPush with empty data. Notification: ', event.notification);
        return;
    }

    if (!event.notification.data.url) {
        console.error('Click on WebPush without url. Notification: ', event.notification);
        return;
    }

    clients.openWindow(event.notification.data.url).then(() => {
        // Aqui você pode enviar dados de clique para o seu servidor de análise.
    });
});
