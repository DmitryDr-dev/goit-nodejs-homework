class ContactService {
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
  }

  async getContacts(userId) {
    try {
      const result = await this.contactRepository.listContacts(userId);
      return result;
    } catch (error) {
      console.error(`Error occurred on fetching contacts: ${error.message}`);
      return null;
    }
  }

  async getContactById(userId, contactId) {
    try {
      const result = await this.contactRepository.getContactById(
        userId,
        contactId,
      );
      return result;
    } catch (error) {
      console.error(
        `Error occurred on fetching contact by id: ${error.message}`,
      );
      return null;
    }
  }

  async removeContact(userId, contactId) {
    try {
      const result = await this.contactRepository.removeContact(
        userId,
        contactId,
      );
      return result;
    } catch (error) {
      console.error(
        `Error occurred on deleting selected contact: ${error.message}`,
      );
      return null;
    }
  }

  async addContact(userId, body) {
    try {
      const result = await this.contactRepository.addContact(userId, body);
      console.log(result);
      return result;
    } catch (error) {
      console.error(
        `Error occurred on deleting selected contact: ${error.message}`,
      );
      return null;
    }
  }

  async updateContact(userId, contactId, body) {
    try {
      const result = await this.contactRepository.updateContact(
        userId,
        contactId,
        body,
      );
      return result;
    } catch (error) {
      console.error(
        `Error occurred on deleting selected contact: ${error.message}`,
      );
      return null;
    }
  }
}

export default ContactService;
