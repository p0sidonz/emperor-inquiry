'use client'
import { useState } from "react";
import Image from "next/image";

import PrismaClient from "../utils/prismaclient";

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    isMember: false,
    isReturning: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const { firstName, lastName, phone, email, isMember, isReturning } = formData;
    const data = { firstName, lastName, phone, email, isMember, isReturning };
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    console.log("res", response)
    if (response.status === 201) {
      alert(response.message);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        isMember: false,
        isReturning: false,
      });
    } else {
      alert(response.message);
    }

  };



  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-200 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to EmperorFitness
        </p>

      </div>
      <form onSubmit={handleSubmit} className="bg-white text-black shadow-md rounded px-8 pt-6 pb-8 mb-4 container mx-auto mt-20">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
          <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
          <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Mobile</label>
          <input type="number" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <input type="checkbox" name="isMember" id="isMember" checked={formData.isMember} onChange={handleChange} className="mr-2 leading-tight" />
          <label htmlFor="isMember" className="text-gray-700 text-sm font-bold">Are you a member?</label>
        </div>
        <div className="mb-4">
          <input type="checkbox" name="isReturning" id="isReturning" checked={formData.isReturning} onChange={handleChange} className="mr-2 leading-tight" />
          <label htmlFor="isReturning" className="text-gray-700 text-sm font-bold">Are you a returning user?</label>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </div>
      </form>
    </main>
  );
}
