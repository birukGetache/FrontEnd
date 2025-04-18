export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Ensure the content paths are correct
  ],
  theme: {
    extend: {
      screens: {
        'xxl': '1400px', // custom breakpoint at 1400px
        "xxm":'750px'
      },
      fontFamily: {
        playfair: ["Nunito", 'serif'], // Corrected comment
      },
      backdropBlur: {
        sm: '4px',
        md: '8px',
      },
      colors: {
        'custom-start': '#223344',
        'custom-end': '#0b171c',
      },
      animation: {
        slide: "slide 20s linear infinite",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      keyframes: {
        rotateIcon: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        luckyIconAnimation: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        slide: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(-200%)' }, // Fixed duplicate 50%
          '75%': { transform: 'translateX(-300%)' },
          '100%': { transform: 'translateX(-400%)' }, // Corrected syntax
        },
      },
      animation: {
        slide: 'slide 16s infinite',
        rotateIcon: 'rotateIcon 4s infinite',
        luckyIconAnimation: 'luckyIconAnimation 3s infinite',
      },
    },
  },
  plugins: [
    
  ],
};
