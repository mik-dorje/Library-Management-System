const Transaction = require("../model/Transaction");
const Book = require("../model/Book");
const Member = require("../model/Member");
const dayjs = require("dayjs");

const getAllTransaction = async (req, res) => {
  const transactions = await Transaction.find();

  if (!transactions) {
    return res.status(204).json({ message: "No transaction found." });
  }
  const modifiedResult = {
    status: 1,
    message: "Transaction successfully fetched",
    data: transactions,
  };
  res.json(modifiedResult);
};

const getTransactionPaginated = async (req, res) => {
  const pageNumber = req?.body?.page;
  const pageSize = req?.body?.row;

  const transactions = await Transaction.find()
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  const totalTransactionCount = await Transaction.countDocuments();
  const totalPages = Math.ceil(totalTransactionCount / pageSize);
  if (!transactions) {
    return res.status(204).json({ message: "No Transaction found." });
  }

  const updatedTransaction = await Promise.all(
    transactions?.map(async (item) => {
      const itemObject = item.toObject();

      const bookDetails = await Book.findOne({
        _id: itemObject.book,
      });
      const memberDetails = await Member.findOne({
        _id: itemObject.member,
      });

      const returnDate = dayjs(itemObject?.returnDate, "YYYY-MM-DD");
      const clientReturnDate = dayjs(
        itemObject?.clientReturnDate,
        "YYYY-MM-DD"
      );
      const overDueDays = dayjs(clientReturnDate).isAfter(returnDate)
        ? clientReturnDate.diff(returnDate, "days")
        : 0;

      const status =
        itemObject?.transactionType === "RETURN"
          ? "Complete"
          : dayjs(itemObject?.returnDate, "YYYY-MM-DD").isAfter(
              dayjs().subtract(1, "day")
            )
          ? "Progress"
          : "Overdue";
      const fine = overDueDays * 50;

      return { ...itemObject, status, fine, bookDetails, memberDetails };
    })
  );

  const modifiedResult = {
    status: 1,
    message: "Transaction successfully fetched",
    data: {
      content: updatedTransaction,
      currentPageIndex: pageNumber,
      numberOfElements: transactions?.length || 0,
      totalElements: totalTransactionCount,
      totalPages: totalPages,
    },
  };
  res.json(modifiedResult);
};

const createNewTransaction = async (req, res) => {
  if (
    !req?.body?.book ||
    !req?.body?.member ||
    !req?.body?.transactionType ||
    !req?.body?.rentDate ||
    !req?.body?.returnDate
  ) {
    return res
      .status(400)
      .json({ message: "Transaction form parameter missing !!!" });
  }
  try {
    const book = await Book.findOne({
      _id: req?.body?.book,
    });
    if (!(book?.stock > 0)) {
      return res.status(400).json({ message: `${book.name} out of stock!!` });
    }
    const member = await Member.findOne({
      _id: req?.body?.member,
    });

    if ((member?.rentedBooks || []).length > 5) {
      return res.status(400).json({
        message: `${(member?.rentedBooks || []).length} books rented by ${
          member.name
        } crossed. Please return book before renting again!!`,
      });
    }
    if ((member?.rentedBooks || []).length) {
      if (
        member.rentedBooks.some((item) => {
          console.log({ item, book });
          return item._id.equals(book._id);
        })
      ) {
        return res.status(400).json({
          message: `${book.name} is already rented by ${member.name}!!`,
        });
      }
    }

    const result = await Transaction.create({
      ...req?.body,
    });
    book.stock = book.stock - 1;
    await book.save();
    member.rentedBooks = [...member.rentedBooks, book];
    await member.save();
    const modifiedResult = {
      status: 1,
      message: "Transaction successfully created !!!",
      data: result,
    };
    res.json(modifiedResult);
  } catch (err) {
    console.error(err);
  }
};

const updateTransaction = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  try {
    const transaction = await Transaction.findOne({ _id: req.body.id }).exec();
    if (!transaction) {
      return res
        .status(204)
        .json({ message: `No transaction matches ID ${req.body.id}.` });
    }

    const book = await Book.findOne({
      _id: transaction.book,
    });
    console.log({ book });

    if (req.body?.book) transaction.book = req.body.book;
    if (req.body?.member) transaction.member = req.body.member;
    if (req.body?.rentDate) transaction.rentDate = req.body.rentDate;
    if (req.body?.returnDate) transaction.returnDate = req.body.returnDate;
    if (req.body?.transactionType) {
      if (req.body?.transactionType !== transaction.transactionType) {
        if (req.body?.transactionType === "RETURN") {
          book.stock = book?.stock + 1;
          transaction.clientReturnDate = dayjs().format("YYYY-MM-DD");
        } else if (req.body?.transactionType === "RENT") {
          book.stock = book?.stock - 1;
        }
      }
      transaction.transactionType = req.body?.transactionType;
    }
    await book.save();
    const result = await transaction.save();

    const modifiedResult = {
      status: 1,
      message: "Transaction successfully updated !!!",
      data: result,
    };
    res.json(modifiedResult);
  } catch (err) {
    console.error(err);
  }
};

const deleteTransaction = async (req, res) => {
  console.log(req?.body);
  if (!req?.body?.id)
    return res.status(400).json({ message: "Transaction ID not found." });

  const transaction = await Transaction.findOne({ _id: req.body.id }).exec();
  if (!transaction) {
    return res
      .status(204)
      .json({ message: `No Transaction matches ID ${req.body.id}.` });
  }
  const result = await transaction.deleteOne(); //{ _id: req.body.id }
  res.json({ message: `${result.name} successfully deleted` });
};

const getTransaction = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Transaction Id is required" });

  const transaction = await Transaction.findOne({ _id: req.params.id }).exec();
  if (!transaction) {
    return res.status(204).json({ message: `Transaction not found` });
  }
  const modifiedTransaction = {
    status: 1,
    message: "Transaction successfully fetched !!!",
    data: transaction,
  };
  res.json(modifiedTransaction);
};

module.exports = {
  getAllTransaction,
  getTransactionPaginated,
  createNewTransaction,
  updateTransaction,
  deleteTransaction,
  getTransaction,
};
