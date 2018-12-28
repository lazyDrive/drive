import {api} from "../app/Api";
// import store from '@/store/store';
import router from './../router';
import * as types from "./mutation-types";

/**
* Get contents of a directory from the api
* @param commit
* @param payload
*/
export const getContents = (context, payload) => {

	context.commit(types.SET_IS_LOADING, true)

	api.axios()
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
	// context.commit(types.SHOW_TOOL_MODAL, true)

	api.axios()
	.post('api/upload', payload, {
		onUploadProgress: e => context.commit(types.SET_IS_LOADING_MORE, { value: true, per: Math.round(e.loaded * 100 / e.total)})
	})
	.then(response => {
		context.commit(types.SET_IS_LOADING, false)
		context.dispatch('getContents');

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

	api.axios()
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

	api.axios()
	.post('user/login', payload)
	.then(response => {

		api.mediastorage.cookies.set('name', response.data.userData.name, 5000);
		api.mediastorage.cookies.set('email', response.data.userData.email, 5000);
		api.mediastorage.cookies.set('token', response.data.token, 5000);

		if(response.status == 200) {
			router.push('/drive/u/0/my-drive');
		}
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

	api.axios()
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

/**
* Download a file
* @param context
* @param payload
*/
export const download = (context, payload) => {
	api.axios()
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
