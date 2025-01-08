package org.example;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.microsoft.playwright.BrowserType.ConnectOptions;

public class PlaywrightService {
    public static class BrowserConnectOptions {
        public final String wsEndpoint;
        public final ConnectOptions connectOptions;

        public BrowserConnectOptions(String wsEndpoint, ConnectOptions connectOptions) {
            this.wsEndpoint = wsEndpoint;
            this.connectOptions = connectOptions;
        }
    }

    public static BrowserConnectOptions getConnectOptions() {
        return PlaywrightService.getConnectOptions("linux");
    }

    public static BrowserConnectOptions getConnectOptions(String osName) {
        return PlaywrightService.getConnectOptions(osName, "");
    }

    public static BrowserConnectOptions getConnectOptions(String osName, String runId) {
        String playwrightRunId = System.getenv("PLAYWRIGHT_SERVICE_RUN_ID");
        if (runId != null && !runId.isEmpty()) {
            System.setProperty("PLAYWRIGHT_SERVICE_RUN_ID", runId);
        }
        if (playwrightRunId == null || playwrightRunId.isEmpty()) {
            playwrightRunId = UUID.randomUUID().toString();
            System.setProperty("PLAYWRIGHT_SERVICE_RUN_ID", playwrightRunId);
        }

        String serviceUrl = System.getenv("PLAYWRIGHT_SERVICE_URL");
        String serviceAccessToken = System.getenv("PLAYWRIGHT_SERVICE_ACCESS_TOKEN");

        Map<String, String> headers = new HashMap<>();
        headers.put("Authorization", "Bearer " + serviceAccessToken);

        String wsEndpoint = String.format("%s?os=%s&runId=%s&api-version=2023-10-01-preview",
                serviceUrl, osName, playwrightRunId);
        ConnectOptions connectOptions = new ConnectOptions();
        connectOptions.setHeaders(headers);
        return new BrowserConnectOptions(wsEndpoint, connectOptions);
    }
}