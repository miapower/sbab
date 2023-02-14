import React, { useState } from 'react'
import ErrorBoundary from '../ErrorBoundary';
import Compare from "./../images/svg/Compare.svg";
import Percentage from "./../images/svg/Percentage.svg";
import { SBABForm } from './SBABForm';


export const SBABMockup = () => {

const [monthly, setMonthly] = useState(0);
const [interest, setInterest] = useState(0);

const handleCalculate = (m: number, i: number) => {
setInterest(i);
setMonthly(i * m / 100 / 12);
//lånebelopp * 0.0176 / 12 
console.log("handleCalculate");
}

  return (
    <>
    <ErrorBoundary>
    <div className="container mx-auto md:w-10/12 lg:w-8/12 w-auto md:my-20 my-5 p-4">
    <div className="flex justify-between">
      <div className="w-1/1 sm:w-2/3 md:w-3/4 ">
        <h1 className="text-6xl">Din räntekostnad</h1>
        <p className="my-8 text-lg">Här ser du både våra aktuella räntor och din räntekostnad per månad</p>
      </div>
      <div className="sm:w-1/3 md:w-1/4 invisible md:visible">
      <img src={Percentage} alt="Percentage" className="ml-auto" />
      </div>
    </div>
    <div className="flex flex-col">
    <div className="w-full">
    <h2 className="text-3xl mb-5">Få fram din räntekostnad direkt</h2>
    </div>
      <div className="w-full border-y-2 border-grey-500 py-5">
        <SBABForm handleCalculate={(m, i) => handleCalculate(m,i)}/>
        {interest > 0 && (<p className="text-3xl">Din räntekostnad - {interest} %</p>) }
      </div>
   </div>
    
    <div className="flex mt-3 items-center">
      <div className="w-1/1 sm:w-2/3 md:w-3/4 ">
      {monthly > 0 && (<p className="text-6xl">{Math.round(monthly).toLocaleString('sv-SE')} kr / mån</p>) }

      </div>
      <div className="sm:w-1/3 md:w-1/4">
      <img src={Compare} alt="Compare" className="ml-auto" />
        
      </div>
    </div>
</div>

</ErrorBoundary>
    
    
    </>
  )
}
