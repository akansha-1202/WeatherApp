import React from 'react';
import Icon from 'react-icons-kit';
import {arrowUp} from 'react-icons-kit/feather/arrowUp';
import {arrowDown} from 'react-icons-kit/feather/arrowDown';
import {activity} from 'react-icons-kit/feather/activity';
import {droplet} from 'react-icons-kit/feather/droplet';
import {wind} from 'react-icons-kit/feather/wind';



function WeatherDetails({citySearchData}) {
  return (
    <>
      {
        citySearchData && citySearchData.data ? (
          <div className='grid lg:grid-cols-2 p-4 text-[#219DEC]'>
            <div className='lg:border-r-2 pr-6'>
                <h1 className='font-bold text-lg'>
                   {citySearchData.data.name}
                </h1>
                <div className='flex justify-around items-center gap-x-2'>
                    <img src={`https://openweathermap.org/img/wn/${citySearchData.data.weather[0].icon}@2x.png`} alt='icon'/>
                    <h1 className='text-4xl lg:text-6xl '>{citySearchData.data.main.temp}&deg;</h1>
                </div>
                <h1 className='text-[#9C9A9C] py-6'>{citySearchData.data.weather[0].description}</h1>
            </div>
            <div className='lg:pl-10'>
              <h2 className='font-bold text-lg'>Feels like {citySearchData.data.main.feels_like}&deg;C</h2>
              <table className='w-full text-[#9C9A9C] text-sm'>
                <tr>
                  <td><Icon icon={arrowUp} size={20}/></td>
                  <td>Max_Temp</td>
                  <td>{citySearchData.data.main.temp_max}&deg;</td>
                </tr>
                <tr>
                  <td><Icon icon={arrowDown} size={20}/></td>
                  <td>Min_Temp</td>
                  <td>{citySearchData.data.main.temp_min}&deg;</td>
                </tr>
                <tr>
                  <td><Icon icon={droplet} size={20}/></td>
                  <td>Humidity</td>
                  <td>{citySearchData.data.main.humidity}%</td>
                </tr>
                <tr>
                  <td><Icon icon={activity} size={20}/></td>
                  <td>Pressure</td>
                  <td>{citySearchData.data.main.pressure}hPa</td>
                </tr>
                <tr>
                  <td><Icon icon={wind} size={20}/></td>
                  <td>Wind</td>
                  <td>{citySearchData.data.wind.speed}km/hr</td>
                </tr>
              </table>
            </div> 
          </div>
        ) : (
          <div>
             No data is found....
          </div>
        )
      }
    </>
  )
}

export default WeatherDetails