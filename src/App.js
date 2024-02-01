import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { newBoardDispatch } from "./redux/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import PrivateRoute from "./Auth/PrivateRoute";
import PublicRoutes from "./Auth/PublicRoutes";
const Home = React.lazy(() => import("./pages/Home"));
const SignIn = React.lazy(() => import("./Auth/SignIn"));
const Signup = React.lazy(() => import("./Auth/Signup"));

function App() {
  const Dataa = localStorage.getItem("persistedUser");
  const ParsedData = JSON.parse(Dataa);
  const userId = ParsedData?.id;
  const dispatch = useDispatch();
  const states = useSelector((card) => card.todo);
  const [stateToMap, setStateToMap] = useState(
    states?.currState === "mainCard" ? states?.mainCard : states?.newBoard
  );
  console.log("stateToMapstateToMap", stateToMap);
  const changeState = () => {
    dispatch(newBoardDispatch({ userId: userId }));

    if (states?.currState === "mainCard") {
      setStateToMap(states?.newBoard);
    } else {
      setStateToMap(states?.mainCard);
    }
  };

  return (
    <BrowserRouter>
      <Navbar changeState={changeState} />
      <Routes>
        <Route
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PrivateRoute />
            </Suspense>
          }
        >
          <Route exact path="/dashboard" element={<Home />} />
          <Route exact path="/" element={<Home />} />
        </Route>
        <Route
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PublicRoutes />
            </Suspense>
          }
        >
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
