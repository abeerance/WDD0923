"use strict";
// Exercise 1 solution
// Here is the displayNotification with type type narrowing
function displayNotification(notification) {
    switch (notification.type) {
        case "info":
            console.log(`INFO: ${notification.message} (ID: ${notification.id})`);
            break;
        case "success":
            console.log(`SUCCESS: ${notification.message} (ID: ${notification.id})`);
            break;
        case "error":
            console.log(`ERROR: ${notification.message} (ID: ${notification.id})`);
            break;
    }
}
// Teste deine Implementierung mit diesen Beispielen
const notifications = [
    // Erstelle 3 verschiedene Benachrichtigungstypen hier
    { id: 1, type: "info", message: "System update scheduled" },
    { id: 2, type: "success", message: "Profile updated succesfully" },
    { id: 3, type: "error", message: "Login failed - Invalid credentials" },
];
// Zeige jede Benachrichtigung an
notifications.forEach((notification) => {
    displayNotification(notification);
});
