var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "backbone", "./DependencyModel", "../collection/DependencyCollection", "./toPromise", "underscore", "./VersionNumber", "./PromiseCompletion", "promise"], function (require, exports, Backbone, DependencyModel_1, DependencyCollection_1, toPromise_1, _, VersionNumber_1, PromiseCompletion_1) {
    "use strict";
    function depJsonArr2DepArr(arr, packageJson) {
        var dependencies = packageJson["dependencies"] || {};
        var devDependencies = packageJson["devDependencies"] || {};
        return _.chain(arr)
            .map(function (obj) {
            try {
                return DependencyModel_1.default.forRawJson(obj, dependencies[obj["name"]] || devDependencies[obj["name"]]);
            }
            catch (e) {
                console.log(e);
                return null;
            }
        })
            .filter(function (dep) { return dep != null; })
            .value();
        // return _.map(arr, obj => DependencyModel.forRawJson(obj, dependencies[obj["name"]] || devDependencies[obj["name"]]));
    }
    var ProjectModel = (function (_super) {
        __extends(ProjectModel, _super);
        function ProjectModel(rawPackageJson, version, deps) {
            _super.call(this, {
                name: rawPackageJson["name"],
                version: version,
                dependencies: new DependencyCollection_1.default(deps)
            });
            this.rawPackageJson = rawPackageJson;
        }
        ProjectModel.submitNpmRequests = function (dependencies) {
            return _.chain(dependencies)
                .keys()
                .map(function (depName) { return NPM_URL + "/" + depName; })
                .map(function (url) { return $.getJSON(url); })
                .map(function (xhr) { return toPromise_1.default(xhr); })
                .value();
        };
        Object.defineProperty(ProjectModel.prototype, "name", {
            get: function () { return _super.prototype.get.call(this, "name"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProjectModel.prototype, "version", {
            get: function () { return _super.prototype.get.call(this, "version"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProjectModel.prototype, "dependencies", {
            get: function () { return _super.prototype.get.call(this, "dependencies"); },
            enumerable: true,
            configurable: true
        });
        ProjectModel.prototype.deepCopy = function (orig) {
            return JSON.parse(JSON.stringify(orig));
        };
        Object.defineProperty(ProjectModel.prototype, "packageJson", {
            get: function () {
                var rval = this.deepCopy(this.rawPackageJson);
                var deps = rval.dependencies;
                var devDeps = rval.devDependencies;
                this.dependencies.each(function (dep) {
                    if (_.has(deps, dep.name)) {
                        deps[dep.name] = dep.currentVersion.versionNumber.rawVersionString;
                    }
                    else if (_.has(devDeps, dep.name)) {
                        devDeps[dep.name] = dep.currentVersion.versionNumber.rawVersionString;
                    }
                });
                return rval;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProjectModel.prototype, "formattedPackageJson", {
            get: function () {
                return JSON.stringify(this.packageJson, null, 2);
            },
            enumerable: true,
            configurable: true
        });
        ProjectModel.prototype.getByName = function (depName) {
            return this.dependencies.findWhere({ name: depName });
        };
        ProjectModel.prototype.reset = function () {
            this.dependencies.each(function (dep) { return dep.reset(); });
        };
        ProjectModel.createForPackageJson = function (packageJson) {
            if (packageJson === void 0) { packageJson = {}; }
            var dependencies = packageJson["dependencies"] || {};
            var devDependencies = packageJson["devDependencies"] || {};
            _.chain(dependencies).keys().map(function (depName) { return NPM_URL + "/" + depName; }).map(function (url) { return $.getJSON(url); })
                .map(function (xhr) { return toPromise_1.default(xhr); });
            var npmObservables = new Array()
                .concat(ProjectModel.submitNpmRequests(dependencies))
                .concat(ProjectModel.submitNpmRequests(devDependencies));
            return PromiseCompletion_1.default.waitFor(npmObservables)
                .catch(function (errors) { return console.log(errors); })
                .then(function (arr) { return depJsonArr2DepArr(arr, packageJson); })
                .then(function (deps) {
                return new ProjectModel(packageJson, new VersionNumber_1.default(packageJson["version"]), deps);
            });
            // return Promise.all(npmObservables)
            //   .then<DependencyModel[]>(arr => {
            //     return _.map(arr, obj => DependencyModel.forRawJson(obj, dependencies[obj["name"]] || devDependencies[obj["name"]]));
            //   })
            //   .then(deps => {
            //     return new ProjectModel(packageJson, new VersionNumber(packageJson["version"]), deps);
            //   });
        };
        return ProjectModel;
    }(Backbone.Model));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ProjectModel;
});
//# sourceMappingURL=ProjectModel.js.map