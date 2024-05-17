const Book = require("../model/Book");
const Category = require("../model/Category");
const Author = require("../model/Author");
const ObjectId = require("mongodb").ObjectId;

const getAllBook = async (req, res) => {
  const books = await Book.find();
  if (!books) {
    return res.status(204).json({ message: "No book found." });
  }
  const modifiedResult = {
    status: 1,
    message: "Books successfully fetched",
    data: books,
  };
  res.json(modifiedResult);
};

const getBookPaginated = async (req, res) => {
  const pageNumber = req?.body?.page;
  const pageSize = req?.body?.row;

  const books = await Book.find()
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  const totalCount = await Book.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);
  if (!books) {
    return res.status(204).json({ message: "No book found." });
  }
  const categories = await Category.find();
  const modifiedBooks = books.map((item) => {
    const itemObject = item.toObject();
    const categoryDetails = (categories || []).find((category) =>
      category._id.equals(itemObject.category)
    );
    const newItemObject = {
      ...itemObject,
      categoryDetails,
    };
    return newItemObject;
  });

  const modifiedResult = {
    status: 1,
    message: "Book successfully fetched",
    data: {
      content: modifiedBooks,
      currentPageIndex: pageNumber,
      numberOfElements: books?.length || 0,
      totalElements: totalCount,
      totalPages: totalPages,
    },
  };
  res.json(modifiedResult);
};

const createNewBook = async (req, res) => {
  if (!req?.body?.name) {
    return res
      .status(400)
      .json({ message: "Book name and description are required" });
  }
  try {
    const result = await Book.create({
      ...req.body,
    });
    const modifiedResult = {
      status: 1,
      message: "Book successfully updated !!!",
      data: result,
    };
    res.json(modifiedResult);
  } catch (err) {
    console.error(err);
  }
};

const updateBook = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  const book = await Book.findOne({ _id: req.body.id }).exec();
  if (!book) {
    return res
      .status(204)
      .json({ message: `No book matches ID ${req.body.id}.` });
  }
  if (req.body?.name) book.name = req.body.name;
  if (req.body?.description) book.description = req.body?.description;
  if (req.body?.email) book.email = req.body?.email;
  if (req.body?.mobile) book.mobile = req.body?.mobile;
  if (req.body?.category) book.category = req.body?.category;
  if (req.body?.totalPage) book.totalPage = req.body?.totalPage;
  if (req.body?.stock) book.stock = req.body?.stock;
  if (req.body?.publishedDate) book.publishedDate = req.body.publishedDate;
  if (req.body?.removedFrontCoverId) book.frontCoverDetails = undefined;
  if (req.body?.frontCoverDetails)
    book.frontCoverDetails = req.body.frontCoverDetails;
  if (req.body?.removedBackCoverId) book.backCoverDetails = undefined;
  if (req.body?.backCoverDetails)
    book.backCoverDetails = req.body.backCoverDetails;
  const result = await book.save();
  const modifiedResult = {
    status: 1,
    message: "Book successfully updated !!!",
    data: result,
  };
  res.json(modifiedResult);
};

const deleteBook = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "Book Id not found." });
  }
  const book = await Book.findOne({ _id: req.body.id }).exec();
  if (!book) {
    return res
      .status(204)
      .json({ message: `No book matches ID ${req.body.id}.` });
  }
  const result = await book.deleteOne(); //{ _id: req.body.id }
  res.json({ message: `${result.name} successfully deleted` });
};

const getBook = async (req, res) => {
  console.log("get book", req?.body);
  if (!req?.params?.id)
    return res.status(400).json({ message: "Book Id is required" });

  const book = await Book.findOne({ _id: req.params.id }).exec();
  if (!book) {
    return res.status(204).json({ message: `Book not found` });
  }
  const bookObject = book.toObject();
  const categoryDetails = await Category.findOne({ _id: bookObject.category });
  var authorObjectIds = (bookObject.authors || []).map((author) => {
    return new ObjectId(author);
  });
  console.log({ authorObjectIds });
  const authorQuery = {
    _id: {
      $in: [...authorObjectIds],
    },
  };
  const authorDetails = await Author.find(authorQuery);
  console.log({ authorDetails });

  const updatedBookObject = {
    ...bookObject,
    categoryDetails,
    authorDetails,
  };

  const modifiedResult = {
    status: 1,
    message: "Book successfully fetched !!!",
    data: updatedBookObject,
  };
  res.json(modifiedResult);
};

module.exports = {
  getAllBook,
  getBookPaginated,
  createNewBook,
  updateBook,
  deleteBook,
  getBook,
};
