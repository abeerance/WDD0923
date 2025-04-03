// Exercise 1 solution

// Erstelle deine Interfaces hier
interface NotificationObject {
  id: number;
  message: string;
}

interface InfoNotification extends NotificationObject {
  type: "info";
}

interface SuccessNotification extends NotificationObject {
  type: "success";
}

interface ErrorNotification extends NotificationObject {
  type: "error";
}

// The union type for all notifications
type AllNotifications = InfoNotification | SuccessNotification | ErrorNotification;

// Here is the displayNotification with type type narrowing
function displayNotification(notification: AllNotifications): void {
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
const notifications: AllNotifications[] = [
  // Erstelle 3 verschiedene Benachrichtigungstypen hier
  { id: 1, type: "info", message: "System update scheduled" },
  { id: 2, type: "success", message: "Profile updated succesfully" },
  { id: 3, type: "error", message: "Login failed - Invalid credentials" },
];

// Zeige jede Benachrichtigung an
notifications.forEach((notification) => {
  displayNotification(notification);
});
