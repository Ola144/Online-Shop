import ScrollToTop from "./ScrollToTop";

const Loader = () => {
  return (
    <>
      <ScrollToTop />
      <div className="bg-black/50 absolute top-0 left-0 w-full h-screen text-white z-40">
        <div className="flex justify-center items-center h-screen w-96 mx-auto">
          <div className="w-full py-3 rounded-md shadow-lg transition-all flex justify-center items-center gap-1">
            <span className="border-4 broder-t-4 border-white border-t-blue-400 p-2 rounded-full animate-spin"></span>
            Loading
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
