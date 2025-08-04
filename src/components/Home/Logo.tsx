const Logo = () => {
  return (
    <div className="w-full mx-auto my-20 px-10 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 w-full mx-auto justify-center">
        <div className="mx-auto">
          <img src="assets/logo1.png" alt="Logo" className="w-42 logo" />
        </div>
        <div className="mx-auto">
          <img src="assets/logo2.png" alt="Logo" className="w-42 logo" />
        </div>
        <div className="mx-auto">
          <img src="assets/logo3.png" alt="Logo" className="w-42 logo" />
        </div>
        <div className="mx-auto">
          <img src="assets/logo4.png" alt="Logo" className="w-42 logo" />
        </div>
        <div className="mx-auto">
          <img src="assets/logo5.png" alt="Logo" className="w-42 logo" />
        </div>
      </div>
    </div>
  );
};

export default Logo;
