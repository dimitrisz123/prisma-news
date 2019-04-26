const rp = require("request-promise");
const $ = require("cheerio");
const prisma = require("./src/prisma");
const { sport24Handler } = require("./sport24");
const { inGrHandler } = require("./inGr");
const { news247Handler } = require("./news247");
const http = require("http");
const https = require("https");

http.globalAgent.maxSockets = 1;
https.globalAgent.maxSockets = 1;

const scrapSites = async () => {
	const urls = {
		sport24: "https://www.sport24.gr/latest/",
		inGr: "https://www.in.gr/latestnews/",
		news247: "https://www.news247.gr/latest/"
	};
	sport24Handler(urls, rp, $, prisma);
	inGrHandler(urls, rp, $, prisma);
	news247Handler(urls, rp, $, prisma);
};

const performance = () => {
	const used = process.memoryUsage();
	for (let key in used) {
		console.log(
			`${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
		);
	}
};

performance();

scrapSites();
