<template>
  <main class="container">
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
          <h5>Text features</h5>
        </header>

        <ul class="features-list-text">
          <li class="channel focusable channel-text active">
            <span class="channel-name">general</span>
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
            <span class="channel-name">help</span>
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
      <menu type="toolbar" class="menu">
        <ul class="breadcrumbs breadcrumbs_type5">
          <li class="breadcrumbs__item">
            <a href="#0" class="breadcrumbs__element">Home</a>
          </li>
          <li class="breadcrumbs__item">
            <a href="#0" class="breadcrumbs__element">Blog</a>
          </li>
          <li class="breadcrumbs__item">
            <a href="#0" class="breadcrumbs__element">Blog</a>
          </li>
          <li class="breadcrumbs__item breadcrumbs__item_active">
            <span class="breadcrumbs__element">
              Single
              post
            </span>
          </li>
        </ul>
      </menu>

      <section class="chat">
        <div class="grid_section folders">
          <h3>Folders</h3>
          <div class="lazy_folder">Recommend</div>
          <div class="lazy_folder">Recommend</div>
          <div class="lazy_folder">Recommend</div>
          <div class="lazy_folder">Recommend</div>
          <div class="lazy_folder">Recommend</div>
          <div class="lazy_folder">Recommend</div>
          <div class="lazy_folder">Recommend</div>
          <div class="lazy_folder">Recommend</div>
          <span class="clear"></span>
        </div>
        <div class="grid_section folders">
          <h3>Files</h3>
          <div class="lazy_file">
            <img src="1.jpg" class="lazy_file_image" alt>
            <div class="desc">My Name</div>
          </div>
          <div class="lazy_file">
            <div>
              <img
                src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop"
                class="lazy_file_image"
                alt
              >
            </div>
            <div class="desc">My Name</div>
          </div>
          <div class="lazy_file">
            <div>
              <img
                src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop"
                class="lazy_file_image"
                alt
              >
            </div>
            <div class="desc">My Name</div>
          </div>
          <div class="lazy_file">
            <div>
              <img
                src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop"
                class="lazy_file_image"
                alt
              >
            </div>
            <div class="desc">My Name</div>
          </div>
          <div class="lazy_file">
            <div>
              <img
                src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop"
                class="lazy_file_image"
                alt
              >
            </div>
            <div class="desc">My Name</div>
          </div>
          <div class="lazy_file">
            <div>
              <img
                src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop"
                class="lazy_file_image"
                alt
              >
            </div>
            <div class="desc">My Name</div>
          </div>
          <div class="lazy_file">
            <div>
              <img
                src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop"
                class="lazy_file_image"
                alt
              >
            </div>
            <div class="desc">My Name</div>
          </div>
          <div class="lazy_file">
            <div>
              <img
                src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop"
                class="lazy_file_image"
                alt
              >
            </div>
            <div class="desc">My Name</div>
          </div>
          <div class="lazy_file">
            <div>
              <img
                src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop"
                class="lazy_file_image"
                alt
              >
            </div>
            <div class="desc">
              My
              Name
            </div>
          </div>
          <span class="clear"></span>
        </div>
      </section>
    </div>

    <!-- notification -->
    <div class="notification active">
      <div class="text">
        We use cookies in our site.
        <a class="ripple rect" href="#cookies">learn more</a>
      </div>
      <div class="close ripple" onclick="/*todo*/">
        <div class="text">
          <i class="fa fa-close"></i>
        </div>
      </div>
    </div>

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
  </main>
</template>

<script>
import * as types from "./../store/mutation-types";

import { api } from "./../app/Api";

export default {
  name: "lazy-drive",
  created() {
    if (this.isMobile()) {
      this.$store.commit(types.IS_MOBILE, true);
    } else {
      this.$store.commit(types.IS_MOBILE, false);
    }

    if (this.$route.params.dir) {
      this.findDisk(this.$route);
    } else {
      const disk = {};
      this.$store.state.diskLoaded = [];
      disk.text = "my-drive";
      disk.href = `/drive/u/0/my-drive/`;
      disk.disabled = true;
      this.$store.state.diskLoaded.push(disk);
    }

    const payload = {};

    payload.action = "get";
    payload.settings = api.user.userData;

    this.$store.dispatch("settings", payload);

    if (this.$route.name == "my-drive") {
      const dir = this.$route.params.dir;
      const path = this.$route.params.path;

      if (dir !== undefined && path == "folder") {
        this.$store.dispatch("getContents", { path: dir });
      } else {
        this.$store.dispatch("getContents", { path: "my-drive" });
      }
    }
  },
  methods: {
    findDisk: function(to) {
      if (to.params.dir) {
        const diskPath = Buffer.from(to.params.dir, "base64").toString("ascii");

        const splitedPath = diskPath.split("/");
        this.$store.state.diskLoaded = [];

        let count = 0;
        while (splitedPath.length > 0) {
          const disk = {};
          const joinDisk = splitedPath.join("/");
          const encodePath = Buffer.from(joinDisk).toString("base64");
          const name = splitedPath.pop();

          if (name != "uploads") {
            disk.text = name;
            disk.href = `/drive/u/0/folder/${encodePath}`;
            disk.path = encodePath;
          } else {
            disk.text = "my-drive";
            disk.href = `/drive/u/0/my-drive/`;
          }
          if (count == 0) {
            disk.disabled = true;
          }
          ++count;
          this.$store.state.diskLoaded.unshift(disk);
        }
      } else {
        const disk = {};
        this.$store.state.diskLoaded = [];
        disk.text = "my-drive";
        disk.href = `/drive/u/0/my-drive/`;
        disk.disabled = true;
        this.$store.state.diskLoaded.push(disk);
      }
    },
    /* eslint-disable */
    isMobile: function() {
      var check = false;
      (function(a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    },
    /* eslint-enable */
    routeUpdated: function(to, from) {
      this.findDisk(to, from);
      this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
      this.$store.state.loadLimit = 30;
    }
  },
  beforeRouteUpdate(to, from, next) {
    /* eslint-disable */
    if (to.params.dir) {
      this.$store
        .dispatch("getContents", { path: to.params.dir })
        .then(response => {
          this.routeUpdated(to, from);
          next();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.$store
        .dispatch("getContents", { path: "my-drive" })
        .then(response => {
          this.routeUpdated(to, from);
          next();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
