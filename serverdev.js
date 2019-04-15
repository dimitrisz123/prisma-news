const rp = require("request-promise");
const $ = require("cheerio");
const prisma = require("./src/prisma");

const scrapSites = async () => {
	const urls = [
		"https://www.in.gr/latestnews/",
		"https://www.news247.gr/latest/"
	];

	let sitesHtml = await getUrls(urls);
	console.log(sitesHtml);
	console.log(sitesHtml[0].inGr);
	// sitesHtml[0].inGr.map(test => console.log(test));
};

const getUrls = data => {
	return Promise.all(
		data.map(url => {
			if (url.includes("www.in.gr")) {
				return rp(url)
					.then(html => {
						return {
							inGr: $("span > a", html)
						};
					})
					.catch(err => console.log("inGr extraction failed"));
			} else if (url.includes("www.news247.gr")) {
				return rp(url)
					.then(html => {
						return {
							news247: $("h2 > a", html)
						};
					})
					.catch(err => console.log("news247 extraction failed"));
			}
		})
	);
};

scrapSites();

// const scrapSites = async () => {
// 	const urls = {
// 		ingr: "https://www.in.gr/latestnews/",
// 		news247: "https://www.news247.gr/latest/"
// 	};
// 	console.log(await getIngrUrls(urls));
// 	getIngrUrls(urls);
// };

// const getIngrUrls = ({ ingr }) => {
// 	return rp(ingr).then(html => {
// 		return $("span > a", html);
// 		// const inGrLinks = $("span > a", html);
// 		// const inGrLinksLength = $("span > a", html).length;
// 		// let inGrUrls = [];
// 		// for (let i = 1; i < inGrLinksLength; i++) {
// 		// 	if (inGrLinks[i].attribs.href.includes("www.in.gr")) {
// 		// 		inGrUrls.push(inGrLinks[i].attribs.href);
// 		// 	}
// 		// }
// 		// console.log(inGrUrls);
// 	});
// };

// scrapSites();
