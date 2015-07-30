rest-resource
===================

A web component that encapsulates REST API calls.

(Refactor of [grapp-rest-resource](https://github.com/grappendorf/grapp-rest-resource) compatible with Polymer 1.0)

Properties
----------

  * **url**

    - *type:* string

    A pattern for the REST URL. Can contain colon-parameters and data bindings, for example:

    `url="/users/:userId?q={{searchText}}"`

    Default URLS:

    Method        | HTTP method | URL
    ------------- | ----------- | ---
    index         | GET         | /users
    show          | GET         | /users/1
    create        | POST        | /users
    update        | PUT         | /users
    destroy       | DELETE      | /users/1
    member foo    | PUT         | /users/1/foo
    

  * **params**

    - *type:* hash

    A hash that binds URL parameters to actual values, for example:

    `params='{{ {"userId":user.id} }}'`

  * **indexUrl**

    - *type:* string

    Use this URL instead of the default one for "GET /resources" requests.

  * **showUrl**

    - *type:* string

    Use this URL instead of the default one for "GET /resources/:id" requests.

  * **createUrl**

    - *type:* string

    Use this URL instead of the default one for "POST /resources" requests.

  * **updateUrl**

    - *type:* string

    Use this URL instead of the default one for "PUT /resources/:id" requests.

  * **destroyUrl**

    - *type:* string

    Use this URL instead of the default one for "DELETE /resources/:id" requests.

  * **memberUrl**

    - *type:* string

    Use this URL instead of the default one for "PUT /resources/:id/action" requests.

  * **headers**

    - *type:* object

    Set additional headers on the request.

  * ** token**

    - *type:* string

    Set an authorization header with the specified token text.


Events
------

  * **request**

    Is fired when a REST call is initiated.

  * **response**

    Is fired when a REST call returns successful response.

  * **error**

    Is fired when a REST call returns failure response.

Methods
-----------------------

  * **index(successCallback, errorCallback)**

    Performs a HTTP GET on the index URL and returns the response data.

  * **show(id, successCallback, errorCallback)**

    Performs a HTTP GET on the show URL with the specified resource id and returns the response
    data.

  * **create(data, successCallback, errorCallback)**

    Performs a HTTP POST on the create URL with the specified resource data and returns
    the response data.

  * **update(id, data, successCallback, errorCallback)**

    Performs a HTTP PUT on the update URL with the specified resource id and data and returns
    the response data.

  * **destroy(id, successCallback, errorCallback)**

    Performs a HTTP DELETE on the destroy URL with the specified resource id and returns the response
    data.

  * **memberAction(id, action, successCallback, errorCallback)**

    Performs a HTTP PUT on the member URL with "/action" appended to it and the specified resource
    id and returns the response data.