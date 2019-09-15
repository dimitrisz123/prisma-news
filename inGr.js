const inGrHandler = ({ inGr }, rp, $, prisma) => {
	return rp(inGr)
		.then(html => {
			const selector = $("span > a", html);
			const len = selector.length;
			for (let i = 0; i < len; i++) {
				const newsValidation =
					!selector[i].attribs.href.includes("deltio-eidiseon") &&
					selector[i].attribs.href.includes("www.in.gr");
				if (newsValidation) {
					// return devFunction(selector[i].attribs.href, rp, $);
					prisma.exists
						.Article({
							site: selector[i].attribs.href
						})
						.then(resp => {
							const isValid = !resp;
							if (isValid) {
								addIngrArticlesToDb(
									selector[i].attribs.href,
									rp,
									$,
									prisma
								);
							}
						})
						.catch(err => console.log(err));
				}
			}
		})
		.catch(err => console.log(err));
};

const addIngrArticlesToDb = (articleUrl, rp, $, prisma) => {
	rp(articleUrl)
		.then(article => {
			// console
			// 	.log(
			// 		$("div> time", article).attr("datetime"),
			// 		$("div> time", article).attr("datetime")
			// 	)
			// 	.toISOString();
			prisma.mutation
				.createArticle(
					{
						data: {
							site: articleUrl || "not exist",
							title:
								$("div > h1", article)[0].children[0].data ||
								"not exist",
							section:
								$("span > strong.breadcrumb_last", article)[0]
									.parent.children[0].children[0].data ||
								"not exist",
							summary:
								$(
									"div.tooth-row > span.article-summary",
									article
								)[0].children[0].data || "not exist",
							image:
								$(
									"div.content-single-image > a",
									article
								).attr("href") || "not exist",
							content: null,
							time: new Date(
								$("div> time", article)
									.attr("datetime")
									.split("T")[0] +
									$("div> time", article)
										.attr("title")
										.split(",")[1]
							).toISOString()
						}
					},
					"{ id title site time }"
				)
				.then(response => console.log(response))
				.catch(err => console.log("4"));
		})
		.catch(err => console.log("inGr, 5", err, articleUrl));
};

// const devFunction = (articleUrl, rp, $) => {
// 	rp(articleUrl)
// 		.then(article => {
// 			inGrDev = {};
// 			inGrDev.site = articleUrl;
// 			inGrDev.title = $("div > h1", article)[0].children[0].data;
// 			inGrDev.summary = $(
// 				"div.tooth-row > span.article-summary",
// 				article
// 			)[0].children[0].data;
// 			inGrDev.prologue = null;
// 			inGrDev.content = null;
// 			inGrDev.image = $("div.content-single-image > img", article).attr(
// 				"data-src"
// 			);
// 			inGrDev.time = $("div > time", article).attr("datetime");
// 			console.log(inGrDev);
// 		})
// 		.catch(err => console.log(err));
// };

module.exports = {
	inGrHandler
};
