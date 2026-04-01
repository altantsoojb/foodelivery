"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/services/auth/sign-in";
import { useState } from "react";

export default function Home() {
  return (
    <div className="w-[1440px] mx-auto border border-red-500 h-screen flex justify-between">
      <div>
        <SignIn />
      </div>
      <div className="w-[900px] border border-red-400 overflow-hidden rounded-4xl">
        <img
          src="/images/img.png"
          height="100%"
          width="100%"
          className="object-cover"
        />
      </div>
    </div>
  );
}

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const credentials = {
      email,
      password,
    };
    try {
      const data = await signIn(credentials);

      localStorage.setItem("token", data?.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-100">
      <Input
        placeholder="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        placeholder="password"
        // type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button onClick={onSubmit}>Sign in</Button>
    </div>
  );
};
