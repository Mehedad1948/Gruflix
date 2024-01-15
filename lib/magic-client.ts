const { Magic } = require("magic-sdk");

export const createMagic = () => {
  console.log('window', typeof window !== "undefined");
  
  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY)
  );
};

export const magic  = createMagic();
