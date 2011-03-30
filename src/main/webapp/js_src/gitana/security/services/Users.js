(function(window)
{
    var Gitana = window.Gitana;
    
    Gitana.Users = Gitana.AbstractService.extend(
    /** @lends Gitana.Users.prototype */
    {
        /**
         * @constructs
         * @augments Gitana.AbstractService
         *
         * @class Users Service
         *
         * @param {Gitana.Driver} driver The Gitana driver for this service
         */
        constructor: function(driver)
        {
            this.base(driver);
        },

        /**
         * Acquires a list of all users.
         *
         * Note: This is potentially a very expensive call and may be deprecated in the future.
         *
         * @param {Function} successCallback Function to call if the operation succeeds.
         * @param [Function] failureCallback Function to call if the operation fails.
         */
        list: function(successCallback, failureCallback)
        {
            var _this = this;

            var onSuccess = function(response)
            {
                var list = [];
                for each (row in response.rows) {
                    list[list.length] = new Gitana.User(_this.getDriver(), row);
                }
                response.list = list;

                successCallback(response);
            };

            var onFailure = this.wrapFailureCallback(failureCallback);

            // invoke
            this.getDriver().gitanaGet("/security/users", onSuccess, onFailure);
        },

        /**
         * Reads a user
         *
         * @param {String} userId the user id
         * @param {Function} successCallback Function to call if the operation succeeds.
         * @param [Function] failureCallback Function to call if the operation fails.
         */
        read: function(userId, successCallback, failureCallback)
        {
            var _this = this;

            var onSuccess = function(obj)
            {
                successCallback(new Gitana.User(_this.getDriver(), obj));
            };

            var onFailure = this.wrapFailureCallback(failureCallback);

            // invoke
            this.getDriver().gitanaGet("/security/users/" + userId, onSuccess, onFailure);
        },

        /**
         * Create a user.
         *
         * Note: The field "userId" must be present on the json object.
         *
         * @param {Object} object JSON object
         * @param [Function] successCallback Function to call if the operation succeeds.
         * @param [Function] failureCallback Function to call if the operation fails.
         */
        create: function()
        {
            var _this = this;

            var args = this.makeArray(arguments);

            var object = args.shift();
            var successCallback = args.shift();
            var failureCallback = args.shift();

            var onSuccess = function(response)
            {
                if (successCallback)
                {
                    successCallback(response);
                }
            };

            var onFailure = this.wrapFailureCallback(failureCallback);

            // invoke
            this.getDriver().gitanaPost("/security/users/", object, onSuccess, onFailure);
        },

        /**
         * Delete a user
         *
         * @param {String} userId
         * @param [Function] successCallback Function to call if the operation succeeds.
         * @param [Function] failureCallback Function to call if the operation fails.
         */
        del: function(userId, successCallback, failureCallback)
        {
            var _this = this;

            var onSuccess = function(response)
            {
                if (successCallback)
                {
                    successCallback(response);
                }
            };

            var onFailure = this.wrapFailureCallback(failureCallback);

            // invoke
            this.getDriver().gitanaDelete("/security/users/" + userId, onSuccess, onFailure);
        }

    });

})(window);
