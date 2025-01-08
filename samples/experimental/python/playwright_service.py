import os
import uuid


def get_connect_options(os_name="linux", run_id="") -> tuple[str, dict[str, str]]:
    if run_id:
        os.environ["PLAYWRIGHT_SERVICE_RUN_ID"] = run_id
    if not os.environ.get("PLAYWRIGHT_SERVICE_RUN_ID"):
        os.environ["PLAYWRIGHT_SERVICE_RUN_ID"] = str(uuid.uuid4())

    service_url = os.getenv("PLAYWRIGHT_SERVICE_URL")
    service_access_token = os.getenv("PLAYWRIGHT_SERVICE_ACCESS_TOKEN")

    headers = {"Authorization": f"Bearer {service_access_token}"}
    service_run_id = os.getenv("PLAYWRIGHT_SERVICE_RUN_ID")
    ws_endpoint = f"{service_url}?os={os_name}&runId={service_run_id}&api-version=2023-10-01-preview"

    return ws_endpoint, headers
