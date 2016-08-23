var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "backbone", "./VersionNumber", "./GithubId"], function (require, exports, Backbone, VersionNumber_1, GithubId_1) {
    var DependencyVersionModel = (function (_super) {
        __extends(DependencyVersionModel, _super);
        function DependencyVersionModel(versionNumber, githubId) {
            _super.call(this, {
                versionNumber: versionNumber,
                githubId: githubId
            });
        }
        Object.defineProperty(DependencyVersionModel.prototype, "versionString", {
            get: function () { return this.versionNumber.rawVersionString; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DependencyVersionModel.prototype, "versionNumber", {
            get: function () { return this.get("versionNumber"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DependencyVersionModel.prototype, "githubId", {
            get: function () { return this.get("githubId"); },
            enumerable: true,
            configurable: true
        });
        DependencyVersionModel.forVersion = function (rawVersion) {
            return new DependencyVersionModel(new VersionNumber_1.default(rawVersion), null);
        };
        DependencyVersionModel.forNpmJson = function (json, versionNo) {
            if (json === void 0) { json = {}; }
            if (versionNo === void 0) { versionNo = json["version"]; }
            var githubId;
            var repository, bugs, npmId, npmUserName;
            if (json["repository"] && (repository = json["repository"]["url"])) {
                githubId = GithubId_1.default.forRepoUrl(repository);
            }
            else if (json["bugs"] && (bugs = json["bugs"]["url"])) {
                var rawBugsUrl = bugs.split("/");
                githubId = new GithubId_1.default(rawBugsUrl[3], rawBugsUrl[4]);
            }
            else if ((npmId = json["_id"]) && json["_npmUser"] && (npmUserName = json["_npmUser"]["name"])) {
                npmId = npmId.substring(0, npmId.indexOf("@"));
                githubId = new GithubId_1.default(npmUserName, npmId);
            }
            return new DependencyVersionModel(new VersionNumber_1.default(versionNo), githubId);
        };
        return DependencyVersionModel;
    })(Backbone.Model);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = DependencyVersionModel;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vbW9kZWwvRGVwZW5kZW5jeVZlcnNpb25Nb2RlbC50cyJdLCJuYW1lcyI6WyJEZXBlbmRlbmN5VmVyc2lvbk1vZGVsIiwiRGVwZW5kZW5jeVZlcnNpb25Nb2RlbC5jb25zdHJ1Y3RvciIsIkRlcGVuZGVuY3lWZXJzaW9uTW9kZWwudmVyc2lvblN0cmluZyIsIkRlcGVuZGVuY3lWZXJzaW9uTW9kZWwudmVyc2lvbk51bWJlciIsIkRlcGVuZGVuY3lWZXJzaW9uTW9kZWwuZ2l0aHViSWQiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUlBO1FBQW9EQSwwQ0FBY0E7UUEyQmhFQSxnQ0FBWUEsYUFBNEJBLEVBQUVBLFFBQW1CQTtZQUMzREMsa0JBQU1BO2dCQUNKQSxhQUFhQSxFQUFFQSxhQUFhQTtnQkFDNUJBLFFBQVFBLEVBQUVBLFFBQVFBO2FBQ25CQSxDQUFDQSxDQUFDQTtRQUNMQSxDQUFDQTtRQVhERCxzQkFBSUEsaURBQWFBO2lCQUFqQkEsY0FBOEJFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7OztXQUFBRjtRQUUzRUEsc0JBQUlBLGlEQUFhQTtpQkFBakJBLGNBQXFDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs7O1dBQUFIO1FBRXhFQSxzQkFBSUEsNENBQVFBO2lCQUFaQSxjQUEyQkksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7OztXQUFBSjtRQXZCbERBLGlDQUFVQSxHQUFHQSxVQUFTQSxVQUFrQkE7WUFDN0MsTUFBTSxDQUFDLElBQUksc0JBQXNCLENBQUMsSUFBSSx1QkFBYSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQUE7UUFFTUEsaUNBQVVBLEdBQUdBLFVBQVNBLElBQWNBLEVBQUVBLFNBQW1DQTtZQUFuRCxvQkFBYyxHQUFkLFNBQWM7WUFBRSx5QkFBbUMsR0FBbkMsWUFBb0IsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM5RSxJQUFJLFFBQWtCLENBQUM7WUFDdkIsSUFBSSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFtQixDQUFDO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25FLFFBQVEsR0FBRyxrQkFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25DLFFBQVEsR0FBRyxJQUFJLGtCQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakcsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsUUFBUSxHQUFHLElBQUksa0JBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDOUMsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLHNCQUFzQixDQUFDLElBQUksdUJBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUFBO1FBZ0JIQSw2QkFBQ0E7SUFBREEsQ0FuQ0EsQUFtQ0NBLEVBbkNtRCxRQUFRLENBQUMsS0FBSyxFQW1DakU7SUFuQ0Q7NENBbUNDLENBQUEiLCJmaWxlIjoibWFpbi9tb2RlbC9EZXBlbmRlbmN5VmVyc2lvbk1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lID0gcmVxdWlyZShcImJhY2tib25lXCIpO1xuaW1wb3J0IFZlcnNpb25OdW1iZXIgZnJvbSBcIi4vVmVyc2lvbk51bWJlclwiO1xuaW1wb3J0IEdpdGh1YklkIGZyb20gXCIuL0dpdGh1YklkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlcGVuZGVuY3lWZXJzaW9uTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbCB7XG5cbiAgc3RhdGljIGZvclZlcnNpb24gPSBmdW5jdGlvbihyYXdWZXJzaW9uOiBzdHJpbmcpOiBEZXBlbmRlbmN5VmVyc2lvbk1vZGVsIHtcbiAgICByZXR1cm4gbmV3IERlcGVuZGVuY3lWZXJzaW9uTW9kZWwobmV3IFZlcnNpb25OdW1iZXIocmF3VmVyc2lvbiksIG51bGwpO1xuICB9XG5cbiAgc3RhdGljIGZvck5wbUpzb24gPSBmdW5jdGlvbihqc29uOiBhbnkgPSB7fSwgdmVyc2lvbk5vOiBzdHJpbmcgPSBqc29uW1widmVyc2lvblwiXSk6IERlcGVuZGVuY3lWZXJzaW9uTW9kZWwge1xuICAgIHZhciBnaXRodWJJZDogR2l0aHViSWQ7XG4gICAgdmFyIHJlcG9zaXRvcnksIGJ1Z3MsIG5wbUlkLCBucG1Vc2VyTmFtZTogc3RyaW5nO1xuICAgIGlmIChqc29uW1wicmVwb3NpdG9yeVwiXSAmJiAocmVwb3NpdG9yeSA9IGpzb25bXCJyZXBvc2l0b3J5XCJdW1widXJsXCJdKSkge1xuICAgICAgZ2l0aHViSWQgPSBHaXRodWJJZC5mb3JSZXBvVXJsKHJlcG9zaXRvcnkpO1xuICAgIH0gZWxzZSBpZiAoanNvbltcImJ1Z3NcIl0gJiYgKGJ1Z3MgPSBqc29uW1wiYnVnc1wiXVtcInVybFwiXSkpIHtcbiAgICAgIGNvbnN0IHJhd0J1Z3NVcmwgPSBidWdzLnNwbGl0KFwiL1wiKTtcbiAgICAgIGdpdGh1YklkID0gbmV3IEdpdGh1YklkKHJhd0J1Z3NVcmxbM10sIHJhd0J1Z3NVcmxbNF0pO1xuICAgIH0gZWxzZSBpZiAoKG5wbUlkID0ganNvbltcIl9pZFwiXSkgJiYganNvbltcIl9ucG1Vc2VyXCJdICYmIChucG1Vc2VyTmFtZSA9IGpzb25bXCJfbnBtVXNlclwiXVtcIm5hbWVcIl0pKSB7XG4gICAgICBucG1JZCA9IG5wbUlkLnN1YnN0cmluZygwLCBucG1JZC5pbmRleE9mKFwiQFwiKSk7XG4gICAgICBnaXRodWJJZCA9IG5ldyBHaXRodWJJZChucG1Vc2VyTmFtZSwgbnBtSWQpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERlcGVuZGVuY3lWZXJzaW9uTW9kZWwobmV3IFZlcnNpb25OdW1iZXIodmVyc2lvbk5vKSwgZ2l0aHViSWQpO1xuICB9XG5cbiAgZ2V0IHZlcnNpb25TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudmVyc2lvbk51bWJlci5yYXdWZXJzaW9uU3RyaW5nOyB9XG5cbiAgZ2V0IHZlcnNpb25OdW1iZXIoKTogVmVyc2lvbk51bWJlciB7IHJldHVybiB0aGlzLmdldChcInZlcnNpb25OdW1iZXJcIik7IH1cblxuICBnZXQgZ2l0aHViSWQoKTogR2l0aHViSWQgeyByZXR1cm4gdGhpcy5nZXQoXCJnaXRodWJJZFwiKTsgfVxuXG4gIGNvbnN0cnVjdG9yKHZlcnNpb25OdW1iZXI6IFZlcnNpb25OdW1iZXIsIGdpdGh1YklkPzogR2l0aHViSWQpIHtcbiAgICBzdXBlcih7XG4gICAgICB2ZXJzaW9uTnVtYmVyOiB2ZXJzaW9uTnVtYmVyLFxuICAgICAgZ2l0aHViSWQ6IGdpdGh1YklkXG4gICAgfSk7XG4gIH1cblxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
