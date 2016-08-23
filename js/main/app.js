define(["require", "exports", "jquery", "./model/ProjectModel", "./view/DependencyListView", "./view/LayoutView", "./view/NewsfeedView", "./collection/NewsfeedCollection"], function (require, exports, $, ProjectModel_1, DependencyListView_1, LayoutView_1, NewsfeedView_1, NewsfeedCollection_1) {
    "use strict";
    window["NPM_URL"] = "https://cors-anywhere.herokuapp.com/https://registry.npmjs.org";
    window["GITHUB_URL"] = "https://api.github.com";
    function initAppForPackageJson(packageJson) {
        if (_paq) {
            _paq.push(['trackEvent', 'User', 'LandingAnalyseDep']);
        }
        ProjectModel_1.default.createForPackageJson(packageJson).then(function (project) {
            var linkTags = document.getElementsByTagName("link");
            for (var i in linkTags) {
                var tag = linkTags[i];
                if ($(tag).attr("href") == "css/landing/grayscale.css") {
                    $(tag).remove();
                    break;
                }
            }
            var layout = new LayoutView_1.default(document.getElementsByTagName("body")[0]);
            layout.render();
            var depList = new DependencyListView_1.default(project);
            layout.setLeftPane(depList.render());
            NewsfeedCollection_1.default.createFor(project.dependencies.toArray())
                .then(function (newsfeed) { return new NewsfeedView_1.default(newsfeed); })
                .then(function (view) { return layout.setCenterPane(view.render()); });
        });
    }
    function initAppForPackageJsonUrl(url) {
        $.getJSON(url, initAppForPackageJson);
    }
    function onSelected(e) {
        initAppForPackageJsonUrl(e.target.value);
    }
    function normalizePackageJsonUrl(inputUrl) {
        var pathname = null;
        if (inputUrl.indexOf("git@github.com") === 0) {
            pathname = "/" + inputUrl.substring(inputUrl.indexOf(":") + 1, inputUrl.length - 4);
        }
        else {
            if (inputUrl.indexOf("://") == -1) {
                return null;
            }
            var parser = document.createElement('a');
            parser.href = inputUrl;
            pathname = parser.pathname;
            if (parser.host === "raw.githubusercontent.com") {
                return inputUrl;
            }
            if (parser.host === "github.com") {
                var pathSegments = pathname.split("/");
                if (pathSegments.length >= 4 && pathSegments[3] == "blob") {
                    pathname = "/" + pathSegments[1] + "/" + pathSegments[2];
                }
            }
        }
        if (pathname.substring(pathname.length - 4) === ".git") {
            pathname = pathname.substring(0, pathname.length - 4);
        }
        if (pathname.charAt(pathname.length - 1) == "/") {
            pathname = pathname.substring(0, pathname.length - 1);
        }
        if (pathname == null) {
            return null;
        }
        return "https://raw.githubusercontent.com" + pathname + "/master/package.json";
        // parser.protocol; // => "http:"
        // parser.hostname; // => "example.com"
        // parser.port;     // => "3000"
        // parser.pathname; // => "/pathname/"
        // parser.search;   // => "?search=test"
        // parser.hash;     // => "#hash"
        // parser.host;     // => "example.com:3000"
    }
    function error(msg) {
        if (_paq) {
            _paq.push(['trackEvent', 'User', 'LandingAnalyseDepFail']);
        }
        $("#lbl-empty").show().html(msg);
    }
    function isValidPackageJson(rawPackageJson) {
        var packageJson;
        try {
            packageJson = JSON.parse(rawPackageJson);
        }
        catch (e) {
            error("Syntax error: this is not a valid package.json file");
            return false;
        }
        if (!(packageJson.name && packageJson.version)) {
            error("Please provide a package.json with a name and a version");
            return false;
        }
        var hasDeps = _.isObject(packageJson.dependencies) && !_.isEmpty(packageJson.dependencies);
        var hasDevDeps = _.isObject(packageJson.devDependencies) && !_.isEmpty(packageJson.devDependencies);
        if (!(hasDeps || hasDevDeps)) {
            error("Please provide a package.json with at least one dependency");
            return false;
        }
        return true;
    }
    function onBtnDepsClick() {
        var $txtRepoUrl = $("#txt-repo-url");
        var $txtPackageJson = $("#txt-package-json");
        var repoUrl = $txtRepoUrl.val().trim();
        var packageJson = $txtPackageJson.val().trim();
        if (!repoUrl && !packageJson) {
            error("Please specify your package.json");
        }
        else if (packageJson) {
            if (isValidPackageJson(packageJson)) {
                initAppForPackageJson(packageJson);
            }
        }
        else {
            var realUrl = normalizePackageJsonUrl(repoUrl);
            if (realUrl === null) {
                error("could not determine the URL of the package.json file");
            }
            else {
                initAppForPackageJsonUrl(realUrl);
            }
        }
    }
    function app() {
        $("#sel-project-url").change(onSelected);
        $("#btn-deps").click(onBtnDepsClick);
    }
    return app;
});
//# sourceMappingURL=app.js.map