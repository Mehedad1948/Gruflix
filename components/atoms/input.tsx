interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = ({ error, className, ...props }: Props) => {
  return (
    <label className="relative overflow-visible">
      <p className="text-lg font-medium">Password</p>
      <input
      
        {...props}
        className={`${className} peer relative z-20 mt-1 w-full rounded
        border border-blue-100 bg-gradient-to-r
        from-white to-white px-1
   py-1 transition-all duration-300 invalid:border-rose-600 
   invalid:to-rose-200 focus:outline-none invalid:focus:border-blue-100
    invalid:focus:!to-white`}
      />

      {error && (
        <p
          className={`${""} absolute bottom-0 z-0 origin-bottom-left translate-y-0 font-medium
   text-rose-600 transition-transform duration-300
   peer-invalid:translate-y-6 peer-focus:!translate-y-0`}
        >
          {error}
        </p>
      )}
    </label>
  );
};

export default Input;
