import { useOutsideClick } from "@/hooks/useOutsideClick";
import {
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
  Dispatch,
  ReactElement,
  JSXElementConstructor,
} from "react";
import { createPortal } from "react-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
const initialValues: Context = {
  open: () => {},
  openName: "",
  close: () => {},
};

interface Context {
  open: any;
  openName: string;
  close: () => void;
}

export const ModalContext = createContext(initialValues);

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ close, open, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

interface OpenProps {
  opens: string;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

interface WindowProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  name: string;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
}

const sizes = {
  sm: "sm:max-w-lg",
  md: "sm:max-w-2xl",
  lg: "sm:max-w-3xl",
  xl: "sm:max-w-5xl",
  xxl: "sm:max-w-[70vw]",
};

type AdditionalProps = {
  onCloseModal: () => void;
};

function Window({ children, name, size = "sm" }: WindowProps) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);
  if (name !== openName) return null;

  return createPortal(
    <div
      className="fixed left-0 top-0 z-50 flex min-h-screen w-screen items-center
                 justify-center bg-stone-700/10 backdrop-blur-sm "
    >
      <div
        onClick={() => close()}
        className="absolute z-0 h-full w-full bg-stone-700/10 backdrop-blur-sm"
      ></div>
      <div
        // ref={ref}
        className={
          sizes[size] +
          " " +
          `fixed bottom-0 right-0 z-30 flex  !w-screen flex-col
            gap-1 rounded bg-white shadow-lg transition-transform
            duration-300 sm:relative sm:translate-y-0 sm:rounded-md`
        }
      >
        <button
          onClick={close}
          className="sticky left-0 top-0 z-20 -mb-6 flex aspect-square w-fit items-center justify-center
                      self-end rounded-br rounded-tl bg-rose-500 p-2 text-white
                       transition-colors duration-200 hover:bg-rose-600"
        >
          <span className="flex origin-center scale-125">
            <IoCloseCircleOutline />
          </span>
        </button>
        <div className=" max-h-[75vh]  overflow-y-auto px-4 pb-8 sm:pb-3">
          {cloneElement(children, { onCloseModal: close } as AdditionalProps)}
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
