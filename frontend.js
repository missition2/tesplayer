async function initServiceWorker() {
    let swRegistration = await navigator.serviceWorker.register('serviceworker.js', {scope: '/seu-repositorio/'});
    let pushManager = swRegistration.pushManager;

    if (!isPushManagerActive(pushManager)) {
        return;
    }

    let permissionState = await pushManager.permissionState({userVisibleOnly: true});
    switch (permissionState) {
        case 'prompt':
            document.getElementById('subscribe_btn').style.display = 'block';
            break;
        case 'granted':
            displaySubscriptionInfo(await pushManager.getSubscription())
            break;
        case 'denied':
            document.getElementById('subscribe_btn').style.display = 'none';
            document.getElementById('active_sub').style.display = 'block';
            document.getElementById('active_sub').innerHTML = 'User denied push permission';
    }
}

function isPushManagerActive(pushManager) {
    if (!pushManager) {
        if (!window.navigator.standalone) {
            document.getElementById('add-to-home-screen').style.display = 'block';
        } else {
            throw new Error('PushManager is not active');
        }
        document.getElementById('subscribe_btn').style.display = 'none';
        return false;
    } else {
        return true;
    }
}

async function subscribeToPush() {
    // Substitua pela sua chave pública VAPID
    const VAPID_PUBLIC_KEY = 'BIgGPS2k4B7g-KGeV7Q4t70FqUlxlRBTZE9S0SUBG63vXpiJJc21ROAyOR4YvVOI45cz_DZ7XkmySN_yszsQ1tg';

    let swRegistration = await navigator.serviceWorker.getRegistration();
    let pushManager = swRegistration.pushManager;
    if (!isPushManagerActive(pushManager)) {
        return;
    }
    let subscriptionOptions = {
        userVisibleOnly: true,
        applicationServerKey: VAPID_PUBLIC_KEY
    };
    try {
        let subscription = await pushManager.subscribe(subscriptionOptions);
        displaySubscriptionInfo(subscription);
    } catch (error) {
        document.getElementById('active_sub').style.display = 'block';
        document.getElementById('active_sub').innerHTML = 'User denied push permission';
    }
}

function displaySubscriptionInfo(subscription) {
    document.getElementById('subscribe_btn').style.display = 'none';
    document.getElementById('active_sub').style.display = 'block';
    document.getElementById('active_sub').innerHTML = '<b>Active subscription:</b><br><br>'
        + JSON.stringify(subscription.toJSON());
    document.getElementById('test_send_btn').style.display = 'block';
}

function testSend() {
    const title = "Push title";
    const options = {
        body: "Additional text with some description",
        icon: "https://example.com/images/icon.jpg",
        image: "https://example.com/images/image.jpg",
        data: {
            "url": "https://example.com/success",
            "message_id": "your_internal_unique_message_id_for_tracking"
        },
    };
    navigator.serviceWorker.ready.then(async function (serviceWorker) {
        await serviceWorker.showNotification(title, options);
    });
}

if ((new URLSearchParams(window.location.search)).get('page') === 'success') {
    document.getElementById('content').innerHTML = 'You successfully opened page from WebPush!';
}

if (navigator.serviceWorker) {
    initServiceWorker();
}
