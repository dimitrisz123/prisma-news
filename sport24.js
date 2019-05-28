const sport24Handler = ({ sport24 }, rp, $, prisma) => {
	return rp(sport24)
		.then(html => {
			const selector = $("h2 > a", html);
			const len = selector.length;
			for (let i = 0; i < len; i++) {
				const newsValidation = !selector[i].attribs.href.includes(
					"LiveMatches"
				);
				if (newsValidation) {
					prisma.exists
						.Article({
							site: selector[i].attribs.href
						})
						.then(resp => {
							const isValid = !resp;
							if (isValid) {
								addSport24ArticlesToDb(
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

const addSport24ArticlesToDb = (articleUrl, rp, $, prisma) => {
	rp(articleUrl)
		.then(article => {
			console.log(
				new Date(
					$("p > span.byline_date", article)
						.attr("content")
						.split("+")[0]
				).toISOString()
			);
			prisma.mutation
				.createArticle(
					{
						data: {
							site: articleUrl,
							title: $("div > h1", article)[0].children[0].data,
							section: $("div > a.active", article)[0].children[0]
								.data,
							summary: $("p.summary", article)[0].children[0]
								.data,
							image: $("div.relatedPicture > img", article).attr(
								"src"
							),
							content: null,
							time: new Date(
								$("p > span.byline_date", article)
									.attr("content")
									.split("+")[0]
							).toISOString()
						}
					},
					"{ id title site time }"
				)
				.then(response => console.log(response))
				.catch(err => console.log("Error adding to the db"));
		})
		.catch(err => console.log(err));
};

module.exports = {
	sport24Handler
};
