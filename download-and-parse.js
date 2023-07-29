const axios = require("axios"),
  cheerio = require("cheerio");

const websiteUrl = "https://en.wikipedia.org/wiki/Oppenheimer_(film)";

var downloadWebsite = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error downloading the website:", error.message);
  }
};

var parseHTML = async (downloadedContent) => {
  const $ = cheerio.load(downloadedContent);
  const links = [];

  try {
    $("a").each((index, element) => {
      links.push({
        title: $(element).attr("title"),
        href: $(element).attr("href"),
      });
    });

    console.log("Total # of Links: ", links.length);
    console.log("Embedded links:");
    console.log(links);
  } catch (error) {
    console.error("Error getting links from the website:", error.message);
  }
};

downloadWebsite(websiteUrl)
  .then((downloadedContent) => {
    parseHTML(downloadedContent);
  })
  .catch((error) => {
    console.error("Error returning promise:", error.message);
  });
