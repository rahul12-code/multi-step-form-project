/** @type {import('tailwindcss').Config} */
module.exports = {

  safelist: [
    'peer',
    'peer-checked',
    'translate-x-full',
    'translate-x-6',
    'transition-all',
    'duration-300',
  ],

  mode: 'jit', // Enable JIT
  content: ['./*.html', 
    './*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', 'Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

