import "../styles/globals.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Amplify, { AuthModeStrategyType } from "aws-amplify";
import config from "../aws-exports";
Amplify.configure({
  ...config,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
  },
  ssr: true,
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default withAuthenticator(MyApp);
