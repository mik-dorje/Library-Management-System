const Author = require("../model/Author");

const getAllAuthor = async (req, res) => {
  const authors = await Author.find();

  if (!authors) {
    return res.status(204).json({ message: "No category found." });
  }
  const modifiedAuthors = {
    status: 1,
    message: "Category successfully fetched",
    data: authors,
  };
  res.json(modifiedAuthors);
};

const getAuthorPaginated = async (req, res) => {
  const pageNumber = req?.body?.page;
  const pageSize = req?.body?.row;

  const authors = await Author.find()
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  const totalAuthorCount = await Author.countDocuments();
  const totalPages = Math.ceil(totalAuthorCount / pageSize);
  if (!authors) {
    return res.status(204).json({ message: "No author found." });
  }
  const modifiedAuthors = {
    status: 1,
    message: "Author successfully fetched",
    data: {
      content: authors,
      currentPageIndex: pageNumber,
      numberOfElements: authors?.length || 0,
      totalElements: totalAuthorCount,
      totalPages: totalPages,
    },
  };
  res.json(modifiedAuthors);
};

const createNewAuthor = async (req, res) => {
  if (!req?.body?.name || !req?.body?.description) {
    return res
      .status(400)
      .json({ message: "Author name and description are required" });
  }
  try {
    const result = await Author.create({
      ...req.body,
    });
    const modifiedResult = {
      status: 1,
      message: "Author successfully updated !!!",
      data: result,
    };
    res.json(modifiedResult);
  } catch (err) {
    console.error(err);
  }
};

const updateAuthor = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  const author = await Author.findOne({ _id: req.body.id }).exec();
  if (!author) {
    return res
      .status(204)
      .json({ message: `No author matches ID ${req.body.id}.` });
  }
  if (req.body?.name) author.name = req.body.name;
  if (req.body?.description) author.description = req.body.description;
  if (req.body?.email) author.email = req.body.email;
  if (req.body?.mobile) author.mobile = req.body.mobile;
  if (req.body?.removedFileId) author.profilePicture = undefined;
  if (req.body?.profilePicture) author.profilePicture = req.body.profilePicture;
  const result = await author.save();
  const modifiedResult = {
    status: 1,
    message: "Author successfully updated !!!",
    data: result,
  };
  res.json(modifiedResult);
};

const deleteAuthor = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "Author Id not found." });
  }
  const author = await Author.findOne({ _id: req.body.id }).exec();
  if (!author) {
    return res
      .status(204)
      .json({ message: `No author matches ID ${req.body.id}.` });
  }
  const result = await author.deleteOne(); //{ _id: req.body.id }
  res.json({ message: `${result.name} successfully deleted` });
};

const getAuthor = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Author Id is required" });

  const author = await Author.findOne({ _id: req.params.id }).exec();
  if (!author) {
    return res.status(204).json({ message: `Author not found` });
  }
  const modifiedAuthors = {
    status: 1,
    message: "Author successfully fetched !!!",
    data: author,
  };
  res.json(modifiedAuthors);
};

module.exports = {
  getAllAuthor,
  getAuthorPaginated,
  createNewAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthor,
};
