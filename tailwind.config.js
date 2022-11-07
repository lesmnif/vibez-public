/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        loader: "loader 0.6s infinite alternate"
      },
      keyframes: {
        loader: {
          to: {
            opacity: 0.9,
            transform: "translate3d(0, -1rem, 0)"
          }
        }
      },
      fontFamily: {
        'poppins': ['Poppins'],
     },
      colors: {
        "spotify-green": "#1DB954",
        "vibez-primary": "#A260F4",
        "vibez-secondary": "#5074f1",
        "vibez-terciary": "#00FFC2",
        "vibez-page": "#151515",
        "vibez-header":"#202020",
        "vibez-cards": "#313131",
        "vibez-text": "#1E1E1E",
        "vibez-test": "#00FFC2  ",
        "vibez-test-2": "#6FEDD6"
      },
      backgroundImage: {
        "background-normal": "url('/bg_desktop.svg')",
        "background-page": "url('/vibez_bg_svg.svg')",
      },
    },
  },
};
