const sport24Handler = ({ sport24 }, rp, $, prisma) => {
	return rp(sport24)
		.then(html => {
			const selector = $("h2 > a", html);
			const len = selector.length;
			for (let i = 1; i < selector.length; i++) {
				prisma.exists
					.Article({
						site: selector[i].attribs.href
					})
					.then(resp => {
						const isValid =
							!resp &&
							!selector[i].attribs.href.includes("LiveMatches");
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
		})
		.catch(err => console.log(err));
};

const addSport24ArticlesToDb = (articleUrl, rp, $, prisma) => {
	rp(articleUrl)
		.then(article => {
			prisma.mutation
				.createArticle(
					{
						data: {
							site: articleUrl,
							title: $("div > h1", article)[0].children[0].data,
							summary: $("p.summary", article)[0].children[0]
								.data,
							prologue: $("div.prologue", article)
								.text()
								.replace(/[\n\t\r]/g, ""),
							content: $("div.body", article)
								.text()
								.replace(/[\n\t\r]/g, ""),
							time: $("b", "span.byline_date", article)[0]
								.children[0].data
						}
					},
					"{ id title }"
				)
				.then(response => console.log(response))
				.catch(err => console.log("Error adding to the db"));
		})
		.catch(err => console.log("Error rp"));
};

module.exports = {
	sport24Handler
};
