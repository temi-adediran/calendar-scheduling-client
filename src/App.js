import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import 'flowbite';
import AuthProvider from "./hooks/useAuth";
import Loading from "./components/Loading";

const Home = React.lazy(() => import("./pages/Home"));
const Coach = React.lazy(() => import("./pages/Coach"));
const Student = React.lazy(() => import("./pages/Student"));
const Availability = React.lazy(() => import("./pages/Availability"));
const UpcomingCalls = React.lazy(() => import("./pages/UpcomingCalls"));

function App() {
  return (
    <div className="App mx-auto flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
      <Router>
        <AuthProvider>
          <React.Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coach" element={<Coach />} />
              <Route path="/student" element={<Student />} />
              <Route path="/availability" element={<Availability />} />
              <Route path="/upcoming-calls" element={<UpcomingCalls />} />
            </Routes>
          </React.Suspense>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
