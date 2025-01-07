self.addEventListener('push', function(event) {
    console.log('Push recebido', event);

    // Extrair os dados da notificação
    const pushData = event.data.json();

    // Exibir a notificação com os dados recebidos
    event.waitUntil(
        self.registration.showNotification(pushData.title, {
            body: pushData.body,
            icon: pushData.icon,
            image: pushData.image,
            data: {
                url: pushData.url
            }
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notificação clicada', event);

    // Fechar a notificação
    event.notification.close();

    // Abrir a URL associada à notificação
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
