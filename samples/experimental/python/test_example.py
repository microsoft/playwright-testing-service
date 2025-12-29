import re
import pytest
from typing import Generator
from playwright.sync_api import Page, BrowserType, expect
from playwright_service import get_connect_options


@pytest.fixture(scope="session")
def browser(browser_type: BrowserType) -> Generator[BrowserType, None, None]:
    wsEndpoint, headers = get_connect_options()
    browser = browser_type.connect(
        ws_endpoint=wsEndpoint,
        headers=headers,
        timeout=30000,
        expose_network="<loopback>",
    )
    yield browser
    browser.close()


def test_has_title(page: Page):
    page.goto("https://playwright.dev/")

    # Expect a title "to contain" a substring.
    expect(page).to_have_title(re.compile("Playwright"))


def test_get_started_link(page: Page):
    page.goto("https://playwright.dev/")

    # Click the get started link.
    page.get_by_role("link", name="Get started").click()

    # Expects page to have a heading with the name of Installation.
    expect(page.get_by_role("heading", name="Installation")).to_be_visible()
