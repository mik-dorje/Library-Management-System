const Category = require("../model/Category");

const getAllCategory = async (req, res) => {
  const categories = await Category.find();

  if (!categories) {
    return res.status(204).json({ message: "No category found." });
  }
  const modifiedCategories = {
    status: 1,
    message: "Category successfully fetched",
    data: categories,
  };
  res.json(modifiedCategories);
};

const getCategoryPaginated = async (req, res) => {
  const pageNumber = req?.body?.page;
  const pageSize = req?.body?.row;

  const categories = await Category.find()
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  const totalCategoryCount = await Category.countDocuments();
  const totalPages = Math.ceil(totalCategoryCount / pageSize);
  if (!categories) {
    return res.status(204).json({ message: "No category found." });
  }
  const modifiedCategories = {
    status: 1,
    message: "Category successfully fetched",
    data: {
      content: categories,
      currentPageIndex: pageNumber,
      numberOfElements: categories?.length || 0,
      totalElements: totalCategoryCount,
      totalPages: totalPages,
    },
  };
  res.json(modifiedCategories);
};

const createNewCategory = async (req, res) => {
  if (!req?.body?.name || !req?.body?.description) {
    return res
      .status(400)
      .json({ message: "Category name and description are required" });
  }
  try {
    // const currentDate = new Date();
    const result = await Category.create({
      name: req.body.name,
      description: req.body.description,
      // createdAt: currentDate,
    });
    const modifiedResult = {
      status: 1,
      message: "Category successfully updated !!!",
      data: result,
    };
    res.json(modifiedResult);
  } catch (err) {
    console.error(err);
  }
};

const updateCategory = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  const category = await Category.findOne({ _id: req.body.id }).exec();
  if (!category) {
    return res
      .status(204)
      .json({ message: `No category matches ID ${req.body.id}.` });
  }
  if (req.body?.name) category.name = req.body.name;
  if (req.body?.description) category.description = req.body.description;
  const result = await category.save();
  const modifiedResult = {
    status: 1,
    message: "Category successfully updated !!!",
    data: result,
  };
  res.json(modifiedResult);
};

const deleteCategory = async (req, res) => {
  console.log(req?.body);
  if (!req?.body?.id)
    return res.status(400).json({ message: "Category ID not found." });

  const category = await Category.findOne({ _id: req.body.id }).exec();
  if (!category) {
    return res
      .status(204)
      .json({ message: `No category matches ID ${req.body.id}.` });
  }
  const result = await category.deleteOne(); //{ _id: req.body.id }
  res.json({ message: `${result.name} successfully deleted` });
};

const getCategory = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Category Id is required" });

  const category = await Category.findOne({ _id: req.params.id }).exec();
  if (!category) {
    return res.status(204).json({ message: `Category not found` });
  }
  const modifiedCategory = {
    status: 1,
    message: "Category successfully fetched !!!",
    data: category,
  };
  res.json(modifiedCategory);
};

module.exports = {
  getAllCategory,
  getCategoryPaginated,
  createNewCategory,
  updateCategory,
  deleteCategory,
  getCategory,
};
