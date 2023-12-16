import React from 'react'
import Icon from 'react-icons-kit';
import {search} from 'react-icons-kit/feather/search';

function Form({handleCitySearch, loadings, city, setCity}) {
  return (
    <>
         <form
          className="w-full bg-white rounded h-[5vh] px-4 flex justify-between items-center"
          autoComplete="off"
          onSubmit={handleCitySearch}
        >
          <label htmlFor="search">
            <Icon icon={search} size={25} className='text-[#2493DF]'/>
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
          <button type="submit" className="text-[#2493DF] font-bold hover:bg-[#2493DF] hover:text-white rounded px-2 transition ease-in-out delay-150  hover:scale-110 duration-300">
            GO
          </button>
        </form>
    </>
  )
}

export default Form