import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import MyNotes from "./Components/MyNotes";
import LandingPage from "./Components/Screens/landing Page/LandingPage";
import LoginScreen from "./Components/Screens/loginScreen/LoginScreen";
import NotFound from "./Components/Screens/NotFound/NotFound";
import RegisterScreen from "./Components/Screens/RegisterScreen/RegisterScreen";
import CreateNote from "./Components/Screens/SingleNote/CreateNote";
import SingleNote from "./Components/Screens/SingleNote/SingleNote";
import ProfileScreen from './Components/Screens/ProfileScreen/ProfileScreen'


function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header setSearch={setSearch} />

      <Routes>
        <Route path="/" element={<LandingPage />} exact></Route>
        <Route path="/login" element={<LoginScreen />}></Route>
        <Route path="/register" element={<RegisterScreen />}></Route>
        <Route path="/mynotes" element={<MyNotes search={search} />}></Route>
        <Route path="/createnote" element={<CreateNote />}></Route>
        <Route path="/note/:id" element={<SingleNote />}></Route>
        <Route path="/profile" element={<ProfileScreen />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
