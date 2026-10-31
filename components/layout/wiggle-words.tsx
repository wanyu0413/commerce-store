import { Fragment } from "react";

// Offsets so neighbouring words never jitter in sync.
const WIGGLE_DELAYS = ["0s", "-0.15s", "-0.075s"];

// Splits text into words that each jitter on their own (see animate-wiggle).
export default function WiggleWords({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span
        className="inline-block motion-safe:animate-wiggle"
        style={{ animationDelay: WIGGLE_DELAYS[i % WIGGLE_DELAYS.length] }}
      >
        {word}
      </span>
    </Fragment>
  ));
}
