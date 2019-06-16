/** @format */

import { api } from '../app/Api'
import * as types from './mutation-types'
import * as FileSaver from 'file-saver'

/**
 * Get contents of a directory from the api
 * @param commit
 * @param payload
 */
export const getContents = (context, payload) => {
  return new Promise((resolve, reject) => {
    context.commit(types.SET_IS_LOADING, true)
    let path = payload.path || context.state.selectedDirectory
    let limit = payload.limit || context.state.loadLimit
    api
      .axios()
      .get(`/api/getFiles/${path}/${limit}`, {
        retry: 3,
        retryDelay: 1000
      })
      .then(response => {
        context.state.selectedDirectory = path
        context.commit(types.LOAD_CONTENTS_SUCCESS, response.data.contents)
        context.commit(types.SET_IS_LOADING, false)
        resolve(response)
      })
      .catch(error => {
        api._handleError(error)
        reject(error)
      })
  })
}

/**
 * Get contents of a directory from the api
 * @param commit
 * @param payload
 */
export const update = (context, payload) => {
  let path = payload.path || context.state.selectedDirectory
  let limit = payload.limit || context.state.loadLimit
  const state =
    context.state.isUploading === true ? 'subscribe' : 'eventCacheUpdate'
  api
    .axios()
    .get(`/api/getFiles/${path}/${limit}/update/nocache/${state}`, {
      retry: 3,
      retryDelay: 1000
    })
    .then(response => {
      context.commit(types.LOAD_CONTENTS_SUCCESS, response.data.contents)
      context.commit(types.SET_IS_LOADING, false)
    })
    .catch(error => {
      api._handleError(error)
    })
}

/**
 * Create a new folder
 * @param commit
 * @param payload object with the new folder name and its parent directory
 */
export const upload = (context, payload) => {
  const foundIndex = context.state.uploadItemsMenu.findIndex(
    x => x.id == payload.id && x.type == 'file'
  )
  return new Promise((resolve, reject) => {
    api
      .axios()
      .post(`/api/upload/${payload.uploadPath}`, payload.formData, {
        retry: 3,
        retryDelay: 1000,
        onUploadProgress: e => {
          if (foundIndex !== -1) {
            context.state.uploadItemsMenu[
              foundIndex
            ].uploadPercent = Math.round((e.loaded * 100) / e.total)
          }
        }
      })
      .then(response => {
        setInterval(() => {
          resolve(response)
        }, 1000)
      })
      .catch(error => {
        api._handleError(error)
        reject(error)
      })
  })
}

/**
 * Login
 * @param commit
 * @param payload
 */
export const login = (context, payload) => {
  return new Promise((resolve, reject) => {
    api
      .axios()
      .post('/user/login', payload)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * Login
 * @param commit
 * @param payload
 */
export const log = (context, payload) => {
  api
    .axios()
    .post('api/log', payload)
    .then(() => {
      // context.dispatch('update', {path: context.state.selectedDirectory});
    })
    .catch(error => {
      api._handleError(error)
    })
}

/**
 * Save Settings
 * @param commit
 * @param payload
 */
export const settings = (context, payload) => {
  return new Promise((resolve, reject) => {
    api
      .axios()
      .post('/user/settings', payload)
      .then(response => {
        context.commit(types.SET_SETTINGS, response)
        resolve(response)
      })
      .catch(error => {
        api._handleError(error)
        reject(error)
      })
  })
}

/**
 * Delete file
 * @param commit
 * @param payload
 */
export const deleteFile = (context, payload) => {
  const file = payload
  return new Promise((resolve, reject) => {
    api
      .axios()
      .delete('/api/delete/' + file.path)
      .then(response => {
        context.state.showConfirmDeleteModal = false
        resolve(response)
      })
      .catch(error => {
        api._handleError(error)
        reject(error)
      })
  })
}

/**
 * Create directory
 * @param commit
 * @param payload
 */
export const createDirectory = (context, payload) => {
  context.commit(types.SET_IS_LOADING, true)
  const path = context.state.selectedDirectory
  api
    .axios()
    .put(`/api/createDirectory/${path}`, payload)
    .then(response => {
      var data = {
        data: response.data.message,
        color: 'success'
      }
      context.state.showCreateFolderModal = false
      context.commit(types.SHOW_SNACKBAR, data)
      context.dispatch('update', {
        path: context.state.selectedDirectory
      })
    })
    .catch(error => {
      api._handleError(error)
    })

  context.commit(types.SET_IS_LOADING, false)
}

/**
 * Rename
 * @param commit
 * @param payload
 */
export const rename = (context, payload) => {
  context.commit(types.SET_IS_LOADING, true)
  api
    .axios()
    .put(`/api/rename/${payload.path}`, payload)
    .then(response => {
      var data = {
        data: response.data.message,
        color: 'success'
      }
      context.state.showRenameModal = false
      context.commit(types.SHOW_SNACKBAR, data)
      context.dispatch('update', {
        path: context.state.selectedDirectory
      })
    })
    .catch(error => {
      api._handleError(error)
    })
  context.commit(types.SET_IS_LOADING, false)
}

/**
 * Login
 * @param commit
 * @param payload
 */
export const signup = (context, payload) => {
  return new Promise((resolve, reject) => {
    api
      .axios()
      .post('/user/signup', payload)
      .then(response => {
        var data = {
          data: response.data.message,
          color: 'success'
        }
        context.commit(types.SHOW_SNACKBAR, data)
        resolve(response)
      })
      .catch(error => {
        reject(error)
        api._handleError(error)
      })
  })
}

/**
 * Download a file
 * @param context
 * @param payload
 */
export const download = (context, payload) => {
  var data = {
    data: 'Preparing download.',
    color: 'default',
    time: 0
  }

  context.commit(types.SHOW_SNACKBAR, data)

  if (payload.length == 1) {
    api
      .axios()
      .get(payload[0].filePath, {
        responseType: 'blob'
      })
      .then(response => {
        FileSaver.saveAs(new Blob([response.data]), payload[0].name)
        context.commit(types.HIDE_SNACKBAR)
      })
      .catch(error => {
        api._handleError(error)
      })
  } else {
    const path = context.state.selectedDirectory

    api
      .axios()
      .post(
        `/api/batch/${path}`,
        {
          files: payload
        },
        {
          responseType: 'blob'
        }
      )
      .then(response => {
        FileSaver.saveAs(
          new Blob([response.data]),
          'Media_Drive_' + new Date() + '.zip'
        )
        context.commit(types.HIDE_SNACKBAR)
      })
      .catch(error => {
        api._handleError(error)
      })
  }
}
