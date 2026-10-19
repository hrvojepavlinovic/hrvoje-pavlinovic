import { useEffect, useRef, useState } from "preact/hooks";

interface Props {
  text: string;
  label: string;
  iconOnly?: boolean;
  sourceUrl?: string;
}

export default function CopyButton(
  { text, label, iconOnly, sourceUrl }: Props,
) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<
    "idle" | "loading" | "copied" | "manual" | "error"
  >("idle");
  const [manualText, setManualText] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    setReady(true);
    return () => clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    clearTimeout(timer.current);
    setState("loading");
    const content = sourceUrl
      ? fetch(sourceUrl, { headers: { Accept: "text/markdown" } }).then(
        async (response) => {
          if (!response.ok) throw new Error("Markdown unavailable");
          return await response.text();
        },
      )
      : Promise.resolve(text);
    // The clipboard may reject before it consumes the asynchronous content.
    // Handle its eventual rejection here too; the fallback below reports it.
    content.catch(() => {});
    try {
      if (
        sourceUrl && navigator.clipboard?.write &&
        typeof ClipboardItem !== "undefined"
      ) {
        const data = content.then((value) =>
          new Blob([value], { type: "text/plain" })
        );
        data.catch(() => {});
        // Start the clipboard write during the click, before awaiting the fetch.
        await navigator.clipboard.write([
          new ClipboardItem({ "text/plain": data }),
        ]);
      } else {
        await navigator.clipboard.writeText(sourceUrl ? await content : text);
      }
      setState("copied");
      timer.current = globalThis.setTimeout(() => setState("idle"), 2500);
    } catch {
      try {
        setManualText(await content);
        setState("manual");
      } catch {
        setState("error");
      }
    }
  };

  return (
    <div class={iconOnly ? "copy-control copy-control--icon" : "copy-control"}>
      {ready && (
        <button
          type="button"
          class="copy-button"
          onClick={copy}
          disabled={state === "loading"}
          aria-busy={state === "loading"}
          aria-label={iconOnly ? label : undefined}
          title={iconOnly ? label : undefined}
        >
          {iconOnly
            ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d={state === "copied"
                    ? "m5 12 4 4L19 6"
                    : "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2m3 6a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2"}
                />
              </svg>
            )
            : state === "loading"
            ? "Loading…"
            : state === "copied"
            ? "Copied"
            : label}
        </button>
      )}
      <span role="status" class="sr-only">
        {state === "copied" ? `${label}: copied.` : ""}
      </span>
      {state === "manual" && (
        <label class="copy-fallback">
          Clipboard unavailable. Select and copy:
          <textarea
            readOnly
            value={manualText}
            rows={sourceUrl ? 6 : 2}
            onFocus={(event) => event.currentTarget.select()}
          />
        </label>
      )}
      {state === "error" && (
        <p class="copy-fallback" role="status">
          Couldn't load Markdown. <a href={sourceUrl}>Open Markdown</a>{" "}
          or try again.
        </p>
      )}
    </div>
  );
}
