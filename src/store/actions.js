import axios from 'axios'
import * as types from "./mutation-types";
// import router from "./../router"
// import * as FileSaver from 'file-saver';

// Actions are similar to mutations, the difference being that:
// - Instead of mutating the state, actions commit mutations.
// - Actions can contain arbitrary asynchronous operations.

// TODO move to utils
// function updateUrlPath(path) {
//     if (path == null) {
//         path = '';
//     }
//     let url = window.location.href;
//     var pattern = new RegExp('\\b(path=).*?(&|$)');
//
//     if (url.search(pattern) >= 0) {
//         history.pushState(null, '', url.replace(pattern, '$1' + path + '$2'));
//     } else {
//         history.pushState(null, '', url + (url.indexOf('?') > 0 ? '&' : '?') + 'path=' + path);
//     }
// }

/**
* Get contents of a directory from the api
* @param commit
* @param payload
*/
export const getContents = (context, payload) => {

	context.commit(types.SET_IS_LOADING, true)

	axios
	.get('api/getFiles')
	.then(response => {
		context.commit(types.LOAD_CONTENTS_SUCCESS, response.data.contents)
		context.commit(types.SET_IS_LOADING, false)
	})
	.catch(error => {
		if(payload)
		{
			console.log(error)
		}

		var data = {
			'data': '500 (Internal Server Error)',
			'color': 'error'
		}
		context.commit(types.SHOW_SNACKBAR, data)

	})
}

/**
* Create a new folder
* @param commit
* @param payload object with the new folder name and its parent directory
*/
export const upload = (context, payload) => {

	context.commit(types.SET_IS_LOADING, true)
	context.commit(types.SHOW_TOOL_MODAL, true)

	axios.defaults.headers = {
		// 'Content-Type': 'application/json',
		'Authorization': 'Anurag eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudXJhZ3ZuczExMTFAZ21haWwuY29tIiwidXNlcklkIjoiNWMxZTRhYjliOTZmNTU2ODc0Yjc1NDI0IiwiaWF0IjoxNTQ1NDg5NTA5LCJleHAiOjE1NDU0OTMxMDl9.OESFK86L7noxiHDjfmoX3-Y-liqYDs1Q4pVLyRR6Oks'
	}
	axios
	.post('products', payload, {
		onUploadProgress: e => context.commit(types.SET_IS_LOADING_MORE, { value: true, per: Math.round(e.loaded * 100 / e.total)})
	})
	.then(response => {
		// context.commit(types.LOAD_MORE_CONTENTS_SUCCESS, response.data.file)
		// context.commit(types.SET_IS_LOADING_MORE, { value: false, per: 0})
		console.log(response)
		context.commit(types.SET_IS_LOADING, false)

		var data = {
			'data': response.data.text,
			'color': response.data.message
		}

		context.commit(types.SHOW_SNACKBAR, data)
	})
	.catch(error => {
		if(payload)
		{
			console.log(error)
		}

		var data = {
			'data': '500 (Internal Server Error)',
			'color': 'error'
		}
		context.commit(types.SHOW_SNACKBAR, data)

	})
}

/**
* Get contents of a directory from the api
* @param commit
* @param payload
*/
export const loadMoreContents = (context, payload) => {

	context.commit(types.SET_IS_LOADING_MORE, true);

	axios
	.get('loadMoreContents')
	.then(response => {
		context.commit(types.LOAD_MORE_CONTENTS_SUCCESS, response.data.contents)
		context.commit(types.SET_IS_LOADING_MORE, false);
	})
	.catch(error => {
		if(payload)
		{
			console.log(error)
		}

		var data = {
			'data': '500 (Internal Server Error)',
			'color': 'error'
		}

		context.commit(types.SHOW_SNACKBAR, data)
	})
}

/**
* Login
* @param commit
* @param payload
*/
export const login = (context, payload) => {

	axios
	.post('user/login', payload)
	.then(response => {
		console.log(response);

	})
	.catch(error => {

		console.log(error);

		var data = {
			'data': '500 (Internal Server Error)',
			'color': 'error'
		}

		context.commit(types.SHOW_SNACKBAR, data)
	})
}

/**
* Login
* @param commit
* @param payload
*/
export const signup = (context, payload) => {

	axios
	.post('user/signup', payload)
	.then(response => {

		var data = {
			'data': response.data.message,
			'color': 'success'
		}

		context.commit(types.SHOW_SNACKBAR, data);

		console.log(response);
	})
	.catch(error => {

		console.log(error);

		var data = {
			'data': '500 (Internal Server Error)',
			'color': 'error'
		}

		context.commit(types.SHOW_SNACKBAR, data)
	})
}

//
// /**
//  * Get the full contents of a directory
//  * @param context
//  * @param payload
//  */
// export const getFullContents = (context, payload) => {
//     context.commit(types.SET_IS_LOADING, true);
//     api.getContents(payload.path, 1)
//         .then(contents => {
//             context.commit(types.LOAD_FULL_CONTENTS_SUCCESS, contents.files[0]);
//             context.commit(types.SET_IS_LOADING, false);
//         })
//         .catch(error => {
//             // TODO error handling
//             context.commit(types.SET_IS_LOADING, false);
//             console.log("error", error);
//         });
// }
//
/**
* Download a file
* @param context
* @param payload
*/
export const download = (context, payload) => {
	axios
	.get('api/download/file/sa' , payload)
	.then(response => {

		var data = {
			'data': response.data.message,
			'color': 'success'
		}

		context.commit(types.SHOW_SNACKBAR, data);

		console.log(response);
	})
	.catch(error => {

		console.log(error);

		var data = {
			'data': '500 (Internal Server Error)',
			'color': 'error'
		}

		context.commit(types.SHOW_SNACKBAR, data)
	})
}
//
// /**
//  * Toggle the selection state of an item
//  * @param commit
//  * @param payload
//  */
// export const toggleBrowserItemSelect = (context, payload) => {
//     const item = payload;
//     const isSelected = context.state.selectedItems.some(selected => selected.path === item.path);
//     if (!isSelected) {
//         context.commit(types.SELECT_BROWSER_ITEM, item);
//     } else {
//         context.commit(types.UNSELECT_BROWSER_ITEM, item);
//     }
// }
//
// /**
//  * Create a new folder
//  * @param commit
//  * @param payload object with the new folder name and its parent directory
//  */
// export const createDirectory = (context, payload) => {
//     context.commit(types.SET_IS_LOADING, true);
//     api.createDirectory(payload.name, payload.parent)
//         .then(folder => {
//             context.commit(types.CREATE_DIRECTORY_SUCCESS, folder);
//             context.commit(types.HIDE_CREATE_FOLDER_MODAL);
//             context.commit(types.SET_IS_LOADING, false);
//         })
//         .catch(error => {
//             // TODO error handling
//             context.commit(types.SET_IS_LOADING, false);
//             console.log("error", error);
//         })
// }
//
// /**
//  * Create a new folder
//  * @param commit
//  * @param payload object with the new folder name and its parent directory
//  */
// export const uploadFile = (context, payload) => {
//     context.commit(types.SET_IS_LOADING, true);
//     api.upload(payload.name, payload.parent, payload.content, payload.override || false)
//         .then(file => {
//             context.commit(types.UPLOAD_SUCCESS, file);
//             context.commit(types.SET_IS_LOADING, false);
//         })
//         .catch(error => {
//             context.commit(types.SET_IS_LOADING, false);
//
//             // Handle file exists
//             if (error.status === 409) {
//                 if (notifications.ask(translate.sprintf('COM_MEDIA_FILE_EXISTS_AND_OVERRIDE', payload.name), {})) {
//                     payload.override = true;
//                     uploadFile(context, payload);
//                 }
//             }
//         })
// }
//
// /**
//  * Delete a single item
//  * @param context
//  * @param payload object: the item to delete
//  */
// export const deleteItem = (context, payload) => {
//     context.commit(types.SET_IS_LOADING, true);
//     const item = payload;
//     api.delete(item.path)
//         .then(() => {
//             context.commit(types.DELETE_SUCCESS, item);
//             context.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
//             context.commit(types.SET_IS_LOADING, false);
//         })
//         .catch(error => {
//             // TODO error handling
//             context.commit(types.SET_IS_LOADING, false);
//             console.log("error", error);
//         })
// }
//
// /**
//  * Rename an item
//  * @param context
//  * @param payload object: the old and the new path
//  */
// export const renameItem = (context, payload) => {
//     context.commit(types.SET_IS_LOADING, true);
//     api.rename(payload.path, payload.newPath)
//         .then((item) => {
//             context.commit(types.RENAME_SUCCESS, {
//                 item: item,
//                 oldPath: payload.path,
//             });
//             context.commit(types.HIDE_RENAME_MODAL);
//             context.commit(types.SET_IS_LOADING, false);
//         })
//         .catch(error => {
//             // TODO error handling
//             context.commit(types.SET_IS_LOADING, false);
//             console.log("error", error);
//         })
// }
//
// /**
//  * Delete the selected items
//  * @param context
//  * @param payload object
//  */
// export const deleteSelectedItems = (context, payload) => {
//     context.commit(types.SET_IS_LOADING, true);
//     // Get the selected items from the store
//     const selectedItems = context.state.selectedItems;
//     if (selectedItems.length > 0) {
//         selectedItems.forEach(item => {
//             api.delete(item.path)
//                 .then(() => {
//                     context.commit(types.DELETE_SUCCESS, item);
//                     context.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
//                     context.commit(types.SET_IS_LOADING, false);
//                 })
//                 .catch(error => {
//                     // TODO error handling
//                     context.commit(types.SET_IS_LOADING, false);
//                     console.log("error", error);
//                 })
//         })
//     } else {
//         // TODO notify the user that he has to select at least one item
//     }
