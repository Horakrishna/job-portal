// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://0d161ea70739c5c815915e988748eb59@o4509044478705664.ingest.us.sentry.io/4509044490371072",
  integrations: [nodeProfilingIntegration(), Sentry.mongoIntegration()],
  // Tracing
 // tracesSampleRate: 1.0, //  Capture 100% of the transactions

  // Set sampling rate for profiling - this is evaluated only once per SDK.init
  profileSessionSampleRate: 1.0,
});
// Manually call startProfiler and stopProfiler
// to profile the code in between
Sentry.profiler.startProfiler();

// Starts a transaction that will also be profiled
Sentry.startSpan(
  {
    name: "My First Transaction",
  },
  () => {
    // the code executing inside the transaction will be wrapped in a span and profiled
  }
);

// Calls to stopProfiler are optional - if you don't stop the profile session, it will keep profiling
// your application until the process exits or stopProfiler is called.
Sentry.profiler.stopProfiler();
