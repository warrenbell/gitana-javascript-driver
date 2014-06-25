(function($) {

    module("nodeTransaction3");

    // Test case : Node Transaction 3
    _asyncTest("Node Transaction 3", function()
    {
        expect(3);

        var gitana = GitanaTest.authenticateFullOAuth();
        gitana.then(function() {

            // create a repository and get the master branch
            var branch = null;
            this.createRepository().readBranch("master").then(function() {
                branch = this;
            });

            this.then(function() {

                // create a transaction
                var t = Gitana.transactions().create();
                t.for(branch);

                // create the following hierarchy
                //
                //      /
                //        /folder1
                //          /folder2
                //            /file1.txt
                //            /file2.txt
                //        /folder3
                //          /file3.txt
                //        /file4.txt

                t.create({
                    "title": "folder1",
                    "_parentPath": "/"
                });
                t.create({
                    "title": "folder2",
                    "_parentPath": "/folder1"
                });
                t.create({
                    "title": "file1.txt",
                    "p1": "v1",
                    "_parentPath": "/folder1/folder2"
                });
                t.create({
                    "title": "file2.txt",
                    "p1": "v1",
                    "_parentPath": "/folder1/folder2"
                });
                t.create({
                    "title": "folder3",
                    "_parentPath": "/"
                });
                t.create({
                    "title": "file3.txt",
                    "_parentPath": "/folder3"
                });
                t.create({
                    "title": "file4.txt",
                    "_parentPath": "/"
                });

                // callback for success
                t.success = function(results) {

                    // now do some verification

                    // find the two files (file1.txt and file2.txt, both which have property p1 == v1)
                    Chain(branch).query({
                        "p1": "v1"
                    }).each(function() {

                        // for each, find the parent folder
                        // should be 1 parent folder
                        this.listRelatives({
                            "type": "n:node",
                            "direction": "incoming"
                        }).each(function() {
                            ok(this.title == "folder2");
                        });

                    }).then(function() {
                        success();
                    });
                };

                // commit
                t.commit();
            });
        });

        var success = function()
        {
            start();
        };

    });

}(jQuery) );
