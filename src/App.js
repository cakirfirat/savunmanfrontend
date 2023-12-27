import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { connect } from "react-redux";
import Packages from "./pages/index/Packages";
import CreateLawyer from "./pages/auth/createLawyer";
import CreateEnterprise from "./pages/auth/createEnterprise";
import VerifyCode from "./pages/auth/veriyCode";
import Checkout from "./pages/payment/checkout";
import Dashboard from "./pages/index/Dashboard";

function App(props) {
  return (
    <div className="App">
      <Routes>
        <Route path="/giris-yap" element={<Login />}></Route>
        <Route path="/kayit-ol" element={<Register />}></Route>
        <Route path="/kaydi-tamamla" element={<VerifyCode />}></Route>
        <Route path="/paketler" element={<Packages />}></Route>
        <Route path="/profil-avukat" element={<CreateLawyer />}></Route>
        <Route path="/profil-buro" element={<CreateEnterprise />}></Route>
        <Route path="/odeme" element={<Checkout />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(App);
