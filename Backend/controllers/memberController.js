const Member = require("../model/Member");

const getAllMember = async (req, res) => {
  const members = await Member.find();

  if (!members) {
    return res.status(204).json({ message: "No category found." });
  }
  const modifiedMembers = {
    status: 1,
    message: "Category successfully fetched",
    data: members,
  };
  res.json(modifiedMembers);
};

const getMemberPaginated = async (req, res) => {
  const pageNumber = req?.body?.page;
  const pageSize = req?.body?.row;

  const members = await Member.find()
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  const totalMemberCount = await Member.countDocuments();
  const totalPages = Math.ceil(totalMemberCount / pageSize);
  if (!members) {
    return res.status(204).json({ message: "No author found." });
  }
  const modifiedMembers = {
    status: 1,
    message: "Member successfully fetched",
    data: {
      content: members,
      currentPageIndex: pageNumber,
      numberOfElements: members?.length || 0,
      totalElements: totalMemberCount,
      totalPages: totalPages,
    },
  };
  res.json(modifiedMembers);
};

const createNewMember = async (req, res) => {
  if (!req?.body?.name || !req?.body?.description) {
    return res
      .status(400)
      .json({ message: "Member name and description are required" });
  }
  try {
    const result = await Member.create({
      ...req.body,
    });
    const modifiedResult = {
      status: 1,
      message: "Member successfully updated !!!",
      data: result,
    };
    res.json(modifiedResult);
  } catch (err) {
    console.error(err);
  }
};

const updateMember = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  const member = await Member.findOne({ _id: req.body.id }).exec();
  if (!member) {
    return res
      .status(204)
      .json({ message: `No member matches ID ${req.body.id}.` });
  }
  if (req.body?.name) member.name = req.body.name;
  if (req.body?.description) member.description = req.body.description;
  if (req.body?.email) member.email = req.body.email;
  if (req.body?.mobile) member.mobile = req.body.mobile;
  if (req.body?.address) member.address = req.body.address;
  if (req.body?.removedFileId) member.profilePicture = undefined;
  if (req.body?.profilePicture) member.profilePicture = req.body.profilePicture;

  const result = await member.save();
  const modifiedResult = {
    status: 1,
    message: "Member successfully updated !!!",
    data: result,
  };
  res.json(modifiedResult);
};

const deleteMember = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "Member Id not found." });
  }
  const member = await Member.findOne({ _id: req.body.id }).exec();
  if (!member) {
    return res
      .status(204)
      .json({ message: `No member matches ID ${req.body.id}.` });
  }
  const result = await member.deleteOne(); //{ _id: req.body.id }
  res.json({ message: `${result.name} successfully deleted` });
};

const getMember = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Member Id is required" });

  const member = await Member.findOne({ _id: req.params.id }).exec();
  if (!member) {
    return res.status(204).json({ message: `Member not found` });
  }
  const modifiedResult = {
    status: 1,
    message: "Member successfully fetched !!!",
    data: member,
  };
  res.json(modifiedResult);
};

module.exports = {
  getAllMember,
  getMemberPaginated,
  createNewMember,
  updateMember,
  deleteMember,
  getMember,
};
