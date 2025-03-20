// const userName: string = "My username";

// const age: number = 26;

// const isActive: boolean = true;

// const hobbies: string[] = ["Music", "Gaming", "Reading"];

// const userInformation: [number, string, boolean] = [6, userName, isActive];

// const greetUser = (userName: string) => {
//   console.log(`Hello ${userName}, welcome to the webapp`);
// };

// greetUser(userName);

// const numberOrNull: number | null = null;

// Lösung für Übung 1
// 1. Der Name eines Benutzers
let userName: string = "Alice";

// 2. Das Alter eines Benutzers
let userAge: number = 28;

// 3. Ob der Benutzer aktiv ist oder nicht
let isUserActive: boolean = true;

// 4. Eine Liste der Hobbys des Benutzers
let userHobbies: string[] = ["Lesen", "Schwimmen", "Programmieren"];
// let userHobbies: Array<string> = ["Lesen", "Schwimmen", "Programmieren"];

// 5. Das Tuple mit Benutzerinformationen: [id, name, active]
let userInfo: [number, string, boolean] = [1, userName, isUserActive];

// 6. Eine Funktion, die den Namen eines Benutzers entgegennimmt und eine Begrüssungsnachricht zurückgibt
// function greetUser(name: string): string {
//   return `Hallo, ${name}! Willkommen zurück.`;
// }
function greetUser(name: string): void {
  console.log(`Hallo, ${name}! Willkommen zurück.`);
}

// call the function to have see something in the terminal
greetUser(userName);

// 7. Eine Variable, die entweder eine Zahl oder null sein könnte
let userId: number | null = null;
// Später können wir einen Wert zuweisen
userId = 42;
