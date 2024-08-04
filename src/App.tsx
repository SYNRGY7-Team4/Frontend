import { Route, Routes, useLocation } from "react-router-dom";
import Button from "@/components/Button/Button";
import {
  Login,
  Register,
  Verification_OTP,
  Password,
  Verification_E_KTP,
  DataDiri,
  AturPin,
  ForgotPassword,
  FPVerification_OTP,
  Dashboard,
  Notifikasi,
  DataDiriDua,
  InputPin,
  NotFound,
  UnderDevelopment,
  TransferForm,
  NewPassword,
  Mutasi,
} from "@/pages";
import ProtectedRoutes from "@/utils/ProtectedRoutes";
import UserSession from "@/components/UserSession/UserSession";

function App() {
  const location = useLocation();

  return (
    <>
      <UserSession />
      <Routes key={location.pathname} location={location}>
        <Route
          path="/"
          element={
            <>
              <div className="text-secondary-red shadow-03">Hello World</div>

              <Button
                variant="primary"
                className="bg-primary-darkBlue"
                disabled={false}
                size="md"
              >
                Custom Button
              </Button>
            </>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/register/otp" element={<Verification_OTP />} />
        <Route path="/register/password" element={<Password />} />
        <Route path="/register/data-diri" element={<DataDiri />} />
        <Route path="/register/data-diri-dua" element={<DataDiriDua />} />
        <Route path="/register/ktp" element={<Verification_E_KTP />} />
        <Route path="/register/atur-pin" element={<AturPin />} />

        <Route path="/reset/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset/otp" element={<FPVerification_OTP />} />
        <Route path="/reset/new-password" element={<NewPassword />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/notifikasi" element={<Notifikasi />} />

          <Route path="/transfer" element={<TransferForm />} />
          <Route path="/transfer/input-pin" element={<InputPin />} />

          <Route path="/mutasi" element={<Mutasi />} />
        </Route>

        <Route path="/under-development" element={<UnderDevelopment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
