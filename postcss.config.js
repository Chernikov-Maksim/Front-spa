module.exports = {
    plugins: {
        "postcss-flexbugs-fixes": {},
        "postcss-preset-env": {
            autoprefixer: {
                flexbox: "no-2009",
            },
            stage: 3,
            features: {
                "custom-properties": false,
            },
        },
        "postcss-pxtorem": {
            rootValue: 10,
            unitPrecision: 5,
            propList: ["*"],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: -9999999999999999999999,
            exclude: /node_modules/i,
        },
    },
};
