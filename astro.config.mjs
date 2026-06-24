// @ts-check
import { defineConfig, fontProviders } from "astro/config";

const FONT_DIR = "./src/assets/fonts";

// usWeightClass (read from the font files) -> style name used in the filenames.
/** @type {Array<[number, string]>} */
const WEIGHTS = [
  [100, "Thin"],
  [200, "ExtraLight"],
  [300, "Light"],
  [400, "Regular"],
  [500, "Medium"],
  [600, "SemiBold"],
  [700, "Bold"],
  [800, "ExtraBold"],
  [850, "Heavy"],
  [900, "Black"],
];

const variants = WEIGHTS.flatMap(([weight, name]) => [
  {
    weight,
    style: "normal",
    src: [`${FONT_DIR}/FCMittraphapClear-${name}.woff2`],
  },
  {
    weight,
    style: "italic",
    src: [
      `${FONT_DIR}/FCMittraphapClear-${name === "Regular" ? "" : name}Italic.woff2`,
    ],
  },
]);

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.local(),
      name: "FC Mittraphap Clear",
      cssVariable: "--font-fc-mittraphap",
      options: {
        // @ts-expect-error variants is built dynamically
        variants,
      },
    },
  ],
});
