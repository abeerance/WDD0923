"use strict";
const book1 = {
    title: "TypeScript Grundlagen",
    author: "Jane Developer",
    pages: 250,
    isPublished: true,
    genres: ["Programmierung", "Technologie"],
};
const book2 = {
    title: "Coding Abenteuer",
    author: "John Coder",
    pages: 320,
    isPublished: false,
    genres: ["Programmierung", "Abenteuer"],
};
function displayUserInfo(user) {
    console.log(`Benutzer: ${user.username} (ID: ${user.id})`); // NEVER give back the ID to the webbrowser, just fyi
    console.log(`Email: ${user.email}`);
    if (user.bio) {
        console.log(`Bio: ${user.bio}`);
    }
    if (user.age) {
        console.log(`Age: ${user.age}`);
    }
    if (user.isPremium) {
        console.log(`Status: ${user.isPremium ? "Premium" : "Standard"}-Benutzer`);
        // console.log(
        //   `Status: ${() => {
        //     if (user.isPremium) {
        //       return "Premium";
        //     } else {
        //       return "Standard";
        //     }
        //   }}-Benutzer`
        // ); Is genau das gleiche in etwa wie oben, einfach nicht als ternary operator
    }
}
const user1 = {
    id: 1,
    username: "coder123",
    email: "coder@example.com",
    bio: "Ich liebe ternary operators",
    isPremium: true,
};
const user2 = {
    id: 2,
    username: "coder567",
    email: "coder567@example.com",
};
displayUserInfo(user1);
displayUserInfo(user2);
/* Exercise 03: Interface with methods */
