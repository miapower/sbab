import React, { SyntheticEvent, useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';

interface SBABFormProps {
    handleCalculate: ( m:number, i:number) => void;
}

export const SBABForm = ({handleCalculate}: SBABFormProps) => {

    const [inputAmount] = useState<any>('2000000');
    const [rates, setRates] = useState([
      {binding_period_in_months: 'X', mortgage_rate: 0},
      ]
      );
    const [isLoading, setIsLoading] = useState(false);
    const [selLoan, setSelLoan] = useState<number>(inputAmount);
    const [selRate, setSelRate] = useState<any>(null);

    const handleThisCalculate = (event: SyntheticEvent) => {
      console.log('handleThisCalculate');
        const target = event.target as HTMLSelectElement | HTMLInputElement;
        if (target.id === 'loan')
            setSelLoan(parseFloat(target.value.replace(/\s/g, '')));
        if (target.id === 'rate')
            setSelRate(parseFloat(target.value));

        //throw new Error("Du valde något som skulle orsaka fel så den här sidan skulle visas");

    }

    const fetchData = () => {
      setIsLoading(true);
        fetch("https://developer.sbab.se/sandbox/api/interest-rates/2.0/mortgage-rates")
        .then((response) => {   
          if (response.ok) {
            return response.json();
          }
          throw new Error('Det fick inte att hämta räntedatat');
        })
        .then((responseJson) => {
          setRates(responseJson.mortgage_rates);
          setSelRate(responseJson.mortgage_rates[0].mortgage_rate);
          setIsLoading(false);
        })
        .catch((error) => {
          throw new Error("Något gick fel");
        });
      }

      useEffect(() => {
        fetchData();
      },[]) 

    useEffect(() => {
        handleCalculate(selLoan, selRate);
      },[selLoan, selRate, handleCalculate])  


  return (
    <>
    <form className="w-full md:w-1/2">
        <div className="flex flex-col space-y-2 mb-10">
        <label htmlFor='loan'>Önskat lånebelopp</label>
        <NumericFormat id="loan" displayType="input" value={inputAmount} thousandsGroupStyle="thousand" thousandSeparator=" " onBlur={(e) => handleThisCalculate(e)} className="appearance-none border w-full py-2 px-3 border-gray-400 hover:border-gray-500 leading-tight focus:outline-none focus:shadow-outline"/>
        <label htmlFor='rate'>Välj bindningstid</label>
          <div className="inline-block relative">
        <select id="rate" name="rate" onChange={(e) => handleThisCalculate(e)} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 leading-tight focus:outline-none focus:shadow-outline">
            <>
            {!isLoading && rates && rates.length > 0 && rates.map((rateObj, index) => (
            <option key={rateObj.mortgage_rate} value={rateObj.mortgage_rate}>{`${rateObj.binding_period_in_months} mån - ${rateObj.mortgage_rate} %`}</option>
          ))}
        
        </>
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
