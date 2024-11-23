"use client"; // For Next.js app router compatibility
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import pharmaLogo from '@/../public/images/pharmaLogo.png'
import AntiBiotic from '@/../public/images/anti-biotics.jpg'
import AntiFungal from '@/../public/images/anti-fungal.jpg'
import AntiHistamine from '@/../public/images/anti-histamine.jpg'
import AntiPyretic from '@/../public/images/anti-pyretic.jpg'
import GasticProduct from '@/../public/images/gastic-products.jpg'
import Syrup from '@/../public/images/syrup.jpg'
import axios from "axios";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Validation added: Helper function to validate email and phone
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation added: Check if all fields are filled and valid
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      return toast.error("All fields are required!");
    }
    if (!isValidEmail(formData.email)) {
      return toast.error("Please enter a valid email!");
    }
    if (!isValidPhone(formData.phone)) {
      return toast.error("Please enter a valid 10-digit phone number!");
    }

    setIsLoading(true);
    try {
      const res = await axios.post('/api/query', formData);
      if (res.statusText) {
        setIsLoading(false);
      }
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      return toast.success(res?.data?.message);
    } catch (error) {
      setIsLoading(false);
      return toast.error("Your query was not submitted.");
    }
  };

  const images = [
    "/images/doctor-8264057_1280.jpg",
    "/images/hospital-3089884_1280.jpg",
    "/images/approximately-3758130_1280.jpg",
  ];

  return (
    <div>
      <Toaster />
      {/* navbar */}
      <div className="flex justify-between px-4 items-center h-[4rem] bg-form-bg sticky top-0 z-10 ">
        <span className="text-[1.5rem]">
          <Image src={pharmaLogo} alt="logo" className="w-[4rem] h-[4rem]" />
        </span>
      </div>

      {/* image slider */}
      <div className="w-full mx-auto mt-4">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={3000}
          swipeable
          emulateTouch
          useKeyboardArrows
          className="rounded-lg shadow-lg"
        >
          {images.map((image, index) => (
            <div key={index} className="relative h-64 lg:h-[36rem] lg:w-full">
              <CarouselImage src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>

      {/* vision mission */}
      <div className="lg:flex gap-10 lg:px-[4rem]">
        <div className="mx-6 lg:mx-0 mt-6 border border-border-color rounded-xl shadow-md pt-10 px-3 pb-4 bg-form-bg lg:w-[45rem] lg:px-6 lg:pb-0 lg:h-[38rem]">
          <h1 className="text-[1.8rem] text-center font-semibold text-gray-800"><span className="text-button-hover font-extrabold">Welcome</span> To Our Website</h1>
          <div>
            <p className="text-gray-700"><span className="text-button-hover">Vision : </span> Our vision is to be a leading pharmaceutical company in India and to become a significant global player by providing high quality, affordable and innovative solutions in medicine and treatment.</p>
          </div>

          <div className="mt-6">
            <p className="text-gray-700"><span className="text-button-hover">Mission : </span> Our mission is to be a leading pharmaceutical company in India and to become a significant global player by providing high quality, affordable and innovative solutions in medicine and treatment.</p>
          </div>

          <div className="flex justify-center items-center">
            <button className="bg-primary-color text-white w-[10rem] h-[3rem] mt-5 text-[1.2rem] rounded-xl hover:bg-button-hover">
              Read More
            </button>
          </div>
        </div>

        {/* medicine card */}
        <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:gap-8 justify-center gap-4 items-center mx-4">
          <Card image_url={AntiBiotic} text="Anti-Biotics" />
          <Card image_url={AntiFungal} text="Anti-Fungal" />
          <Card image_url={AntiHistamine} text="Anti-Histamine" />
          <Card image_url={AntiPyretic} text="Anti-Pyretic" />
          <Card image_url={GasticProduct} text="Caugh Syrups" />
          <Card image_url={Syrup} text="Gastric Products" />
        </div>
      </div>

      {/* contact form */}
      <form
        onSubmit={handleSubmit}
        className="border border-border-color px-10 py-4 flex flex-col gap-4 my-6 mx-4 sm:mx-12 rounded-xl bg-form-bg text-gray-500 lg:w-[40rem] lg:mx-auto mt-10"
      >
        <h1 className="text-center text-[1.4rem]">Enquiry Form</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="px-3 py-2 outline-none border border-gray-300 rounded-lg shadow-sm"
          value={formData.name}
          onChange={handleChange}
          required // Validation added: Marked as required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="px-3 py-2 outline-none border border-gray-300 rounded-lg shadow-sm"
          value={formData.phone}
          onChange={(e) => {
            // Ensure only digits are allowed in the phone field
            const { value } = e.target;
            if (/^\d*$/.test(value) && value.length <= 10) {
              setFormData((prevData) => ({
                ...prevData,
                phone: value,
              }));
            }
          }}
          onBlur={() => {
            // Ensure the field has exactly 10 digits
            if (formData.phone.length !== 10) {
              alert("Phone number must be exactly 10 digits.");
            }
          }}

          required // Validation added: Marked as required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="px-3 py-2 outline-none border border-gray-300 rounded-lg shadow-sm"
          value={formData.email}
          onChange={handleChange}
          required // Validation added: Marked as required
        />
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          className="w-full p-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm outline-none resize-none"
          required // Validation added: Marked as required
        />
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="w-[10rem] h-[3rem] bg-primary-color text-white py-2 rounded-lg hover:bg-button-hover"
          >
            {isLoading ? (
              <ClipLoader
                color={color}
                loading={isLoading}
                cssOverride={override}
                size={24}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <span>Submit</span>
            )}
          </button>
        </div>
      </form>

      <footer className=" md:flex md:justify-between bg-primary-color text-white py-3">
        <div className="flex flex-col gap-3 ml-10">
          <span>Mobile : +918210783479</span>
          <span>Email : info@chemasia.in</span>
        </div>
        <p className="mt-4 ml-10 ">© 2022 Chemasia Pharmaceuticals. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

const CarouselImage = ({ src, alt, className }) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill // Replaces layout="fill"
        // style={{ objectFit: "cover" }} // Ensures image covers the container
        priority={false} // Set to true for critical images
        className=""
      />
    </div>
  );
};

const Card = ({ text, image_url }) => {
  return (
    <div className="border border-border-color w-[15rem] h-[12rem] p-0 shadow-lg rounded-b-sm lg:w-[16rem] lg:h-[14rem]">
      <div className="lg:h-[12rem]">
        <Image src={image_url} alt={image_url} className="lg:h-[12rem] h-[10rem]" />
      </div>

      <div className="bg-secondary-color text-center text-white mb-1">{text}</div>
    </div>
  )
}