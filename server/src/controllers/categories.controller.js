import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/categories.model.js";

const createCategory = asyncHandler(async (req, res) => {
  const { type, name } = req.body;

  if (!name || !type) {
    throw new ApiError(400, "Name  and Type is Required");
  }

  const createdCategory = await Category.create({
    type: type || null,
    name,
    createdBy: req.user._id,
  });

  if (!createdCategory) {
    throw new ApiError(500, "Something went wrong while creating category");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdCategory, "Type Created Successfully"));
});

//TODO: need to apply the header authentication
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.find();

  if (!category?.length) {
    throw new ApiError(500, "Something went wrong while creating Category");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category Fetched Successfully"));
});

//TODO: need to apply the header authentication
const getCategoryById = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    throw new ApiError(404, "Category Id Not Found");
  }
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(400, "Category Not Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category Fetched Successfully"));
});

const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { type, name } = req.body;
  if (!name || !type) {
    throw new ApiError(400, "Name  and Type is Required");
  }

  if (!categoryId) {
    throw new ApiError(404, "Category Id Not Found");
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    {
      $set: {
        type: type || null,
        name: name,
        createdBy: req.user._id,
      },
    },
    { new: true }
  );

  if (!updatedCategory) {
    throw new ApiError(500, "Something went wrong while updating Category");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, updatedCategory, "Category Updated Successfully")
    );
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    throw new ApiError(404, "Type Id Not Found");
  }

  const deletedCategory = await Category.findByIdAndDelete(categoryId);

  if (!deletedCategory) {
    throw new ApiError(500, "Something went wrong while deleting category");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, deletedCategory, "Category Deleted Successfully")
    );
});

export {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
