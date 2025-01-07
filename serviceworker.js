// Registrar o evento 'push' para quando a notificação for recebida
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

// Registrar o evento 'notificationclick' para quando o usuário clicar na notificação
self.addEventListener('notificationclick', function(event) {
    console.log('Notificação clicada', event);

    // Quando o usuário clicar, abrir a URL associada à notificação
    event.notification.close();  // Fecha a notificação

    event.waitUntil(
        clients.openWindow(event.notification.data.url)  // Abre a página de destino
    );
});
