const testFunction = (len, selector, rp, $, prisma, sport24ArticlesToDb) => {
	for (let i = 0; i < len; i++) {
		prisma.exists
			.Article({
				site: selector[i].attribs.href
			})
			.then(resp => {
				sport24ArticlesToDb(resp);
			})
			.catch(err => console.log(err));
	}
};

module.exports = {
	testFunction
};
