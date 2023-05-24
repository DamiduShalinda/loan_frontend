
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    
}

export function Inputbox({label,...other}: InputProps) {
  return (
    <div className="w-full md:w-1/3 flex flex-col">
      <label
        className="text-[12px] text-[#A7AEBF] mb-1"
        htmlFor="name"
      >
        {label}
      </label>
      <input

        className="bg-[#21242D] w-normla-width h-[42px] rounded-xl  
        placeholder:text-[13.71px] placeholder:pl-3 mb-3"
        {...other}
      />
    </div>
  )
}
