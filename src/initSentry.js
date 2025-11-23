import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

// myUndefinedFunction(); // Uncomment to debug (should cause error)

/* Todo: Explore optional options below: 

Automatically upload your source maps to enable readable stack traces for Errors:
    npx @sentry/wizard@latest -i sourcemaps --saas --org kristinn-roach --project javascript
If you prefer to manually set up source maps, please follow this guide 'https://docs.sentry.io/platforms/javascript/sourcemaps/'


// Add test button:

        <script>
          function triggerError() {
            throw new Error('Sentry Test Error');
          }
        </script>
        <button onclick="triggerError()">Break the World</button>


// === LLM RULES === 
Sentry provides a set of rules you can use to help your LLM use Sentry correctly. 
Copy this file and add it to your projects rules configuration. When created as a rules file this should be placed alongside other editor specific rule files. For example, if you are using Cursor, place this file in the .cursorrules directory.

// rules.md
These examples should be used as guidance when configuring Sentry functionality within a project.

# Error / Exception Tracking

Use `Sentry.captureException(error)` to capture an exception and log the error in Sentry.
Use this in try catch blocks or areas where exceptions are expected

# Tracing Examples

Spans should be created for meaningful actions within an applications like button clicks, API calls, and function calls
Use the `Sentry.startSpan` function to create a span
Child spans can exist within a parent span

## Custom Span instrumentation in component actions

Name custom spans with meaningful names and operations.
Attach attributes based on relevant information and metrics from the request

```javascript
function TestComponent() {
  const handleTestButtonClick = () => {
    // Create a transaction/span to measure performance
    Sentry.startSpan(
      {
        op: "ui.click",
        name: "Test Button Click",
      },
      (span) => {
        const value = "some config";
        const metric = "some metric";

        // Metrics can be added to the span
        span.setAttribute("config", value);
        span.setAttribute("metric", metric);

        doSomething();
      },
    );
  };

  return (
    <button type="button" onClick={handleTestButtonClick}>
      Test Sentry
    </button>
  );
}
```

## Custom span instrumentation in API calls

Name custom spans with meaningful names and operations.
Attach attributes based on relevant information and metrics from the request

```javascript
async function fetchUserData(userId) {
  return Sentry.startSpan(
    {
      op: "http.client",
      name: `GET /api/users/${userId}`,
    },
    async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      return data;
    },
  );
}
```

# Logs

Where logs are used, ensure Sentry is imported using `import * as Sentry from "@sentry/browser"`
Enable logging in Sentry using `Sentry.init({ _experiments: { enableLogs: true } })`
Reference the logger using `const { logger } = Sentry`
Sentry offers a `consoleLoggingIntegration` that can be used to log specific console error types automatically without instrumenting the individual logger calls

## Configuration

### Baseline

```javascript
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984",

  _experiments: {
    enableLogs: true,
  },
});
```

### Logger Integration

```javascript
Sentry.init({
  dsn: "https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984",
  integrations: [
    // send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
});
```

## Logger Examples

`logger.fmt` is a template literal function that should be used to bring variables into the structured logs.

```javascript
import * as Sentry from "@sentry/browser";

const { logger } = Sentry;

logger.trace("Starting database connection", { database: "users" });
logger.debug(logger.fmt`Cache miss for user: ${userId}`);
logger.info("Updated profile", { profileId: 345 });
logger.warn("Rate limit reached for endpoint", {
  endpoint: "/api/results/",
  isEnterprise: false,
});
logger.error("Failed to process payment", {
  orderId: "order_123",
  amount: 99.99,
});
logger.fatal("Database connection pool exhausted", {
  database: "users",
  activeConnections: 100,
});
```

*/
