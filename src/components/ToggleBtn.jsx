import React from 'react'

export default function ToggleBtn({toggleUnit, unit}) {
  return (
    <>
       <div className="flex justify-between">
            <h1 className="text-[#9C9A9C] text-lg font-semibold">
              Current Weather
            </h1>
            {/* switching b/w C and F */}
            <div
              className="w-[10%] rounded bg-[#219DEC] relative flex items-center px-1 py-1 text-lg font-semibold"
              onClick={toggleUnit}
            >
              <div
                className={`w-[30px] h-[85%] absolute bg-white rounded transition-all 0.3 ${
                  unit === "metric" ? "f" : "c"
                }`}
              ></div>
              <span className="c">C</span>
              <span className="f">F</span>
            </div>
          </div>
    </>
  )
}
