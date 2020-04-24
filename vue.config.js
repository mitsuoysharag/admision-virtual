module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admision-virtual/'
    : '/',
  "transpileDependencies": [
    "vuetify"
  ]
}