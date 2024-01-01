const { useEffect } = require("react");
import useLocalStorage from "./useLocalStorage";

function useColorMode() {
  const [colorMode, setColorMode] = useLocalStorage("color-mode", "light");
  useEffect(() => {
    const className = "dark";
    const bodyClasses = window.document.body.classList;

    colorMode === "dark"
      ? bodyClasses.add(className)
      : bodyClasses.remove(className);
  }, [colorMode]);

  return [colorMode, setColorMode];
}

// <button
// onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
// className='dark:bg-sky-500 p-2.5'
// >
// Toggle
// </button>
export default useColorMode;
