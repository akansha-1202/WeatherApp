import React from 'react'

function Forecast({forecastData}) {
    // Function to filter forecast data based on the time of the first object
    const filterForecastByFirstObjTime = (forecastData) => {
        if(!forecastData)
              return [];
        
        // Extract the time from the first object in the forecast data
        const firstObjTime = forecastData[0].dt_txt.split(" ")[1];

        // Filter the forecast data based on the extracted time
        return forecastData.filter(data => data.dt_txt.endsWith(firstObjTime));
    }

    // Call the function to filter the forecast data
    const filteredForecast = filterForecastByFirstObjTime(forecastData?.list);
    return (
        <div className='mt-2'>
            <h1 className='text-[#9C9A9C]'>
              Extended Forecast
            </h1>
            
              {
                filteredForecast.length > 0 ? (
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-x-2 my-4 '>
                    {
                      filteredForecast.map((forecast, index) => {
                          // Extract the day from the date of the forecast data
                          const date = new Date(forecast.dt_txt);
                          const day = date.toLocaleDateString("en-US", {weekday:"short"})

                          return (
                            <div key={index} className='bg-[#2493DF] rounded p-2 text-center text-white font-semibold lg:text-xs xl:text-base'>
                                <h1>{day}</h1>
                                <div className='grid place-items-center p-0'>
                                    <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="img2" className='w-[100px]'/>
                                </div>
                                <h1>{forecast.weather[0].description}</h1>
                                <h1> {forecast.main.temp_max}&deg; /  {forecast.main.temp_min}&deg;</h1>
                               
                            </div>
                          )
                          
                      })
                    }
                  </div>
                ) : (
                  <div>
                    No Data is Found...!!!
                  </div>
                )
              }
        </div>
    )
}

export default Forecast