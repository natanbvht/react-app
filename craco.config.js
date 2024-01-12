"use strict";
const fs = require("fs");
const glob = require("glob");
const path = require("path");
const zlib = require("zlib");
const Dotenv = require("dotenv-webpack");
const dotenv = require("dotenv").config();
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const html = ["404"];
const views = ["about"];
const apps = ["upgrade", "subscribe", "recommendations"];

const PATHS = {
  src: path.join(__dirname, "src"),
};
const config = {
  env: {
    uat: process?.env?.ENV === "uat",
    test: process?.env?.ENV === "test",
    dev: process?.env?.ENV === "development",
    prod: process?.env?.ENV === "production",
    localhost: process?.env?.ENV === "localhost",
  },
  paths: {
    sitemap: path.resolve(__dirname, "./cypress/downloads/sitemap.json"),
  },
  compression: {
    minRatio: 0.8, // Only compress files with a compression ratio of 0.8 or better
    threshold: 10240, // Set the threshold (e.g., 10 KB)
  },
};
const htmlMinify = {
  html5: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
  removeComments: true,
  useShortDoctype: true,
  collapseWhitespace: true,
  removeOptionalTags: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};
function getEntries() {
  let entries = [];
  const entryPath = path.resolve(__dirname, "src/index.js");

  if (!config.env.localhost) {
    views.forEach((view) => {
      entries[entryPath] = entryPath;
    });
    apps.forEach((app) => {
      entries[entryPath] = entryPath;
    });
  }
  return entries;
}
function getPlugins() {
  const plugins = [];

  if (!config.env.localhost) {
    const appHtmls = apps.map((entry) => {
      return new HtmlWebpackPlugin({
        minify: htmlMinify,
        inject: true,
        scriptLoading: "blocking",
        preload: ["main.js", "main.css"],
        template: `./public/index.html`,
        chunks: [`${entry.toLocaleLowerCase()}`],
        filename: `./${entry.toLocaleLowerCase()}/index.html`,
      });
    });
    const viewsHtmls = views.map((entry) => {
      return new HtmlWebpackPlugin({
        minify: htmlMinify,
        inject: true,
        chunks: ["main"],
        scriptLoading: "blocking",
        preload: ["main.js", "main.css"],
        template: `./public/index.html`,
        filename: `./${entry.toLocaleLowerCase()}/index.html`,
      });
    });
    const staticHtmls = html.map((entry) => {
      return new HtmlWebpackPlugin({
        minify: htmlMinify,
        inject: true,
        chunks: ["main"],
        scriptLoading: "blocking",
        preload: ["main.js", "main.css"],
        template: `./public/${entry}/index.html`,
        filename: `./${entry}/index.html`,
      });
    });
    plugins.push(new Dotenv());
    plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: "static",
        generateStatsFile: true,
        statsFilename: "../reports/webpack/stats.json",
        reportFilename: "../reports/webpack/bundle.html",
      })
    );
    plugins.push(...appHtmls, ...viewsHtmls, ...staticHtmls);
  }

  if (config.env.prod || config.env.uat) {
    new PreloadWebpackPlugin({
      rel: "preload",
      as: "style",
      include: "main.css",
    }),
      new PreloadWebpackPlugin({
        rel: "preload",
        as: "script",
        include: "main.js",
      }),
      new PurgeCSSPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      });
    new CompressionPlugin({
      algorithm: "gzip",
      filename: "[path][base].gz",
      test: /\.(js|css|html|svg|json|ttf)$/,
      minRatio: config.compression.minRatio,
      threshold: config.compression.threshold,
      compressionOptions: {
        level: zlib.constants.Z_BEST_COMPRESSION,
      },
    }),
      new CompressionPlugin({
        filename: "[path][base].br",
        algorithm: "brotliCompress",
        test: /\.(js|css|html|svg|json|ttf)$/,
        minRatio: config.compression.minRatio,
        threshold: config.compression.threshold,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
      }),
      new HtmlCriticalPlugin({
        base: path.join(path.resolve(__dirname), "build"),
        src: "index.html",
        dest: "index.html",
        inline: true,
        minify: true,
        extract: true,
        width: 375,
        height: 565,
        penthouse: {
          blockJSRequests: false,
        },
      });
  }

  return plugins;
}
function getRules() {
  return [
    {
      test: /\.md$/,
      use: "raw-loader",
    },
    {
      test: /\.(jpe?g|png|gif|svg|webp|json)$/i,
      type: "asset",
    },
    {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    },
  ];
}
function getOptimization() {
  if (config.env.prod || config.env.uat) {
    return {
      minimize: true,
      providedExports: true,
      runtimeChunk: "runtime",
      splitChunks: {
        minChunks: 1,
        chunks: "all",
        minSize: 2000,
        maxSize: Infinity,
        minRemainingSize: 0,
        maxAsyncRequests: 30,
        enforceSizeThreshold: 50000,
        maxInitialRequests: Infinity,
        cacheGroups: {
          defaultVendors: {
            priority: 2,
            chunks: "initial",
            reuseExistingChunk: true,
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name of the npm package
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `npm.${packageName.replace("@", "")}`;
            },
          },
          async: {
            chunks: "async",
            test: /[\\/]node_modules[\\/]/,
            name(module, chunks) {
              return chunks.map((chunk) => chunk.name).join("-");
            },
          },
        },
      },
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.squooshMinify,
            options: {
              encodeOptions: {
                avif: { cqLevel: 0 },
                webp: { lossless: 1 },
                mozjpeg: { quality: 100 },
              },
            },
          },
        }),
      ],
    };
  } else {
    return { minimize: false };
  }
}
function getMode() {
  if (config.env.prod || config.env.uat) {
    return "production";
  } else {
    return "development";
  }
}

console.log(`Webpack is now running in ${process.env.ENV} environement`);

module.exports = {
  webpack: {
    mode: getMode(),
    rules: getRules(),
    entry: getEntries(),
    plugins: getPlugins(),
    optimization: getOptimization(),
    devtool: config.env.dev ? "source-map" : false,
    map: config.env.dev ? "eval-source-map" : null,
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "static/js/[name].[contenthash:8].js",
      chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
    },
  },
  devServer: (devServerConfig) => {
    const { onBeforeSetupMiddleware } = devServerConfig;
    devServerConfig.onBeforeSetupMiddleware = (devServer) => {
      if (onBeforeSetupMiddleware) {
        onBeforeSetupMiddleware(devServer);
      }
      devServer.app.get("/api/health", (req, res) => {
        res.json({ status: "UP" });
      });
    };
    return devServerConfig;
  },
};
