import fs from "fs/promises";
import path from "path";

type ViewCounterData = {
  total: number;
};

const COUNTER_PATH = path.join(process.cwd(), ".data", "views.json");

async function readCounter(): Promise<ViewCounterData> {
  try {
    const raw = await fs.readFile(COUNTER_PATH, "utf8");
    const data = JSON.parse(raw) as Partial<ViewCounterData>;
    const total = Number(data.total ?? 0);

    return { total: Number.isFinite(total) ? total : 0 };
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return { total: 0 };
    }

    throw error;
  }
}

async function writeCounter(data: ViewCounterData) {
  await fs.mkdir(path.dirname(COUNTER_PATH), { recursive: true });
  await fs.writeFile(COUNTER_PATH, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function getViewCount() {
  const data = await readCounter();
  return data.total;
}

export async function incrementViewCount() {
  const data = await readCounter();
  const next = { total: data.total + 1 };

  await writeCounter(next);

  return next.total;
}
