"use client"; // For Next.js app router compatibility
import Image from "next/image";

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import pharmaLogo from '@/../public/images/pharmaLogo.png'

export default function Home() {
  const images = [
    "/images/pexels-rpnickson-2526128.jpg", // Replace with your image URLs
    "/images/pexels-jmark-253096.jpg",
    "/images/pexels-adrian-dorobantu-989175-2127733.jpg",
    "/images/pexels-peely-712618.jpg",
    "/images/pexels-thuanymarcante-1805053.jpg",
    "/images/pexels-mikebirdy-244206.jpg",
    "/images/pexels-nordic-overdrive-202768-627678.jpg",
    "/images/pexels-mikebirdy-112460.jpg",
    "/images/pexels-sarmad-mughal-94606-305070.jpg",
  ];
  return (
    <div>
      {/* navbar */}
      <div className="flex justify-between px-4 items-center h-[4rem] bg-form-bg">
        <span className="text-[1.5rem]">
          <Image src={pharmaLogo} alt="logo" className="w-[3rem] h-[3rem]" />
        </span>
        {/* <span>Menu</span> */}
      </div>

      {/* <div className="mt-5 flex flex-col border border-black justify-center items-center">
        <span>Contact number</span>
        <span>email</span>
      </div> */}
      {/* image slider */}
      <div className="w-full  mx-auto mt-4">
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
          <h1 className="text-[1.8rem] text-center font-semibold"><span className="text-primary-color font-extrabold">Welcome</span> To Our Website</h1>
          <div>
            <p><span className="text-primary-color">Vision : </span> Our vision is to be a leading pharmaceutical company in India and to become a significant global player by providing high quality, affordable and innovative solutions in medicine and treatment.</p>
          </div>

          <div className="mt-6">
            <p><span className="text-primary-color">Mission : </span> Our vision is to be a leading pharmaceutical company in India and to become a significant global player by providing high quality, affordable and innovative solutions in medicine and treatment.</p>
          </div>

          <div className="flex justify-center items-center">
            <button className="bg-primary-color text-white w-[10rem] h-[3rem] mt-5 text-[1.2rem] rounded-xl hover:bg-button-hover">
              Read More
            </button>
          </div>
        </div>

        {/* medicin card */}
      <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:gap-8 justify-center gap-4 items-center mx-4">

          <Card image_url={pharmaLogo} text="Anti-Biotics" />
          <Card image_url={pharmaLogo} text="Anti-Fungal" />
          <Card image_url={pharmaLogo} text="Anti-Histamine" />
          <Card image_url={pharmaLogo} text="Anti-Pyretic" />
          <Card image_url={pharmaLogo} text="Caugh Syrups" />
          <Card image_url={pharmaLogo} text="Gastric Products" />
        </div>
      </div>
      {/* contact form */}
      <form className="border border-border-color px-10 py-4 flex flex-col gap-4 my-6 mx-4 sm:mx-12 rounded-xl bg-form-bg text-gray-500 lg:w-[40rem] lg:mx-auto mt-10" >
        <h1 className="text-center text-[1.4rem]">Enquiry Form</h1>
        <input type="text" placeholder="Name" className="px-3 py-2  outline-none border border-gray-300 rounded-lg shadow-sm" />
        <input type="text" placeholder="Phone" className="px-3 py-2 outline-none border border-gray-300 rounded-lg shadow-sm" />
        <input type="text" placeholder="Email" className="px-3 py-2 outline-none border border-gray-300 rounded-lg shadow-sm" />
        <textarea
          id="message"
          rows="5"
          // value={text}
          // onChange={handleChange}
          placeholder="Write your message here..."
          className="w-full p-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm outline-none resize-none"
        />
        <div className="flex justify-center items-center">
          <button className="w-[10rem] h-[h-3rem] bg-primary-color text-white py-2 rounded-lg hover:bg-button-hover">Submit</button>
        </div>
      </form>

      <footer className="text-center bg-primary-color text-white py-3">
        <p>© 2022 Chemasia Pharmaceuticals. All Rights Reserved.</p>
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
    <div className="border border-border-color w-[12rem] h-[14rem] p-0 shadow-lg rounded-b-sm lg:w-[14rem] lg:h-[16.3rem]">
      <div>
        <Image src={image_url} alt={image_url} className=""/>
      </div>

      <div className="bg-secondary-color text-center text-white m-0">{text}</div>
    </div>
  )
}