import "./App.css";
import Home from "./components/HomePage/Home";
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
      <Home />
    </>
  );
}

export default App;
