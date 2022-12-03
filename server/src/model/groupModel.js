const { options } = require("../routes/groupRouter");
const groupSchema = require("../schemas/groupSchema");
const groundSchema = require("../schemas/groupSchema");

module.exports = {
  listGroup: (params, option) => {
    let objWhere = {};
    let sort = {};
    const limit = params.limit || 20;
    const paging = params.paging || 1;
    //keyword search
    if (params.keyword !== "") {
      objWhere.nameGroup = new RegExp(params.keyword, "i") || "";
    }
    if (params.sortField) sort[params.sortField] = params.sortType;
    //get all user vaf search
    if (option.task == "all") {
      return groupSchema.find({nameGroup: objWhere.nameGroup }).select();
    }
    //get one user
    if (option.task == "one") {
      if (params.id) {
        return groundSchema.findOne({ _id: params.id }).select({});
      }
    }
    if (option.task == "user") {
      if (params.userId) {
        return groupSchema.find({ member: params.userId });
      }
    }
  },
  create: (group) => {
    return new groundSchema(group).save();
  },
  deleteItem: (params, option) => {
    if (option.task == "one") {
      return groundSchema.deleteOne({ _id: params.id });
    }
  },
  editItem: (params, option) => {
    if (option.task == "one") {
      return groundSchema.updateOne({ _id: params.id }, params.body);
    }
  },
};
