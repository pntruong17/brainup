import { UserAuthContextProvider } from "@/components/helper/UserAuthContextProvider";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }) {
  return (
    <UserAuthContextProvider>
      <ThemeProvider enableSystem="true" attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </UserAuthContextProvider>
  );
}
