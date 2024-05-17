const Book = require("../model/Book");
const Category = require("../model/Category");
const Author = require("../model/Author");
const Member = require("../model/Member");
const Transaction = require("../model/Transaction");
const ObjectId = require("mongodb").ObjectId;

const getAllDashboardData = async (req, res) => {
  const totalBookCount = await Book.countDocuments();
  const totalMemberCount = await Member.countDocuments();
  const totalAuthorCount = await Author.countDocuments();
  const totalCategoryCount = await Category.countDocuments();

  const countOverview = {
    totalBookCount: totalBookCount || 0,
    totalMemberCount: totalMemberCount || 0,
    totalAuthorCount: totalAuthorCount || 0,
    totalCategoryCount: totalCategoryCount || 0,
  };

  const books = await Book.find();

  const bookOverview = await Promise.all(
    books?.map(async (item) => {
      const itemObject = item.toObject();
      const categoryDetail = await Category.findOne({
        _id: itemObject.category,
      });
      return {
        ...itemObject,
        categoryName: categoryDetail?.name,
      };
    })
  );

  const modifiedResult = {
    status: 1,
    message: "Book successfully fetched",
    data: { countOverview: countOverview, bookOverview: bookOverview },
  };
  res.json(modifiedResult);
};

module.exports = {
  getAllDashboardData,
};
