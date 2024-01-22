interface Props extends React.HTMLAttributes<HTMLOrSVGElement> {
  checked?: boolean;
}

const Heart = ({ className }: Props) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      version="1"
      viewBox="0 0 48 48"
      enable-background="new 0 0 48 48"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}  `}
    >
      <path d="M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"></path>
    </svg>
  );
};

export default Heart;
