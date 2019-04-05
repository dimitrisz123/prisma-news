const sport24 = require("./sport24");
/*rp(url1)
	.then(html => {
		let sport24football = [];
		console.log(html);
		console.log($("h2 > a", html).length);
		for (i = 0; i < $("h2 > a", html).length; i++) {
			sport24football.push({
				id: i,
				title: $("h2 > a", html)[i].children[0].data,
				href: $("h2 > a", html)[i].attribs.href
			});
		}
		console.log(sport24football);
	})
	.catch(err => console.log("Error fetching sport24football"));*/

const scrapSites = () => {
	const urls = {
		sport24: "https://www.sport24.gr/latest/",
		contra: "https://www.contra.gr/latest/"
	};
	sport24.sport24Handler(urls);
};
scrapSites();
// const extractArticleSport24 = data => {
// 	return rp(data)
// 		.then(article => {
// 			return {
// 				site: data,
// 				title: $("div > h1", article)[0].children[0].data,
// 				summary: $("p.summary", article)[0].children[0].data,
// 				prologue: $("div.prologue", article)
// 					.text()
// 					.replace(/[\n\t\r]/g, ""),
// 				content: $("div.body", article)
// 					.text()
// 					.replace(/[\n\t\r]/g, ""),
// 				time: $("b", "span.byline_date", article)[0].children[0].data
// 			};
// 		})
// 		.catch(err => console.log("Error extractArticle"));
// };

// const extractArticle = data => {
// 	return rp(data).then(article => {
// console.log($("div > h1", article)[0].children[0].data);
// console.log($("p.summary", article)[0].children[0].data);
// let string = $("div.prologue", article)
// 	.text()
// 	.replace(/[\n\t\r]/g, "");

// // string = string.replace(/[\n\t\r]/g, "");
// console.log(string);
// console.log(
// 	$("div.body", article)
// 		.text()
// 		.replace(/[\n\t\r]/g, "")
// );
// console.log($("span > b", article)[0].children[0].data.split(" ")[4]);
// 		return {
// 			title: $("div > h1", article)[0].children[0].data,
// 			summary: $("p.summary", article)[0].children[0].data,
// 			prologue: $("div.prologue", article)
// 				.text()
// 				.replace(/[\n\t\r]/g, ""),
// 			content: $("div.body", article)
// 				.text()
// 				.replace(/[\n\t\r]/g, ""),
// 			time: $("span > b", article)[0].children[0].data.split(" ")[4]
// 		};
// 	});
// };

// const testurl =
// 	"https://www.sport24.gr/football/omades/Aek/aek-o-tsigkrinski-evgale-meros-ths-proponhshs.5451706.html";
// extractArticle(testurl);

// let articles = {};
// const bigData = data => {
// 	return data.map((link, i) => {
// 		if (link.includes("sport24")) {
// 			return rp(link).then(html => {
// 				return {
// 					website: $("h2 > a", html)
// 				};
// 			});
// 		}
// 	});
// };

// let articles = [];
// const bigData = data => {
// 	let len = data.length;
// 	for (let i = 0; i < len; i++) {
// 		if (data[i].includes("sport24")) {
// 			fetch(data[i]).then(html => {
// 				articles.push({ article: $("h2 > a", html) });
// 				// articles[i] = $("h2 > a", html);
// 				// let test = JSON.stringify(articles);
// 				// console.log(test);
// 				console.log(articles);
// 			});

// 		}
// 	}
// };
// console.log(articles);

// bigData(urls);

// let sport24football = [];
// let count = 0;
// const promises = urls.map(url => {
// 	rp(url).then(html => {
// 		count = $("h2 > a", html).length + count;
// 		console.log(count);
// 		for (let i = 0; i < $("h2 > a", html).length; i++) {
// 			sport24football.push({
// 				id: i,
// 				title: $("h2 > a", html)[i].children[0].data,
// 				href: $("h2 > a", html)[i].attribs.href
// 			});
// 		}
// 		//console.log(sport24football);
// 	});
// });

// let title={}
// let results = urls.map((url,i) => {
// 	fetch(url).then(html => {
// 		title[i]= $("h2 > a", html)
// 		function

// 	});

// });
