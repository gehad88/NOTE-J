import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Categories from "./Pages/Categories";
import Notes from "./Pages/Notes";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import NotFound from "./Pages/NotFound";
import NoteDetails from "./Component/NOTE/NoteDetails";
import InstaNotFound from "./Pages/InstaNotFound";
import Test from "./Component/Test";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Categories" element={<Categories />}></Route>
          <Route path="/Notes" element={<Notes />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Signup" element={<SignUp />}></Route>
          <Route path="/NotFound" element={<NotFound />}></Route>
          <Route path="/Notes/NoteDetails/:noteId" element={<NoteDetails />} />
          <Route path="/InstaNotFound" element={<InstaNotFound />}></Route>
          <Route path="/test" element={<Test />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
