Polymer({
  is : 'rest-resource',

  properties : {
    url : String,
    params : Object,
    indexUrl : String,
    showUrl : String,
    createUrl : String,
    updateUrl : String,
    destroyUrl : String,
    memberUrl : String,
    headers : Object,
    token : Object
  },

  _handleSuccess : function(request, successCallback) {
    var me = this;
    return function() {
      me.fire('response', {
        request : request,
        response : request.response
      });
      return typeof successCallback === 'function' ? successCallback(request.response, request) : void 0;
    };
  },

  _handleError : function(request, errorCallback) {
    var me = this;
    return function() {
      me.fire('error', {
        request : request,
        response : request.response
      });
      return typeof errorCallback === 'function' ? errorCallback(request.response, request) : void 0;
    };
  },

  _createRequest : function() {
    var me = this, request = document.createElement('iron-request');
    me.fire('request', {
      request : request
    });
    return request;
  },

  /**
   * Performs a HTTP GET on the index URL and returns the response data.
   * 
   * @param {successCallback}
   *          the callback function will be invoked with response data on successful response.
   * @param {errorCallback}
   *          the callback function will be invoked with response data on error response.
   */
  index : function(successCallback, errorCallback) {
    var me = this, request = me._createRequest();
    return request.send({
      url : me._prepareUrl(me.indexUrl || me.url, me.params),
      headers : me.prepareHeaders(),
      handleAs : 'json'
    }).then(me._handleSuccess(request, successCallback), me._handleError(request, errorCallback));
  },

  /**
   * Performs a HTTP GET on the show URL with the specified resource id and returns the response data.
   * 
   * @param {id}
   *          the id of the resource to be fetched.
   * @param {successCallback}
   *          the callback function will be invoked with response data on successful response.
   * @param {errorCallback}
   *          the callback function will be invoked with response data on error response.
   */
  show : function(id, successCallback, errorCallback) {
    var me = this, request = me._createRequest();
    return request.send({
      url : me._prepareUrl(me.showUrl || me.url, me.params, id),
      headers : me.prepareHeaders(),
      handleAs : 'json'
    }).then(me._handleSuccess(request, successCallback), me._handleError(request, errorCallback));
  },

  /**
   * Performs a HTTP POST on the create URL with the specified resource data and returns the response data.
   * 
   * @param {data}
   *          data for new resource to be created.
   * @param {successCallback}
   *          the callback function will be invoked with response data on successful response.
   * @param {errorCallback}
   *          the callback function will be invoked with response data on error response.
   */
  create : function(data, successCallback, errorCallback) {
    var me = this, request = me._createRequest();
    return request.send({
      method : 'POST',
      url : me._prepareUrl(me.createUrl || me.url, me.params),
      headers : me.prepareHeaders(),
      body : JSON.stringify(data),
      handleAs : 'json'
    }).then(me._handleSuccess(request, successCallback), me._handleError(request, errorCallback));
  },

  /**
   * Performs a HTTP PUT on the update URL with the specified resource id and data and returns the response data.
   * 
   * @param {id}
   *          the id of the resource to be updated.
   * @param {data}
   *          updated resource data.
   * @param {successCallback}
   *          the callback function will be invoked with response data on successful response.
   * @param {errorCallback}
   *          the callback function will be invoked with response data on error response.
   */
  update : function(id, data, successCallback, errorCallback) {
    var me = this, request = me._createRequest();
    return request.send({
      method : 'PUT',
      url : me._prepareUrl(me.updateUrl || me.url, me.params, id),
      headers : me.prepareHeaders(),
      body : JSON.stringify(data),
      handleAs : 'json'
    }).then(me._handleSuccess(request, successCallback), me._handleError(request, errorCallback));
  },

  /**
   * Performs a HTTP DELETE on the destroy URL with the specified resource id and returns the response data.
   * 
   * @param {id}
   *          the id of the resource to be destroyed.
   * @param {successCallback}
   *          the callback function will be invoked with response data on successful response.
   * @param {errorCallback}
   *          the callback function will be invoked with response data on error response.
   */
  destroy : function(id, successCallback, errorCallback) {
    var me = this, request = me._createRequest();
    return request.send({
      method : 'DELETE',
      url : me._prepareUrl(me.destroyUrl || me.url, me.params, id),
      headers : me.prepareHeaders(),
      handleAs : 'json'
    }).then(me._handleSuccess(request, successCallback), me._handleError(request, errorCallback));
  },

  /**
   * Performs a HTTP PUT on the member URL with "/action" appended to it and the specified resource id and returns the response data.
   * 
   * @param {id}
   *          the id of the resource on which a member action is to be performed.
   * @param {action}
   *          the url suffix for an action.
   * @param {successCallback}
   *          the callback function will be invoked with response data on successful response.
   * @param {errorCallback}
   *          the callback function will be invoked with response data on error response.
   */
  memberAction : function(id, action, successCallback, errorCallback) {
    var me = this, request = me._createRequest();
    return request.send({
      method : 'PUT',
      url : me._prepareUrl(me.memberUrl || me.url, me.params, id, action),
      headers : me.prepareHeaders(),
      handleAs : 'json'
    }).then(me._handleSuccess(request, successCallback), me._handleError(request, errorCallback));
  },

  _prepareUrl : function(url, params, id, action) {
    var name, value;
    if (params === null) {
      params = {};
    }
    if (id === null) {
      id = null;
    }
    if (action === null) {
      action = null;
    }
    if (typeof params === 'string') {
      params = JSON.parse(params);
    }
    for (name in params) {
      value = params[name];
      if (typeof value === 'undefined' || value === null || '' === String(value).trim()) {
        continue;
      }
      if (-1 === url.indexOf('?')) {
        url = url + '?' + name + '=' + value;
      } else {
        url = url + '&' + name + '=' + value;
      }
    }
    url = url.replace(':id', id || '');
    url = url.replace(/\/\/+/g, '/');
    url = url.replace(/^(\w+):\//, '$1://');
    url = url.replace(/\/$/, '');
    if (action) {
      url += '/' + action;
    }
    return url;
  },

  prepareHeaders : function() {
    var h, key, val, _ref;
    h = {
      'Accept' : 'application/json'
    };
    _ref = this.headers;
    for (key in _ref) {
      val = _ref[key];
      h[key] = val;
    }
    if (this.token) {
      h.Authorization = this.token;
    }
    return h;
  }
});
