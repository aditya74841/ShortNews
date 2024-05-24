import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Type } from "../models/types.model.js";
import { User } from "../models/user.model.js";

const createType = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "Name is Required");
  }

  const createdType = await Type.create({
    name,
    createdBy: req.user._id,
  });

  if (!createdType) {
    throw new ApiError(500, "Something went wrong while creating type");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdType, "Type Created Successfully"));
});

//TODO: need to apply the header authentication
const getType = asyncHandler(async (req, res) => {
  const type = await Type.find();

  if (!type?.length) {
    throw new ApiError(404, "No type Found");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, type, "Type Fetched Successfully"));
});

//TODO: need to apply the header authentication
const getTypeById = asyncHandler(async (req, res) => {
  const { typeId } = req.params;
  if (!typeId) {
    throw new ApiError(404, "Type Id Not Found");
  }
  const type = await Type.findById(typeId);

  if (!type) {
    throw new ApiError(400, "Type Not Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, type, "Type Fetched Successfully"));
});

const updateType = asyncHandler(async (req, res) => {
  const { typeId } = req.params;
  if (!typeId) {
    throw new ApiError(404, "Type Id Not Found");
  }

  const updatedType = await Type.findByIdAndUpdate(
    typeId,
    {
      $set: {
        name: req.body.name,
        createdBy: req.user._id,
      },
    },
    { new: true }
  );

  if (!updatedType) {
    throw new ApiError(500, "Something went wrong while updating type");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, updatedType, "Type Updated Successfully"));
});

const deleteType = asyncHandler(async (req, res) => {
  const { typeId } = req.params;
  if (!typeId) {
    throw new ApiError(404, "Type Id Not Found");
  }

  const deletedType = await Type.findByIdAndDelete(typeId);

  if (!deletedType) {
    throw new ApiError(500, "Something went wrong while deleting type");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedType, "Type Deleted Successfully"));
});

export { createType, getType, getTypeById, updateType, deleteType };
