import * as React from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "flowbite-react";

function Home() {
  const { login } = useAuth();

  const signInAsCoach = async () => {
    const data = { user_type: "coach" }
    login(data);
  }

  const signInAsStudent = async () => {
    const data = { user_type: "student" }
    login(data);
  }

  return (
    <div className="mx-auto flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
      <br />
      <br />
      <Button onClick={signInAsCoach}>Log in as Coach</Button>
      <br />
      <br />
      <Button onClick={signInAsStudent}>Log in as Student</Button>
    </div>
  )
}

export default Home;
