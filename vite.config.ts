import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import postCssPxToRem from 'postcss-pxtorem'

console.log(process.env.NODE_ENV)

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 获取环境变量,通过 loadEnv 方式
  const env = loadEnv(mode, process.cwd())
  const BASE_URL = env.VITE_BASE_URL
  return {
    base: BASE_URL || '/',
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      Components({
        dts: false,
        // 原因：Toast Confirm 这类组件的样式还是需要单独引入，样式全局引入了，关闭自动引入
        resolvers: [VantResolver({ importStyle: false })],
      }),
    ],
    css: {
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 37.5, // 1rem的大小
            propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
            selectorBlackList: ['.van'], // 忽略转换正则匹配项
            minPixelValue: 2, // 设置要替换的最小像素值(3px会被转rem)。 默认 0
            exclude: /node_modules/, // 忽略转换正则匹配项
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 8088, //端口号
      host: '0.0.0.0', //ip地址 或 '0.0.0.0' 或 "loaclhost"
      open: true, //启动后是否自动打开浏览器
    },
  }
})
