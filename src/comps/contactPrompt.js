import React from "react";
import { useGeneral } from "../contexts/generalContext";
import pexel from "./assets/pexel.jpg";

const ContactPrompt = () => {
  const { generalInfo, loading: generalLoading } = useGeneral();

  return (
    <div className=" w-full px-5 md:px-10 lg:px-20 py-16">
      <div
        className="bg-cover bg-center rounded-lg text-center h-[450px] flex flex-col items-center justify-center "
        style={{
          backgroundImage: `url(${pexel})`,
        }}
      >
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 font-Archivo">
          Get in Touch With Us!
        </h2>
        {generalLoading ? (
          <p className="text-white text-lg">Loading contact details...</p>
        ) : (
          <>
            <p className="text-white text-lg md:text-xl mb-6 font-Ubuntu px-4 md:px-[10%]">
              Reach out to us for inquiries, collaborations, or submissions.
              We'd love to hear from you and explore new opportunities together.
            </p>
            <a
              href={`mailto:${generalInfo?.email}`}
              className="bg-white text-black font-medium py-3 px-6 font-Ubuntu rounded-full shadow hover:bg-gray-100 transition duration-300"
            >
              Email Us at {generalInfo?.email}
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactPrompt;
