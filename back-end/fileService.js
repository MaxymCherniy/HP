import * as uuid from 'uuid';  //work with generation id fro files
import * as path from 'path';  //work with path of files

class FileService {
	saveFile(file) {
		try {
			const fileName = uuid.v4() + '.jpg';
			const filePath = path.resolve('static', fileName);
			file.mv(filePath);
			return fileName;
		} catch (e) {
			console.log(e);
		}
	}
}

export default new FileService();