export function setCookie(name: string, value: string, daysToExpire: number) {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);

  const expires = "expires=" + date.toUTCString();
  const isProduction = process.env.NODE_ENV === "production";

  // Conditionally set the secure attribute based on the environment
  const secureAttribute = isProduction ? "secure" : "";

  const cookieString = `${name}=${value};${expires};path=/;${secureAttribute}`;
//   if (window) {
//     document.cookie = cookieString;
//   }
  return cookieString;
}
