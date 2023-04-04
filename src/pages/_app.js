import { UserAuthContextProvider } from "@/components/helper/UserAuthContextProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <UserAuthContextProvider>
      <Component {...pageProps} />
    </UserAuthContextProvider>
  );
}
