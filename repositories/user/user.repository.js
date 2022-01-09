class UserRepository {
  constructor(model) {
    this.model = model;
  }

  async findByEmail(email) {
    return await this.model.findOne({ email });
  }

  async createUser(body) {
    return await this.model(body).save();
  }
}

export default UserRepository;
