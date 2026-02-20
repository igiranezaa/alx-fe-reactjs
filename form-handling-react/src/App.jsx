import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <RegistrationForm />
      <hr />
      <FormikForm />
    </div>
  );
}