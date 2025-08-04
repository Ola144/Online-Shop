const Newsletter = () => {
  return (
    <div className="w-full bg-no-repeat bg-cover h-full newsLetter pt-20 text-center">
      <h1 className="font-black text-4xl text-wrap font-mono mb-10">
        SIGN UP FOR OUR NEWSLETTER
      </h1>
      <div className="mx-auto my-12 newsLetterFormDiv" style={{ width: 400 }}>
        <input
          type="email"
          className="outline-none bg-white text-gray-500 py-3 px-2 rounded-lg mb-1 w-full shadow-xl border-2 border-black placeholder:text-gray-500 placeholder:font-bold"
          placeholder="Your Email Address"
        />
        <button className="bg-black hover:bg-black/90 text-white w-full py-3 rounded-lg mt-1">
          Sign Up
        </button>
      </div>
      <div className="mt-32 w-full relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 w-fit mx-auto">
          <img src="assets/insta-item1.jpg" alt="Img" className="w-full" />
          <img src="assets/insta-item2.jpg" alt="Img" className="w-full" />
          <img src="assets/insta-item3.jpg" alt="Img" className="w-full" />
          <img src="assets/insta-item4.jpg" alt="Img" className="w-full" />
          <img src="assets/insta-item5.jpg" alt="Img" className="w-full" />
          <img src="assets/insta-item6.jpg" alt="Img" className="w-full" />
        </div>
        <div className="flex justify-center items-center">
          <button className="w-56 text-white bg-black hover:bg-black/90 rounded-md py-2 px-5 absolute -bottom-3 ">
            Follow Us Instagram
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
