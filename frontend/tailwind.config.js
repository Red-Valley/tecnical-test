module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        tiny: '0.625rem', // 10px
      },
      colors: {
        secondary: {
          DEFAULT: '#1877f2',
        },
        gray: {
          DEFAULT: 'rgb(128, 128, 128)',
          dark: 'rgb(228, 230, 235)',
        },
        black: {
          DEFAULT: '#212121',
        },
      },
    },
  },
  plugins: [],
}
