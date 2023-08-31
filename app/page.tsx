"use client";

import { useState } from "react";
import { z } from "zod";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<any>(null);

  // zod
  const FormData = z.object({
    name: z
      .string()
      .min(2, { message: "2文字以上入力する必要があります。" })
      .max(50),
    email: z
      .string()
      .email({ message: "メールアドレスの形式ではありません。" }),
    message: z
      .string()
      .min(5, { message: "5文字以上入力する必要があります。" }),
  });

  type Copy = z.infer<typeof FormData>;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(null);
    const result = FormData.safeParse(formData);
    console.log(formData);
    if (!result.success) {
      console.log(result.error.format());
      setErrors(result.error.format());
    }
  };
  return (
    <main className="p-24">
      <form className="p-3 text-black" onSubmit={handleSubmit}>
        <label className="block">
          <div className="text-white">Name:</div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors?.name && (
            <div className="text-white">{errors.name._errors[0]}</div>
          )}
        </label>

        <label className="block">
          <div className="text-white">Email:</div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors?.email && (
            <div className="text-white">{errors.email._errors[0]}</div>
          )}
        </label>

        <label className="block">
          <div className="text-white">Message:</div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors?.massage && (
            <div className="text-white">{errors.massage._errors[0]}</div>
          )}
        </label>

        <button className="text-white" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
