require('ignore-styles')

require('@babel/register')({
    ignore: [/(node_module)/],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
        "@babel/plugin-transform-modules-commonjs",
        "@babel/plugin-transform-runtime",
        [
          "transform-assets",
          {
            extensions: [
              "css",
              "svg",
              "png",
              "jpg",
              "jpeg"
            ],
            name: "static/media/[name].[hash:8].[ext]"
          }
        ]
    ]
})

require('./server')