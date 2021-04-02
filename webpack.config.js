const path = require('path');

module.exports = {
    mode: 'none', 
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        // clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '.dist',
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          },
    
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
            ],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            // type: 'asset/resource',
            use: [
              'file-loader',
            ],
          },
    
          {
            test: /\.html$/i,
            loader: 'html-loader',
          },
        ],
      },
};