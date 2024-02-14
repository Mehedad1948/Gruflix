import Link from "next/link";

function Error({ statusCode }: any) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center frame p-3">
      <h2
        className="bg-clip-text text-transparent 
        hero-text mb-4 text-center"
      >
        Oops, there was an error!
      </h2>
      <img className="w-1/2 max-w-xs" src="/error.png" alt="" />
      <Link
        className="font-semibold mt-3 bg-clip-text text-transparent 
        hero-text"
        href="/"
      >
        Go to Home Page
      </Link>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

// const Custom500 = () => {
//   return (
//     <div className="w-full h-full flex flex-col items-center justify-center frame">
//       <h2
//         className="bg-clip-text text-transparent 
//         hero-text mb-4"
//       >
//         Oops, there was an error!
//       </h2>
//       <img className="w-1/2 max-w-xs" src="/error.png" alt="" />
//       <Link
//         className="font-semibold mt-3 bg-clip-text text-transparent 
//         hero-text"
//         href="/"
//       >
//         Go to Home Page
//       </Link>
//     </div>
//   );
// };

// export default Custom500;
