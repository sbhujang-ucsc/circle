// Sidebar.tsx
const Sidebar = () => {
    return (
      <div className="flex-1 bg-[#B8D8ED] rounded-2xl shadow-xl shadow-gray-500 px-12 py-10 max-w-[50vh]">
        <div>
          <div className="h-0.5 bg-gray-400 my-4"></div>
          <div className="flex flex-col p-4 space-y-6">
            <p className="font-bold text-gray-600 text-2xl">STEP 1</p>
            <p className="text-gray-600 text-2xl font-semibold">Fill out a short questionnaire</p>
          </div>
          <div className="h-0.5 bg-gray-400 my-4"></div>
          <div className="p-4 space-y-6">
            <p className="font-bold text-gray-600 text-2xl">STEP 2</p>
            <p className="text-gray-600 text-2xl font-semibold">Call our smart AI assistant</p>
          </div>
          <div className="h-0.5 bg-gray-400 my-4"></div>
          <div className="p-4 space-y-6">
            <p className="font-bold text-[#356BBB] text-2xl">STEP 3</p>
            <p className="text-[#356BBB] text-2xl font-semibold">Get ready for your appointment!</p>
          </div>
          <div className="h-0.5 bg-gray-400 my-4"></div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  