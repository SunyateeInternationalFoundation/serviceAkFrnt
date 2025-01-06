import "./App.css";
import Login from "./components/ProviderLogin/Login";
function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Register />} />
    //     <Route path="/signin" element={<Login />} />
    //   </Routes>
    // </Router>
    <>
      {/* <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes> */}
      <Login />
    </>
  );
}

export default App;
