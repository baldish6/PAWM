import User from "../models/User.js";
import Image from "../models/Image.js";
import { createError } from "../error.js";

export const addImg = async (req, res, next) => {
  const newImg = new Image({ userId: req.user.id, ...req.body });
  try {
    const savedImage = await newImg.save();
    res.status(200).json(savedImage);
  } catch (err) {
    next(err);
  }
};

export const updateImg = async (req, res, next) => {
  try {
    const img = await Image.findById(req.params.id);
    if (!img) return next(createError(404, "Image not found!"));
    if (req.user.id === img.userId) {
      const updatedImg = await Image.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedImg);
    } else {
      return next(createError(403, "You can update only your images!"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteImg = async (req, res, next) => {
  try {
    const Img = await Image.findById(req.params.id);
    if (!Img) return next(createError(404, "Image not found!"));
    if (req.user.id === Img.userId) {
      await Image.findByIdAndDelete(req.params.id);
      res.status(200).json("The image has been deleted.");
    } else {
      return next(createError(403, "You can delete only your Images!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getImg = async (req, res, next) => {
  try {
    const img = await Image.findById(req.params.id);
    res.status(200).json(img);
  } catch (err) {
    next(err);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const images = await Image.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(images);
  } catch (err) {
    next(err);
  }
};
