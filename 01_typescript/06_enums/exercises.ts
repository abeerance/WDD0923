// Exercise 1 Solution

enum DaysOfWeek {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

function isWeekend(day: DaysOfWeek): boolean {
  return day === DaysOfWeek.Saturday || day === DaysOfWeek.Sunday;
}

// Testing of isWeekend function
console.log("Is Monday a weekend?", isWeekend(DaysOfWeek.Monday)); // false
console.log("Is Saturday a weekend?", isWeekend(DaysOfWeek.Saturday)); // true

// Optional exercise
function nextDay(day: DaysOfWeek): DaysOfWeek {
  // Calculate the next day, wrapping around from Sunday to Monday
  const next = (day + 1) % 7;
  return next;
}

// Testing of nextDay function
console.log("Day after Monday", DaysOfWeek[nextDay(DaysOfWeek.Monday)]); // Tuesday => DaysOfWeek[1]
console.log("Day after Friday", DaysOfWeek[nextDay(DaysOfWeek.Friday)]); // Saturday => DaysOfWeek[5]
console.log("Day after Sunday", DaysOfWeek[nextDay(DaysOfWeek.Sunday)]); // Monday => DaysOfWeek[0]

console.clear();
// Exercise 2 Solution

enum ApiStatus {
  Success = "SUCCESS",
  Error = "ERROR",
  Loading = "LOADING",
  Timeout = "TIMEOUT",
}

function simulateApiCall(endpoint: string): Promise<ApiStatus> {
  console.log(`Calling API endpoint: ${endpoint}...`);

  // Simulation of random response after a delay
  return new Promise((resolve) => {
    // Simluate random response after a delay
    const delay = 1000 + Math.random() * 1000; // 1-2 seconds

    setTimeout(() => {
      // simulate random outcome (70% success rate)
      const random = Math.random();
      let result: ApiStatus;

      if (random < 0.7) {
        result = ApiStatus.Success;
      } else if (random < 0.9) {
        result = ApiStatus.Error;
      } else {
        result = ApiStatus.Timeout;
      }

      // now we need to resolve the promise and give the resolving promise function our return
      resolve(result);
    }, delay);
  });
}

function handleApiResponse(status: ApiStatus): void {
  console.log(`API returned status: ${status}`);

  switch (status) {
    case ApiStatus.Success:
      console.log("Data retrieved succesfully");
      break;
    case ApiStatus.Error:
      console.log("An error occured while fetching data");
      break;
    case ApiStatus.Timeout:
      console.log("Request timed out, please try again");
      break;
    default:
      console.log("Unkown status received");
  }
}

// Test the functions
async function testApiCalls() {
  // Promises are always async, they are NEVER synchronous calls
  // Mock several API calls
  for (let i = 0; i < 10; i++) {
    const endpoint = `/api/data/${i + 1}`;
    const status = await simulateApiCall(endpoint);
    handleApiResponse(status);
    console.log("---");
  }
}

testApiCalls();

console.clear();
