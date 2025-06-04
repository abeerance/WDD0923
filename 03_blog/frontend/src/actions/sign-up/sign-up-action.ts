"use server";
// this is a use server directive. This says, that this function will be called on the Next.js server, so that we have a secure connection to the backend. This function will be called in the frontend and sends it then to the backend. This way, all we see in the console is, that we are communicating with our hosted server e.g. http://localhost:3000 instead of the productive backend server e.g. http://127.0.0.1:8000

// a server action is always async
export async function signupAction(data: {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}) {
  // try catch communication
  try {
    // send the request to the API
    const response = await fetch(`${process.env.BACKEND_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        username: data.username,
        password: data.password,
        password_confirmation: data.password_confirmation,
      }),
    });

    // check if response is not ok
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Signup failed",
      };
    }

    // if response is successfull
    const result = await response.json();
    return {
      success: true,
      data: result,
    };
  } catch {
    return {
      success: false,
      error: "An unexpected error occured",
    };
  }
}
