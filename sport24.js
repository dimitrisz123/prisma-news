const rp = require("request-promise");
const $ = require("cheerio");
const prisma = require("./src/prisma");

const sport24Handler = data => {
	rp(data.sport24)
		.then(html => {
			const len = $("h2 > a", html).length;
			const selector = $("h2 > a", html);
			for (let i = 0; i < len; i++) {
				prisma.exists
					.Article({
						site: selector[i].attribs.href
					})
					.then(resp => {
						if (
							!resp &&
							!selector[i].attribs.href.includes("LiveMatches")
						) {
							rp(selector[i].attribs.href).then(article => {
								prisma.mutation
									.createArticle(
										{
											data: {
												site: selector[i].attribs.href,
												title: $("div > h1", article)[0]
													.children[0].data,
												summary: $(
													"p.summary",
													article
												)[0].children[0].data,
												prologue: $(
													"div.prologue",
													article
												)
													.text()
													.replace(/[\n\t\r]/g, ""),
												content: $("div.body", article)
													.text()
													.replace(/[\n\t\r]/g, ""),
												time: $(
													"b",
													"span.byline_date",
													article
												)[0].children[0].data
											}
										},
										"{ id title }"
									)
									.then(response => console.log(response))
									.catch(err => console.log("Error"));
							});
						}
					});
				// if (!selector[i].attribs.href.includes("LiveMatches")) {
				// 	links.push(selector[i].attribs.href);
				// }
			}
			// links.map(articleUrl => {
			// 	rp(articleUrl).then(article => {
			// 		prisma.prisma.mutation
			// 			.createArticle(
			// 				{
			// 					data: {
			// 						site: articleUrl,
			// 						title: $("div > h1", article)[0].children[0]
			// 							.data,
			// 						summary: $("p.summary", article)[0]
			// 							.children[0].data,
			// 						prologue: $("div.prologue", article)
			// 							.text()
			// 							.replace(/[\n\t\r]/g, ""),
			// 						content: $("div.body", article)
			// 							.text()
			// 							.replace(/[\n\t\r]/g, ""),
			// 						time: $("b", "span.byline_date", article)[0]
			// 							.children[0].data
			// 					}
			// 				},
			// 				"{ id title }"
			// 			)
			// 			.then(response => console.log(response))
			// 			.catch(err => console.log(err));

			// 		// site: data,
			// 		// title: $("div > h1", article)[0].children[0].data,
			// 		// summary: $("p.summary", article)[0].children[0].data,
			// 		// prologue: $("div.prologue", article)
			// 		// 	.text()
			// 		// 	.replace(/[\n\t\r]/g, ""),
			// 		// content: $("div.body", article)
			// 		// 	.text()
			// 		// 	.replace(/[\n\t\r]/g, ""),
			// 		// time: $("b", "span.byline_date", article)[0].children[0].data
			// 	});
			// });

			// return Promise.all(
			// 	links.map(urls => {
			// 		return extractArticleSport24(urls);
			// 	})
			// )
			// .then(final => {
			// 	final.map(results => {
			// 		console.log(
			// 			prisma.prisma.exists
			// 				.Article({
			// 					site: results.site
			// 				})
			// 				.then(data => console.log(data))
			// 		);

			// 		// prisma.prisma.mutation.createArticle(
			// 		// 	{
			// 		// 		data: {
			// 		// 			site: results.site,
			// 		// 			title: results.title,
			// 		// 			summary: results.summary,
			// 		// 			prologue: results.prologue,
			// 		// 			content: results.content,
			// 		// 			time: results.time
			// 		// 		}
			// 		// 	},
			// 		// 	"{ id title }"
			// 		// );

			// 	});
			// })
			// .then(data => console.log("it worked"))
			// .catch(err => console.log(err));
			/*else if (url.includes("contra.gr")) {
				const len = $("a.summary", "div", html).length;
				const selector = $("a.summary", "div", html);
				let links = [];
				for (let i = 0; i < len; i++) {
					if (!selector[i].attribs.href.includes("livematches")) {
						links.push(selector[i].attribs.href);
					}
				}
				return Promise.all(
					links.map(urls => {
						// return extractArticleSport24(urls);
						console.log("contra");
					})
				);
				// .then(final => console.log("final"))
					// .catch(err => console.log("Error"));
				console.log(links);
			}*/
		})
		.catch(err => console.log(err));
};

module.exports = {
	sport24Handler
};
