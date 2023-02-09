import React, { SyntheticEvent, useEffect, useState } from 'react'

interface SBABFormProps {
    handleCalculate: ( m:number, i:number) => void;
}

export const SBABForm = ({handleCalculate}: SBABFormProps) => {
    const handleThisCalculate = (event: SyntheticEvent) => {
        handleCalculate(700, 8);
    }

    const [data, setData] = useState([]);

    const fetchData = () => {
        return fetch("https://developer.sbab.se/sandbox/api/interest-rates/2.0/mortgage-rates")
              .then((response) => response.json())
              .then((data) => {
                    setData(data);
                    console.log(data);
                });
      }
    
      useEffect(() => {
        fetchData();
      },[])

  return (
    <>
    <form className="w-full md:w-1/2">
        <div className="flex flex-col space-y-2 mb-10">
        <label htmlFor='loan'>Önskat lånebelopp</label>
        <input id="loan" type="text" placeholder="Ange ett lånebelopp" onChange={(e) => handleThisCalculate(e)} className="appearance-none border w-full py-2 px-3 border-gray-400 hover:border-gray-500 leading-tight focus:outline-none focus:shadow-outline" />
        <label htmlFor='horizon'>Välj bindningstid</label>
        <div className="inline-block relative">
        <select name="horizon" onChange={(e) => handleThisCalculate(e)} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 leading-tight focus:outline-none focus:shadow-outline">
        <option>Ett val</option>
        <option>Två val</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
  </div>
  </div>

        

        </div>

    </form>
    </>
  )
}
