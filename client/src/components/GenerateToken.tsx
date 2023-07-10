"use client";

import axios from "axios";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  uid: Yup.string().email().required(),
});
type SchemaType = Yup.InferType<typeof Schema>;

const serverUri =
  process.env.NEXT_PUBLIC_TOKEN_SERVER || "http://localhost:8000";

const GenerateToken = () => {
  const [token, setToken] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");

  const handleGenerateToken = async (
    values: SchemaType,
    { setSubmitting }: FormikHelpers<SchemaType>
  ): Promise<void> => {
    setServerError("");
    try {
      const {
        data: { token },
      } = await axios.post<{ token: string }>(`${serverUri}/api/generate`, values);
      setToken(token);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setServerError(e.message);
      } else {
        alert(e);
      }
    } finally {
      setSubmitting(false);
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <div>
      <Formik
        initialValues={{ uid: "" }}
        validationSchema={Schema}
        onSubmit={handleGenerateToken}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field label="Email" name="uid" placeholder="user@example.com" />
            <ErrorMessage name="uid" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <textarea rows={20} value={token || serverError} readOnly={true} />
      <button type="button" onClick={handleCopy} disabled={!token}>
        Copy
      </button>
    </div>
  );
};
export default GenerateToken;
