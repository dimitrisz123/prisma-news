const rp = require("request-promise");
const $ = require("cheerio");
const prisma = require("./src/prisma");
const { sport24Handler } = require("./sport24");
const { inGr } = require("./inGr");

const scrapSites = async () => {
	const urls = {
		sport24: "https://www.sport24.gr/latest/",
		contra: "https://www.contra.gr/latest/",
		inGr: "https://www.in.gr/latestnews/",
		news247: "https://www.news247.gr/latest/"
	};
	sport24Handler(urls, rp, $, prisma);
	inGrHandler(urls, rp, $, prisma);
};

scrapSites();
