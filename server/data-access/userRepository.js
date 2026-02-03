const makeUserRepository = (UserModel) => {
  return {
    findByEmail: async (email) => {
      return await UserModel.findOne({ email });
    },
    create: async (userInfo) => {
      const newUser = new UserModel(userInfo);
      return await newUser.save();
    },
    findById: async (id) => {
      return await UserModel.findById(id).select('-password');
    }
  };
};

const userRepository = makeUserRepository;
export default userRepository;