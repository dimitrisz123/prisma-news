const rp = require("request-promise");
const $ = require("cheerio");
const url = "https://www.sport24.gr/latest/";

const sport24 = url => {
	rp(url).then(html => {
		const len = $("h2 > a", html).length;
		const selector = $("h2 > a", html);
		let links = [];
		for (let i = 0; i < len; i++) {
			if (!selector[i].attribs.href.includes("LiveMatches")) {
				links.push(selector[i].attribs.href);
			}
		}
		return Promise.all(
			links.map(urls => {
				return extractArticle(urls);
			})
		)
			.then(final => console.log(final))
			.catch(err => console.log("Error"));
	});
};

const extractArticle = data => {
	return rp(data)
		.then(article => {
			return {
				site: data.split("/")[2],
				title: $("div > h1", article)[0].children[0].data,
				summary: $("p.summary", article)[0].children[0].data,
				prologue: $("div.prologue", article)
					.text()
					.replace(/[\n\t\r]/g, ""),
				content: $("div.body", article)
					.text()
					.replace(/[\n\t\r]/g, ""),
				time: $("b", "span.byline_date", article)[0].children[0].data
			};
		})
		.catch(err => console.log("Error extractArticle"));
};

sport24(url);

// const details = data => {
// 	return rp(data).then(resp => {
// 		const selector = $("div > h1", resp);
// 		return {
// 			title: selector[0].children[0].data
// 		};
// 		//console.log($("div > h1", resp)[0].children[0].data);
// 	});
// };
