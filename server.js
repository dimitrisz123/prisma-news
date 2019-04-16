const rp = require("request-promise");
const $ = require("cheerio");
const prisma = require("./src/prisma");
const sport24 = require("./sport24");

const scrapSites = () => {
	const urls = {
		sport24: "https://www.sport24.gr/latest/",
		contra: "https://www.contra.gr/latest/",
		inGr: "https://www.in.gr/latestnews/",
		news247: "https://www.news247.gr/latest/"
	};
	sport24.sport24Handler(urls, rp, $, prisma);
};
scrapSites();
