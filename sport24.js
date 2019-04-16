const { testFunction } = require("./testFunction");

const sport24Handler = ({ sport24 }, rp, $, prisma) => {
	rp(sport24)
		.then(html => {
			const len = $("h2 > a", html).length;
			const selector = $("h2 > a", html);
			testFunction(len, selector, rp, $, prisma, sport24ArticlesToDb);
		})
		.catch(err => console.log(err));
};

const sport24ArticlesToDb = resp => {
	const isValid = !resp && !selector[i].attribs.href.includes("LiveMatches");
	if (isValid) {
		rp(selector[i].attribs.href)
			.then(article => {
				prisma.mutation
					.createArticle(
						{
							data: {
								site: selector[i].attribs.href,
								title: $("div > h1", article)[0].children[0]
									.data,
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
			.catch(err => console.log("error rp"));
	}
};

module.exports = {
	sport24Handler
};
