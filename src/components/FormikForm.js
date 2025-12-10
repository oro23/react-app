import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function FormikForm() {
  const [response, setResponse] = React.useState(null);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  return (
    <div style={{ width: "400px", margin: "200px auto" }}>
      <h2>Add a New Post</h2>

      <Formik
        initialValues={{ title: "", content: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const res = await axios.post(
              "https://jsonplaceholder.typicode.com/posts",
              values
            );
            setResponse(res.data);
          } catch (error) {
            console.error("Error submitting post:", error);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ marginBottom: "10px" }}>
              <label>
                Title:
                <Field
                  type="text"
                  name="title"
                  style={{
                    width: "100%",
                    padding: "8px",
                    boxSizing: "border-box",
                  }}
                  className="form-control"
                />
              </label>
              <ErrorMessage
                name="title"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>
                Content:
                <Field
                  as="textarea"
                  name="content"
                  style={{
                    width: "100%",
                    padding: "8px",
                    boxSizing: "border-box",
                  }}
                  className="form-control"
                />
              </label>
              <ErrorMessage
                name="content"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <button
              type="submit"
              style={{ padding: "10px 15px" }}
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Post"}
            </button>
          </Form>
        )}
      </Formik>
      {response && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
