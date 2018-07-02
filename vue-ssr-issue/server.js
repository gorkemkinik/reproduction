"use strict"
process.env.VUE_ENV = "server";
process.env.NODE_ENV = "development";

const fs = require("fs");
const path = require("path");
const express = require("express");
const server = express();
const axios = require("axios");
const { createBundleRenderer } = require('vue-server-renderer');

server.use(express.static('dist'));
server.get("*", (req, res) => {

    const template = fs.readFileSync(path.resolve(__dirname, "./dist/index.html"),"utf-8");

    delete require.cache[require.resolve('./dist/vue-ssr-server-bundle.json')];
    delete require.cache[require.resolve('./dist/vue-ssr-client-manifest.json')];

    const serverBundle = require('./dist/vue-ssr-server-bundle.json');
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    const renderer = createBundleRenderer(serverBundle, {
        template,
        clientManifest
    });
    const context = {request: req};

    renderer.renderToString(context, (err, html) => {
        if (err) {
            console.error(err);
        } else {
            res.send(html);
        }
    });

});

server.listen(1280, function (error) {
    if (error) throw error;
    console.log("Server is running");
});