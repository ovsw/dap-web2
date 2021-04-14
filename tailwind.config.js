const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  corePlugins: {
    // ...
    ringColor: false
  },
  purge: {
    // layers: ['components', 'utilities'],
    content: [
      "tw-jit-classes.txt",
      "components/**/*.vue",
      "layouts/**/*.vue",
      "pages/**/*.vue",
      "plugins/**/*.js",
      "nuxt.config.js"
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        green: {
          light: "#3EB084",
          DEFAULT: "#2D8262",
          dark: "#006E44"
        },
        red: {
          light: "#FF6E6E",
          DEFAULT: "#DB3232",
          dark: "#CC1616"
        },
        blue: {
          light: "#5BD8EB",
          DEFAULT: "#057EA6",
          dark: "#006F94"
        },
        yellow: {
          light: "#ffd324",
          DEFAULT: "#ffcc00",
          dark: "#fefc9f"
        },
        cyan: {
          light: "#0EADC2",
          DEFAULT: "#0A7F8F",
          dark: "#096F7D"
        },
        dark: {
          light: "#42413b",
          DEFAULT: "#36342E",
          dark: "#343432",
          panelBorder: "rgba(54,52,46,.5)"
        },
        light: {
          light: "#FFF",
          DEFAULT: "#F4F4F4",
          dark: "#FFFDF5",
          panelBorder: "rgba(255,255,255,.5)"
        },
        muted: {
          DEFAULT: "#757575"
        }
      },
      outline: {
        green: ["2px solid #2d8262", "0.25rem"],
        greenLarge: ["2px solid #2d8262", "0.5rem"]
      },
      fontSize: {
        xxs: ".69rem"
      },
      fontFamily: {
        display: ["Raleway", ...defaultTheme.fontFamily.sans],
        body: ["Overpass", ...defaultTheme.fontFamily.sans]
      },
      spacing: {
        grd: "0.9375rem",
        "grd-half": "0.4688rem",
        "160": "40rem"
      },
      borderWidth: {
        "5": "5px"
      },
      // maxWidth: {
      //   'content': '1600px'
      // }
      typography: {
        dark: {
          css: {
            a: {
              color: "white",
              "&:hover": {
                color: "#ffcc00"
              }
            }
          }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/typography")]
};
