import React from "react";
import { useFormik, withFormik } from "formik";

const SignupForm = () => {
  const formik = useFormik({
    onSubmit: (touched) => {
      alert(JSON.stringify(touched, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <br />
      <label htmlFor="name">name</label>
      <input
        id="name"
        name="name"
        type="name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

function newEditTest() {
  return <SignupForm />;
}

export default newEditTest;
