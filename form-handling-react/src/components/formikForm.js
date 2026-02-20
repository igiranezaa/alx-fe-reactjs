import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function FormikForm() {
  return (
    <div>
      <h2>Registration Form (Formik)</h2>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
      >
        <Form>
          <div>
            <label>Username</label>
            <Field name="username" placeholder="Enter username" />
            <ErrorMessage name="username" component="p" style={{ color: "crimson" }} />
          </div>

          <div>
            <label>Email</label>
            <Field name="email" type="email" placeholder="Enter email" />
            <ErrorMessage name="email" component="p" style={{ color: "crimson" }} />
          </div>

          <div>
            <label>Password</label>
            <Field name="password" type="password" placeholder="Enter password" />
            <ErrorMessage name="password" component="p" style={{ color: "crimson" }} />
          </div>

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}