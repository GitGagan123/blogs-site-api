const express = require("express");
const cors = require("cors");
const router = express.Router();
const { mongoHelper } = require("../MongoHelper/mongoHelper");
const config = require("../config.json");

const app = express();
app.use(cors());

const fetchBlogCategories = async () => {
  try {
    const mongoClient = await mongoHelper.getConnectedMongoClient();
    const blogCategories = await mongoClient
      .db(config.dbName)
      .collection(config.categoryCollectionName)
      .find({});

    const categoryResults = await blogCategories.toArray();

    const mappedBlogCategories = categoryResults.map((category) => {
      return {
        id: category._id,
        picture: category.picture,
        category: category.category,
      };
    });
    return mappedBlogCategories;
  } catch (err) {
    console.log("Unable to Fetch the Blog Categories : ", err);
  }
};

const fetchTrendingBlogs = async () => {
  try {
    const mongoClient = await mongoHelper.getConnectedMongoClient();
    const trendingBlogs = await mongoClient
      .db(config.dbName)
      .collection(config.famousBlogsCollectionName)
      .find({});

    const trendingBlogsResults = await trendingBlogs.toArray();

    const mappedTrendingBlogs = trendingBlogsResults.map((blog) => {
      return {
        id: blog._id,
        picture: blog.picture,
        author: blog.author,
        quote: blog.quote,
      };
    });
    return mappedTrendingBlogs;
  } catch (err) {
    console.log("Unable to Fetch Trending Blogs : ", err);
  }
};

router.get("/", (req, res) => {
  res.json({ message: "Welcome to Blogs API, explore other endpoints !!" });
});

router.get("/categories", async (req, res) => {
  const blogCategories = await fetchBlogCategories();
  if (res.statusCode === 200 && blogCategories && blogCategories.length > 0) {
    res.send(blogCategories);
  } else {
    res.send({
      message:
        "No Blog Categories are present yet, please try again after sometime",
    });
  }
});

router.get("/trending", async (req, res) => {
  const trendingBlogs = await fetchTrendingBlogs();
  if (res.statusCode === 200 && trendingBlogs && trendingBlogs.length > 0) {
    res.send(trendingBlogs);
  } else {
    res.send({
      message: "No Trending Blogs at the moment , please try again later",
    });
  }
});

module.exports = router;
