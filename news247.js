const news247Handler = ({ news247 }, rp, $, prisma) => {
	return rp(news247)
		.then(html => {
			const selector = $("h2 > a", html);
			const len = selector.length;
			for (let i = 1; i < len; i++) {
					return devFunction(selector[i].attribs.href, rp, $);
				

				// prisma.exists
				// 	.Article({
				// 		site: selector[i].attribs.href
				// 	})
				// 	.then(resp => {
				// 		const isValid =
				// 			!resp &&
				// 			!selector[i].attribs.href.includes("LiveMatches");
				// 		if (isValid) {
				// 			addSport24ArticlesToDb(
				// 				selector[i].attribs.href,
				// 				rp,
				// 				$,
				// 				prisma
				// 			);
				// 		}
				// 	})
				// 	.catch(err => console.log(err));
			}
		})
		.catch(err => console.log(err));
};

// const addSport24ArticlesToDb = (articleUrl, rp, $, prisma) => {
// 	rp(articleUrl)
// 		.then(article => {
// 			prisma.mutation
// 				.createArticle(
// 					{
// 						data: {
// 							site: articleUrl,
// 							title: $("div > h1", article)[0].children[0].data,
// 							summary: $("p.summary", article)[0].children[0]
// 								.data,
// 							prologue: $("div.prologue", article)
// 								.text()
// 								.replace(/[\n\t\r]/g, ""),
// 							content: $("div.body", article)
// 								.text()
// 								.replace(/[\n\t\r]/g, ""),
// 							time: $("b", "span.byline_date", article)[0]
// 								.children[0].data
// 						}
// 					},
// 					"{ id title }"
// 				)
// 				.then(response => console.log(response))
// 				.catch(err => console.log("Error adding to the db"));
// 		})
// 		.catch(err => console.log("Error rp"));
// };

const devFunction = (articleUrl, rp, $) => {
	rp(articleUrl)
		.then(article => {
			news247Dev = {};
			news247Dev.site = articleUrl;
			news247Dev.title = $("div > h1.article-body__article-headline", article)[0].children[0].data;
			news247Dev.summary = $(
				"div.tooth-row > span.article-summary",
				article
			)[0].children[0].data;
			news247Dev.prologue = null;
			news247Dev.content = null;
			news247Dev.image = $("div.content-single-image > img", article).attr(
				"data-src"
			);
			news247Dev.time = $("div > time", article).attr("datetime");
			console.log(news247Dev);
		})
		.catch(err => console.log(err));
};

module.exports = {
	news247Handler
};
