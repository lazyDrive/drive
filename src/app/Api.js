import axios from 'axios'
import store from '@/store/store'
import * as MediaStorage from './Storage.js'
/**
 * Api class for communication with the server
 */
class Api {

    /**
     * Store constructor
     */
    constructor() {
      this.cookies = MediaStorage;
    }

    /**
     * Get the contents of a directory from the server
     * @returns {Promise}
     */
    axios() {
        return axios.create({
            headers: {
              Authorization: `Bearer ${store.state.token}`
            }
          });
    }

    /**
     * Get the contents of a directory from the server
     * @returns {Promise}
     */
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }

    /**
     * Get the contents of a directory from the server
     * @returns {Promise}
     */
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    /**
     * Get the contents of a directory from the server
     * @returns {Promise}
     */
      checkCookie() {
        var user = this.getCookie("username");
        if (user != "") {
          alert("Welcome again " + user);
        } else {
          user = prompt("Please enter your name:", "");
          if (user != "" && user != null) {
            this.setCookie("username", user, 365);
          }
        }
      }
}


export let api = new Api();
