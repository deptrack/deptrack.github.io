var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "backbone", "./DependencyModel", "../collection/DependencyCollection", "./toPromise", "underscore", "./VersionNumber", "./PromiseCompletion", "./ProgressIndicator", "promise"], function (require, exports, Backbone, DependencyModel_1, DependencyCollection_1, toPromise_1, _, VersionNumber_1, PromiseCompletion_1, ProgressIndicator_1) {
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
            var _this = this;
            _super.call(this, {
                name: rawPackageJson["name"],
                version: version,
                dependencies: new DependencyCollection_1.default(deps)
            });
            this.rawPackageJson = rawPackageJson;
            this.dirtyDepCount = 0;
            this.dependencies.each(function (dep) {
                dep.on("change:dirty", _this.onDepDirtyFlagChanges.bind(_this));
            });
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
        Object.defineProperty(ProjectModel.prototype, "dirty", {
            get: function () { return _super.prototype.get.call(this, "dirty") || false; },
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
        ProjectModel.prototype.onDepDirtyFlagChanges = function (dep) {
            if (dep.dirty) {
                ++this.dirtyDepCount;
            }
            else if (this.dirtyDepCount > 0) {
                --this.dirtyDepCount;
            }
            this.set("dirty", this.dirtyDepCount > 0);
        };
        ProjectModel.prototype.getByName = function (depName) {
            return this.dependencies.findWhere({ name: depName });
        };
        ProjectModel.prototype.reset = function () {
            this.dependencies.each(function (dep) { return dep.reset(); });
        };
        ProjectModel.createForPackageJson = function (packageJson, progress) {
            if (packageJson === void 0) { packageJson = {}; }
            if (progress === void 0) { progress = ProgressIndicator_1.NO_PROGRESS; }
            var dependencies = packageJson["dependencies"] || {};
            var devDependencies = packageJson["devDependencies"] || {};
            var npmObservables = new Array()
                .concat(ProjectModel.submitNpmRequests(dependencies))
                .concat(ProjectModel.submitNpmRequests(devDependencies));
            return PromiseCompletion_1.default.waitFor(npmObservables, progress)
                .catch(function (errors) { return console.log(errors); })
                .then(function (arr) { return depJsonArr2DepArr(arr, packageJson); })
                .then(function (deps) {
                return new ProjectModel(packageJson, new VersionNumber_1.default(packageJson["version"]), deps);
            });
        };
        return ProjectModel;
    })(Backbone.Model);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ProjectModel;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vbW9kZWwvUHJvamVjdE1vZGVsLnRzIl0sIm5hbWVzIjpbImRlcEpzb25BcnIyRGVwQXJyIiwiUHJvamVjdE1vZGVsIiwiUHJvamVjdE1vZGVsLmNvbnN0cnVjdG9yIiwiUHJvamVjdE1vZGVsLnN1Ym1pdE5wbVJlcXVlc3RzIiwiUHJvamVjdE1vZGVsLm5hbWUiLCJQcm9qZWN0TW9kZWwudmVyc2lvbiIsIlByb2plY3RNb2RlbC5kZXBlbmRlbmNpZXMiLCJQcm9qZWN0TW9kZWwuZGlydHkiLCJQcm9qZWN0TW9kZWwuZGVlcENvcHkiLCJQcm9qZWN0TW9kZWwucGFja2FnZUpzb24iLCJQcm9qZWN0TW9kZWwuZm9ybWF0dGVkUGFja2FnZUpzb24iLCJQcm9qZWN0TW9kZWwub25EZXBEaXJ0eUZsYWdDaGFuZ2VzIiwiUHJvamVjdE1vZGVsLmdldEJ5TmFtZSIsIlByb2plY3RNb2RlbC5yZXNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBWUEsMkJBQTJCLEdBQVUsRUFBRSxXQUFnQjtRQUNyREEsSUFBSUEsWUFBWUEsR0FBR0EsV0FBV0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7UUFDckRBLElBQUlBLGVBQWVBLEdBQUdBLFdBQVdBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7UUFDM0RBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBO2FBQ2RBLEdBQUdBLENBQUNBLFVBQUFBLEdBQUdBO1lBQ05BLElBQUlBLENBQUNBO2dCQUNIQSxNQUFNQSxDQUFDQSx5QkFBZUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsRUFBRUEsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsZUFBZUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7WUFDbkdBLENBQUVBO1lBQUFBLEtBQUtBLENBQUNBLENBQUNB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QztZQUMzRCxJQUFNLGNBQWMsR0FBRyxJQUFJLEtBQUssRUFBMEI7aUJBQ3ZELE1BQU0sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ3BELE1BQU0sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMzRCxNQUFNLENBQUMsMkJBQWlCLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUM7aUJBQ3ZELEtBQUssQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQW5CLENBQW1CLENBQUM7aUJBQ3BDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQztpQkFDaEQsSUFBSSxDQUFDLFVBQUEsSUFBSTtnQkFDUixNQUFNLENBQUMsSUFBSSxZQUFZLENBQUMsV0FBVyxFQUFFLElBQUksdUJBQWEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4RixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQ0E7UUFnRUpBLG1CQUFDQTtJQUFEQSxDQXhGQSxBQXdGQ0EsRUF4RnlDLFFBQVEsQ0FBQyxLQUFLLEVBd0Z2RDtJQXhGRDtrQ0F3RkMsQ0FBQSIsImZpbGUiOiJtYWluL21vZGVsL1Byb2plY3RNb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInByb21pc2VcIiAvPlxuaW1wb3J0IEJhY2tib25lID0gcmVxdWlyZShcImJhY2tib25lXCIpO1xuaW1wb3J0IERlcGVuZGVuY3lNb2RlbCBmcm9tIFwiLi9EZXBlbmRlbmN5TW9kZWxcIjtcbmltcG9ydCBEZXBlbmRlbmN5Q29sbGVjdGlvbiBmcm9tIFwiLi4vY29sbGVjdGlvbi9EZXBlbmRlbmN5Q29sbGVjdGlvblwiO1xuaW1wb3J0IHRvUHJvbWlzZSBmcm9tIFwiLi90b1Byb21pc2VcIjtcbmltcG9ydCBfID0gcmVxdWlyZShcInVuZGVyc2NvcmVcIik7XG5pbXBvcnQgVmVyc2lvbk51bWJlciBmcm9tIFwiLi9WZXJzaW9uTnVtYmVyXCI7XG5pbXBvcnQgUHJvbWlzZUNvbXBsZXRpb24gZnJvbSBcIi4vUHJvbWlzZUNvbXBsZXRpb25cIlxuaW1wb3J0IHtQcm9ncmVzc0luZGljYXRvciwgTk9fUFJPR1JFU1N9IGZyb20gXCIuL1Byb2dyZXNzSW5kaWNhdG9yXCI7XG5cbmRlY2xhcmUgdmFyIE5QTV9VUkw6IHN0cmluZztcblxuZnVuY3Rpb24gZGVwSnNvbkFycjJEZXBBcnIoYXJyOiBhbnlbXSwgcGFja2FnZUpzb246IGFueSkge1xuICB2YXIgZGVwZW5kZW5jaWVzID0gcGFja2FnZUpzb25bXCJkZXBlbmRlbmNpZXNcIl0gfHwge307XG4gIHZhciBkZXZEZXBlbmRlbmNpZXMgPSBwYWNrYWdlSnNvbltcImRldkRlcGVuZGVuY2llc1wiXSB8fCB7fTtcbiAgcmV0dXJuIF8uY2hhaW4oYXJyKVxuICAgICAgLm1hcChvYmogPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBEZXBlbmRlbmN5TW9kZWwuZm9yUmF3SnNvbihvYmosIGRlcGVuZGVuY2llc1tvYmpbXCJuYW1lXCJdXSB8fCBkZXZEZXBlbmRlbmNpZXNbb2JqW1wibmFtZVwiXV0pXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoZGVwID0+IGRlcCAhPSBudWxsKVxuICAgICAgLnZhbHVlKCk7XG4gIC8vIHJldHVybiBfLm1hcChhcnIsIG9iaiA9PiBEZXBlbmRlbmN5TW9kZWwuZm9yUmF3SnNvbihvYmosIGRlcGVuZGVuY2llc1tvYmpbXCJuYW1lXCJdXSB8fCBkZXZEZXBlbmRlbmNpZXNbb2JqW1wibmFtZVwiXV0pKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdE1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWwge1xuXG4gIHByaXZhdGUgc3RhdGljIHN1Ym1pdE5wbVJlcXVlc3RzKGRlcGVuZGVuY2llczogYW55KTogUHJvbWlzZS5JVGhlbmFibGU8YW55PltdIHtcbiAgICByZXR1cm4gXy5jaGFpbihkZXBlbmRlbmNpZXMpXG4gICAgICAua2V5cygpXG4gICAgICAubWFwKGRlcE5hbWUgPT4gTlBNX1VSTCArIFwiL1wiICsgZGVwTmFtZSlcbiAgICAgIC5tYXAodXJsID0+ICQuZ2V0SlNPTih1cmwpKVxuICAgICAgLm1hcCh4aHIgPT4gdG9Qcm9taXNlKHhocikpXG4gICAgICAudmFsdWUoKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVGb3JQYWNrYWdlSnNvbiA9IGZ1bmN0aW9uKHBhY2thZ2VKc29uOiBhbnkgPSB7fSxcbiAgICBwcm9ncmVzczogUHJvZ3Jlc3NJbmRpY2F0b3IgPSBOT19QUk9HUkVTUyk6IFByb21pc2UuSVRoZW5hYmxlPFByb2plY3RNb2RlbD4ge1xuICAgIHZhciBkZXBlbmRlbmNpZXMgPSBwYWNrYWdlSnNvbltcImRlcGVuZGVuY2llc1wiXSB8fCB7fTtcbiAgICB2YXIgZGV2RGVwZW5kZW5jaWVzID0gcGFja2FnZUpzb25bXCJkZXZEZXBlbmRlbmNpZXNcIl0gfHwge307XG4gICAgY29uc3QgbnBtT2JzZXJ2YWJsZXMgPSBuZXcgQXJyYXk8UHJvbWlzZS5JVGhlbmFibGU8YW55Pj4oKVxuICAgICAgLmNvbmNhdChQcm9qZWN0TW9kZWwuc3VibWl0TnBtUmVxdWVzdHMoZGVwZW5kZW5jaWVzKSlcbiAgICAgIC5jb25jYXQoUHJvamVjdE1vZGVsLnN1Ym1pdE5wbVJlcXVlc3RzKGRldkRlcGVuZGVuY2llcykpO1xuICAgIHJldHVybiBQcm9taXNlQ29tcGxldGlvbi53YWl0Rm9yKG5wbU9ic2VydmFibGVzLCBwcm9ncmVzcylcbiAgICAgIC5jYXRjaChlcnJvcnMgPT4gY29uc29sZS5sb2coZXJyb3JzKSlcbiAgICAgIC50aGVuKGFyciA9PiBkZXBKc29uQXJyMkRlcEFycihhcnIsIHBhY2thZ2VKc29uKSlcbiAgICAgIC50aGVuKGRlcHMgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb2plY3RNb2RlbChwYWNrYWdlSnNvbiwgbmV3IFZlcnNpb25OdW1iZXIocGFja2FnZUpzb25bXCJ2ZXJzaW9uXCJdKSwgZGVwcyk7XG4gICAgICB9KTtcbiAgfTtcblxuICBwcml2YXRlIGRpcnR5RGVwQ291bnQ6IG51bWJlciA9IDA7XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7IHJldHVybiBzdXBlci5nZXQoXCJuYW1lXCIpOyB9XG5cbiAgcHVibGljIGdldCB2ZXJzaW9uKCk6IFZlcnNpb25OdW1iZXIgeyByZXR1cm4gc3VwZXIuZ2V0KFwidmVyc2lvblwiKTsgfVxuXG4gIHB1YmxpYyBnZXQgZGVwZW5kZW5jaWVzKCk6IEJhY2tib25lLkNvbGxlY3Rpb248RGVwZW5kZW5jeU1vZGVsPiB7IHJldHVybiBzdXBlci5nZXQoXCJkZXBlbmRlbmNpZXNcIik7IH1cblxuICBwdWJsaWMgZ2V0IGRpcnR5KCk6IGJvb2xlYW4geyByZXR1cm4gc3VwZXIuZ2V0KFwiZGlydHlcIikgfHwgZmFsc2U7IH1cblxuICBwcml2YXRlIGRlZXBDb3B5KG9yaWc6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob3JpZykpO1xuICB9XG5cbiAgcHVibGljIGdldCBwYWNrYWdlSnNvbigpOiBhbnkge1xuICAgIHZhciBydmFsID0gdGhpcy5kZWVwQ29weSh0aGlzLnJhd1BhY2thZ2VKc29uKTtcbiAgICBjb25zdCBkZXBzID0gcnZhbC5kZXBlbmRlbmNpZXM7XG4gICAgY29uc3QgZGV2RGVwcyA9IHJ2YWwuZGV2RGVwZW5kZW5jaWVzO1xuICAgIHRoaXMuZGVwZW5kZW5jaWVzLmVhY2goZGVwID0+IHtcbiAgICAgIGlmIChfLmhhcyhkZXBzLCBkZXAubmFtZSkpIHtcbiAgICAgICAgZGVwc1tkZXAubmFtZV0gPSBkZXAuY3VycmVudFZlcnNpb24udmVyc2lvbk51bWJlci5yYXdWZXJzaW9uU3RyaW5nO1xuICAgICAgfSBlbHNlIGlmIChfLmhhcyhkZXZEZXBzLCBkZXAubmFtZSkpIHtcbiAgICAgICAgZGV2RGVwc1tkZXAubmFtZV0gPSBkZXAuY3VycmVudFZlcnNpb24udmVyc2lvbk51bWJlci5yYXdWZXJzaW9uU3RyaW5nO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBydmFsO1xuICB9XG5cbiAgcHVibGljIGdldCBmb3JtYXR0ZWRQYWNrYWdlSnNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnBhY2thZ2VKc29uLCBudWxsLCAyKTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJhd1BhY2thZ2VKc29uOiBhbnksXG4gICAgdmVyc2lvbjogVmVyc2lvbk51bWJlcixcbiAgICBkZXBzOiBEZXBlbmRlbmN5TW9kZWxbXSkge1xuICAgIHN1cGVyKHtcbiAgICAgIG5hbWU6IHJhd1BhY2thZ2VKc29uW1wibmFtZVwiXSxcbiAgICAgIHZlcnNpb246IHZlcnNpb24sXG4gICAgICBkZXBlbmRlbmNpZXM6IG5ldyBEZXBlbmRlbmN5Q29sbGVjdGlvbihkZXBzKVxuICAgIH0pO1xuICAgIHRoaXMuZGVwZW5kZW5jaWVzLmVhY2goZGVwID0+IHtcbiAgICAgIGRlcC5vbihcImNoYW5nZTpkaXJ0eVwiLCB0aGlzLm9uRGVwRGlydHlGbGFnQ2hhbmdlcy5iaW5kKHRoaXMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25EZXBEaXJ0eUZsYWdDaGFuZ2VzKGRlcDogRGVwZW5kZW5jeU1vZGVsKSB7XG4gICAgaWYgKGRlcC5kaXJ0eSkge1xuICAgICAgKyt0aGlzLmRpcnR5RGVwQ291bnQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRpcnR5RGVwQ291bnQgPiAwKSB7XG4gICAgICAtLXRoaXMuZGlydHlEZXBDb3VudDtcbiAgICB9XG4gICAgdGhpcy5zZXQoXCJkaXJ0eVwiLCB0aGlzLmRpcnR5RGVwQ291bnQgPiAwKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRCeU5hbWUoZGVwTmFtZTogc3RyaW5nKTogRGVwZW5kZW5jeU1vZGVsIHtcbiAgICByZXR1cm4gdGhpcy5kZXBlbmRlbmNpZXMuZmluZFdoZXJlKHsgbmFtZTogZGVwTmFtZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpIHtcbiAgICB0aGlzLmRlcGVuZGVuY2llcy5lYWNoKGRlcCA9PiBkZXAucmVzZXQoKSk7XG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
