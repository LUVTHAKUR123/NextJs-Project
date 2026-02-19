"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function SignInPage() {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "At least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values: any, { resetForm }: any) => {
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      alert("✅ Logged in successfully!");
      console.log("Logged in user:", data);
      resetForm();
    } catch (error) {
      console.error("❌ Error:", (error as Error).message);
      alert("❌ " + (error as Error).message);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form className="space-y-5">
              {/* Email */}
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-800 font-sans">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-800 font-sans">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
              >
                Sign In
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
