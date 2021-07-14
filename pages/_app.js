import "../styles/globals.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Amplify, { AuthModeStrategyType } from "aws-amplify";
import config from "../aws-exports";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
Amplify.configure({
  ...config,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
  },
  ssr: true,
});

Sentry.init({
  dsn: "https://b71fbb7f1fdb47378c354b0ccbdba8af@o919596.ingest.sentry.io/5863840",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default withAuthenticator(MyApp);
