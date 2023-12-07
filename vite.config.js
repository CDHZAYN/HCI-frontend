import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
import nodePath from 'path'
import fs from 'fs'

// 根据当前执行环境(dev/prod)，从根目录中读取对应的配置文件(.env.dev/.env.prod)，
// 将其中的后端URL(服务器IP/localhost)添加到运行环境参数(process.env)中，进而配置到vite的代理中。
(function loadBackendURL() {
    let envMode = process.env.npm_lifecycle_event
    if(envMode === 'build')
        envMode = 'prod'
    const prefix = 'VITE'
    const envFileName = `.env.${envMode}`
    const fullPath = nodePath.join(process.env.npm_config_local_prefix, envFileName)
    if (fs.existsSync(fullPath)) {
        const parsed = dotenv.parse(fs.readFileSync(fullPath))
        for (const [key, value] of Object.entries(parsed)) {
            if (key.startsWith(prefix) && process.env[key] === undefined) {
                process.env[key] = value
            }
        }
    }
})()

console.log('server proxy target: ', process.env.VITE_BACKEND_URL)

export default defineConfig(
    {
        plugins: [vue()],
        server: {
            proxy: {
                '/api': {
                    target: process.env.VITE_BACKEND_URL,
                    changeOrigin: true,
                    rewrite: (path) => {
                        console.log(path, path.replace(/^\/api/, ''))
                        return path.replace(/^\/api/, '')
                    }
                }
            },
        }
    }
)
