import { test, expect } from "@playwright/test";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
async function enter(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Passer l’intro" }).click();
  await expect(page.getByTestId("intro")).toHaveCount(0);
}
test("scene click prints at the slot, reveals portfolio, can replay", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByTestId("intro")).toHaveAttribute("data-phase", "idle");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.getByTestId("intro")).toHaveAttribute("data-phase", "idle");
  await expect(
    page.getByText("Click anywhere to enter", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Passer en français" }).click();
  await page.waitForTimeout(1600);
  await page.screenshot({
    path: `test-results/intro-${test.info().project.name}.png`,
  });
  await page.clock.install({ time: new Date("2026-10-26T12:00:00Z") });
  await page.clock.pauseAt(new Date("2026-10-26T12:00:10Z"));
  await page
    .getByTestId("scene")
    .click({ position: { x: 150, y: 180 }, force: true });
  await expect(page.getByTestId("intro")).toHaveAttribute(
    "data-phase",
    "printing",
  );
  await expect(page.getByTestId("intro")).toHaveAttribute(
    "data-paper-origin",
    "printer-slot",
  );
  await page.clock.fastForward(1500);
  const cdp = await page.context().newCDPSession(page);
  const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
  writeFileSync(
    `test-results/paper-${test.info().project.name}.png`,
    Buffer.from(shot.data, "base64"),
  );
  await cdp.detach();
  await page.clock.fastForward(3000);
  await page.clock.resume();
  await expect(page.getByTestId("intro")).toHaveCount(0, { timeout: 6000 });
  await expect(
    page.getByRole("heading", {
      name: "Curieux de nature. Hybride par choix.",
    }),
  ).toBeVisible();
  await page.evaluate(async () => {
    document
      .querySelectorAll(".reveal")
      .forEach((e) => e.classList.add("in-view"));
    await Promise.all(
      Array.from(document.images).map((im) => {
        im.loading = "eager";
        return im.decode().catch(() => {});
      }),
    );
  });
  await page.screenshot({
    path: `test-results/portfolio-${test.info().project.name}.png`,
    fullPage: true,
    style:
      ".reveal{opacity:1!important;transform:none!important;transition:none!important}",
  });
  await page.getByRole("button", { name: "Revoir l’intro" }).click();
  await expect(page.getByTestId("intro")).toBeVisible();
  expect(errors).toEqual([]);
});
test("keyboard entry and reduced motion provide immediate access", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const intro = page.getByTestId("intro");
  await intro.focus();
  await page.keyboard.press("Enter");
  await expect(intro).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Explorer mes projets" }),
  ).toBeVisible();
});
test("facets, projects, complete language toggle, certificates and contact", async ({
  page,
}) => {
  await enter(page);
  await page.getByRole("tab", { name: "02 Business & finance" }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Comprendre.");
  await page
    .getByRole("button", { name: "Découvrir le projet — SOLEN" })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("avec mon équipe");
  await expect(
    dialog.getByRole("link", { name: "Code source" }),
  ).toHaveAttribute("href", "https://github.com/akls-lq/Solen");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await page
    .getByRole("button", { name: "Découvrir le projet — Next Challenge" })
    .click();
  await expect(dialog).toContainText("gestion de portefeuille");
  await dialog.getByRole("button", { name: "Fermer" }).click();
  await page
    .getByRole("button", { name: "Retourner la carte — Financial Markets" })
    .click();
  await page
    .getByRole("button", { name: "Voir le certificat" })
    .first()
    .click();
  await expect(dialog.getByRole("img")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page.getByRole("heading", { name: "A path in the making." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Understand." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "akilis.leq@gmail.com" }),
  ).toHaveAttribute("href", "mailto:akilis.leq@gmail.com");
  await expect(page.locator(".cv-coming")).toHaveAttribute(
    "aria-disabled",
    "true",
  );
  await expect(page.getByRole("link", { name: "Instagram" })).toHaveCount(0);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  expect(overflow).toBe(false);
});
test("all authorized media load, no reference files or sensitive data in public build", async ({
  request,
}) => {
  for (const file of ["portrait", "solen", "podium", "yale", "cfi"]) {
    const r = await request.get(`/media/${file}.webp`);
    expect(r.status()).toBe(200);
    expect(r.headers()["content-type"]).toContain("image/webp");
  }
  function walk(dir: string): string[] {
    return readdirSync(dir).flatMap((n) => {
      const p = join(dir, n);
      return statSync(p).isDirectory() ? walk(p) : [p];
    });
  }
  const files = walk("dist");
  expect(
    files.some((f) =>
      /\.mp4|linkedin_certifications|experiences\.png|formation\.png|\.zip|\.pdf$/i.test(
        f,
      ),
    ),
  ).toBe(false);
  const content = files
    .filter((f) => /\.(js|html|css)$/.test(f))
    .map((f) => readFileSync(f, "utf8"))
    .join("\n");
  const literals = [...content.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"/g)].map(
    (m) => m[1],
  );
  expect(
    literals.filter((s) => /^(?:\+33[ .-]?|0)[67](?:[ .-]?\d{2}){4}$/.test(s)),
  ).toEqual([]);
  expect(content).not.toMatch(
    /[\w.+-]+@(?:[\w.-]+\.)?(?:icn-artem|icn-business-school|myicn|student\.icn)[\w.-]*/i,
  );
});
test("fallback paper remains attached to printer slot while feeding", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      kind: string,
      ...args: unknown[]
    ) {
      if (kind.startsWith("webgl")) return null;
      return original.apply(this, [kind, ...args] as Parameters<
        typeof original
      >);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.locator(".fallback-scene")).toBeVisible();
  const before = await page.locator(".f-paper").boundingBox();
  expect(before?.height).toBe(0);
  await page.getByTestId("scene").click();
  await expect(page.locator(".fallback-scene")).toHaveClass(/printing/);
  const slot = await page.locator(".f-slot").boundingBox();
  const paper = await page.locator(".f-paper").boundingBox();
  expect(slot).not.toBeNull();
  expect(paper).not.toBeNull();
  expect(Math.abs(paper!.y - slot!.y)).toBeLessThan(12);
  await expect(page.getByTestId("intro")).toHaveCount(0, { timeout: 7000 });
});
test("compact and wide layouts, keyboard tabs, both certificates", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await enter(page);
  for (const width of [320, 375, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page
      .getByRole("heading", { name: "Trois facettes." })
      .scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  const tab = page.getByRole("tab", { name: "01 Tech, dev & IA" });
  await tab.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "02 Business & finance" }),
  ).toBeFocused();
  await page.keyboard.press("End");
  await expect(page.getByRole("tabpanel")).toContainText("Partager.");
  await page
    .getByRole("button", {
      name: "Retourner la carte — Data Skills for Excel Professionals",
    })
    .click();
  await page.getByRole("button", { name: "Voir le certificat" }).click();
  await expect(page.getByRole("dialog").getByRole("img")).toHaveAttribute(
    "src",
    "/media/cfi.webp",
  );
  await page.keyboard.press("Escape");
});
