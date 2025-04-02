// Exercise 1 Solution

function calculateTax(amount: number, taxRate: number): number {
  return amount * taxRate;
}

// Example of use
const orderAmount = 100;
const salesTaxRate = 0.19; // 19% Mehrwertssteuern
const taxAmount = calculateTax(orderAmount, salesTaxRate); // Here we need to keep the hierarchy in mind, because the 1st item passed is always the amount and the 2nd item passed is the taxRate

console.log(`Steuer auf ${orderAmount}CHF beträgt ${taxAmount}CHF`);
// Steuer auf 100CHF beträgt 19CHF

// Exercise 2 Solution

function buildProfile(name: string, age: number, occupation?: string): string {
  let profile = `${name}, ${age} Jahre alt`;

  if (occupation) {
    profile += `, ${occupation}`;
  }

  return profile;
}

/*
= sets a value to something
== checks if the value is the same, that means, "25" is the same as 25, because it does not check the type
=== checks if the value and the type is the same, that means "25" is not the same as 25, because they do not have the same type
!== checks if something is of the NOT of the same value but is the same type
!= checks if something is not of the same value
! checks if something does not exist
*/

// Example of use
console.log(buildProfile("Alice", 28, "Developer")); // "Alice, 28 Jahre alt, Developer"
console.log(buildProfile("Bob", 40)); // "Bob, 40 Jahre alt"

// Exercise 3 solution

function processNumbers(numbers: number[], callback: (num: number) => number): number[] {
  return numbers.map((num) => callback(num));
}

// Example of use
const numbersArray = [1, 2, 3, 4, 5];

// Double each number
const doubled = processNumbers(numbersArray, (asdf) => asdf * 2); // here we pass the numbers array to the function, as well as the name of each single element which is being iterated through the array with the help of the callback function. That means, if we would rename "asdf" to something like "myNumber", I would need to change each occurance of "asdf"
console.log(doubled); // [2, 4, 6, 8, 10]

// Double each number with itself
const doubledWithItself = processNumbers(numbersArray, (number) => number * number);
console.log(doubledWithItself); // [1, 4, 9, 16, 25]
