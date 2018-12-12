/**
 * Get the currently selected directory
 * @param state
 * @returns {*}
 */
export const getSelectedDirectory = (state) => {
    console.log(state)
    // return state.directories.find(directory => (directory.path === state.selectedDirectory));
}

/**
 * Get the sudirectories of the currently selected directory
 * @param state
 * @param getters
 * @returns {Array|directories|{/}|computed.directories|*|Object}
 */
export const getSelectedDirectoryDirectories = (state) => {
    console.log(state)
    // return state.directories.filter(
    //     directory => (directory.directory === state.selectedDirectory)
    // );
}

/**
 * Get the files of the currently selected directory
 * @param state
 * @param getters
 * @returns {Array|files|{}|FileList|*}
 */
export const getSelectedDirectoryFiles = (state) => {
    console.log(state)
    // state.contents.files.forEach(function(element) {
    //     console.log(element);
    // });
}

/**
 * Whether or not all items of the current directory are selected
 * @param state
 * @param getters
 * @returns Array
 */
export const getSelectedDirectoryContents = (state, getters) => {
    console.log(state)
    console.log(getters)

    // return [
    //     ...getters.getSelectedDirectoryDirectories,
    //     ...getters.getSelectedDirectoryFiles,
    // ];
}
