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
// formatUserInfo function to formate the user information based on their role
function formatUserInfo(user) {
    let result = "";
    switch (user.role) {
        case "admin":
            result = `${user.role.toUpperCase()}: ${user.name} (ID: ${user.id} - Access Level: ${user.accessLevel})\n`;
            result += `Email: ${user.email}\n`;
            result += `Admin since: ${user.adminSince}`;
            break;
        case "regular":
            result = `${user.role.toUpperCase()}: ${user.name} (ID: ${user.id} - Subscription: ${user.subScriptionType})\n`;
            result += `Email: ${user.email}\n`;
            result += `Member since: ${user.memberSince}`;
            break;
        case "guest":
            result = `${user.role.toUpperCase()}: ${user.name} (ID: ${user.id} - Session expires in: ${user.sessionDuration})\n`;
            result += `Email: ${user.email}`;
            break;
    }
    return result;
}
// Test Data
const users = [
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
// Function to describe the fields
function describeField(field) {
    var _a, _b;
    // check if the field is required, and return (required)
    const requiredText = field.required ? " (required)" : "";
    switch (field.type) {
        case "text":
            return `Text field: ${field.label}${requiredText}\n` + `Placeholder: ${field.placeholder}`;
        case "number":
            return (`Number field: ${field.label}${requiredText}\n` +
                `Min: ${(_a = field.min) !== null && _a !== void 0 ? _a : "Not set"}, Max: ${(_b = field.max) !== null && _b !== void 0 ? _b : "Not set"}`);
        case "checkbox":
            return (`Checkbox field: ${field.label}${requiredText}\n` +
                `Default value: ${field.defaultChecked ? "checked" : "not checked"}`);
    }
}
const fields = [
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
