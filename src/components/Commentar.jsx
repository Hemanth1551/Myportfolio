import React from "react";

const Komentar = () => {
  return (
    <div className="w-full flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 py-12 backdrop-blur-xl shadow-xl">
      <div className="text-center space-y-6">
        <div className="relative w-100 h-100 sm:w-100 sm:h-100 mx-auto">
          <img
            src="9gu9.gif"
            alt="Connect with me via email"
            className="w-full h-full object-cover rounded-full mix-blend-multiply"
            loading="lazy"
          />
        </div>
        <h3 className="text-xl font-semibold text-white">Connect With Me</h3>
        <p className="text-gray-300 text-sm max-w-sm mx-auto">
          Reach out via email to collaborate, ask questions, or just say hello.
        </p>
      </div>
    </div>
  );
};

export default Komentar;
