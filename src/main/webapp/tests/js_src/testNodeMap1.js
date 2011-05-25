(function($) {

    module("nodeMap1");

    // Test case : Node Map 1
    test("Node Map 1", function() {

        stop();

        expect(4);

        var gitana = new Gitana();
        gitana.authenticate("admin", "admin").createRepository().readBranch("master").then(function() {

            // NOTE: this = branch

            // create some nodes
            this.createNode({"value": 0});
            this.createNode({"value": 1});
            this.createNode({"value": 2});
            this.createNode({"value": 3});
            this.createNode({"value": 4});
            this.createNode({"value": 5});
            this.createNode({"value": 6});
            this.createNode({"value": 7});
            this.createNode({"value": 8});
            this.createNode({"value": 9});

            // query for nodes and filter by value > 5
            this.queryNodes().filter(function() {
                return (this.get("value") > 5)
            }).count(function(count) {
                equal(count, 4, "Count was 4");
            });

            // query for nodes and filter for even values
            this.queryNodes().filter(function() {
                return (this.get("value") % 2 == 0);
            }).count(function(count) {
                equal(count, 5, "Count was 5");
            });

            // query for nodes, filter for even values and then sum up via each
            var sum = 0;
            this.queryNodes().filter(function() {
                return (this.get("value") % 2 == 0);
            }).count(function(count) {
                equal(count, 5, "Count was 5");
            }).each(function() {
                sum += this.get("value");
            });

            this.then(function() {
                equal(sum, 20, "Sum was 20");
            });

            this.then(function() {
                success();
            });

        });

        var success = function() {
            start();
        };

    });

}(jQuery) );