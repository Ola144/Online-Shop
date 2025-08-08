const WhatWeOffer = () => {
  return (
    <div className="w-full px-10 py-5 my-5 bg-gradient-to-tr from-purple-400 to-purple-500 ">
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mx-auto sm:w-full w-full">
        <div className="text-center">
          <p className="text-white text-2xl md:text-3xl mb-2 font-bold">
            <i className="fa fa-calendar-o"></i>
          </p>
          <h2 className="font-black text-xs sm:text-xl mb-2">
            Book An Appointment
          </h2>
          <p className="text-xs sm:text-sm text-white font-bold">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
            laborum incidunt perferendis impedit perspiciatis quas.
          </p>
        </div>
        <div className="text-center">
          <p className="text-white text-2xl md:text-3xl mb-2 font-bold">
            <i className="fa fa-briefcase"></i>
          </p>
          <h2 className="font-black text-xs sm:text-xl mb-2">
            Pick Up In Store
          </h2>
          <p className="text-xs sm:text-sm text-white font-bold">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
            laborum incidunt perferendis impedit perspiciatis quas.
          </p>
        </div>
        <div className="text-center">
          <p className="text-white text-2xl md:text-3xl mb-2 font-bold">
            <i className="fa fa-gift"></i>
          </p>
          <h2 className="font-black text-xs sm:text-xl mb-2">
            Special Packing
          </h2>
          <p className="text-xs sm:text-sm text-white font-bold">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
            laborum incidunt perferendis impedit perspiciatis quas.
          </p>
        </div>
        <div className="text-center">
          <p className="text-white text-2xl md:text-3xl mb-2 font-bold">
            <i className="fa fa-refresh"></i>
          </p>
          <h2 className="font-black text-xs sm:text-xl mb-2">
            Free Global Returns
          </h2>
          <p className="text-xs sm:text-sm text-white font-bold">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
            laborum incidunt perferendis impedit perspiciatis quas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;
