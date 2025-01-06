import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/HomePage/Home";
import Login from "./components/ProviderLogin/Login";
function App() {
  const providerDetails = useSelector((state) => state.provider);
  const isAuth = providerDetails?.isLogin;
  return (
    <>
      <Routes>
        {!isAuth ? (
          <Route path="/" element={<Login />}></Route>
        ) : (
          <Route path="/*" element={<Home />}></Route>
        )}
      </Routes>
    </>
  );
}

export default App;
