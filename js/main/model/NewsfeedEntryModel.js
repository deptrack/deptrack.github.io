var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "backbone", "moment", "./GithubUser", "./VersionNumber", "markdown-it"], function (require, exports, Backbone, moment, GithubUser_1, VersionNumber_1) {
    var md = require("markdown-it")({
        html: true,
        linkify: true,
        typographer: true
    });
    var NewsfeedEntryModel = (function (_super) {
        __extends(NewsfeedEntryModel, _super);
        function NewsfeedEntryModel(createdAt, author, externalLinkUrl, relatedDependency) {
            _super.call(this, {
                createdAt: createdAt,
                author: author
            });
            this.createdAt = createdAt;
            this.author = author;
            this.externalLinkUrl = externalLinkUrl;
            this.relatedDependency = relatedDependency;
        }
        NewsfeedEntryModel.forRawJson = function (json, relatedDep) {
            var type = json["type"], action = json["payload"]["action"], createdAt = moment(json["created_at"]), userJson = json["actor"], author = new GithubUser_1.default(userJson["login"], userJson["id"]);
            if (type === "IssuesEvent") {
                var issueJson = json["payload"]["issue"];
                if (action === "opened") {
                    return new IssueOpened(createdAt, author, issueJson["title"], issueJson["body"], issueJson["html_url"], relatedDep);
                }
                else if (action === "closed") {
                    return new IssueClosed(createdAt, author, issueJson["title"], issueJson["body"], issueJson["html_url"], relatedDep);
                }
                else if (action === "reopened") {
                    return new IssueReopened(createdAt, author, issueJson["title"], issueJson["body"], issueJson["html_url"], relatedDep);
                }
            }
            else if (type === "ReleaseEvent") {
                var releaseJson = json["payload"]["release"];
                if (releaseJson["prerelease"] || releaseJson["draft"]) {
                    return null;
                }
                if (action === "published") {
                    return new ReleasePublished(createdAt, author, releaseJson["tag_name"], releaseJson["name"], releaseJson["html_url"], relatedDep, releaseJson["body"]);
                }
            }
            else if (type == "CreateEvent" && json["payload"]["ref_type"] == "tag") {
                var tagName = json["payload"]["ref"];
                return new ReleasePublished(createdAt, author, tagName, tagName, null, relatedDep, "", "tag");
            }
            else if (type === "PushEvent") {
                var commits = json["payload"]["commits"];
                return new PushEvent(createdAt, author, _.map(commits, function (commit) { return commit["message"]; }), relatedDep);
            }
            else if (type === "PullRequestEvent") {
                var pullRequestJson = json["payload"]["pull_request"];
                return new PullRequestOpened(createdAt, author, pullRequestJson["title"], pullRequestJson["body"], pullRequestJson["html_url"], relatedDep);
            }
            return null;
        };
        Object.defineProperty(NewsfeedEntryModel.prototype, "githubProjectUrl", {
            get: function () {
                var githubId = this.relatedDependency.githubId;
                if (!githubId) {
                    return null;
                }
                return "https://github.com/" + githubId.authorId + "/" + githubId.projectId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NewsfeedEntryModel.prototype, "createdFromNow", {
            get: function () {
                return this.createdAt.fromNow();
            },
            enumerable: true,
            configurable: true
        });
        return NewsfeedEntryModel;
    })(Backbone.Model);
    exports.NewsfeedEntryModel = NewsfeedEntryModel;
    var IssueEvent = (function (_super) {
        __extends(IssueEvent, _super);
        function IssueEvent(createdAt, author, issueTitle, rawIssueBody, externalLinkUrl, relatedDependency) {
            _super.call(this, createdAt, author, externalLinkUrl, relatedDependency);
            this.createdAt = createdAt;
            this.author = author;
            this.issueTitle = issueTitle;
            this.rawIssueBody = rawIssueBody;
            this.externalLinkUrl = externalLinkUrl;
            this.relatedDependency = relatedDependency;
        }
        Object.defineProperty(IssueEvent.prototype, "formattedIssueBody", {
            get: function () {
                if (!this.rawIssueBody) {
                    return "";
                }
                return md.render(this.rawIssueBody);
            },
            enumerable: true,
            configurable: true
        });
        return IssueEvent;
    })(NewsfeedEntryModel);
    exports.IssueEvent = IssueEvent;
    var IssueOpened = (function (_super) {
        __extends(IssueOpened, _super);
        function IssueOpened() {
            _super.apply(this, arguments);
        }
        return IssueOpened;
    })(IssueEvent);
    exports.IssueOpened = IssueOpened;
    var IssueClosed = (function (_super) {
        __extends(IssueClosed, _super);
        function IssueClosed() {
            _super.apply(this, arguments);
        }
        return IssueClosed;
    })(IssueEvent);
    exports.IssueClosed = IssueClosed;
    var IssueReopened = (function (_super) {
        __extends(IssueReopened, _super);
        function IssueReopened() {
            _super.apply(this, arguments);
        }
        return IssueReopened;
    })(IssueEvent);
    exports.IssueReopened = IssueReopened;
    var PullRequestOpened = (function (_super) {
        __extends(PullRequestOpened, _super);
        function PullRequestOpened() {
            _super.apply(this, arguments);
        }
        return PullRequestOpened;
    })(IssueEvent);
    exports.PullRequestOpened = PullRequestOpened;
    var ReleasePublished = (function (_super) {
        __extends(ReleasePublished, _super);
        function ReleasePublished(createdAt, author, tagName, name, externalLinkUrl, relatedDependency, rawChangeLog, publishType) {
            if (name === void 0) { name = tagName; }
            if (publishType === void 0) { publishType = "release"; }
            _super.call(this, createdAt, author, externalLinkUrl, relatedDependency);
            this.createdAt = createdAt;
            this.author = author;
            this.tagName = tagName;
            this.name = name;
            this.externalLinkUrl = externalLinkUrl;
            this.relatedDependency = relatedDependency;
            this.rawChangeLog = rawChangeLog;
            this.publishType = publishType;
            if (name == null && tagName != null) {
                this.name = tagName;
            }
        }
        Object.defineProperty(ReleasePublished.prototype, "formattedChangeLog", {
            get: function () {
                return md.render(this.rawChangeLog);
                // return markdown.toHTML(this.rawChangeLog);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ReleasePublished.prototype, "hasChangeLog", {
            get: function () {
                var rawChangeLog = (this.rawChangeLog || "").trim();
                return rawChangeLog != "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ReleasePublished.prototype, "noOfNewerReleases", {
            get: function () {
                var _this = this;
                var counter = 0;
                var counting = false;
                var releasedVersion = new VersionNumber_1.default(this.tagName);
                this.relatedDependency.versions.forEach(function (version) {
                    if (VersionNumber_1.default.equal(version.versionNumber, _this.relatedDependency.originalVersion.versionNumber)) {
                        counting = true;
                    }
                    if (counting && VersionNumber_1.default.compare(releasedVersion, version.versionNumber) >= 0) {
                        ++counter;
                    }
                });
                return counter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ReleasePublished.prototype, "projectName", {
            get: function () {
                return this.relatedDependency.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ReleasePublished.prototype, "isTag", {
            get: function () {
                return this.publishType == "tag";
            },
            enumerable: true,
            configurable: true
        });
        return ReleasePublished;
    })(NewsfeedEntryModel);
    exports.ReleasePublished = ReleasePublished;
    var PushEvent = (function (_super) {
        __extends(PushEvent, _super);
        function PushEvent(createdAt, author, commitMessages, relatedDependency) {
            _super.call(this, createdAt, author, null, relatedDependency);
            this.createdAt = createdAt;
            this.author = author;
            this.commitMessages = commitMessages;
            this.relatedDependency = relatedDependency;
        }
        return PushEvent;
    })(NewsfeedEntryModel);
    exports.PushEvent = PushEvent;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vbW9kZWwvTmV3c2ZlZWRFbnRyeU1vZGVsLnRzIl0sIm5hbWVzIjpbIk5ld3NmZWVkRW50cnlNb2RlbCIsIk5ld3NmZWVkRW50cnlNb2RlbC5jb25zdHJ1Y3RvciIsIk5ld3NmZWVkRW50cnlNb2RlbC5mb3JSYXdKc29uIiwiTmV3c2ZlZWRFbnRyeU1vZGVsLmdpdGh1YlByb2plY3RVcmwiLCJOZXdzZmVlZEVudHJ5TW9kZWwuY3JlYXRlZEZyb21Ob3ciLCJJc3N1ZUV2ZW50IiwiSXNzdWVFdmVudC5jb25zdHJ1Y3RvciIsIklzc3VlRXZlbnQuZm9ybWF0dGVkSXNzdWVCb2R5IiwiSXNzdWVPcGVuZWQiLCJJc3N1ZU9wZW5lZC5jb25zdHJ1Y3RvciIsIklzc3VlQ2xvc2VkIiwiSXNzdWVDbG9zZWQuY29uc3RydWN0b3IiLCJJc3N1ZVJlb3BlbmVkIiwiSXNzdWVSZW9wZW5lZC5jb25zdHJ1Y3RvciIsIlB1bGxSZXF1ZXN0T3BlbmVkIiwiUHVsbFJlcXVlc3RPcGVuZWQuY29uc3RydWN0b3IiLCJSZWxlYXNlUHVibGlzaGVkIiwiUmVsZWFzZVB1Ymxpc2hlZC5jb25zdHJ1Y3RvciIsIlJlbGVhc2VQdWJsaXNoZWQuZm9ybWF0dGVkQ2hhbmdlTG9nIiwiUmVsZWFzZVB1Ymxpc2hlZC5oYXNDaGFuZ2VMb2ciLCJSZWxlYXNlUHVibGlzaGVkLm5vT2ZOZXdlclJlbGVhc2VzIiwiUmVsZWFzZVB1Ymxpc2hlZC5wcm9qZWN0TmFtZSIsIlJlbGVhc2VQdWJsaXNoZWQuaXNUYWciLCJQdXNoRXZlbnQiLCJQdXNoRXZlbnQuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiI7Ozs7OztJQU9BLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5QixJQUFJLEVBQUUsSUFBSTtRQUNWLE9BQU8sRUFBRSxJQUFJO1FBQ2IsV0FBVyxFQUFFLElBQUk7S0FDbEIsQ0FBQyxDQUFDO0lBRUg7UUFBaURBLHNDQUFjQTtRQW9EN0RBLDRCQUNTQSxTQUF3QkEsRUFDeEJBLE1BQWtCQSxFQUNsQkEsZUFBdUJBLEVBQ3ZCQSxpQkFBa0NBO1lBQ3pDQyxrQkFBTUE7Z0JBQ0pBLFNBQVNBLEVBQUVBLFNBQVNBO2dCQUNwQkEsTUFBTUEsRUFBRUEsTUFBTUE7YUFDZkEsQ0FBQ0EsQ0FBQ0E7WUFQSUEsY0FBU0EsR0FBVEEsU0FBU0EsQ0FBZUE7WUFDeEJBLFdBQU1BLEdBQU5BLE1BQU1BLENBQVlBO1lBQ2xCQSxvQkFBZUEsR0FBZkEsZUFBZUEsQ0FBUUE7WUFDdkJBLHNCQUFpQkEsR0FBakJBLGlCQUFpQkEsQ0FBaUJBO1FBSzNDQSxDQUFDQTtRQTNETUQsNkJBQVVBLEdBQWpCQSxVQUFrQkEsSUFBU0EsRUFBRUEsVUFBMkJBO1lBQ3RERSxJQUFNQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUN2QkEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsRUFDbENBLFNBQVNBLEdBQUdBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEVBQ3RDQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUN4QkEsTUFBTUEsR0FBR0EsSUFBSUEsb0JBQVVBLENBQUNBLFFBQVFBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBQzdEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDM0JBLElBQU1BLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2dCQUMzQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsS0FBS0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3hCQSxNQUFNQSxDQUFDQSxJQUFJQSxXQUFXQSxDQUFDQSxTQUFTQSxFQUFFQSxNQUFNQSxFQUFFQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxVQUFVQSxDQUFDQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTtnQkFDdEhBLENBQUNBO2dCQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxLQUFLQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDL0JBLE1BQU1BLENBQUNBLElBQUlBLFdBQVdBLENBQUNBLFNBQVNBLEVBQUVBLE1BQU1BLEVBQUVBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLEVBQUVBLFNBQVNBLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBO2dCQUN0SEEsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLEtBQUtBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO29CQUNqQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsYUFBYUEsQ0FBQ0EsU0FBU0EsRUFBRUEsTUFBTUEsRUFBRUEsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBRUEsU0FBU0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hIQSxDQUFDQTtZQUNIQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkNBLElBQU1BLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO2dCQUMvQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3REQSxN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SEQsZ0JBQUNBO0lBQURBLENBVEEsQUFTQ0EsRUFUOEIsa0JBQWtCLEVBU2hEO0lBVFksaUJBQVMsWUFTckIsQ0FBQSIsImZpbGUiOiJtYWluL21vZGVsL05ld3NmZWVkRW50cnlNb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cIm1hcmtkb3duLWl0XCIgLz5cbmltcG9ydCBCYWNrYm9uZSA9IHJlcXVpcmUoXCJiYWNrYm9uZVwiKTtcbmltcG9ydCBtb21lbnQgPSByZXF1aXJlKFwibW9tZW50XCIpO1xuaW1wb3J0IEdpdGh1YlVzZXIgZnJvbSBcIi4vR2l0aHViVXNlclwiO1xuaW1wb3J0IERlcGVuZGVuY3lNb2RlbCBmcm9tIFwiLi9EZXBlbmRlbmN5TW9kZWxcIjtcbmltcG9ydCBWZXJzaW9uTnVtYmVyIGZyb20gXCIuL1ZlcnNpb25OdW1iZXJcIjtcblxudmFyIG1kID0gcmVxdWlyZShcIm1hcmtkb3duLWl0XCIpKHtcbiAgaHRtbDogdHJ1ZSxcbiAgbGlua2lmeTogdHJ1ZSxcbiAgdHlwb2dyYXBoZXI6IHRydWVcbn0pO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmV3c2ZlZWRFbnRyeU1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWwge1xuXG4gIHN0YXRpYyBmb3JSYXdKc29uKGpzb246IGFueSwgcmVsYXRlZERlcDogRGVwZW5kZW5jeU1vZGVsKTogTmV3c2ZlZWRFbnRyeU1vZGVsIHtcbiAgICBjb25zdCB0eXBlID0ganNvbltcInR5cGVcIl0sXG4gICAgICBhY3Rpb24gPSBqc29uW1wicGF5bG9hZFwiXVtcImFjdGlvblwiXSxcbiAgICAgIGNyZWF0ZWRBdCA9IG1vbWVudChqc29uW1wiY3JlYXRlZF9hdFwiXSksXG4gICAgICB1c2VySnNvbiA9IGpzb25bXCJhY3RvclwiXSxcbiAgICAgIGF1dGhvciA9IG5ldyBHaXRodWJVc2VyKHVzZXJKc29uW1wibG9naW5cIl0sIHVzZXJKc29uW1wiaWRcIl0pO1xuICAgIGlmICh0eXBlID09PSBcIklzc3Vlc0V2ZW50XCIpIHtcbiAgICAgIGNvbnN0IGlzc3VlSnNvbiA9IGpzb25bXCJwYXlsb2FkXCJdW1wiaXNzdWVcIl07XG4gICAgICBpZiAoYWN0aW9uID09PSBcIm9wZW5lZFwiKSB7XG4gICAgICAgIHJldHVybiBuZXcgSXNzdWVPcGVuZWQoY3JlYXRlZEF0LCBhdXRob3IsIGlzc3VlSnNvbltcInRpdGxlXCJdLCBpc3N1ZUpzb25bXCJib2R5XCJdLCBpc3N1ZUpzb25bXCJodG1sX3VybFwiXSwgcmVsYXRlZERlcCk7XG4gICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gXCJjbG9zZWRcIikge1xuICAgICAgICByZXR1cm4gbmV3IElzc3VlQ2xvc2VkKGNyZWF0ZWRBdCwgYXV0aG9yLCBpc3N1ZUpzb25bXCJ0aXRsZVwiXSwgaXNzdWVKc29uW1wiYm9keVwiXSwgaXNzdWVKc29uW1wiaHRtbF91cmxcIl0sIHJlbGF0ZWREZXApO1xuICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09IFwicmVvcGVuZWRcIikge1xuICAgICAgICByZXR1cm4gbmV3IElzc3VlUmVvcGVuZWQoY3JlYXRlZEF0LCBhdXRob3IsIGlzc3VlSnNvbltcInRpdGxlXCJdLCBpc3N1ZUpzb25bXCJib2R5XCJdLCBpc3N1ZUpzb25bXCJodG1sX3VybFwiXSwgcmVsYXRlZERlcCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBcIlJlbGVhc2VFdmVudFwiKSB7XG4gICAgICBjb25zdCByZWxlYXNlSnNvbiA9IGpzb25bXCJwYXlsb2FkXCJdW1wicmVsZWFzZVwiXTtcbiAgICAgIGlmIChyZWxlYXNlSnNvbltcInByZXJlbGVhc2VcIl0gfHwgcmVsZWFzZUpzb25bXCJkcmFmdFwiXSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmIChhY3Rpb24gPT09IFwicHVibGlzaGVkXCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWxlYXNlUHVibGlzaGVkKGNyZWF0ZWRBdCwgYXV0aG9yLCByZWxlYXNlSnNvbltcInRhZ19uYW1lXCJdLCByZWxlYXNlSnNvbltcIm5hbWVcIl0sXG4gICAgICAgICAgcmVsZWFzZUpzb25bXCJodG1sX3VybFwiXSwgcmVsYXRlZERlcCwgcmVsZWFzZUpzb25bXCJib2R5XCJdKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJDcmVhdGVFdmVudFwiICYmIGpzb25bXCJwYXlsb2FkXCJdW1wicmVmX3R5cGVcIl0gPT0gXCJ0YWdcIikge1xuICAgICAgdmFyIHRhZ05hbWUgPSBqc29uW1wicGF5bG9hZFwiXVtcInJlZlwiXTtcbiAgICAgIHJldHVybiBuZXcgUmVsZWFzZVB1Ymxpc2hlZChjcmVhdGVkQXQsIGF1dGhvciwgdGFnTmFtZSwgdGFnTmFtZSwgbnVsbCwgcmVsYXRlZERlcCwgXCJcIiwgXCJ0YWdcIik7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBcIlB1c2hFdmVudFwiKSB7XG4gICAgICBjb25zdCBjb21taXRzID0ganNvbltcInBheWxvYWRcIl1bXCJjb21taXRzXCJdO1xuICAgICAgcmV0dXJuIG5ldyBQdXNoRXZlbnQoY3JlYXRlZEF0LCBhdXRob3IsIF8ubWFwKGNvbW1pdHMsIGNvbW1pdCA9PiBjb21taXRbXCJtZXNzYWdlXCJdKSwgcmVsYXRlZERlcCk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBcIlB1bGxSZXF1ZXN0RXZlbnRcIikge1xuICAgICAgY29uc3QgcHVsbFJlcXVlc3RKc29uID0ganNvbltcInBheWxvYWRcIl1bXCJwdWxsX3JlcXVlc3RcIl07XG4gICAgICByZXR1cm4gbmV3IFB1bGxSZXF1ZXN0T3BlbmVkKGNyZWF0ZWRBdCwgYXV0aG9yLCBwdWxsUmVxdWVzdEpzb25bXCJ0aXRsZVwiXSwgcHVsbFJlcXVlc3RKc29uW1wiYm9keVwiXSxcbiAgICAgICAgIHB1bGxSZXF1ZXN0SnNvbltcImh0bWxfdXJsXCJdLCByZWxhdGVkRGVwKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXQgZ2l0aHViUHJvamVjdFVybCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGdpdGh1YklkID0gdGhpcy5yZWxhdGVkRGVwZW5kZW5jeS5naXRodWJJZDtcbiAgICBpZiAoIWdpdGh1YklkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIFwiaHR0cHM6Ly9naXRodWIuY29tL1wiICsgZ2l0aHViSWQuYXV0aG9ySWQgKyBcIi9cIiArIGdpdGh1YklkLnByb2plY3RJZDtcbiAgfVxuXG4gIGdldCBjcmVhdGVkRnJvbU5vdygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZWRBdC5mcm9tTm93KCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY3JlYXRlZEF0OiBtb21lbnQuTW9tZW50LFxuICAgIHB1YmxpYyBhdXRob3I6IEdpdGh1YlVzZXIsXG4gICAgcHVibGljIGV4dGVybmFsTGlua1VybDogc3RyaW5nLFxuICAgIHB1YmxpYyByZWxhdGVkRGVwZW5kZW5jeTogRGVwZW5kZW5jeU1vZGVsKSB7XG4gICAgc3VwZXIoe1xuICAgICAgY3JlYXRlZEF0OiBjcmVhdGVkQXQsXG4gICAgICBhdXRob3I6IGF1dGhvclxuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIElzc3VlRXZlbnQgZXh0ZW5kcyBOZXdzZmVlZEVudHJ5TW9kZWwge1xuXG4gIGdldCBmb3JtYXR0ZWRJc3N1ZUJvZHkoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMucmF3SXNzdWVCb2R5KSB7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuIG1kLnJlbmRlcih0aGlzLnJhd0lzc3VlQm9keSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY3JlYXRlZEF0OiBtb21lbnQuTW9tZW50LFxuICAgIHB1YmxpYyBhdXRob3I6IEdpdGh1YlVzZXIsXG4gICAgcHVibGljIGlzc3VlVGl0bGU6IHN0cmluZyxcbiAgICBwdWJsaWMgcmF3SXNzdWVCb2R5OiBzdHJpbmcsXG4gICAgcHVibGljIGV4dGVybmFsTGlua1VybDogc3RyaW5nLFxuICAgIHB1YmxpYyByZWxhdGVkRGVwZW5kZW5jeTogRGVwZW5kZW5jeU1vZGVsKSB7XG4gICAgc3VwZXIoY3JlYXRlZEF0LCBhdXRob3IsIGV4dGVybmFsTGlua1VybCwgcmVsYXRlZERlcGVuZGVuY3kpO1xuICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIElzc3VlT3BlbmVkIGV4dGVuZHMgSXNzdWVFdmVudCB7XG59XG5cbmV4cG9ydCBjbGFzcyBJc3N1ZUNsb3NlZCBleHRlbmRzIElzc3VlRXZlbnQge1xufVxuXG5leHBvcnQgY2xhc3MgSXNzdWVSZW9wZW5lZCBleHRlbmRzIElzc3VlRXZlbnQge1xufVxuXG5leHBvcnQgY2xhc3MgUHVsbFJlcXVlc3RPcGVuZWQgZXh0ZW5kcyBJc3N1ZUV2ZW50IHtcbn1cblxuZXhwb3J0IGNsYXNzIFJlbGVhc2VQdWJsaXNoZWQgZXh0ZW5kcyBOZXdzZmVlZEVudHJ5TW9kZWwge1xuXG4gIGdldCBmb3JtYXR0ZWRDaGFuZ2VMb2coKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbWQucmVuZGVyKHRoaXMucmF3Q2hhbmdlTG9nKTtcbiAgICAvLyByZXR1cm4gbWFya2Rvd24udG9IVE1MKHRoaXMucmF3Q2hhbmdlTG9nKTtcbiAgfVxuXG4gIGdldCBoYXNDaGFuZ2VMb2coKTogYm9vbGVhbiB7XG4gICAgdmFyIHJhd0NoYW5nZUxvZyA9ICh0aGlzLnJhd0NoYW5nZUxvZyB8fCBcIlwiKS50cmltKCk7XG4gICAgcmV0dXJuIHJhd0NoYW5nZUxvZyAhPSBcIlwiO1xuICB9XG5cbiAgZ2V0IG5vT2ZOZXdlclJlbGVhc2VzKCk6IG51bWJlciB7XG4gICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgIHZhciBjb3VudGluZyA9IGZhbHNlO1xuICAgIGNvbnN0IHJlbGVhc2VkVmVyc2lvbiA9IG5ldyBWZXJzaW9uTnVtYmVyKHRoaXMudGFnTmFtZSk7XG4gICAgdGhpcy5yZWxhdGVkRGVwZW5kZW5jeS52ZXJzaW9ucy5mb3JFYWNoKHZlcnNpb24gPT4ge1xuICAgICAgaWYgKFZlcnNpb25OdW1iZXIuZXF1YWwodmVyc2lvbi52ZXJzaW9uTnVtYmVyLCB0aGlzLnJlbGF0ZWREZXBlbmRlbmN5Lm9yaWdpbmFsVmVyc2lvbi52ZXJzaW9uTnVtYmVyKSkge1xuICAgICAgICBjb3VudGluZyA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoY291bnRpbmcgJiYgVmVyc2lvbk51bWJlci5jb21wYXJlKHJlbGVhc2VkVmVyc2lvbiwgdmVyc2lvbi52ZXJzaW9uTnVtYmVyKSA+PSAwKSB7XG4gICAgICAgICsrY291bnRlcjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfVxuXG4gIGdldCBwcm9qZWN0TmFtZSgpIDogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5yZWxhdGVkRGVwZW5kZW5jeS5uYW1lO1xuICB9XG5cbiAgZ2V0IGlzVGFnKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnB1Ymxpc2hUeXBlID09IFwidGFnXCI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY3JlYXRlZEF0OiBtb21lbnQuTW9tZW50LFxuICAgIHB1YmxpYyBhdXRob3I6IEdpdGh1YlVzZXIsXG4gICAgcHVibGljIHRhZ05hbWU6IHN0cmluZyxcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdGFnTmFtZSxcbiAgICBwdWJsaWMgZXh0ZXJuYWxMaW5rVXJsOiBzdHJpbmcsXG4gICAgcHVibGljIHJlbGF0ZWREZXBlbmRlbmN5OiBEZXBlbmRlbmN5TW9kZWwsXG4gICAgcHVibGljIHJhd0NoYW5nZUxvZz86IHN0cmluZyxcbiAgICBwdWJsaWMgcHVibGlzaFR5cGU6IHN0cmluZyA9IFwicmVsZWFzZVwiKSB7XG4gICAgc3VwZXIoY3JlYXRlZEF0LCBhdXRob3IsIGV4dGVybmFsTGlua1VybCwgcmVsYXRlZERlcGVuZGVuY3kpO1xuICAgIGlmIChuYW1lID09IG51bGwgJiYgdGFnTmFtZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLm5hbWUgPSB0YWdOYW1lO1xuICAgIH1cbiAgfVxuXG59XG5cblxuZXhwb3J0IGNsYXNzIFB1c2hFdmVudCBleHRlbmRzIE5ld3NmZWVkRW50cnlNb2RlbCB7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGNyZWF0ZWRBdDogbW9tZW50Lk1vbWVudCxcbiAgICBwdWJsaWMgYXV0aG9yOiBHaXRodWJVc2VyLFxuICAgIHB1YmxpYyBjb21taXRNZXNzYWdlczogc3RyaW5nW10sXG4gICAgcHVibGljIHJlbGF0ZWREZXBlbmRlbmN5OiBEZXBlbmRlbmN5TW9kZWwpIHtcbiAgICBzdXBlcihjcmVhdGVkQXQsIGF1dGhvciwgbnVsbCwgcmVsYXRlZERlcGVuZGVuY3kpO1xuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
