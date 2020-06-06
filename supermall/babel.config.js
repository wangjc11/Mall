module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
/*  起别名，会报错
  module.exports = {
    configureWebpack: {
        reslove: {
            alias: {
                "assets": '@/assets',
                "components": '@/components',
                "views": '@/views',
                "common": '@/common',
                "network": '@/network',
            }
        }
    }
} */
