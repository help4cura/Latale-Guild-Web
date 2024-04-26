//tailwind.config.ts
import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "aurora-gradient": "linear-gradient(90deg, #9FCD85, #67B7D1, #C84D8B, #67B7D1, #9FCD85)",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        custompulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%', backgroundSize: '400% 400%' },
          '25%': { backgroundPosition: '100% 50%', backgroundSize: '400% 400%' },
          '50%': { backgroundPosition: '200% 50%', backgroundSize: '400% 400%' },
          '75%': { backgroundPosition: '300% 50%', backgroundSize: '400% 400%' },
          '100%': { backgroundPosition: '400% 50%', backgroundSize: '400% 400%' },
          '125%': { backgroundPosition: '500% 50%', backgroundSize: '400% 400%' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        fadeOut: 'fadeOut 0.5s ease-out forwards',
        slideIn: 'slideIn 0.5s ease-out forwards',
        slideOut: 'slideOut 0.5s ease-in forwards',
        custompulse: 'custompulse 3s linear infinite',
        aurora: 'aurora 20s linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // This plugin must be installed.
};
export default config;