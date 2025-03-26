"use strict";
// BASIC TYPE ASSIGNMENTS (EASY)
// 1. Create a boolean variable called `isActive` and set it to `true`.
let isActive = true;
// 2. Create a number variable called `age` and set it to `25`.
let age = 25;
// 3. Create a string variable called `username` and set it to `"JohnDoe"`.
let username = "JohnDoe";
// 4. Create an array of numbers called `scores` containing [85, 90, 78].
let scroes = [85, 90, 78];
// 5. Create a tuple called `user` containing a string and a number, e.g., `["JohnDoe", 25]`.
let user = [username, age];
// CREATING AND USING ENUMS (EASY TO MEDIUM)
// 6. Define an enum called `Day` representing the days of the week.
var Day;
(function (Day) {
    Day[Day["Monday"] = 0] = "Monday";
    Day[Day["Tuesday"] = 1] = "Tuesday";
    Day[Day["Wednesday"] = 2] = "Wednesday";
    Day[Day["Thursday"] = 3] = "Thursday";
    Day[Day["Friday"] = 4] = "Friday";
    Day[Day["Saturday"] = 5] = "Saturday";
    Day[Day["Sunday"] = 6] = "Sunday";
})(Day || (Day = {}));
// 7. Create a function called `isWeekend` that accepts a `Day` and returns a boolean indicating if it’s a weekend.
function isWeeked(day) {
    if (day === Day.Saturday || day === Day.Sunday) {
        return true;
    }
    return false;
}
// 8. Test the function with different days of the week.
console.log(isWeeked(Day.Monday)); // Output: false
console.log(isWeeked(Day.Saturday)); // Output: true
const imagineLibrary = {
    name: "Imagine Library",
    location: "Zurich",
    books: [
        { title: "1984", author: "George Orwell", isAvailable: true },
        { title: "To Kill a Mockinbird", author: "Harper Lee", isAvailable: false },
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isAvailable: true },
    ],
};
function isBookAvailable(library, bookTitle) {
    const book = library.books.find((book) => book.title === bookTitle);
    // if (book) {
    //   if (book.isAvailable) {
    //     return true;
    //   } else {
    //     false;
    //   }
    // }
    return book ? book.isAvailable : false; // is the same as the if/else statement above
}
console.log("Available status: ", isBookAvailable(imagineLibrary, "1984")); // Output: true
console.log("Available status: ", isBookAvailable(imagineLibrary, "To Kill a Mockingbird")); // Output: false
/*
Create a type Team that represents a sports team. It should contain:

    •	teamName (string)
    •	members (array of objects): Each object should represent a team member and contain:
    •	name (string)
    •	position (string)
    •	isActive (boolean)
    •	addMember (function): A method that takes a new member (object) and adds it to the members array.
    •	listActiveMembers (function): A method that returns an array of names of the active team members.

Create an instance of Team and demonstrate adding a new member and listing all active members.

Hint: Use TypeScript’s push method for arrays and filter for listing active members.
*/
