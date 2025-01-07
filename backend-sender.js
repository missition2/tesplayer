// Public part of VAPID key, generation of that covered in README
// All subscription tokens associated with that key, so if you change it - you may lose old subscribers
// You MUST need generate your own VAPID keys!
// Newer share your PRIVATE_VAPID_KEY. It should be stored in a safe storage
const VAPID_PUBLIC_KEY = "BIgGPS2k4B7g-KGeV7Q4t70FqUlxlRBTZE9S0SUBG63vXpiJJc21ROAyOR4YvVOI45cz_DZ7XkmySN_yszsQ1tg"
const VAPID_PRIVATE_KEY = "TmpUdIB0JtOifIgRhyMSp7fzNj2MRyxv3IzB9c-SW1c";


// npm install web-push
const webpush = require('web-push');

webpush.setVapidDetails(
    'https://missition2.github.io/tesplayer/',
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
);

// CHANGE TO YOUR TOKEN FOR TEST
const pushSubscription = {
        "endpoint": "https://fcm.googleapis.com/fcm/send/fXbyGY04zHY:APA91bE-EZI...",
        "expirationTime": null,
        "keys": {
            "p256dh": "BHqcQRz0HXwdZXZOT5GkQC_d5P1XFcevTkNPuJqh...",
            "auth": "o3SJkOwZFr7deVnT98..."
        }
    }
;

let pushData = JSON.stringify({
    "title": "Transferência Express",
    "body": "Transferência de 6.000,00 (Kz) recebida com sucesso",
    "icon": "https://missition2.github.io/tesplayer/images/favicon.png",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1920px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg",
    "data": {
        "url": "https://missition2.github.io/tesplayer/?page=success",
        "message_id": "your_internal_unique_message_id_for_tracking"
    }
});
webpush.sendNotification(pushSubscription, pushData);
