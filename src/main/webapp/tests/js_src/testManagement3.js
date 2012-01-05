(function($) {

    module("management3");

    // Test case : Management 3
    test("Management 3", function() {
        stop();

        expect(1);

        var gitana = GitanaTest.authenticateFullOAuth();
        gitana.then(function() {

            // NOTE: this = platform

            // create a user
            var user = null;
            this.readDefaultDomain().createUser({
                "name": "user1-" + new Date().getTime(),
                "password": "pw"
            }).then(function() {
                user = this;
            });

            var management = new Gitana.Management(this);

            this.subchain(management).then(function() {

                // NOTE: this = management

                // create a tenant for the user
                var tenant = null;
                this.createTenant(user, {
                    "planKey": "starter"
                }).then(function() {
                    tenant = this;
                });

                // now find all tenants with this user
                this.findTenantsWithPrincipalTeamMember(user).count(function(count) {
                    equal(count, 1, "Found tenant count of 1");
                });

                this.then(function() {
                    success();
                });

            });

        });

        var success = function()
        {
            start();
        };

    });

}(jQuery) );