import * as React from "react";
import { useAuth } from "../hooks/useAuth";

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
      <button onClick={signInAsCoach}>Log in as Coach</button>
      <br />
      <br />
      <button onClick={signInAsStudent}>Log in as Student</button>
    </>
  )
}

export default Home;
