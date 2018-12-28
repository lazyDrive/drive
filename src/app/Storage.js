const _ = require("underscore");

/**
 * Cookies - A small class to manipulate cookies from javascript
 *
 */
export const storage =  {
    /**
     * Find all cookies.
     *
     * @return String|null
     */
    getAll: function() {
        var cookies = {};
        _(document.cookie.split(';'))
            .chain()
            .map(function(m) {
                return m.replace(/^\s+/, '').replace(/\s+$/, '');
            })
            .each(function(c) {
                var arr = c.split('='),
                    key = arr[0],
                    value = null;
                var size = _.size(arr);
                if (size > 1) {
                    value = arr.slice(1).join('');
                }
                cookies[key] = value;
            });
        return cookies;
    },

    /**
     * Find cookie.
     *
     * @param name
     * @return String|null
     */
    get: function(name) {
        var cookie = null,
            list = this.getAll();

        _.each(list, function(value, key) {
            if (key === name) cookie = value;
        });
        return cookie;
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
        var today = new Date(),
            offset = (typeof time == 'undefined') ? (1000 * 60 * 60 * 24) : (time * 1000),
            expires_at = new Date(today.getTime() + offset);

        var cookie = _.map({
                name: escape(value),
                expires: expires_at.toGMTString(),
                path: '/'
            }, function(value, key) {
                return [(key == 'name') ? name : key, value].join('=');
            }).join(';');

        document.cookie = cookie;
        return this;
    },

     /**
     * Remove a cookie
     *
     * @param name
     */
    destroy: function(name) {
        if (this.get(name) != '' || this.get(name) != null) {
            this.set(name, null, -1000000);
        }
        return this;
    }
};
