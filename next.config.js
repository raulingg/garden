const withPlugins = require("next-compose-plugins")
const optimizedImages = require("next-optimized-images")

module.exports = withPlugins([
  [
    optimizedImages,
    {
      optimizeImagesInDev: true,
      removeOriginalExtension: true,
      responsive: {
        adapter: require("responsive-loader/jimp"),
        sizes: [320, 640, 960, 1200, 1800, 2400],
        placeholder: true,
        placeholderSize: 20,
      },
    },
  ],
])
