const { addDynamicIconSelectors, addIconSelectors } = require('@iconify/tailwind');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'prc': '#4ECB71',
        'src': '#535353',
        'dirty': '#E9E9E9',
        'text': '#404040',
      },
      scale:{
        '101': '1.01'
      },
      borderWidth:{
        '3': '3px'
      }
    },
},
  plugins: [
    addDynamicIconSelectors(),
    addIconSelectors([
      'ph',
      'mdi-light',
      'ic']),
  ],
}