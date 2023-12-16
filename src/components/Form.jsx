import React from 'react'

function Form({handleCitySearch, loadings, city, setCity}) {
  return (
    <>
         <form
          className="w-full bg-white rounded h-[5vh] px-4 flex justify-between items-center"
          autoComplete="off"
          onSubmit={handleCitySearch}
        >
          <label htmlFor="search">
            <i
              class="fa-solid fa-magnifying-glass"
              style={{ fontSize: "1.4rem", color: "#2493DF" }}
            ></i>
          </label>
          <input
            type="text"
            placeholder="Search here...."
            required
            id="search"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full pl-2 outline-0 text-lg"
            readOnly={loadings} //input will be read only until loading is true
          />
          <button type="submit" className="text-[#2493DF] font-bold">
            GO
          </button>
        </form>
    </>
  )
}

export default Form