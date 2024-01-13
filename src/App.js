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
import Clients from "./pages/client/Clients";
import Cases from "./pages/case/Cases";
import Client from "./pages/client/Client";
import Payment from "./pages/payment/Payment";
import Settings from "./pages/settings/Settings";

function App(props) {
  return (
    <div className="App">
      <Routes>
        <Route path="/giris-yap" element={<Login />}></Route>
        <Route path="/kayit-ol" element={<Register />}></Route>
        <Route path="/kaydi-tamamla" element={<VerifyCode />}></Route>
        <Route path="/paketler" element={<Packages />}></Route>
        <Route path="/" element={<Packages />}></Route>
        <Route path="/profil-avukat" element={<CreateLawyer />}></Route>
        <Route path="/profil-buro" element={<CreateEnterprise />}></Route>
        <Route path="/odeme" element={<Checkout />}></Route>
        <Route path="/odemeler" element={<Payment />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/muvekkillerim" element={<Clients />}></Route>
        <Route path="/davalarim" element={<Cases />}></Route>
        <Route path="/muvekkil/:Id" element={<Client />}></Route>
        <Route path="/ayarlar" element={<Settings />}></Route>
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(App);
