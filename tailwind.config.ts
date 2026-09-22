import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "95": "95",
        "100": "100",
        "110": "110",
        "120": "120",
      },
    },
  },
  plugins: [],
};
export default config;
