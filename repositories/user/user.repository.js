class UserRepository {
  constructor(model) {
    this.model = model;
  }

  async findByEmail(email) {
    return await this.model.findOne({ email });
  }

  async findById(id) {
    return await this.model.findOne({ id });
  }

  async createUser(body) {
    return await this.model(body).save();
  }

  async updateToken(id, token) {
    return await this.model.updateOne({ _id: id }, { token });
  }
}

export default UserRepository;
