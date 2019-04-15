const sport24 = require("./sport24");

const scrapSites = () => {
	const urls = {
		sport24: "https://www.sport24.gr/latest/",
		contra: "https://www.contra.gr/latest/"
	};
	sport24.sport24Handler(urls);
};
scrapSites();
