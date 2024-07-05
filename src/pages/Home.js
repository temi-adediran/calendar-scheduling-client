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
    <>
      <br />
      <br />
      <Button onClick={signInAsCoach}>Log in as Coach</Button>
      <br />
      <br />
      <Button onClick={signInAsStudent}>Log in as Student</Button>
    </>
  )
}

export default Home;
