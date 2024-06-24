/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            mobile: "660px",
            desktop: "800px",
            wide: "1200px",
        },
    },
    plugins: [],
};

export default config;
