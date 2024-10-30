/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // 添加content路徑
  theme: {
    extend: {},
  },
  darkMode: ['selector', '[class="p-dark"]'] , // 加入 darkMode 設定
  plugins: [
    require('tailwindcss-primeui') // 加入 tailwindcss-primeui 插件
  ],
}

