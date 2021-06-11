import axios from 'axios';

const FOLDER_API__URL = "https://test-saas-mul.herokuapp.com/users";

class FolderService {

    getFolders(){
        return axios.get(FOLDER_API__URL);
    }

    createFolder(folder){
        console.log(folder)
        return axios.post(FOLDER_API__URL, folder);
    }

    getFolderById(folderId){
        return axios.get(FOLDER_API__URL + '/' + folderId);
    }

    updateFolder(folder, folderId){
        return axios.put(FOLDER_API__URL + '/' + folderId, folder);
    }

    deleteFolder(folderId){
        return axios.delete(FOLDER_API__URL + '/' + folderId);
    }
}

export default new FolderService()