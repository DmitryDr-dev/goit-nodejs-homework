class ContactRepository {
  constructor(model) {
    this.model = model;
  }

  async addContact(userId, body) {
    return await this.model.create({ ...body, owner: userId });
  }

  async getContactById(userId, contactId) {
    return await this.model
      .findOne({ _id: contactId, owner: userId })
      .populate({
        path: 'owner',
        select: 'name age subscription',
      });
  }

  async listContacts(userId) {
    const result = await this.model.find({ owner: userId }).populate({
      path: 'owner',
      select: 'name email subscription',
    });
    return result;
  }

  async removeContact(userId, contactId) {
    const result = await this.model
      .findOneAndRemove({
        _id: contactId,
        owner: userId,
      })
      .populate({
        path: 'owner',
        select: 'name email subscription',
      });

    return result;
  }

  async updateContact(userId, contactId, body) {
    const result = await this.model
      .findOneAndUpdate(
        {
          _id: contactId,
          owner: userId,
        },
        { ...body },
        { new: true },
      )
      .populate({
        path: 'owner',
        select: 'name email subscription',
      });

    return result;
  }
}

export default ContactRepository;
