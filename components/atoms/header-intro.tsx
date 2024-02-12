import { useEffect, useState } from "react";
let timer: NodeJS.Timeout;

const HeaderIntro = ({ text }: { text: string }) => {
  const [printedText, setPrintedText] = useState("");

  useEffect(() => {
    if (printedText.length === text.length) {
      return;
    }
    let i = -1;
    timer = setInterval(() => {
      i++;
      if (i === text.length - 1) clearInterval(timer);
      setPrintedText((prev) => prev + text[i]);
    }, 40);

    return () => clearInterval(timer);
  }, []);
  return (
    <span
      className="absolute top-0 left-0 hero-text w-fit text-[35px] sm:text-[50px] lg:text-[65px] xl:text-[80px] text-transparent 
bg-clip-text leading-[38px] sm:leading-[54px] lg:leading-[65px] xl:leading-[80px] pb-1
text-center sm:text-left"
    >
      {" "}
      {/* {text.length > 0 && (
    <div className="h-1 w-6 bg-amber-950 rounded inline-block"></div>
  )} */}
      {printedText}
    </span>
  );
};

export default HeaderIntro;
