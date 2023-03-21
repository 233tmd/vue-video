const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 解决WebSocket connection to 'ws://192.168.10.198:8081/ws' failed: Error in connection establishment: net::ERR_CONNECTION_TIMED_OUT报错
  devServer: {
    client: {
      webSocketURL: 'ws://0.0.0.0:8081/ws'
    }
  }
})
