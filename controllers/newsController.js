const fetch = require("node-fetch");

exports.getNews = async (req, res) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
    );
    const data = await response.json();

    if (data.status !== "ok") {
      return res.status(500).json({ error: "Failed to fetch news from API" });
    }

    const filteredArticles = data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      urlToImage: article.urlToImage,
      author: article.author,
      publishedAt: article.publishedAt,
      content: article.content,
    }));

    res.json(filteredArticles);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Server error while fetching news" });
  }
};
