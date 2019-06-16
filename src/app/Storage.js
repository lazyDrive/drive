const _ = require('underscore')

/* eslint-disable */

/**
 * Cookies - A small class to manipulate cookies from javascript
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage
 */
if (!window.localStorage) {
  window.localStorage = {
    getItem: function(sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) {
        return null
      }
      return unescape(
        document.cookie.replace(
          new RegExp(
            '(?:^|.*;\\s*)' +
              escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
              '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'
          ),
          '$1'
        )
      )
    },
    key: function(nKeyId) {
      return unescape(
        document.cookie
          .replace(/\s*\=(?:.(?!;))*$/, '')
          .split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]
      )
    },
    setItem: function(sKey, sValue) {
      if (!sKey) {
        return
      }
      document.cookie =
        escape(sKey) +
        '=' +
        escape(sValue) +
        '; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/'
      this.length = document.cookie.match(/\=/g).length
    },
    length: 0,
    removeItem: function(sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) {
        return
      }
      document.cookie =
        escape(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
      this.length--
    },
    hasOwnProperty: function(sKey) {
      return new RegExp(
        '(?:^|;\\s*)' + escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\='
      ).test(document.cookie)
    }
  }
  window.localStorage.length = (
    document.cookie.match(/\=/g) || window.localStorage
  ).length
}

/* eslint-enable */

/**
 * Cookies - A small class to manipulate cookies from javascript
 *
 */
export const cookies = {
  /**
   * Find all cookies.
   *
   * @return String|null
   */
  getAll: function() {
    var cookies = {}
    _(document.cookie.split(';'))
      .chain()
      .map(function(m) {
        return m.replace(/^\s+/, '').replace(/\s+$/, '')
      })
      .each(function(c) {
        var arr = c.split('=')
        var key = arr[0]
        var value = null
        var size = _.size(arr)
        if (size > 1) {
          value = arr.slice(1).join('')
        }
        cookies[key] = value
      })
    return cookies
  },

  /**
   * Find cookie.
   *
   * @param name
   * @return String|null
   */
  get: function(name) {
    var cookie = null
    var list = this.getAll()

    _.each(list, function(value, key) {
      if (key === name) cookie = value
    })
    return cookie
  },

  /**
   * Create cookie.
   *
   * @param name
   * @param value
   * @param time
   * @return String|null
   */
  set: function(name, value, time) {
    var today = new Date()
    var offset = typeof time === 'undefined' ? 1000 * 60 * 60 * 24 : time * 1000
    var expires_at = new Date(today.getTime() + offset)

    var cookie = _.map(
      {
        name: escape(value),
        expires: expires_at.toGMTString(),
        path: '/'
      },
      function(value, key) {
        return [key == 'name' ? name : key, value].join('=')
      }
    ).join(';')

    document.cookie = cookie
    return this
  },

  /**
   * Remove a cookie
   *
   * @param name
   */
  destroy: function(name) {
    if (this.get(name) != '' || this.get(name) != null) {
      this.set(name, null, -1000000)
    }
    return this
  }
}

/**
 * localStorage - A small class to manipulate localStorage from javascript
 *
 */
export const local = {
  /**
   * Find all localstorage.
   *
   * @return String|null
   */
  getAll: function() {
    const items = { ...localStorage }
    return items
  },

  /**
   * Find localstorage.
   *
   * @param name
   * @return String|null
   */
  get: function(name) {
    var item = null
    item = localStorage.getItem(name)
    return item
  },

  /**
   * Create localstorage.
   *
   * @param name
   * @param value
   * @return this
   */
  set: function(name, value) {
    localStorage.setItem(name, value)
    return this
  },

  /**
   * Remove a localstorage.
   *
   * @param name
   * @return this
   */
  destroy: function(name) {
    if (this.get(name) != '' || this.get(name) != null) {
      localStorage.removeItem(name)
    }
    return this
  }
}

/**
 * sessionStorage - A small class to manipulate localStorage from javascript
 *
 */
export const session = {
  /**
   * Find all localstorage.
   *
   * @return String|null
   */
  getAll: function() {
    const items = { ...sessionStorage }
    return items
  },

  /**
   * Find localstorage.
   *
   * @param name
   * @return String|null
   */
  get: function(name) {
    var item = null
    item = sessionStorage.getItem(name)
    return item
  },

  /**
   * Create localstorage.
   *
   * @param name
   * @param value
   * @return this
   */
  set: function(name, value) {
    sessionStorage.setItem(name, value)
    return this
  },

  /**
   * Remove a localstorage.
   *
   * @param name
   * @return this
   */
  destroy: function(name) {
    if (this.get(name) != '' || this.get(name) != null) {
      sessionStorage.removeItem(name)
    }
    return this
  },

  /**
   * Remove a localstorage.
   *
   * @param name
   * @return this
   */
  destroyAll: function() {
    sessionStorage.clear()
  }
}
