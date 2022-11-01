const userSchema = require("../schemas/userSchema");

module.exports = {
  listUser: (params, option) => {
    let objWhere = {};
    let sort = {};
    const limit = params.limit ;
    
    //keyword search
    if (params.keyword !== "") {
      objWhere.username = new RegExp(params.keyword, "i")|| '';
      objWhere.fist_name = new RegExp(params.keyword, "i") || '';
      objWhere.last_name = new RegExp(params.keyword, "i") || '';
    }
    if (params.sortField) sort[params.sortField] = params.sortType;
    //get all user vaf search
    if (option.task == "all") {
      return userSchema.find({$or: [{username: objWhere.username},{first_name: objWhere.fist_name}, {last_name: objWhere.last_name}]
        
      })
        .select({})
        .sort(sort)
        .limit(limit)
    }
    //get one user
    if (option.task == "one") {
      if (params._id) {
        return userSchema.findOne({ _id: `${params.id}` }).select({});
      }
      if (params.username) {
        return userSchema.findOne({ username: `${params.username}` }).select({});
      }
      if (params.email) {
        return userSchema.findOne({ email: `${params.email}` }).select();
      }
    }
  },
  create: (user) => {
    return new userSchema(user).save();
  },
  deleteItem: (params, option) => {
    if (option.task == "one") {
      return userSchema.deleteOne({ _id: params.id });
    }
  },
  editItem: (params, option) => {
    if (option.task == "one") {
      return userSchema.updateOne({ _id: params.id }, params.body);
    }
  },
};
