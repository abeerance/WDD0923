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

// Exercise 2 Solution

// Basic User interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Admin User
interface AdminUser extends User {
  role: "admin";
  accessLevel: string;
  adminSince: string;
}

// RegularUser
interface RegularUser extends User {
  role: "regular";
  subScriptionType: string;
  memberSince: string;
}

// GuestUser
interface GuestUser extends User {
  role: "guest";
  sessionDuration: string;
}

// Union Type for all user types
type AllUsers = AdminUser | RegularUser | GuestUser;

// formatUserInfo function to formate the user information based on their role
function formatUserInfo(user: AllUsers): string {
  let result = "";

  switch (user.role) {
    case "admin":
      result = `${user.role.toUpperCase()}: ${user.name} (ID: ${user.id} - Access Level: ${
        user.accessLevel
      })\n`;
      result += `Email: ${user.email}\n`;
      result += `Admin since: ${user.adminSince}`;
      break;
    case "regular":
      result = `${user.role.toUpperCase()}: ${user.name} (ID: ${user.id} - Subscription: ${
        user.subScriptionType
      })\n`;
      result += `Email: ${user.email}\n`;
      result += `Member since: ${user.memberSince}`;
      break;
    case "guest":
      result = `${user.role.toUpperCase()}: ${user.name} (ID: ${user.id} - Session expires in: ${
        user.sessionDuration
      })\n`;
      result += `Email: ${user.email}`;
      break;
  }

  return result;
}

// Test Data
const users: AllUsers[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    accessLevel: "Full",
    adminSince: "01/15/2023",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "regular",
    subScriptionType: "Premium",
    memberSince: "03/20/2023",
  },
  {
    id: 3,
    name: "Guest User",
    email: "guest@example.com",
    role: "guest",
    sessionDuration: "24 hours",
  },
];

users.forEach((user) => {
  console.log(formatUserInfo(user));
  console.log("---");
});

// Solution Exercise 3

// BaseField Type
interface BaseField {
  name: string;
  label: string;
  required: boolean;
}

// TextFieldProps
interface TextFieldProps {
  type: "text";
  placeholder: string;
}

// NumberFieldProps
interface NumberFieldProps {
  type: "number";
  min?: number;
  max?: number;
}

// CheckboxFieldProps
interface CheckboxFieldProps {
  type: "checkbox";
  defaultChecked: boolean;
}

// Intersection types to combine into full types that we need
type TextField = BaseField & TextFieldProps; // Intersection type, here we combine the type from BaseFieldType and TextFieldProps, to make a new type that has all the type definitions of these two
type NumberField = BaseField & NumberFieldProps;
type CheckboxField = BaseField & CheckboxFieldProps;

// Union Type fpr all FieldTypes
type FormField = TextField | NumberField | CheckboxField;

// Function to describe the fields
function describeField(field: FormField): string {
  // check if the field is required, and return (required)
  const requiredText = field.required ? " (required)" : "";

  switch (field.type) {
    case "text":
      return `Text field: ${field.label}${requiredText}\n` + `Placeholder: ${field.placeholder}`;
    case "number":
      return (
        `Number field: ${field.label}${requiredText}\n` +
        `Min: ${field.min ?? "Not set"}, Max: ${field.max ?? "Not set"}`
      );
    case "checkbox":
      return (
        `Checkbox field: ${field.label}${requiredText}\n` +
        `Default value: ${field.defaultChecked ? "checked" : "not checked"}`
      );
  }
}

const fields: FormField[] = [
  {
    name: "username",
    label: "Username",
    required: true,
    type: "text",
    placeholder: "Enter your username",
  },
  {
    name: "age",
    label: "Age",
    required: false,
    type: "number",
    min: 18,
    max: 100,
  },
  {
    name: "terms",
    label: "Accept terms",
    required: true,
    type: "checkbox",
    defaultChecked: false,
  },
];

fields.forEach((field) => {
  console.log(describeField(field));
  console.log("---");
});
