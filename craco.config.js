const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Resolve the image folder path
      const imagePath = path.resolve(__dirname, 'src/assets/images');

      // Find the rule that handles images
      const imageRule = webpackConfig.module.rules.find(rule =>
        rule.oneOf && rule.oneOf.find(oneOf => {
          if (oneOf.loader && oneOf.loader.indexOf('file-loader') !== -1) {
            return true;
          }
          if (oneOf.use) {
            return oneOf.use.find(use => use.loader && use.loader.indexOf('file-loader') !== -1);
          }
          return false;
        })
      );

      // Add url-loader to handle images
      imageRule.oneOf.unshift({
        test: /\.(png|jpe?g|gif|webp)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192, // Convert images smaller than 8kb to base64 strings
          name: 'static/media/[name].[hash:8].[ext]',
          outputPath: imagePath, // Set the output path for images
          publicPath: '/assets/images/', // Set the public path for images
        },
      });

      return webpackConfig;
    },
  },
};
