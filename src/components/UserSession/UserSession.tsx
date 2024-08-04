import { useTokenExpire } from "@/utils/TokenExpiredCheck";
import Alert from "@/components/Alert/Alert";

export default function UserSession() {
  const { showAlert, handleLogout } = useTokenExpire();
  return (
    <>
      <Alert
        variant="danger"
        isOpen={showAlert}
        onClose={handleLogout}
        autoDismiss={true}
        showCloseButton={false}
      >
        <p>Sesi anda sudah habis. Silahkan login kembali</p>
      </Alert>
    </>
  );
}
