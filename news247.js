const news247Handler = ({ news247 }, rp, $, prisma) => {
	return rp(news247)
		.then(html => {
			const selector = $("h2 > a", html);
			const len = selector.length;
			for (let i = 0; i < len; i++) {
				// devFunction(selector[i].attribs.href, rp, $);

				prisma.exists
					.Article({
						site: selector[i].attribs.href
					})
					.then(resp => {
						const isValid = !resp;
						if (isValid) {
							addnews247ArticlesToDb(
								selector[i].attribs.href,
								rp,
								$,
								prisma
							);
						}
					})
					.catch(err => console.log(err, "1"));
			}
		})
		.catch(err => console.log(err));
};

const addnews247ArticlesToDb = (articleUrl, rp, $, prisma) => {
	rp(articleUrl)
		.then(article => {
			prisma.mutation
				.createArticle(
					{
						data: {
							site: articleUrl,
							title: $(
								"div > h1.article-body__article-headline",
								article
							)[0]
								.children[0].data.replace(/\n/g, "")
								.trim(),
							section: $("div.article-head > a", article).attr(
								"title"
							),
							summary: $(
								"div > h2.article-body__introtext",
								article
							)[0].children[0].data,
							image: $("figure > img", article).attr("src"),
							content: null,
							time: new Date(
								($("span > time", article).attr("datetime") ||
									$("div > time", article).attr("datetime")) +
									"+03:00"
							).toISOString()
						}
					},
					"{ id title site time }"
				)
				.then(response => console.log(response))
				.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
};

// const devFunction = (articleUrl, rp, $) => {
// 	rp(articleUrl)
// 		.then(article => {
// 			news247Dev = {};
// 			news247Dev.site = articleUrl;
// 			news247Dev.title = $(
// 				"div > h1.article-body__article-headline",
// 				article
// 			)[0].children[0].data;
// 			news247Dev.section = $("div.article-head > a", article).attr(
// 				"title"
// 			);
// 			news247Dev.summary = $(
// 				"div > h2.article-body__introtext",
// 				article
// 			)[0].children[0].data;
// 			news247Dev.image = $("figure > img", article).attr("src");
// 			news247Dev.content = null;
// 			news247Dev.time =
// 				$("span > time", article).attr("datetime") ||
// 				$("div > time", article).attr("datetime");
// 			console.log(news247Dev);
// 		})
// 		.catch(err => console.log(err));
// };

module.exports = {
	news247Handler
};
