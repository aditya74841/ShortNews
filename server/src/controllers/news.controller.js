import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/categories.model.js";
import { News } from "../models/news.model.js";

const createNews = asyncHandler(async (req, res) => {
  const { type, category, heading, description, link, linkTitle } = req.body;

  const createdNews = await News.create({
    type,
    category,
    heading,
    description,
    link,
    linkTitle,
    createdBy: req.user._id,
  });

  if (!createdNews) {
    throw new ApiError(500, "Something went wrong while creating news");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdNews, "News Created Successfully"));
});

//TODO: need to apply the header authentication
const getNews = asyncHandler(async (req, res) => {
  const news = await News.find();

  if (!news?.length) {
    throw new ApiError(500, "No News Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, news, "News Fetched Successfully"));
});

//TODO: need to apply the header authentication
const getNewsById = asyncHandler(async (req, res) => {
  const { newsId } = req.params;
  if (!newsId) {
    throw new ApiError(404, "News Id Not Found");
  }
  const news = await News.findById(newsId);

  if (!news) {
    throw new ApiError(400, "News Not Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, news, "News Fetched Successfully"));
});

const updateNews = asyncHandler(async (req, res) => {
  const { type, category, heading, description, link, linkTitle } = req.body;
  const { newsId } = req.params;
  if (!newsId) {
    throw new ApiError(404, "News Id Not Found");
  }

  const updatedNews = await News.findByIdAndUpdate(
    newsId,
    {
      $set: {
        type: type,
        category: category,
        heading: heading,
        description: description,
        link: link,
        linkTitle: linkTitle,
        createdBy: req.user._id,
      },
    },
    { new: true }
  );

  if (!updatedNews) {
    throw new ApiError(500, "Something went wrong while updating news");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, updatedNews, "News Updated Successfully"));
});

const deleteNews = asyncHandler(async (req, res) => {
  const { newsId } = req.params;
  if (!newsId) {
    throw new ApiError(404, "News Id Not Found");
  }

  const deletedNews = await Type.findByIdAndDelete(newsId);

  if (!deletedNews) {
    throw new ApiError(500, "Something went wrong while deleting News");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedNews, "News Deleted Successfully"));
});
export { createNews, deleteNews, getNewsById, getNews, updateNews };
