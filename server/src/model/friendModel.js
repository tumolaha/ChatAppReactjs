const userModel = require("../schemas/userSchema");

module.exports = {
  addFriends: async (params, options) => {
    

  },
  listFriends: (params, option) => {
    let objWhere = {};
    let sort = {};
    const limit = params.limit || 20;

    //keyword search
    // if (params.keyword !== "") {
    //   objWhere.username = new RegExp(params.keyword, "i")|| '';
    //   objWhere.fist_name = new RegExp(params.keyword, "i") || '';
    //   objWhere.last_name = new RegExp(params.keyword, "i") || '';
    // }
    if (params.sortField) sort[params.sortField] = params.sortType;
    //get all user vaf search
    if (option.task == "all") {
      if (option.check == true) {
        return friendModel.find({
          $or: [{ RequesterId: params.id }, { AddresseeId: params.id }],
        })
        .where()
          .select()
          .sort(sort)
          .limit(limit);
      }
      return friendModel.find({
        $or: [{ RequesterId: params.id }, { AddresseeId: params.id }],
      })
        .select()
        .sort(sort)
        .limit(limit);
    }
    //get one user
    if (option.task == "one") {
      if (params.id) {
        return friendModel.findOne({ RequesterId: params.id }).select({});
      }
    }
  },
  create: (friend) => {
    return new friendModel(friend).save();
  },
  deleteItem: (params, option) => {
    if (option.task == "one") {
      return friendModel.deleteOne({ RequesterId: params.id });
    }
  },
  editItem: (params, option) => {
    if (option.task == "one") {
      return friendModel.updateOne({ RequesterId: params.id }, params.body);
    }
  },
};
