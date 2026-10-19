import { useEffect, useRef, useState } from "preact/hooks";
import ArticleActionIcon, { ArticleAction } from "./ArticleActionIcon.tsx";

interface Props {
  text: string;
  label: string;
  iconOnly?: boolean;
  sourceUrl?: string;
  icon?: ArticleAction;
}

export default function CopyButton(
  { text, label, iconOnly, sourceUrl, icon }: Props,
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
          {(iconOnly || icon) && (
            <ArticleActionIcon
              action={state === "copied" ? "check" : icon ?? "link"}
            />
          )}
          {!iconOnly && (
            <span>
              {state === "loading"
                ? "Loading…"
                : state === "copied"
                ? "Copied"
                : label}
            </span>
          )}
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
