/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          "01": "#FFFFFF",
          "02": "#F5F5F5",
          "03": "#B3B3B3",
          "09": "#1C1C1E",
        },
        primary: {
          blue: "#0066AE",
          darkBlue: "#0A3967",
          lightBlue: "#E4EDFF",
        },
        secondary: {
          red: "#CB3A31",
          green: "#12D79C",
          yellow: "#FFB831",
        },
      },
      boxShadow: {
        "01": "0px 0.5px 2px 0px rgba(96, 97, 112, 0.16), 0px 0px 1px 0px rgba(40, 41, 61, 0.08)",
        "02": "0px 2px 4px 0px rgba(96, 97, 112, 0.16), 0px 0px 1px 0px rgba(40, 41, 61, 0.04)",
        "03": "0px 4px 8px 0px rgba(96, 97, 112, 0.16), 0px 0px 2px 0px rgba(40, 41, 61, 0.04)",
        "04": "0px 8px 16px 0px rgba(96, 97, 112, 0.16), 0px 2px 4px 0px rgba(40, 41, 61, 0.04)",
        "05": "0px 16px 24px 0px rgba(96, 97, 112, 0.16), 0px 2px 8px 0px rgba(40, 41, 61, 0.04)",
        "06": "0px 20px 32px 0px rgba(96, 97, 112, 0.24), 0px 2px 8px 0px rgba(40, 41, 61, 0.08)",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(119.69deg, #0066AE 15.4%, #0A3967 84.03%)",
      },
    },
    fontFamily: {
      sans: ["Calibri", "sans-serif"],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-security-disc": {
          "-webkit-text-security": "disc",
        },
      });
    },
  ],
};
