import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  username: Yup.string().trim().required("Username is required"),
  email: Yup.string().trim().email("Invalid email").required("Email is required"),
  password: Yup.string().trim().min(6, "At least 6 characters").required("Password is required"),
});

export default function FormikForm() {
  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <h2>Formik Registration Form</h2>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={schema}
        onSubmit={async (values, { resetForm, setSubmitting, setStatus }) => {
          setStatus(null);
          try {
            // Mock API call
            await new Promise((r) => setTimeout(r, 800));
            setStatus({ type: "success", message: `Registered ✅ (${values.email})` });
            resetForm();
          } catch (e) {
            setStatus({ type: "error", message: "Registration failed ❌" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form style={{ display: "grid", gap: 12 }}>
            {status?.message && (
              <p style={{ padding: 10, borderRadius: 6, background: status.type === "success" ? "#e9ffe9" : "#ffe9e9" }}>
                {status.message}
              </p>
            )}

            <div>
              <label>Username</label>
              <Field name="username" placeholder="Enter username" style={{ width: "100%", padding: 10 }} />
              <div style={{ color: "crimson" }}>
                <ErrorMessage name="username" />
              </div>
            </div>

            <div>
              <label>Email</label>
              <Field name="email" placeholder="Enter email" style={{ width: "100%", padding: 10 }} />
              <div style={{ color: "crimson" }}>
                <ErrorMessage name="email" />
              </div>
            </div>

            <div>
              <label>Password</label>
              <Field type="password" name="password" placeholder="Enter password" style={{ width: "100%", padding: 10 }} />
              <div style={{ color: "crimson" }}>
                <ErrorMessage name="password" />
              </div>
            </div>

            <button disabled={isSubmitting} style={{ padding: 10, cursor: "pointer" }}>
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}