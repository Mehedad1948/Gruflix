import { useEffect, useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  checked: boolean;
}

const Bookmark = ({ checked, className, onClick }: Props) => {
  const [fill, setFill] = useState(false);
  useEffect(() => {
    setFill(checked);
  }, [checked]);
  return (
    <div
      className={`${className ? className : ""} relative  aspect-square
                  cursor-pointer `}
      onClick={(e) => {
        setFill((s) => !s);
        onClick && onClick(e);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-1/2 top-1/2 w-5 -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 24 24"
      >
        <g fill="none">
          <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />

          <path
            className="cursor-pointer transition-opacity duration-150"
            opacity={fill ? 1 : 0}
            fill="#092a5c"
            d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v16.028c0 1.22-1.38 1.93-2.372 1.221L12 18.229l-5.628 4.02c-.993.71-2.372 0-2.372-1.22z"
          />
          <path
            fill={"#3f506b"}
            d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v16.028c0 1.22-1.38 1.93-2.372 1.221L12 18.229l-5.628 4.02c-.993.71-2.372 0-2.372-1.22zm3-1a1 1 0 0 0-1 1v15.057l5.128-3.663a1.5 1.5 0 0 1 1.744 0L18 20.057V5a1 1 0 0 0-1-1z"
          />
        </g>
      </svg>
    </div>
  );
};

export default Bookmark;
