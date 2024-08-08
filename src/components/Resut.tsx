import { useState } from 'react';
import illustrationEmpty from '../assets/images/illustration-empty.png';
import { FaPoundSign } from "react-icons/fa";
interface ResultProps {
  result: number;
  total: number;
}
const formatNumberWithCommas = (number: number) => {
  const formatter = new Intl.NumberFormat('en-US')
  return formatter.format(number);
};
const Result = ({ result, total }: ResultProps) => {
  if(result===0 || total===0){
    return (
      <div className='md:w-full bg-slate-900 rounded-bl-[50px] rounded-tr-[20px] rounded-br-[20px] p-5'>
        <div className='flex justify-center mt-[30%]'>
          <img src={illustrationEmpty} alt="Illustration Empty" className=''/>
        </div>
        <h1 className='text-white text-2xl mb-5 text-center font-bold'>Results shown here</h1>
        <p className='text-slate-300'>Complete the form and click "Calculate repayments" to see what your monthly repayments would be.</p>
      </div>
    );
}
return(
  <>
    <div className='md:w-full bg-slate-900 rounded-bl-[50px] rounded-tr-[20px] rounded-br-[20px] p-5'>
      <h1 className='text-white text-2xl mb-5 text-center font-bold'>Your results</h1>
      <p className='text-left text-slate-300'>Your results are shown below based on the information you provided.To adjust the results,edit the form and click "calculate repayments"again.</p>
    <div className='bg-slate-950 mt-10 p-5 border-t-4 border-lime rounded-lg'>
      <p className='ml-3 text-slate-300 text-left'>Your monthly repayments</p>
      <div className='flex text-lime text-5xl font-bold my-5 '>
      <h1>£{formatNumberWithCommas(result.toFixed(2))}</h1>
      </div>
      <hr />
      <p className='mt-4 ml-3 text-slate-300 text-left'>Total you'll repay over the term</p>
      <div className='flex text-white text-xl font-bold my-5 '>
      <h1 className='flex gap-2'>£{formatNumberWithCommas(total.toFixed(2))}</h1>
      </div>
    </div>
    </div>
  </>
)
}

export default Result;