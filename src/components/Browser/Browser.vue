<template>
  <div class="container">
    <aside class="lazy">
      <div class="lazy-collection">
        <div
          class="server focusable server-friends unread"
          role="button"
          aria-label="Friends unread"
        >
          <div class="server-icon">
            <svg>
              <use xlink:href="#icon-friends"></use>
            </svg>
          </div>
        </div>
      </div>

      <div class="lazy-collection">
        <div
          class="server focusable active"
          role="button"
          aria-label="My Server"
          aria-selected="true"
        >
          <div class="server-icon">
            <img src="https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png">
          </div>
        </div>
        <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
          <div class="server-icon">
            <img src="https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png">
          </div>
        </div>
      </div>
    </aside>

    <aside class="features">
      <header class="features-header focusable">
        <h3 role="header" class="features-header-name">My Server</h3>
        <svg role="button" aria-label="Dropdown" class="features-header-dropdown">
          <use xlink:href="#icon-dropdown"></use>
        </svg>
      </header>

      <section class="features-list">
        <header class="features-list-header focusable">
          <h5>Actions</h5>
        </header>

        <ul class="features-list-text">
          <li class="channel channel-text">
            <span class="channel-name" @click="selectFile()">Upload File</span>
            <button class="button" role="button" aria-label="Invite">
              <svg>
                <use xlink:href="#icon-invite"></use>
              </svg>
            </button>
            <button class="button" role="button" aria-label="settings">
              <svg>
                <use xlink:href="#icon-channel-settings"></use>
              </svg>
            </button>
          </li>

          <li class="channel focusable channel-text">
            <span class="channel-name" @click="selectFolder()">Upload Folder</span>
            <button class="button" role="button" aria-label="Invite">
              <svg>
                <use xlink:href="#icon-invite"></use>
              </svg>
            </button>
            <button class="button" role="button" aria-label="settings">
              <svg>
                <use xlink:href="#icon-channel-settings"></use>
              </svg>
            </button>
          </li>
        </ul>

        <header class="features-list-header focusable">
          <h5>Voice features</h5>
        </header>
      </section>

      <footer class="features-footer">
        <img
          class="avatar"
          alt="Avatar"
          src="https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png"
        >
        <div class="features-footer-details">
          <span class="username">yourself</span>
          <span class="tag">#0001</span>
        </div>
        <div class="features-footer-controls button-group">
          <button role="button" aria-label="Mute" class="button button-mute">
            <svg>
              <use xlink:href="#icon-mute"></use>
            </svg>
          </button>
          <button role="button" aria-label="Deafen" class="button button-deafen">
            <svg>
              <use xlink:href="#icon-deafen"></use>
            </svg>
          </button>
          <button role="button" aria-label="Settings" class="button button-settings">
            <svg>
              <use xlink:href="#icon-settings"></use>
            </svg>
          </button>
        </div>
      </footer>
    </aside>

    <div class="vert-container">
      <div class="media-action">
        <div class="file">
          <form enctype="multipart/form-data" ref="formFile">
            <input multiple type="file" hidden ref="inputFile" @change="processFile">
          </form>
        </div>
        <div class="folder">
          <form enctype="multipart/form-data" ref="formFolder">
            <input
              multiple
              type="file"
              directory
              webkitdirectory
              mozdirectory
              hidden
              ref="inputFolder"
              @change="processFolder"
            >
          </form>
        </div>
      </div>
      <div class="media-toolbar">
        <div class="media-loader" v-if="this.$store.state.isLoading"></div>
      </div>
      <menu type="toolbar" class="menu">
        <lazy-breadcrumb></lazy-breadcrumb>
      </menu>
      <media-main-content></media-main-content>
    </div>
    <svg id="search" width="24" height="24" viewBox="0 0 18 18">
      <g fill="none" fill-rule="evenodd">
        <path
          fill="currentColor"
          d="M3.60091481,7.20297313 C3.60091481,5.20983419 5.20983419,3.60091481 7.20297313,3.60091481 C9.19611206,3.60091481 10.8050314,5.20983419 10.8050314,7.20297313 C10.8050314,9.19611206 9.19611206,10.8050314 7.20297313,10.8050314 C5.20983419,10.8050314 3.60091481,9.19611206 3.60091481,7.20297313 Z M12.0057176,10.8050314 L11.3733562,10.8050314 L11.1492281,10.5889079 C11.9336764,9.67638651 12.4059463,8.49170955 12.4059463,7.20297313 C12.4059463,4.32933105 10.0766152,2 7.20297313,2 C4.32933105,2 2,4.32933105 2,7.20297313 C2,10.0766152 4.32933105,12.4059463 7.20297313,12.4059463 C8.49170955,12.4059463 9.67638651,11.9336764 10.5889079,11.1492281 L10.8050314,11.3733562 L10.8050314,12.0057176 L14.8073185,16 L16,14.8073185 L12.2102538,11.0099776 L12.0057176,10.8050314 Z"
        ></path>
      </g>
    </svg>
    <svg id="icon-friends" viewBox="-289 382 32 27.1">
      <g id="g4145" fill="#fff">
        <path
          id="path5"
          d="M-273 409.1c-4.1 0-6.8-.6-7.9-1.7-.5-.6-.6-1.1-.6-1.3 0-.7.1-2.9.6-3.8.1-.3.5-1 4.5-2.4-1.6-1.4-2.6-4-2.6-7.1 0-4.2 2.3-7 5.9-7.1h.1c3.6.1 5.9 2.8 5.9 7.1 0 3.1-1 5.7-2.6 7.1 4 1.4 4.4 2.1 4.5 2.4.4.9.5 3.1.6 3.8 0 .2 0 .7-.6 1.3-1.1 1.1-3.7 1.7-7.8 1.7zm0-2c5.1 0 6.2-.9 6.4-1.1-.1-1.1-.2-2.3-.3-2.7-.6-.4-2.9-1.3-4.8-1.9l-.7-.2-.1-2 .7-.3c1.7-.6 2.8-3.1 2.8-6.1 0-3.1-1.5-5-3.9-5.1-2.5 0-4 2-4 5.1 0 3 1.1 5.5 2.8 6.1l.7.3-.1 2-.7.2c-1.9.6-4.2 1.5-4.8 1.9-.1.4-.3 1.6-.3 2.7.1.2 1.3 1.1 6.3 1.1z"
          class="st0"
        ></path>

        <g id="g7" class="st1" opacity=".6">
          <path
            id="path9"
            d="M-257 402.4c0-.7-.1-2.9-.6-3.8-.1-.3-.5-1-4.5-2.4 1.6-1.4 2.6-4 2.6-7.1 0-4.2-2.3-7-5.9-7.1h-.1c-1.9 0-3.5.8-4.5 2.2.6.3 1.2.6 1.8 1 .7-.8 1.6-1.3 2.8-1.3 2.4 0 3.9 2 3.9 5.1 0 3-1.1 5.5-2.8 6.1l-.7.3.1 2 .7.2c1.9.6 4.3 1.5 4.8 1.9.1.4.3 1.6.3 2.7-.2.2-1 .8-3.8 1 .1.6.2 1.2.2 2 2.5-.2 4.2-.8 5-1.6.7-.5.7-1 .7-1.2z"
            class="st0"
          ></path>
          <path
            id="path11"
            d="M-287 402.3c.1-1.1.2-2.3.3-2.7.6-.4 2.9-1.3 4.8-1.9l.7-.2.1-2-.7-.3c-1.6-.6-2.8-3.1-2.8-6.1 0-3.1 1.5-5 4-5.1 1.2 0 2.1.5 2.8 1.3.5-.4 1.1-.8 1.8-1-1-1.4-2.6-2.2-4.5-2.2h-.1c-3.6 0-5.9 2.8-5.9 7.1 0 3.1 1 5.7 2.6 7.1-4 1.4-4.4 2.1-4.5 2.4-.4.9-.5 3.1-.6 3.8 0 .2 0 .7.6 1.3.8.9 2.5 1.4 5.1 1.6 0-.7.1-1.4.2-2-2.9-.3-3.7-.9-3.9-1.1z"
            class="st0"
          ></path>
        </g>
      </g>
    </svg>

    <svg id="icon-mute" viewBox="0 0 16 16">
      <path
        fill="#5D6063"
        d="M12.5,8v1c0,2.2-1.8,4-4,4h-1c-2.2,0-4-1.8-4-4V8h-1v1 c0,2.8,2.2,5,5,5v1H7c-0.3,0-0.5,0.2-0.5,0.5C6.5,15.8,6.7,16,7,16h2c0.3,0,0.5-0.2,0.5-0.5C9.5,15.2,9.3,15,9,15H8.5v-1 c2.8,0,5-2.2,5-5V8H12.5z M8,12c1.9,0,3.5-1.6,3.5-3.5v-5C11.5,1.6,9.9,0,8,0C6.1,0,4.5,1.6,4.5,3.5v5C4.5,10.4,6.1,12,8,12z M5.5,3.5C5.5,2.1,6.6,1,8,1c1.4,0,2.5,1.1,2.5,2.5v5C10.5,9.9,9.4,11,8,11c-1.4,0-2.5-1.1-2.5-2.5V3.5z"
      ></path>
    </svg>

    <svg id="icon-deafen" viewBox="0 0 16 16">
      <path
        fill="#5D6063"
        d="M15.9,9C16,8.7,16,8.3,16,8c0-4.4-3.6-8-8-8C3.6,0,0,3.6,0,8 c0,0.3,0,0.7,0.1,1h0C0,9.2,0,9.3,0,9.5v4C0,14.3,0.7,15,1.5,15h2C4.3,15,5,14.3,5,13.5v-4C5,8.7,4.3,8,3.5,8h-2 C1.3,8,1.2,8,1,8.1C1,8.1,1,8,1,8c0-3.9,3.1-7,7-7c3.9,0,7,3.1,7,7c0,0,0,0.1,0,0.1C14.8,8,14.7,8,14.5,8h-2C11.7,8,11,8.7,11,9.5 v4c0,0.8,0.7,1.5,1.5,1.5h2c0.8,0,1.5-0.7,1.5-1.5v-4C16,9.3,16,9.2,15.9,9L15.9,9z M1.5,9h2C3.8,9,4,9.2,4,9.5v4 C4,13.8,3.8,14,3.5,14h-2C1.2,14,1,13.8,1,13.5v-4C1,9.2,1.2,9,1.5,9z M15,13.5c0,0.3-0.2,0.5-0.5,0.5h-2c-0.3,0-0.5-0.2-0.5-0.5 v-4C12,9.2,12.2,9,12.5,9h2C14.8,9,15,9.2,15,9.5V13.5z"
      ></path>
    </svg>

    <svg id="icon-settings" viewBox="0 0 16 16">
      <path
        fill="#5D6063"
        d="M8,5C6.3,5,5,6.3,5,8c0,1.7,1.3,3,3,3c1.7,0,3-1.3,3-3 C11,6.3,9.7,5,8,5z M8,10c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C10,9.1,9.1,10,8,10z M16,8c0-1-0.8-1.9-1.8-2 c-0.1-0.3-0.3-0.7-0.4-1c0.7-0.8,0.6-1.9-0.1-2.7c-0.7-0.7-1.9-0.8-2.7-0.1c-0.3-0.2-0.6-0.3-1-0.4C9.9,0.8,9,0,8,0 C7,0,6.1,0.8,6,1.8C5.7,1.9,5.3,2.1,5,2.2C4.2,1.6,3.1,1.6,2.3,2.3C1.6,3.1,1.6,4.2,2.2,5C2.1,5.3,1.9,5.7,1.8,6C0.8,6.1,0,7,0,8 c0,1,0.8,1.9,1.8,2c0.1,0.3,0.3,0.7,0.4,1c-0.7,0.8-0.6,1.9,0.1,2.7c0.7,0.7,1.9,0.8,2.7,0.1c0.3,0.2,0.6,0.3,1,0.4 C6.1,15.2,7,16,8,16c1,0,1.9-0.8,2-1.8c0.3-0.1,0.7-0.3,1-0.4c0.8,0.7,1.9,0.6,2.7-0.1c0.7-0.7,0.8-1.9,0.1-2.7 c0.2-0.3,0.3-0.6,0.4-1C15.2,9.9,16,9,16,8z M13.4,9c-0.1,0.8-0.5,1.5-0.9,2.1l0.4,0.4c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0 l-0.4-0.4C10.5,13,9.8,13.3,9,13.4V14c0,0.6-0.4,1-1,1c-0.6,0-1-0.4-1-1v-0.6c-0.8-0.1-1.5-0.5-2.1-0.9l-0.4,0.4 c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l0.4-0.4C3,10.5,2.7,9.8,2.6,9H2C1.4,9,1,8.6,1,8c0-0.6,0.4-1,1-1h0.6 C2.7,6.2,3,5.5,3.5,4.9L3.1,4.5c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l0.4,0.4C5.5,3,6.2,2.7,7,2.6V2c0-0.6,0.4-1,1-1 c0.6,0,1,0.4,1,1v0.6c0.8,0.1,1.5,0.5,2.1,0.9l0.4-0.4c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4l-0.4,0.4C13,5.5,13.3,6.2,13.4,7 H14c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1H13.4z"
      ></path>
    </svg>

    <svg id="icon-dropdown" viewBox="0 0 18 18">
      <path class="dd" stroke="#FFF" d="M4.5 4.5l9 9" stroke-linecap="round"></path>
      <path class="dd" stroke="#FFF" d="M13.5 4.5l-9 9" stroke-linecap="round"></path>
    </svg>

    <svg id="icon-invite" viewBox="0 0 16 16">
      <path
        fill="#fff"
        d="M6.3,3.4L8,1.7v9.8C8,11.8,8.2,12,8.5,12C8.8,12,9,11.8,9,11.5V1.7l1.7,1.7c0.2,0.2,0.5,0.2,0.7,0c0.2-0.2,0.2-0.5,0-0.7L8.9,0.2c0,0,0,0,0-0.1C8.8,0,8.6,0,8.5,0c0,0,0,0,0,0c0,0,0,0,0,0C8.4,0,8.2,0,8.1,0.1c0,0,0,0,0,0.1L5.6,2.7c-0.2,0.2-0.2,0.5,0,0.7C5.8,3.5,6.1,3.5,6.3,3.4z M14,4h-1.5v1h1C13.8,5,14,5.2,14,5.5v9c0,0.3-0.2,0.5-0.5,0.5h-10C3.2,15,3,14.8,3,14.5v-9C3,5.2,3.2,5,3.5,5h1V4H3C2.4,4,2,4.4,2,5v10c0,0.6,0.4,1,1,1h11c0.6,0,1-0.4,1-1V5C15,4.4,14.6,4,14,4z"
      ></path>
    </svg>

    <svg id="icon-channel-settings" viewBox="0 0 16 16">
      <path
        fill="#fff"
        d="M8,5C6.3,5,5,6.3,5,8c0,1.7,1.3,3,3,3c1.7,0,3-1.3,3-3 C11,6.3,9.7,5,8,5z M8,10c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C10,9.1,9.1,10,8,10z M16,8c0-1-0.8-1.9-1.8-2 c-0.1-0.3-0.3-0.7-0.4-1c0.7-0.8,0.6-1.9-0.1-2.7c-0.7-0.7-1.9-0.8-2.7-0.1c-0.3-0.2-0.6-0.3-1-0.4C9.9,0.8,9,0,8,0 C7,0,6.1,0.8,6,1.8C5.7,1.9,5.3,2.1,5,2.2C4.2,1.6,3.1,1.6,2.3,2.3C1.6,3.1,1.6,4.2,2.2,5C2.1,5.3,1.9,5.7,1.8,6C0.8,6.1,0,7,0,8 c0,1,0.8,1.9,1.8,2c0.1,0.3,0.3,0.7,0.4,1c-0.7,0.8-0.6,1.9,0.1,2.7c0.7,0.7,1.9,0.8,2.7,0.1c0.3,0.2,0.6,0.3,1,0.4 C6.1,15.2,7,16,8,16c1,0,1.9-0.8,2-1.8c0.3-0.1,0.7-0.3,1-0.4c0.8,0.7,1.9,0.6,2.7-0.1c0.7-0.7,0.8-1.9,0.1-2.7 c0.2-0.3,0.3-0.6,0.4-1C15.2,9.9,16,9,16,8z M13.4,9c-0.1,0.8-0.5,1.5-0.9,2.1l0.4,0.4c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0 l-0.4-0.4C10.5,13,9.8,13.3,9,13.4V14c0,0.6-0.4,1-1,1c-0.6,0-1-0.4-1-1v-0.6c-0.8-0.1-1.5-0.5-2.1-0.9l-0.4,0.4 c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l0.4-0.4C3,10.5,2.7,9.8,2.6,9H2C1.4,9,1,8.6,1,8c0-0.6,0.4-1,1-1h0.6 C2.7,6.2,3,5.5,3.5,4.9L3.1,4.5c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l0.4,0.4C5.5,3,6.2,2.7,7,2.6V2c0-0.6,0.4-1,1-1 c0.6,0,1,0.4,1,1v0.6c0.8,0.1,1.5,0.5,2.1,0.9l0.4-0.4c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4l-0.4,0.4C13,5.5,13.3,6.2,13.4,7 H14c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1H13.4z"
      ></path>
    </svg>
  </div>
</template>

<script>
import * as types from "./.././../store/mutation-types.js";
import mainContent from "./../Browser/Content/MainContent";
import breadCrumb from "./../Tool/BreadCrumb";

export default {
  name: "media-browser",
  data() {
    return {};
  },
  components: {
    "media-main-content": mainContent,
    "lazy-breadcrumb": breadCrumb
  },
  methods: {
    processUpload: async function(type) {
      let uploadSuccess = 0;
      this.$store.commit(types.SET_IS_UPLOADING, true);
      while (this.$store.state.uploadItems.length > 0) {
        const item = this.$store.state.uploadItems.shift();
        const formData = item.file;
        const uploadPath = item.path;
        const id = item.id;
        const type = item.type;

        try {
          await this.$store.dispatch("upload", {
            formData,
            uploadPath,
            id,
            type
          });
          uploadSuccess = uploadSuccess + 1;
        } catch (error) {
          console.error(error);
        }

        if (uploadSuccess % 2 == 0) {
          this.$store.dispatch("update", {
            path: this.$store.state.selectedDirectory
          });
        }
      }

      this.$store.dispatch("update", {
        path: this.$store.state.selectedDirectory
      });

      var data = {
        data: `${uploadSuccess} files uploaded.`,
        color: "success"
      };

      this.$store.commit(types.SHOW_SNACKBAR, data);
      this.$store.commit(types.SET_IS_UPLOADING, 2);

      if (type == "file") {
        this.$refs.formFile.reset();
      } else if (type == "folder") {
        this.$refs.formFolder.reset();
      }
    },
    selectFile: function() {
      const inputFile = this.$refs.inputFile;
      if (inputFile) {
        inputFile.click();
      } else {
        console.log("error");
      }
    },
    selectFolder: function() {
      const inputFolder = this.$refs.inputFolder;
      if (inputFolder) {
        inputFolder.click();
      } else {
        console.log("error");
      }
    },
    processFile: function() {
      var files = this.$refs.inputFile.files;
      const uploadPath = this.$store.state.selectedDirectory;

      for (var i = 0; i < files.length; i++) {
        const item = {};
        let file = files[i];
        file.id = i;

        const formData = new FormData();
        formData.append("files", file);

        item.id =
          file.name +
          i +
          file.lastModified +
          Math.random() +
          file.size +
          Date.now();
        item.icon = "assessment";
        item.file = formData;
        item.path = uploadPath;

        item.type = "file";
        item.iconClass = "grey lighten-1 white--text";
        item.title = file.name;
        item.subtitle = "";
        item.uploadPercent = 0;
        item.size = file.size;

        this.$store.state.uploadItems.push(item);
        this.$store.state.uploadItemsMenu.push(item);
      }

      if (this.$store.state.isUploading !== true) {
        this.processUpload("file");
      }
    },
    processFolder: async function() {
      var files = this.$refs.inputFolder.files;
      let selectedPath = this.$store.state.selectedDirectory;

      // let size = 0;
      for (var i = 0; i < files.length; i++) {
        const item = {};
        let file = files[i];
        file.id = i;

        const formData = new FormData();
        formData.append("files", file);

        let encodePath = "";
        if (selectedPath == "my-drive") {
          encodePath = `uploads/${file.webkitRelativePath.substring(
            0,
            file.webkitRelativePath.lastIndexOf("/")
          )}`;
        } else {
          encodePath = `${Buffer.from(selectedPath, "base64").toString(
            "ascii"
          )}/${file.webkitRelativePath.substring(
            0,
            file.webkitRelativePath.lastIndexOf("/")
          )}`;
        }

        const uploadPath = Buffer.from(encodePath).toString("base64");

        item.id =
          file.name +
          i +
          Math.random() +
          file.lastModified +
          file.size +
          Date.now();
        item.icon = "assessment";
        item.file = formData;
        item.path = uploadPath;

        item.type = "file";
        item.iconClass = "grey lighten-1 white--text";
        item.title = file.name;
        item.subtitle = "";
        item.uploadPercent = 0;
        item.size = file.size;

        this.$store.state.uploadItems.push(item);
        this.$store.state.uploadItemsMenu.push(item);
      }

      if (this.$store.state.isUploading !== true) {
        this.processUpload("folder");
      }
    }
  }
};
</script>
