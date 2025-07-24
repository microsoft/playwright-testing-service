# Example Playwright Library Project with Service Workspace
# How to use this example
- Clone the repo and go to the folder
- npm install
- Create a Playwright workspace by following the [Getting Started guide](https://aka.ms/pww/docs/manage-workspaces)
- Follow the [Getting Started guidance](https://aka.ms/pww/docs/configure-service-endpoint) and set the regional endpoint environment variable
```
$env:PLAYWRIGHT_SERVICE_URL="wss://...."
```
- Generate access token following [guide](https://aka.ms/pww/docs/generate-access-token)
- Set the token generated in the previous step
```
$env:PLAYWRIGHT_SERVICE_ACCESS_TOKEN="TOKEN_VALUE"
```
- Run the example script
```
npx ts-node src/example.ts
```