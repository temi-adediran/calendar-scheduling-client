import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import 'flowbite';
import AuthProvider from "./hooks/useAuth";
import Loading from "./components/Loading";

const Home = React.lazy(() => import("./pages/Home"));
const Coach = React.lazy(() => import("./pages/Coach"));
const Student = React.lazy(() => import("./pages/Student"));

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <React.Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coach" element={<Coach />} />
              <Route path="/student" element={<Student />} />
            </Routes>
          </React.Suspense>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
