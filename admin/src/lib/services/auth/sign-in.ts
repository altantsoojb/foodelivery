type Credentials = {
  email: string;
  password: string;
};

type SignInResponse = {
  accessToken: string;
};

export const signIn = async (credentials: Credentials) => {
  const response = await fetch(
    "https://foodelivery-3w6c.vercel.app/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    },
  );

  const data = (await response.json()) as SignInResponse;

  return data;
};
