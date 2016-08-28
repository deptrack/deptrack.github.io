var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "backbone", "./DependencyModel", "../collection/DependencyCollection", "./toPromise", "underscore", "./VersionNumber", "./PromiseCompletion", "promise"], function (require, exports, Backbone, DependencyModel_1, DependencyCollection_1, toPromise_1, _, VersionNumber_1, PromiseCompletion_1) {
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
    })(Backbone.Model);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ProjectModel;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vbW9kZWwvUHJvamVjdE1vZGVsLnRzIl0sIm5hbWVzIjpbImRlcEpzb25BcnIyRGVwQXJyIiwiUHJvamVjdE1vZGVsIiwiUHJvamVjdE1vZGVsLmNvbnN0cnVjdG9yIiwiUHJvamVjdE1vZGVsLnN1Ym1pdE5wbVJlcXVlc3RzIiwiUHJvamVjdE1vZGVsLm5hbWUiLCJQcm9qZWN0TW9kZWwudmVyc2lvbiIsIlByb2plY3RNb2RlbC5kZXBlbmRlbmNpZXMiLCJQcm9qZWN0TW9kZWwuZGVlcENvcHkiLCJQcm9qZWN0TW9kZWwucGFja2FnZUpzb24iLCJQcm9qZWN0TW9kZWwuZm9ybWF0dGVkUGFja2FnZUpzb24iLCJQcm9qZWN0TW9kZWwuZ2V0QnlOYW1lIiwiUHJvamVjdE1vZGVsLnJlc2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFXQSwyQkFBMkIsR0FBVSxFQUFFLFdBQWdCO1FBQ3JEQSxJQUFJQSxZQUFZQSxHQUFHQSxXQUFXQSxDQUFDQSxjQUFjQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtRQUNyREEsSUFBSUEsZUFBZUEsR0FBR0EsV0FBV0EsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtRQUMzREEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7YUFDZEEsR0FBR0EsQ0FBQ0EsVUFBQUEsR0FBR0E7WUFDTkEsSUFBSUEsQ0FBQ0E7Z0JBQ0hBLE1BQU1BLENBQUNBLHlCQUFlQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxFQUFFQSxZQUFZQSxDQUFDQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxlQUFlQSxDQUFDQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFBQTtZQUNuR0EsQ0FBRUE7WUFBQUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENB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Q3RDLDRIQUE0SDtZQUM1SCxPQUFPO1lBQ1Asb0JBQW9CO1lBQ3BCLDZGQUE2RjtZQUM3RixRQUFRO1FBQ1YsQ0FBQyxDQUFDQTtRQWlESkEsbUJBQUNBO0lBQURBLENBakZBLEFBaUZDQSxFQWpGeUMsUUFBUSxDQUFDLEtBQUssRUFpRnZEO0lBakZEO2tDQWlGQyxDQUFBIiwiZmlsZSI6Im1haW4vbW9kZWwvUHJvamVjdE1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwicHJvbWlzZVwiIC8+XG5pbXBvcnQgQmFja2JvbmUgPSByZXF1aXJlKFwiYmFja2JvbmVcIik7XG5pbXBvcnQgRGVwZW5kZW5jeU1vZGVsIGZyb20gXCIuL0RlcGVuZGVuY3lNb2RlbFwiO1xuaW1wb3J0IERlcGVuZGVuY3lDb2xsZWN0aW9uIGZyb20gXCIuLi9jb2xsZWN0aW9uL0RlcGVuZGVuY3lDb2xsZWN0aW9uXCI7XG5pbXBvcnQgdG9Qcm9taXNlIGZyb20gXCIuL3RvUHJvbWlzZVwiO1xuaW1wb3J0IF8gPSByZXF1aXJlKFwidW5kZXJzY29yZVwiKTtcbmltcG9ydCBWZXJzaW9uTnVtYmVyIGZyb20gXCIuL1ZlcnNpb25OdW1iZXJcIjtcbmltcG9ydCBQcm9taXNlQ29tcGxldGlvbiBmcm9tIFwiLi9Qcm9taXNlQ29tcGxldGlvblwiXG5cbmRlY2xhcmUgdmFyIE5QTV9VUkw6IHN0cmluZztcblxuZnVuY3Rpb24gZGVwSnNvbkFycjJEZXBBcnIoYXJyOiBhbnlbXSwgcGFja2FnZUpzb246IGFueSkge1xuICB2YXIgZGVwZW5kZW5jaWVzID0gcGFja2FnZUpzb25bXCJkZXBlbmRlbmNpZXNcIl0gfHwge307XG4gIHZhciBkZXZEZXBlbmRlbmNpZXMgPSBwYWNrYWdlSnNvbltcImRldkRlcGVuZGVuY2llc1wiXSB8fCB7fTtcbiAgcmV0dXJuIF8uY2hhaW4oYXJyKVxuICAgICAgLm1hcChvYmogPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBEZXBlbmRlbmN5TW9kZWwuZm9yUmF3SnNvbihvYmosIGRlcGVuZGVuY2llc1tvYmpbXCJuYW1lXCJdXSB8fCBkZXZEZXBlbmRlbmNpZXNbb2JqW1wibmFtZVwiXV0pXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoZGVwID0+IGRlcCAhPSBudWxsKVxuICAgICAgLnZhbHVlKCk7XG4gIC8vIHJldHVybiBfLm1hcChhcnIsIG9iaiA9PiBEZXBlbmRlbmN5TW9kZWwuZm9yUmF3SnNvbihvYmosIGRlcGVuZGVuY2llc1tvYmpbXCJuYW1lXCJdXSB8fCBkZXZEZXBlbmRlbmNpZXNbb2JqW1wibmFtZVwiXV0pKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdE1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWwge1xuXG4gIHByaXZhdGUgc3RhdGljIHN1Ym1pdE5wbVJlcXVlc3RzKGRlcGVuZGVuY2llczogYW55KTogUHJvbWlzZS5JVGhlbmFibGU8YW55PltdIHtcbiAgICByZXR1cm4gXy5jaGFpbihkZXBlbmRlbmNpZXMpXG4gICAgICAua2V5cygpXG4gICAgICAubWFwKGRlcE5hbWUgPT4gTlBNX1VSTCArIFwiL1wiICsgZGVwTmFtZSlcbiAgICAgIC5tYXAodXJsID0+ICQuZ2V0SlNPTih1cmwpKVxuICAgICAgLm1hcCh4aHIgPT4gdG9Qcm9taXNlKHhocikpXG4gICAgICAudmFsdWUoKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVGb3JQYWNrYWdlSnNvbiA9IGZ1bmN0aW9uKHBhY2thZ2VKc29uOiBhbnkgPSB7fSk6IFByb21pc2UuSVRoZW5hYmxlPFByb2plY3RNb2RlbD4ge1xuICAgIHZhciBkZXBlbmRlbmNpZXMgPSBwYWNrYWdlSnNvbltcImRlcGVuZGVuY2llc1wiXSB8fCB7fTtcbiAgICB2YXIgZGV2RGVwZW5kZW5jaWVzID0gcGFja2FnZUpzb25bXCJkZXZEZXBlbmRlbmNpZXNcIl0gfHwge307XG4gICAgXy5jaGFpbihkZXBlbmRlbmNpZXMpLmtleXMoKS5tYXAoZGVwTmFtZSA9PiBOUE1fVVJMICsgXCIvXCIgKyBkZXBOYW1lKS5tYXAodXJsID0+ICQuZ2V0SlNPTih1cmwpKVxuICAgICAgLm1hcCh4aHIgPT4gdG9Qcm9taXNlKHhocikpO1xuICAgIHZhciBucG1PYnNlcnZhYmxlcyA9IG5ldyBBcnJheTxQcm9taXNlLklUaGVuYWJsZTxhbnk+PigpXG4gICAgICAuY29uY2F0KFByb2plY3RNb2RlbC5zdWJtaXROcG1SZXF1ZXN0cyhkZXBlbmRlbmNpZXMpKVxuICAgICAgLmNvbmNhdChQcm9qZWN0TW9kZWwuc3VibWl0TnBtUmVxdWVzdHMoZGV2RGVwZW5kZW5jaWVzKSk7XG4gICAgcmV0dXJuIFByb21pc2VDb21wbGV0aW9uLndhaXRGb3IobnBtT2JzZXJ2YWJsZXMpXG4gICAgICAuY2F0Y2goZXJyb3JzID0+IGNvbnNvbGUubG9nKGVycm9ycykpXG4gICAgICAudGhlbihhcnIgPT4gZGVwSnNvbkFycjJEZXBBcnIoYXJyLCBwYWNrYWdlSnNvbikpXG4gICAgICAudGhlbihkZXBzID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9qZWN0TW9kZWwocGFja2FnZUpzb24sIG5ldyBWZXJzaW9uTnVtYmVyKHBhY2thZ2VKc29uW1widmVyc2lvblwiXSksIGRlcHMpO1xuICAgICAgfSk7XG4gICAgLy8gcmV0dXJuIFByb21pc2UuYWxsKG5wbU9ic2VydmFibGVzKVxuICAgIC8vICAgLnRoZW48RGVwZW5kZW5jeU1vZGVsW10+KGFyciA9PiB7XG4gICAgLy8gICAgIHJldHVybiBfLm1hcChhcnIsIG9iaiA9PiBEZXBlbmRlbmN5TW9kZWwuZm9yUmF3SnNvbihvYmosIGRlcGVuZGVuY2llc1tvYmpbXCJuYW1lXCJdXSB8fCBkZXZEZXBlbmRlbmNpZXNbb2JqW1wibmFtZVwiXV0pKTtcbiAgICAvLyAgIH0pXG4gICAgLy8gICAudGhlbihkZXBzID0+IHtcbiAgICAvLyAgICAgcmV0dXJuIG5ldyBQcm9qZWN0TW9kZWwocGFja2FnZUpzb24sIG5ldyBWZXJzaW9uTnVtYmVyKHBhY2thZ2VKc29uW1widmVyc2lvblwiXSksIGRlcHMpO1xuICAgIC8vICAgfSk7XG4gIH07XG5cblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHN1cGVyLmdldChcIm5hbWVcIik7IH1cblxuICBwdWJsaWMgZ2V0IHZlcnNpb24oKTogVmVyc2lvbk51bWJlciB7IHJldHVybiBzdXBlci5nZXQoXCJ2ZXJzaW9uXCIpOyB9XG5cbiAgcHVibGljIGdldCBkZXBlbmRlbmNpZXMoKTogQmFja2JvbmUuQ29sbGVjdGlvbjxEZXBlbmRlbmN5TW9kZWw+IHsgcmV0dXJuIHN1cGVyLmdldChcImRlcGVuZGVuY2llc1wiKTsgfVxuXG4gIHByaXZhdGUgZGVlcENvcHkob3JpZzogYW55KTogYW55IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvcmlnKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBhY2thZ2VKc29uKCk6IGFueSB7XG4gICAgdmFyIHJ2YWwgPSB0aGlzLmRlZXBDb3B5KHRoaXMucmF3UGFja2FnZUpzb24pO1xuICAgIGNvbnN0IGRlcHMgPSBydmFsLmRlcGVuZGVuY2llcztcbiAgICBjb25zdCBkZXZEZXBzID0gcnZhbC5kZXZEZXBlbmRlbmNpZXM7XG4gICAgdGhpcy5kZXBlbmRlbmNpZXMuZWFjaChkZXAgPT4ge1xuICAgICAgaWYgKF8uaGFzKGRlcHMsIGRlcC5uYW1lKSkge1xuICAgICAgICBkZXBzW2RlcC5uYW1lXSA9IGRlcC5jdXJyZW50VmVyc2lvbi52ZXJzaW9uTnVtYmVyLnJhd1ZlcnNpb25TdHJpbmc7XG4gICAgICB9IGVsc2UgaWYgKF8uaGFzKGRldkRlcHMsIGRlcC5uYW1lKSkge1xuICAgICAgICBkZXZEZXBzW2RlcC5uYW1lXSA9IGRlcC5jdXJyZW50VmVyc2lvbi52ZXJzaW9uTnVtYmVyLnJhd1ZlcnNpb25TdHJpbmc7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJ2YWw7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGZvcm1hdHRlZFBhY2thZ2VKc29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMucGFja2FnZUpzb24sIG51bGwsIDIpO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcmF3UGFja2FnZUpzb246IGFueSxcbiAgICB2ZXJzaW9uOiBWZXJzaW9uTnVtYmVyLFxuICAgIGRlcHM6IERlcGVuZGVuY3lNb2RlbFtdKSB7XG4gICAgc3VwZXIoe1xuICAgICAgbmFtZTogcmF3UGFja2FnZUpzb25bXCJuYW1lXCJdLFxuICAgICAgdmVyc2lvbjogdmVyc2lvbixcbiAgICAgIGRlcGVuZGVuY2llczogbmV3IERlcGVuZGVuY3lDb2xsZWN0aW9uKGRlcHMpXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QnlOYW1lKGRlcE5hbWU6IHN0cmluZyk6IERlcGVuZGVuY3lNb2RlbCB7XG4gICAgcmV0dXJuIHRoaXMuZGVwZW5kZW5jaWVzLmZpbmRXaGVyZSh7IG5hbWU6IGRlcE5hbWUgfSk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgdGhpcy5kZXBlbmRlbmNpZXMuZWFjaChkZXAgPT4gZGVwLnJlc2V0KCkpO1xuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
