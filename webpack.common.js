const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin")
const Pages = require("./webpack.pages")
const configuration = {
  port: 3000, // this is browserSync Port
  TemplateTitle: "Product Template",
}

const PluginSettings = []

Pages.forEach((item) => {
  // console.log(element.page)
  // const [page, index] = element
  if (item.compile === 1) {
    PluginSettings.push(
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        title: `${item.title} | ${configuration.TemplateTitle}`,
        filename: `${item.page}.html`,
        template: `src/${item.page}.html`,
        inject: "body",
        minify: false,
      })
    )
  }
})

const CopyPluginSettings = new CopyPlugin({
  patterns: [{ from: "src/images", to: "images" }],
})

PluginSettings.push(CopyPluginSettings)
PluginSettings.push(new HtmlWebpackHarddiskPlugin())
PluginSettings.push(new MiniCssExtractPlugin({ filename: "styles/[name].css" }))

const config = {
  externals: {},
  entry: {
    main: path.resolve(__dirname, "src/App.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scripts/[name].js",
    clean: true,
  },
  devtool: false,
  devServer: {
    watchFiles: ["./**/*.html"],
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: configuration.port,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "./images/[name][ext]",
        },
      },
      {
        test: /\.(ttf|eot|svg|woff2|woff)$/i,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[name][ext]",
        },
      },
    ],
  },
  plugins: PluginSettings,
}

module.exports = config
