import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://dab388358099f7bdc839da59c0ae49dc@o4504789994373120.ingest.us.sentry.io/4509554641600512",
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Enable logs to be sent to Sentry
  _experiments: { enableLogs: true },
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,
  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: [/^//, /^https://behindtext\.xyz/],
  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: import.meta.env.MODE,
  beforeSend(event) {
    // Filter out development errors in production
    if (import.meta.env.MODE === 'development') {
      console.log('Sentry Event:', event);
    }
    return event;
  },
});