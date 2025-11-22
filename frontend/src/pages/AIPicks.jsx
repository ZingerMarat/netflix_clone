import React from "react"

const AIPicks = () => {
  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center px-5"
      style={{
        backgroundImage:
          "linear-gradient(rgb(0,0,0,0.5), rgba(0,0,0,0.5)), url(/background_banner.jpg)",
      }}
    >
      <div className="relative w-full max-w-md mx-auto rounded-2xl bg-[#181818]/90 shadow-2xl border border-[#333] px-8 py-10 flex flex-col items-center min-h-[480px]">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-white tracking-tight drop-shadow-lg">
          AI Movie Recommendations
        </h2>

        <div className="w-full flex items-center mb-8">
          <div className="h-2 flex-1 bg-[#232323] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#e50914] transition-all duration-300"
              style={{ width: "50%" }}
            ></div>
          </div>

          <span className="ml-4 text-white text-sm font-semibold">2/5</span>
        </div>

        <div className="w-full flex-1 flex flex-col">
          <div className="flex-1 mb-6">
            <h3 className="text-lg font-semibold text-white text-center my-3">
              What is your preferred genre?
            </h3>

            <div className="grid grid-cols-1 gap-3">
              <button className="w-full py-3 rounded-xl border-2 border-[#333] bg-[#232323] text-white font-semibold hover:bg-[#e50914] transition duration-300">
                Option 1
              </button>
              <button className="w-full py-3 rounded-xl border-2 border-[#333] bg-[#232323] text-white font-semibold hover:bg-[#e50914] transition duration-300">
                Option 2
              </button>
            </div>

            <div className="flex justify-between mt-6">
              <button className="py-2 px-4 rounded-lg border-2 border-[#333] bg-[#232323] text-white font-semibold hover:bg-[#232323]/50 transition duration-300">
                Back
              </button>
              <button className="py-2 px-4 rounded-lg border-2 border-[#333] bg-[#e50914] text-white font-semibold hover:bg-[#e50914]/50 transition duration-300">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIPicks
