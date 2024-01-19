import { BsFillPlayFill } from "react-icons/bs";
import CoverText from "./CoverText";
interface Props {
  title: string;
  subtitle: string;
  imgUrl: string;
}

function Banner({ title, subtitle, imgUrl }: Props) {
  function handleOnPlay() {}
  return (
    <div className="relative mb-[10vh] flex h-[85vh] w-full items-center overflow-hidden
                    mt-16 rounded-br-[200px] sm:rounded-br-[70vh]">
      <CoverText>
        <div className="relative z-20 flex flex-col gap-5 text-sky-50">
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          <button
            className="flex w-fit items-center gap-1 rounded  bg-sky-100 
                       px-2 py-1 text-xl font-medium text-black transition-colors duration-300 
                       hover:bg-black hover:text-sky-100
          "
            onClick={handleOnPlay}
          >
            <BsFillPlayFill />
            <span> Play </span>
          </button>
        </div>
      </CoverText>
      <div
        className="absolute left-0 top-0 z-0 h-full w-full bg-cover"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
    </div>
  );
}

export default Banner;
