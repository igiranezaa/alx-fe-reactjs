import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

export default function App() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 30 }}>
      <RegistrationForm />
      <hr />
      <FormikForm />
    </div>
  );
}