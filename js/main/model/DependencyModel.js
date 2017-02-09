var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "backbone", "semver", "./VersionNumber", "./DependencyVersionModel", "./DisplayedVersionNumber"], function (require, exports, Backbone, semver, VersionNumber_1, DependencyVersionModel_1, DisplayedVersionNumber_1) {
    function selectCurrentVersion(versionSpec, versions) {
        var versionsByNo = _.indexBy(versions, "versionString");
        if (versionsByNo[versionSpec]) {
            return versionsByNo[versionSpec];
        }
        if (semver.validRange(versionSpec) != null) {
            var range = new semver.Range(versionSpec, true);
            for (var i in versions) {
                var candidate = versions[i];
                if (candidate.versionNumber.isSemVer()
                    && range.test(new semver.SemVer(candidate.versionNumber.rawVersionString))) {
                    return candidate;
                }
            }
        }
        throw "could not find version [" + versionSpec + "]";
    }
    var DependencyModel = (function (_super) {
        __extends(DependencyModel, _super);
        function DependencyModel(name, currentVersion, versions, gitUrl) {
            if (gitUrl === void 0) { gitUrl = ""; }
            _super.call(this, {
                name: name,
                currentVersion: currentVersion,
                versions: versions
            });
            this.gitUrl = gitUrl;
            this.urlRoot = NPM_URL;
            this.idAttribute = "name";
            this.originalVersion = currentVersion;
        }
        Object.defineProperty(DependencyModel.prototype, "name", {
            get: function () { return this.get("name"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DependencyModel.prototype, "currentVersion", {
            get: function () { return this.get("currentVersion"); },
            set: function (version) { this.set("currentVersion", version); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DependencyModel.prototype, "versions", {
            get: function () { return this.get("versions"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DependencyModel.prototype, "dirty", {
            get: function () { return this.get("dirty") || false; },
            enumerable: true,
            configurable: true
        });
        DependencyModel.prototype.setCurrentVersion = function (versionNumber) {
            var newVersion = _.chain(this.versions).find(function (version) { return version.versionNumber.rawVersionString === versionNumber; }).value();
            if (newVersion === undefined) {
                throw new Error("version " + versionNumber + " does not exist");
            }
            _paq.push(['trackEvent', 'User', 'UpdateDep']);
            this.set({
                currentVersion: newVersion,
                dirty: newVersion !== this.originalVersion
            });
        };
        DependencyModel.prototype.reset = function () {
            this.setCurrentVersion(this.originalVersion.versionString);
        };
        DependencyModel.prototype.isAllSemVer = function () {
            return !_.some(this.versions, function (version) { return !version.versionNumber.isSemVer(); });
        };
        Object.defineProperty(DependencyModel.prototype, "suggestedVersions", {
            get: function () {
                if (!this.isAllSemVer()) {
                    return _.map(this.versions, function (version) { return version.versionNumber; })
                        .sort()
                        .reverse()
                        .map(function (versionNumber) { return new DisplayedVersionNumber_1.default(versionNumber.rawVersionString, versionNumber); });
                }
                else {
                    var latest = null;
                    var nextMinor = null;
                    var nextPatch = null;
                    for (var idx = 0; idx < this.versions.length; ++idx) {
                        var version = this.versions[idx].versionNumber;
                        if (latest == null || VersionNumber_1.default.compare(latest, version) < 0) {
                            latest = version;
                        }
                        if (version.major() === this.originalVersion.versionNumber.major()) {
                            if (nextMinor === null || VersionNumber_1.default.compare(nextMinor, version) < 0) {
                                nextMinor = version;
                            }
                            if (version.minor() === this.originalVersion.versionNumber.minor()) {
                                if (nextPatch === null || VersionNumber_1.default.compare(nextPatch, version) < 0) {
                                    nextPatch = version;
                                }
                            }
                        }
                    }
                    var rval = new Array();
                    if (latest != null && !VersionNumber_1.default.equal(latest, this.originalVersion.versionNumber)) {
                        rval.push(new DisplayedVersionNumber_1.default("Latest (" + latest.rawVersionString + ")", latest));
                    }
                    if (nextMinor != null && !VersionNumber_1.default.equal(nextMinor, this.originalVersion.versionNumber)) {
                        var displayed = new DisplayedVersionNumber_1.default("Latest " + nextMinor.major() + ".x (" + nextMinor.rawVersionString + ")", nextMinor);
                        rval.push(displayed);
                    }
                    if (nextPatch != null && !VersionNumber_1.default.equal(nextPatch, this.originalVersion.versionNumber)) {
                        var displayed = new DisplayedVersionNumber_1.default("Latest " + nextPatch.major()
                            + "."
                            + nextPatch.minor()
                            + ".x ("
                            + nextPatch.rawVersionString + ")", nextPatch);
                        rval.push(displayed);
                    }
                    var toBeDeleted = 0;
                    for (var idx = 0; idx < rval.length - 1; ++idx) {
                        var curr = rval[idx], next = rval[idx + 1];
                        if (VersionNumber_1.default.equal(curr.versionNumber, next.versionNumber)) {
                            toBeDeleted++;
                        }
                    }
                    for (var i = 0; i < toBeDeleted; ++i) {
                        rval.shift();
                    }
                    return rval;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DependencyModel.prototype, "isObsolete", {
            get: function () {
                return this.suggestedVersions.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DependencyModel.prototype, "githubId", {
            get: function () {
                for (var idx = this.versions.length - 1; idx >= 0; --idx) {
                    if (this.versions[idx].githubId) {
                        return this.versions[idx].githubId;
                    }
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DependencyModel.prototype, "githubEventsUrl", {
            get: function () {
                var githubId = this.githubId;
                if (githubId == null) {
                    return null;
                }
                return GITHUB_URL + "/repos/" + githubId.authorId + "/" + githubId.projectId + "/events";
            },
            enumerable: true,
            configurable: true
        });
        DependencyModel.prefixesToBeTrimmed = [
            ">=",
            "<=",
            "<",
            ">",
            "~",
            "^"
        ];
        DependencyModel.forRawJson = function (json, currentVersion) {
            if (json === void 0) { json = {}; }
            DependencyModel.prefixesToBeTrimmed.forEach(function (prefix) {
                if (currentVersion.indexOf(prefix) === 0) {
                    currentVersion = currentVersion.substring(prefix.length);
                }
            });
            // let currVersion = DependencyVersionModel.forNpmJson(json["versions"][currentVersion], currentVersion);
            var versions = new Array();
            for (var versionNo in json["versions"]) {
                versions.push(DependencyVersionModel_1.default.forNpmJson(json["versions"][versionNo], versionNo));
            }
            var currVersion = selectCurrentVersion(currentVersion, versions);
            return new DependencyModel(json.name, currVersion, versions, json.repository.url);
        };
        return DependencyModel;
    })(Backbone.Model);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = DependencyModel;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vbW9kZWwvRGVwZW5kZW5jeU1vZGVsLnRzIl0sIm5hbWVzIjpbInNlbGVjdEN1cnJlbnRWZXJzaW9uIiwiRGVwZW5kZW5jeU1vZGVsIiwiRGVwZW5kZW5jeU1vZGVsLmNvbnN0cnVjdG9yIiwiRGVwZW5kZW5jeU1vZGVsLm5hbWUiLCJEZXBlbmRlbmN5TW9kZWwuY3VycmVudFZlcnNpb24iLCJEZXBlbmRlbmN5TW9kZWwudmVyc2lvbnMiLCJEZXBlbmRlbmN5TW9kZWwuZGlydHkiLCJEZXBlbmRlbmN5TW9kZWwuc2V0Q3VycmVudFZlcnNpb24iLCJEZXBlbmRlbmN5TW9kZWwucmVzZXQiLCJEZXBlbmRlbmN5TW9kZWwuaXNBbGxTZW1WZXIiLCJEZXBlbmRlbmN5TW9kZWwuc3VnZ2VzdGVkVmVyc2lvbnMiLCJEZXBlbmRlbmN5TW9kZWwuaXNPYnNvbGV0ZSIsIkRlcGVuZGVuY3lNb2RlbC5naXRodWJJZCIsIkRlcGVuZGVuY3lNb2RlbC5naXRodWJFdmVudHNVcmwiXSwibWFwcGluZ3MiOiI7Ozs7OztJQWNBLDhCQUE4QixXQUFtQixFQUNuQixRQUFrQztRQUM5REEsSUFBTUEsWUFBWUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsUUFBUUEsRUFBRUEsZUFBZUEsQ0FBQ0EsQ0FBQ0E7UUFDMURBLEVBQUVBLENBQUNBLENBQUNBLFlBQVlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzlCQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtRQUNuQ0EsQ0FBQ0E7UUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDM0NBLElBQU1BLEtBQUtBLEdBQUdBLElBQUlBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLFdBQVdBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1lBQ2xEQSxH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SUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEYsQ0FBQyxDQUFBQTtRQTRISEEsc0JBQUNBO0lBQURBLENBcEpBLEFBb0pDQSxFQXBKNEMsUUFBUSxDQUFDLEtBQUssRUFvSjFEO0lBcEpEO3FDQW9KQyxDQUFBIiwiZmlsZSI6Im1haW4vbW9kZWwvRGVwZW5kZW5jeU1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lID0gcmVxdWlyZShcImJhY2tib25lXCIpO1xuaW1wb3J0IHNlbXZlciA9IHJlcXVpcmUoXCJzZW12ZXJcIik7XG5pbXBvcnQgVmVyc2lvbk51bWJlciBmcm9tIFwiLi9WZXJzaW9uTnVtYmVyXCI7XG5pbXBvcnQgRGVwZW5kZW5jeVZlcnNpb25Nb2RlbCBmcm9tIFwiLi9EZXBlbmRlbmN5VmVyc2lvbk1vZGVsXCI7XG5pbXBvcnQgRGlzcGxheWVkVmVyc2lvbk51bWJlciBmcm9tIFwiLi9EaXNwbGF5ZWRWZXJzaW9uTnVtYmVyXCI7XG5pbXBvcnQgR2l0aHViSWQgZnJvbSBcIi4vR2l0aHViSWRcIjtcblxuXG5kZWNsYXJlIHZhciBOUE1fVVJMOiBzdHJpbmc7XG5cbmRlY2xhcmUgdmFyIEdJVEhVQl9VUkw6IHN0cmluZztcblxuZGVjbGFyZSB2YXIgX3BhcTogYW55W107XG5cbmZ1bmN0aW9uIHNlbGVjdEN1cnJlbnRWZXJzaW9uKHZlcnNpb25TcGVjOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uczogRGVwZW5kZW5jeVZlcnNpb25Nb2RlbFtdKTogRGVwZW5kZW5jeVZlcnNpb25Nb2RlbCB7XG4gIGNvbnN0IHZlcnNpb25zQnlObyA9IF8uaW5kZXhCeSh2ZXJzaW9ucywgXCJ2ZXJzaW9uU3RyaW5nXCIpO1xuICBpZiAodmVyc2lvbnNCeU5vW3ZlcnNpb25TcGVjXSkge1xuICAgIHJldHVybiB2ZXJzaW9uc0J5Tm9bdmVyc2lvblNwZWNdO1xuICB9XG4gIGlmIChzZW12ZXIudmFsaWRSYW5nZSh2ZXJzaW9uU3BlYykgIT0gbnVsbCkge1xuICAgIGNvbnN0IHJhbmdlID0gbmV3IHNlbXZlci5SYW5nZSh2ZXJzaW9uU3BlYywgdHJ1ZSk7XG4gICAgZm9yICh2YXIgaSBpbiB2ZXJzaW9ucykge1xuICAgICAgdmFyIGNhbmRpZGF0ZSA9IHZlcnNpb25zW2ldO1xuICAgICAgaWYgKGNhbmRpZGF0ZS52ZXJzaW9uTnVtYmVyLmlzU2VtVmVyKClcbiAgICAgICAgICAmJiByYW5nZS50ZXN0KG5ldyBzZW12ZXIuU2VtVmVyKGNhbmRpZGF0ZS52ZXJzaW9uTnVtYmVyLnJhd1ZlcnNpb25TdHJpbmcpKSkge1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICB0aHJvdyBcImNvdWxkIG5vdCBmaW5kIHZlcnNpb24gW1wiICsgdmVyc2lvblNwZWMgKyBcIl1cIjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVwZW5kZW5jeU1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWwge1xuXG4gIHN0YXRpYyBwcmVmaXhlc1RvQmVUcmltbWVkID0gW1xuICAgIFwiPj1cIixcbiAgICBcIjw9XCIsXG4gICAgXCI8XCIsXG4gICAgXCI+XCIsXG4gICAgXCJ+XCIsXG4gICAgXCJeXCJcbiAgXTtcblxuICBzdGF0aWMgZm9yUmF3SnNvbiA9IGZ1bmN0aW9uKGpzb246IGFueSA9IHt9LCBjdXJyZW50VmVyc2lvbjogc3RyaW5nKTogRGVwZW5kZW5jeU1vZGVsIHtcbiAgICBEZXBlbmRlbmN5TW9kZWwucHJlZml4ZXNUb0JlVHJpbW1lZC5mb3JFYWNoKHByZWZpeCA9PiB7XG4gICAgICBpZiAoY3VycmVudFZlcnNpb24uaW5kZXhPZihwcmVmaXgpID09PSAwKSB7XG4gICAgICAgIGN1cnJlbnRWZXJzaW9uID0gY3VycmVudFZlcnNpb24uc3Vic3RyaW5nKHByZWZpeC5sZW5ndGgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGxldCBjdXJyVmVyc2lvbiA9IERlcGVuZGVuY3lWZXJzaW9uTW9kZWwuZm9yTnBtSnNvbihqc29uW1widmVyc2lvbnNcIl1bY3VycmVudFZlcnNpb25dLCBjdXJyZW50VmVyc2lvbik7XG4gICAgdmFyIHZlcnNpb25zID0gbmV3IEFycmF5PERlcGVuZGVuY3lWZXJzaW9uTW9kZWw+KCk7XG4gICAgZm9yICh2YXIgdmVyc2lvbk5vIGluIGpzb25bXCJ2ZXJzaW9uc1wiXSkge1xuICAgICAgdmVyc2lvbnMucHVzaChEZXBlbmRlbmN5VmVyc2lvbk1vZGVsLmZvck5wbUpzb24oanNvbltcInZlcnNpb25zXCJdW3ZlcnNpb25Ob10sIHZlcnNpb25ObykpO1xuICAgIH1cbiAgICBjb25zdCBjdXJyVmVyc2lvbiA9IHNlbGVjdEN1cnJlbnRWZXJzaW9uKGN1cnJlbnRWZXJzaW9uLCB2ZXJzaW9ucyk7XG4gICAgcmV0dXJuIG5ldyBEZXBlbmRlbmN5TW9kZWwoanNvbi5uYW1lLCBjdXJyVmVyc2lvbiwgdmVyc2lvbnMsIGpzb24ucmVwb3NpdG9yeS51cmwpO1xuICB9XG5cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuZ2V0KFwibmFtZVwiKTsgfVxuXG4gIGdldCBjdXJyZW50VmVyc2lvbigpOiBEZXBlbmRlbmN5VmVyc2lvbk1vZGVsIHsgcmV0dXJuIHRoaXMuZ2V0KFwiY3VycmVudFZlcnNpb25cIik7IH1cblxuICBzZXQgY3VycmVudFZlcnNpb24odmVyc2lvbjogRGVwZW5kZW5jeVZlcnNpb25Nb2RlbCkgeyB0aGlzLnNldChcImN1cnJlbnRWZXJzaW9uXCIsIHZlcnNpb24pOyB9XG5cbiAgZ2V0IHZlcnNpb25zKCk6IERlcGVuZGVuY3lWZXJzaW9uTW9kZWxbXSB7IHJldHVybiB0aGlzLmdldChcInZlcnNpb25zXCIpOyB9XG5cbiAgZ2V0IGRpcnR5KCkgOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuZ2V0KFwiZGlydHlcIikgfHwgZmFsc2U7IH1cblxuICBwdWJsaWMgdXJsUm9vdDogc3RyaW5nID0gTlBNX1VSTDtcblxuICBwdWJsaWMgaWRBdHRyaWJ1dGU6IHN0cmluZyA9IFwibmFtZVwiO1xuXG4gIHB1YmxpYyBvcmlnaW5hbFZlcnNpb246IERlcGVuZGVuY3lWZXJzaW9uTW9kZWw7XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBjdXJyZW50VmVyc2lvbjogRGVwZW5kZW5jeVZlcnNpb25Nb2RlbCwgdmVyc2lvbnM6IERlcGVuZGVuY3lWZXJzaW9uTW9kZWxbXSxcbiAgICAgICAgICAgICAgcHVibGljIGdpdFVybDogc3RyaW5nID0gXCJcIikge1xuICAgIHN1cGVyKHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBjdXJyZW50VmVyc2lvbjogY3VycmVudFZlcnNpb24sXG4gICAgICB2ZXJzaW9uczogdmVyc2lvbnNcbiAgICB9KTtcbiAgICB0aGlzLm9yaWdpbmFsVmVyc2lvbiA9IGN1cnJlbnRWZXJzaW9uO1xuICB9XG5cbiAgcHVibGljIHNldEN1cnJlbnRWZXJzaW9uKHZlcnNpb25OdW1iZXI6IHN0cmluZykge1xuICAgIHZhciBuZXdWZXJzaW9uID0gXy5jaGFpbih0aGlzLnZlcnNpb25zKS5maW5kKHZlcnNpb24gPT4gdmVyc2lvbi52ZXJzaW9uTnVtYmVyLnJhd1ZlcnNpb25TdHJpbmcgPT09IHZlcnNpb25OdW1iZXIpLnZhbHVlKCk7XG4gICAgaWYgKG5ld1ZlcnNpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwidmVyc2lvbiBcIiArIHZlcnNpb25OdW1iZXIgKyBcIiBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICB9XG4gICAgX3BhcS5wdXNoKFsndHJhY2tFdmVudCcsICdVc2VyJywgJ1VwZGF0ZURlcCddKTtcbiAgICB0aGlzLnNldCh7XG4gICAgICBjdXJyZW50VmVyc2lvbjogbmV3VmVyc2lvbixcbiAgICAgIGRpcnR5OiBuZXdWZXJzaW9uICE9PSB0aGlzLm9yaWdpbmFsVmVyc2lvblxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCkge1xuICAgIHRoaXMuc2V0Q3VycmVudFZlcnNpb24odGhpcy5vcmlnaW5hbFZlcnNpb24udmVyc2lvblN0cmluZyk7XG4gIH1cblxuICBwdWJsaWMgaXNBbGxTZW1WZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFfLnNvbWUodGhpcy52ZXJzaW9ucywgdmVyc2lvbiA9PiAhdmVyc2lvbi52ZXJzaW9uTnVtYmVyLmlzU2VtVmVyKCkpO1xuICB9XG5cbiAgZ2V0IHN1Z2dlc3RlZFZlcnNpb25zKCk6IERpc3BsYXllZFZlcnNpb25OdW1iZXJbXSB7XG4gICAgaWYgKCF0aGlzLmlzQWxsU2VtVmVyKCkpIHtcbiAgICAgIHJldHVybiBfLm1hcCh0aGlzLnZlcnNpb25zLCB2ZXJzaW9uID0+IHZlcnNpb24udmVyc2lvbk51bWJlcilcbiAgICAgICAgLnNvcnQoKVxuICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgIC5tYXAodmVyc2lvbk51bWJlciA9PiBuZXcgRGlzcGxheWVkVmVyc2lvbk51bWJlcih2ZXJzaW9uTnVtYmVyLnJhd1ZlcnNpb25TdHJpbmcsIHZlcnNpb25OdW1iZXIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGxhdGVzdDogVmVyc2lvbk51bWJlciA9IG51bGw7XG4gICAgICB2YXIgbmV4dE1pbm9yOiBWZXJzaW9uTnVtYmVyID0gbnVsbDtcbiAgICAgIHZhciBuZXh0UGF0Y2g6IFZlcnNpb25OdW1iZXIgPSBudWxsO1xuICAgICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy52ZXJzaW9ucy5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gdGhpcy52ZXJzaW9uc1tpZHhdLnZlcnNpb25OdW1iZXI7XG4gICAgICAgIGlmIChsYXRlc3QgPT0gbnVsbCB8fCBWZXJzaW9uTnVtYmVyLmNvbXBhcmUobGF0ZXN0LCB2ZXJzaW9uKSA8IDApIHtcbiAgICAgICAgICBsYXRlc3QgPSB2ZXJzaW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2ZXJzaW9uLm1ham9yKCkgPT09IHRoaXMub3JpZ2luYWxWZXJzaW9uLnZlcnNpb25OdW1iZXIubWFqb3IoKSkge1xuICAgICAgICAgIGlmIChuZXh0TWlub3IgPT09IG51bGwgfHwgVmVyc2lvbk51bWJlci5jb21wYXJlKG5leHRNaW5vciwgdmVyc2lvbikgPCAwKSB7XG4gICAgICAgICAgICBuZXh0TWlub3IgPSB2ZXJzaW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodmVyc2lvbi5taW5vcigpID09PSB0aGlzLm9yaWdpbmFsVmVyc2lvbi52ZXJzaW9uTnVtYmVyLm1pbm9yKCkpIHtcbiAgICAgICAgICAgIGlmIChuZXh0UGF0Y2ggPT09IG51bGwgfHwgVmVyc2lvbk51bWJlci5jb21wYXJlKG5leHRQYXRjaCwgdmVyc2lvbikgPCAwKSB7XG4gICAgICAgICAgICAgIG5leHRQYXRjaCA9IHZlcnNpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgcnZhbCA9IG5ldyBBcnJheTxEaXNwbGF5ZWRWZXJzaW9uTnVtYmVyPigpO1xuICAgICAgaWYgKGxhdGVzdCAhPSBudWxsICYmICFWZXJzaW9uTnVtYmVyLmVxdWFsKGxhdGVzdCwgdGhpcy5vcmlnaW5hbFZlcnNpb24udmVyc2lvbk51bWJlcikpIHtcbiAgICAgICAgcnZhbC5wdXNoKG5ldyBEaXNwbGF5ZWRWZXJzaW9uTnVtYmVyKFwiTGF0ZXN0IChcIiArIGxhdGVzdC5yYXdWZXJzaW9uU3RyaW5nICsgXCIpXCIsIGxhdGVzdCkpO1xuICAgICAgfVxuICAgICAgaWYgKG5leHRNaW5vciAhPSBudWxsICYmICFWZXJzaW9uTnVtYmVyLmVxdWFsKG5leHRNaW5vciwgdGhpcy5vcmlnaW5hbFZlcnNpb24udmVyc2lvbk51bWJlcikpIHtcbiAgICAgICAgdmFyIGRpc3BsYXllZCA9IG5ldyBEaXNwbGF5ZWRWZXJzaW9uTnVtYmVyKFwiTGF0ZXN0IFwiICsgbmV4dE1pbm9yLm1ham9yKCkgKyBcIi54IChcIiArIG5leHRNaW5vci5yYXdWZXJzaW9uU3RyaW5nICsgXCIpXCIsIG5leHRNaW5vcik7XG4gICAgICAgIHJ2YWwucHVzaChkaXNwbGF5ZWQpO1xuICAgICAgfVxuICAgICAgaWYgKG5leHRQYXRjaCAhPSBudWxsICYmICFWZXJzaW9uTnVtYmVyLmVxdWFsKG5leHRQYXRjaCwgdGhpcy5vcmlnaW5hbFZlcnNpb24udmVyc2lvbk51bWJlcikpIHtcbiAgICAgICAgdmFyIGRpc3BsYXllZCA9IG5ldyBEaXNwbGF5ZWRWZXJzaW9uTnVtYmVyKFwiTGF0ZXN0IFwiICsgbmV4dFBhdGNoLm1ham9yKClcbiAgICAgICAgICArIFwiLlwiXG4gICAgICAgICAgKyBuZXh0UGF0Y2gubWlub3IoKVxuICAgICAgICAgICsgXCIueCAoXCJcbiAgICAgICAgICArIG5leHRQYXRjaC5yYXdWZXJzaW9uU3RyaW5nICsgXCIpXCIsIG5leHRQYXRjaCk7XG4gICAgICAgIHJ2YWwucHVzaChkaXNwbGF5ZWQpO1xuICAgICAgfVxuICAgICAgdmFyIHRvQmVEZWxldGVkID0gMDtcbiAgICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHJ2YWwubGVuZ3RoIC0gMTsgKytpZHgpIHtcbiAgICAgICAgdmFyIGN1cnIgPSBydmFsW2lkeF0sIG5leHQgPSBydmFsW2lkeCArIDFdO1xuICAgICAgICBpZiAoVmVyc2lvbk51bWJlci5lcXVhbChjdXJyLnZlcnNpb25OdW1iZXIsIG5leHQudmVyc2lvbk51bWJlcikpIHtcbiAgICAgICAgICB0b0JlRGVsZXRlZCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvQmVEZWxldGVkOyArK2kpIHtcbiAgICAgICAgcnZhbC5zaGlmdCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJ2YWw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzT2Jzb2xldGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3VnZ2VzdGVkVmVyc2lvbnMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldCBnaXRodWJJZCgpOiBHaXRodWJJZCB7XG4gICAgZm9yICh2YXIgaWR4ID0gdGhpcy52ZXJzaW9ucy5sZW5ndGggLSAxOyBpZHggPj0gMDsgLS1pZHgpIHtcbiAgICAgIGlmICh0aGlzLnZlcnNpb25zW2lkeF0uZ2l0aHViSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVyc2lvbnNbaWR4XS5naXRodWJJZDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXQgZ2l0aHViRXZlbnRzVXJsKCk6IHN0cmluZyB7XG4gICAgY29uc3QgZ2l0aHViSWQgPSB0aGlzLmdpdGh1YklkO1xuICAgIGlmIChnaXRodWJJZCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIEdJVEhVQl9VUkwgKyBcIi9yZXBvcy9cIiArIGdpdGh1YklkLmF1dGhvcklkICsgXCIvXCIgKyBnaXRodWJJZC5wcm9qZWN0SWQgKyBcIi9ldmVudHNcIjtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
