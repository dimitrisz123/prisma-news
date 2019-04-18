const inGrHandler = ({ inGr }, rp, $, prisma) => {
	return rp(inGr)
		.then(html => {
			const selector = $("span > a", html);
			for (let i = 1; i < selector.length; i++) {
				console.log(selector[i].attribs.href);
				devFunction(articleUrl, rp, $);
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

const devFunction = (articleUrl, rp, $) => {};

module.exports = {
	inGrHandler
};
