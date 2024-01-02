import { useOutsideClick } from '@/hooks/useOutsideClick';
import {
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
  Dispatch,
  ReactElement,
  JSXElementConstructor,
} from 'react';
import { createPortal } from 'react-dom';
import { IoCloseCircleOutline } from "react-icons/io5"
const initialValues: Context = {
  open: () => {},
  openName: '',
  close: () => {},
};

interface Context {
  open: any;
  openName: string;
  close: () => void;
}

export const ModalContext = createContext(initialValues);

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
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
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

const sizes = {
  sm: 'sm:max-w-lg',
  md: 'sm:max-w-2xl',
  lg: 'sm:max-w-3xl',
  xl: 'sm:max-w-5xl',
  xxl: 'sm:max-w-[70vw]',
};

type AdditionalProps = {
  onCloseModal: () => void;
};

function Window({ children, name, size = 'sm' }: WindowProps) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);
  if (name !== openName) return null;

  return createPortal(
    <div
      className='fixed left-0 top-0 z-50 flex min-h-screen w-screen items-center
                 justify-center bg-stone-700/10 backdrop-blur-sm '
    >
      <div
        onClick={() => close()}
        className='bg-stone-700/10 backdrop-blur-sm w-full h-full absolute z-0'
      ></div>
      <div
        // ref={ref}
        className={
          sizes[size] +
          ' ' +
          `bg-white !w-screen rounded sm:rounded-md sm:translate-y-0  flex flex-col
            gap-1 transition-transform duration-300 shadow-lg sm:relative
            fixed bottom-0 right-0 z-30`
        }
      >
        <button
          onClick={close}
          className='sticky w-fit top-0 left-0 p-2 rounded-br rounded-tl bg-rose-500 text-white aspect-square
                      flex items-center justify-center hover:bg-rose-600 transition-colors duration-200
                       self-end -mb-6 z-20'
        >
          <span className='scale-125 origin-center flex'>
            <IoCloseCircleOutline />
          </span>
        </button>
        <div className=' max-h-[75vh]  pb-8 sm:pb-3 px-4 overflow-y-auto'>
          {cloneElement(children, { onCloseModal: close } as AdditionalProps)}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
