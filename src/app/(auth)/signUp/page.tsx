"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  name: Yup.string().min(2, "Too Short!").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
});

const handleSubmit = async (values: any, { resetForm }: any) => {
  try {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    debugger;
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Something went wrong");

    alert("✅ User registered successfully!");
    console.log("Saved user:", data);

    resetForm();
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    alert("❌ " + error.message);
  }
};

export default function SignUpForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-800 font-sans">
                Name
              </label>
              <Field
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

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
              Sign Up
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
