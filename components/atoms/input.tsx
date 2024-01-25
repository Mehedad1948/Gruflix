interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = ({ error, className, label, ...props }: Props) => {
  return (
    <label className={`${className} relative overflow-visible`}>
      {label && <p className="text-lg font-medium">{label}</p>}
      <input
        {...props}
        className={` peer relative z-20 mt-1 w-full rounded
        border border-slate-400 bg-gradient-to-r
        from-white to-white px-1 bg-white
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
