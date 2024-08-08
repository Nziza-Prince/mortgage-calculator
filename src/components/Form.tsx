import { useState } from "react";
import { FaPoundSign } from "react-icons/fa";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { PiCalculatorFill } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Result from "./Resut";

const schema = z.object({
  amount: z
    .number({ invalid_type_error: "This field is required" })
    .min(1, "This field is required"),
  term: z
    .number({ invalid_type_error: "This field is required" })
    .min(1, "This field is required"),
  rate: z
    .number({ invalid_type_error: "This field is required" })
    .min(1, "This field is required"),
  type: z.enum(["repay", "interest"], { message: "This field is required" }),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  const { register, handleSubmit, setValue,reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [checked, setChecked] = useState({
    repay: false,
    interest: false,
  });
  const [active, setActive] = useState({
    amount: false,
    term: false,
    rate: false,
  });
  const [result, setResult] = useState<number | null>(null);
  const [total, setTotal] = useState<number| null>(null);
  const calculateMortgage = (data: FormData) => {
    
    const { amount, term, rate, type } = data;
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;
    let monthlyPayment = 0;

    if (type === "repay") {
      monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else if (type === "interest") {
      monthlyPayment = amount * monthlyRate;
    }

    const totalRepayment = monthlyPayment * numberOfPayments;

    setResult(monthlyPayment);
    setTotal(totalRepayment);
  };

  const onSubmit = (data: FormData) => {
    calculateMortgage(data);
  };
  const handleRadioClick = (type: "repay" | "interest") => {
    setChecked({
      repay: type === "repay",
      interest: type === "interest",
    });
    setValue("type", type);
  };
  const clearAll = ()=>{
     reset()
     setResult(null)
     setTotal(null)
     setChecked({...checked,repay:false,interest:false})
     setActive({...active,amount:false,term:false,rate:false})
  }
  return (
    <>
  <form className="md:w-96 sm:flex-col lg:w-1/2 py-10 px-5 mobile:w-60 sm:w-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl text-slate-800">Mortgage Calculator</h1>
        <p className="text-slate-700 mt-1.5 underline cursor-pointer" onClick={clearAll}>Clear All</p>
      </div>

<div className="mt-8">
        <p className="text-slate-700 text-left">Mortgage Amount</p>
        <div
          className={
            errors.amount?"flex border-2 border-red rounded-md mt-1":
            active.amount
              ? "flex border-2 border-lime rounded-md mt-1"
              : "flex border-2  rounded-md mt-1"
          }
          onFocus={() =>
            setActive({ ...active, amount: true, rate: false, term: false })
          }
        >
          <label
            htmlFor="amount"
            className={
              errors.amount?"px-3.5 py-2.5 text-center bg-red text-white":
              active.amount
                ? "px-3.5 py-2.5 text-center bg-lime text-slate-700"
                : "rounded-l-md px-3.5 py-2.5 text-center bg-slate-100 text-slate-700"
            }
          >
            <FaPoundSign />
          </label>
          <input
            type="text"
            id="amount"
            className="rounded-md w-full outline-none indent-2 font-bold text-slate-800"
            {...register("amount", { valueAsNumber: true })}
          />
        </div>
        {errors.amount && <p className="text-red text-left">{errors.amount.message}</p>}
      </div>

      <div className="flex mt-8">
        <div className="w-96">
          <p className="text-slate-700 text-left ml-1">Mortgage Term</p>
          <div
            className={
              errors.term?"flex border-2 border-red rounded-md mt-1":
              active.term
                ? "flex border-2 border-lime rounded-md mt-1"
                : "flex border-2  rounded-md mt-1"
            }
            onFocus={() =>
              setActive({ ...active, term: true, amount: false, rate: false })
            }
          >
            <input
              type="text"
              className="rounded-md w-full outline-none indent-2 font-bold text-slate-800"
              id="term"
              {...register("term", { valueAsNumber: true })}
            />
            <label
              htmlFor="term"
              className={
                errors.term?"px-3.5 py-2 text-center bg-red text-white font-bold":
                active.term
                  ? "px-3.5 py-2 text-center bg-lime text-slate-700 font-bold"
                  : "rounded-r-md px-3.5 py-2 text-center bg-slate-100 text-slate-700 font-bold"
              }
            >
              years
            </label>
          </div>
          {errors.term && <p className="text-red text-left">{errors.term.message}</p>}
        </div>
        <div className="w-96 ml-10">
          <p className="text-slate-700 text-left ml-1">Interest Rate</p>
          <div
            className={
              errors.rate?"flex border-2 border-red rounded-md mt-1":
              active.rate
                ? "flex border-2 border-lime rounded-md mt-1"
                : "flex border-2 rounded-md mt-1"
            }
            onFocus={() =>
              setActive({ ...active, rate: true, amount: false, term: false })
            }
          >
            <input
              type="text"
              className="rounded-md w-full outline-none indent-2 font-bold text-slate-800"
              id="rate"
              {...register("rate", { valueAsNumber: true })}
            />
            <label
              htmlFor="rate"
              className={
                errors.rate?"px-3.5 py-2 text-center bg-red text-white font-bold":
                active.rate
                  ? "px-3.5 py-2 text-center bg-lime text-slate-700 font-bold"
                  : "rounded-r-md px-3.5 py-2 text-center bg-slate-100 text-slate-700 font-bold"
              }
            >
              %
            </label>
          </div>
          {errors.rate && <p className="text-red text-left">{errors.rate.message}</p>}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-slate-700 text-left ml-1">Mortgage Type</p>
        <div
          className={
            checked.repay
              ? "flex border-2 rounded-md mt-1 py-2 px-4 gap-3 active"
              : "flex border-2 rounded-md mt-1 py-2 px-4 gap-3"
          }
          onClick={() => handleRadioClick("repay")}
        >
          {checked.repay ? (
            <IoRadioButtonOnOutline className="mt-1.5 cursor-pointer text-lime" />
          ) : (
            <MdOutlineRadioButtonUnchecked className="mt-1.5 cursor-pointer" />
          )}
          <label htmlFor="repay" className="font-bold text-lg text-slate-800">Repayment</label>
        </div>
        <div
          className={
            checked.interest
              ? "flex border-2 rounded-md mt-1 py-2 px-4 gap-3 active"
              : "flex border-2 rounded-md mt-1 py-2 px-4 gap-3"
          }
          onClick={() => handleRadioClick("interest")}
        >
          {checked.interest ? (
            <IoRadioButtonOnOutline className="mt-1.5 cursor-pointer text-lime" />
          ) : (
            <MdOutlineRadioButtonUnchecked className="mt-1.5 cursor-pointer" />
          )}
          <label htmlFor="interest" className="font-bold text-lg text-slate-800">Interest Only</label>
        </div>
        {errors.type && <p className="text-red text-left">{errors.type.message}</p>}
      </div>
      <button
        type="submit"
        className="text-slate-800 flex mt-10 bg-lime font-bold py-2 px-10 rounded-[50px] gap-4 hover:bg-lime2"
      >
        <PiCalculatorFill className="mt-1" />
        Calculate Repayment
      </button>
    </form>
  <Result result={result ?? 0} total={total ?? 0} />
    </>
  );
};

export default Form;
