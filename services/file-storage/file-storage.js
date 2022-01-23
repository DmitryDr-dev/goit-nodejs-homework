import Jimp from 'jimp';
import { userService } from '..';

class FileStorage {
  constructor(file, user) {
    this.file = file;
    this.user = user;
    this.filePath = file.path;
  }

  async updateAvatar() {
    console.log(this.file);
    console.log(this.user);
    await this.transformAvatar(this.filePath);
    const userAvatar = userService.updateUserAvatar(this.file, this.user);
    return userAvatar;
  }

  async transformAvatar(filePath) {
    const image = await Jimp.read(filePath);
    await image
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(filePath);
  }
}

export default FileStorage;
