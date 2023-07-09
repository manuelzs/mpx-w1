"use client";

import axios from "axios";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  token: Yup.string()
    .matches(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/)
    .required(),
});
type SchemaType = Yup.InferType<typeof Schema>;

const serverUri =
  process.env.NEXT_PUBLIC_VALIDATION_SERVER || "http://localhost:8000";

const ValidateToken = () => {
  const [claims, setClaims] = useState<string>("");

  const handleValidateToken = async (
    values: SchemaType,
    { setSubmitting }: FormikHelpers<SchemaType>
  ) => {
    try {
      const response = await axios.post(`${serverUri}/api/validate`, values);
      setClaims(JSON.stringify(response.data));
    } catch (e: unknown) {
      setClaims(JSON.stringify(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ token: "" }}
        validationSchema={Schema}
        onSubmit={handleValidateToken}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="token" name="token" component="textarea" rows={20} />
            <ErrorMessage name="token" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      {claims}
    </div>
  );
};
export default ValidateToken;
