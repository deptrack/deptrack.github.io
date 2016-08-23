var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "backbone", "moment", "./GithubUser", "./VersionNumber", "markdown"], function (require, exports, Backbone, moment, GithubUser_1, VersionNumber_1) {
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
                return markdown.toHTML(this.rawIssueBody);
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
        function ReleasePublished(createdAt, author, tagName, name, externalLinkUrl, relatedDependency, rawChangeLog) {
            if (name === void 0) { name = tagName; }
            _super.call(this, createdAt, author, externalLinkUrl, relatedDependency);
            this.createdAt = createdAt;
            this.author = author;
            this.tagName = tagName;
            this.name = name;
            this.externalLinkUrl = externalLinkUrl;
            this.relatedDependency = relatedDependency;
            this.rawChangeLog = rawChangeLog;
            if (name == null && tagName != null) {
                this.name = tagName;
            }
        }
        Object.defineProperty(ReleasePublished.prototype, "formattedChangeLog", {
            get: function () {
                return markdown.toHTML(this.rawChangeLog);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vbW9kZWwvTmV3c2ZlZWRFbnRyeU1vZGVsLnRzIl0sIm5hbWVzIjpbIk5ld3NmZWVkRW50cnlNb2RlbCIsIk5ld3NmZWVkRW50cnlNb2RlbC5jb25zdHJ1Y3RvciIsIk5ld3NmZWVkRW50cnlNb2RlbC5mb3JSYXdKc29uIiwiTmV3c2ZlZWRFbnRyeU1vZGVsLmdpdGh1YlByb2plY3RVcmwiLCJOZXdzZmVlZEVudHJ5TW9kZWwuY3JlYXRlZEZyb21Ob3ciLCJJc3N1ZUV2ZW50IiwiSXNzdWVFdmVudC5jb25zdHJ1Y3RvciIsIklzc3VlRXZlbnQuZm9ybWF0dGVkSXNzdWVCb2R5IiwiSXNzdWVPcGVuZWQiLCJJc3N1ZU9wZW5lZC5jb25zdHJ1Y3RvciIsIklzc3VlQ2xvc2VkIiwiSXNzdWVDbG9zZWQuY29uc3RydWN0b3IiLCJJc3N1ZVJlb3BlbmVkIiwiSXNzdWVSZW9wZW5lZC5jb25zdHJ1Y3RvciIsIlB1bGxSZXF1ZXN0T3BlbmVkIiwiUHVsbFJlcXVlc3RPcGVuZWQuY29uc3RydWN0b3IiLCJSZWxlYXNlUHVibGlzaGVkIiwiUmVsZWFzZVB1Ymxpc2hlZC5jb25zdHJ1Y3RvciIsIlJlbGVhc2VQdWJsaXNoZWQuZm9ybWF0dGVkQ2hhbmdlTG9nIiwiUmVsZWFzZVB1Ymxpc2hlZC5oYXNDaGFuZ2VMb2ciLCJSZWxlYXNlUHVibGlzaGVkLm5vT2ZOZXdlclJlbGVhc2VzIiwiUmVsZWFzZVB1Ymxpc2hlZC5wcm9qZWN0TmFtZSIsIlB1c2hFdmVudCIsIlB1c2hFdmVudC5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBT0E7UUFBaURBLHNDQUFjQTtRQWlEN0RBLDRCQUNTQSxTQUF3QkEsRUFDeEJBLE1BQWtCQSxFQUNsQkEsZUFBdUJBLEVBQ3ZCQSxpQkFBa0NBO1lBQ3pDQyxrQkFBTUE7Z0JBQ0pBLFNBQVNBLEVBQUVBLFNBQVNBO2dCQUNwQkEsTUFBTUEsRUFBRUEsTUFBTUE7YUFDZkEsQ0FBQ0EsQ0FBQ0E7WUFQSUEsY0FBU0EsR0FBVEEsU0FBU0EsQ0FBZUE7WUFDeEJBLFdBQU1BLEdBQU5BLE1BQU1BLENBQVlBO1lBQ2xCQSxvQkFBZUEsR0FBZkEsZUFBZUEsQ0FBUUE7WUFDdkJBLHNCQUFpQkEsR0FBakJBLGlCQUFpQkEsQ0FBaUJBO1FBSzNDQSxDQUFDQTtRQXhETUQsNkJBQVVBLEdBQWpCQSxVQUFrQkEsSUFBU0EsRUFBRUEsVUFBMkJBO1lBQ3RERSxJQUFNQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUN2QkEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsRUFDbENBLFNBQVNBLEdBQUdBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEVBQ3RDQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUN4QkEsTUFBTUEsR0FBR0EsSUFBSUEsb0JBQVVBLENBQUNBLFFBQVFBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBQzdEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDM0JBLElBQU1BLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2dCQUMzQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsS0FBS0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3hCQSxNQUFNQSxDQUFDQSxJQUFJQSxXQUFXQSxDQUFDQSxTQUFTQSxFQUFFQSxNQUFNQSxFQUFFQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxVQUFVQSxDQUFDQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTtnQkFDdEhBLENBQUNBO2dCQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxLQUFLQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDL0JBLE1BQU1BLENBQUNBLElBQUlBLFdBQVdBLENBQUNBLFNBQVNBLEVBQUVBLE1BQU1BLEVBQUVBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLEVBQUVBLFNBQVNBLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBO2dCQUN0SEEsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLEtBQUtBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO29CQUNqQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsYUFBYUEsQ0FBQ0EsU0FBU0EsRUFBRUEsTUFBTUEsRUFBRUEsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBRUEsU0FBU0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hIQSxDQUFDQTtZQUNIQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxLQUFLQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkNBLElBQU1BLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO2dCQUMvQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3REQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDZEEsQ0FBQ0E7Z0JBQ0RBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLEtBQUtBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO29CQUMzQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsZ0JBQWdCQSxDQUFDQSxTQUFTQSxFQUFF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QUVBLE1BQU1BLEVBQUVBLElBQUlBLEVBQUVBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7WUFKakNBLGNBQVNBLEdBQVRBLFNBQVNBLENBQWVBO1lBQ2xDQSxXQUFNQSxHQUFOQSxNQUFNQSxDQUFZQTtZQUNsQkEsbUJBQWNBLEdBQWRBLGNBQWNBLENBQVVBO1lBQ3hCQSxzQkFBaUJBLEdBQWpCQSxpQkFBaUJBLENBQWlCQTtRQUUzQ0EsQ0FBQ0E7UUFFSEQsZ0JBQUNBO0lBQURBLENBVEEsQUFTQ0EsRUFUOEIsa0JBQWtCLEVBU2hEO0lBVFksaUJBQVMsWUFTckIsQ0FBQSIsImZpbGUiOiJtYWluL21vZGVsL05ld3NmZWVkRW50cnlNb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cIm1hcmtkb3duXCIgLz5cbmltcG9ydCBCYWNrYm9uZSA9IHJlcXVpcmUoXCJiYWNrYm9uZVwiKTtcbmltcG9ydCBtb21lbnQgPSByZXF1aXJlKFwibW9tZW50XCIpO1xuaW1wb3J0IEdpdGh1YlVzZXIgZnJvbSBcIi4vR2l0aHViVXNlclwiO1xuaW1wb3J0IERlcGVuZGVuY3lNb2RlbCBmcm9tIFwiLi9EZXBlbmRlbmN5TW9kZWxcIjtcbmltcG9ydCBWZXJzaW9uTnVtYmVyIGZyb20gXCIuL1ZlcnNpb25OdW1iZXJcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5ld3NmZWVkRW50cnlNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsIHtcblxuICBzdGF0aWMgZm9yUmF3SnNvbihqc29uOiBhbnksIHJlbGF0ZWREZXA6IERlcGVuZGVuY3lNb2RlbCk6IE5ld3NmZWVkRW50cnlNb2RlbCB7XG4gICAgY29uc3QgdHlwZSA9IGpzb25bXCJ0eXBlXCJdLFxuICAgICAgYWN0aW9uID0ganNvbltcInBheWxvYWRcIl1bXCJhY3Rpb25cIl0sXG4gICAgICBjcmVhdGVkQXQgPSBtb21lbnQoanNvbltcImNyZWF0ZWRfYXRcIl0pLFxuICAgICAgdXNlckpzb24gPSBqc29uW1wiYWN0b3JcIl0sXG4gICAgICBhdXRob3IgPSBuZXcgR2l0aHViVXNlcih1c2VySnNvbltcImxvZ2luXCJdLCB1c2VySnNvbltcImlkXCJdKTtcbiAgICBpZiAodHlwZSA9PT0gXCJJc3N1ZXNFdmVudFwiKSB7XG4gICAgICBjb25zdCBpc3N1ZUpzb24gPSBqc29uW1wicGF5bG9hZFwiXVtcImlzc3VlXCJdO1xuICAgICAgaWYgKGFjdGlvbiA9PT0gXCJvcGVuZWRcIikge1xuICAgICAgICByZXR1cm4gbmV3IElzc3VlT3BlbmVkKGNyZWF0ZWRBdCwgYXV0aG9yLCBpc3N1ZUpzb25bXCJ0aXRsZVwiXSwgaXNzdWVKc29uW1wiYm9keVwiXSwgaXNzdWVKc29uW1wiaHRtbF91cmxcIl0sIHJlbGF0ZWREZXApO1xuICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09IFwiY2xvc2VkXCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJc3N1ZUNsb3NlZChjcmVhdGVkQXQsIGF1dGhvciwgaXNzdWVKc29uW1widGl0bGVcIl0sIGlzc3VlSnNvbltcImJvZHlcIl0sIGlzc3VlSnNvbltcImh0bWxfdXJsXCJdLCByZWxhdGVkRGVwKTtcbiAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSBcInJlb3BlbmVkXCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJc3N1ZVJlb3BlbmVkKGNyZWF0ZWRBdCwgYXV0aG9yLCBpc3N1ZUpzb25bXCJ0aXRsZVwiXSwgaXNzdWVKc29uW1wiYm9keVwiXSwgaXNzdWVKc29uW1wiaHRtbF91cmxcIl0sIHJlbGF0ZWREZXApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJSZWxlYXNlRXZlbnRcIikge1xuICAgICAgY29uc3QgcmVsZWFzZUpzb24gPSBqc29uW1wicGF5bG9hZFwiXVtcInJlbGVhc2VcIl07XG4gICAgICBpZiAocmVsZWFzZUpzb25bXCJwcmVyZWxlYXNlXCJdIHx8IHJlbGVhc2VKc29uW1wiZHJhZnRcIl0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uID09PSBcInB1Ymxpc2hlZFwiKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVsZWFzZVB1Ymxpc2hlZChjcmVhdGVkQXQsIGF1dGhvciwgcmVsZWFzZUpzb25bXCJ0YWdfbmFtZVwiXSwgcmVsZWFzZUpzb25bXCJuYW1lXCJdLFxuICAgICAgICAgIHJlbGVhc2VKc29uW1wiaHRtbF91cmxcIl0sIHJlbGF0ZWREZXAsIHJlbGVhc2VKc29uW1wiYm9keVwiXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBcIlB1c2hFdmVudFwiKSB7XG4gICAgICBjb25zdCBjb21taXRzID0ganNvbltcInBheWxvYWRcIl1bXCJjb21taXRzXCJdO1xuICAgICAgcmV0dXJuIG5ldyBQdXNoRXZlbnQoY3JlYXRlZEF0LCBhdXRob3IsIF8ubWFwKGNvbW1pdHMsIGNvbW1pdCA9PiBjb21taXRbXCJtZXNzYWdlXCJdKSwgcmVsYXRlZERlcCk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBcIlB1bGxSZXF1ZXN0RXZlbnRcIikge1xuICAgICAgY29uc3QgcHVsbFJlcXVlc3RKc29uID0ganNvbltcInBheWxvYWRcIl1bXCJwdWxsX3JlcXVlc3RcIl07XG4gICAgICByZXR1cm4gbmV3IFB1bGxSZXF1ZXN0T3BlbmVkKGNyZWF0ZWRBdCwgYXV0aG9yLCBwdWxsUmVxdWVzdEpzb25bXCJ0aXRsZVwiXSwgcHVsbFJlcXVlc3RKc29uW1wiYm9keVwiXSxcbiAgICAgICAgIHB1bGxSZXF1ZXN0SnNvbltcImh0bWxfdXJsXCJdLCByZWxhdGVkRGVwKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXQgZ2l0aHViUHJvamVjdFVybCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGdpdGh1YklkID0gdGhpcy5yZWxhdGVkRGVwZW5kZW5jeS5naXRodWJJZDtcbiAgICBpZiAoIWdpdGh1YklkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIFwiaHR0cHM6Ly9naXRodWIuY29tL1wiICsgZ2l0aHViSWQuYXV0aG9ySWQgKyBcIi9cIiArIGdpdGh1YklkLnByb2plY3RJZDtcbiAgfVxuXG4gIGdldCBjcmVhdGVkRnJvbU5vdygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZWRBdC5mcm9tTm93KCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY3JlYXRlZEF0OiBtb21lbnQuTW9tZW50LFxuICAgIHB1YmxpYyBhdXRob3I6IEdpdGh1YlVzZXIsXG4gICAgcHVibGljIGV4dGVybmFsTGlua1VybDogc3RyaW5nLFxuICAgIHB1YmxpYyByZWxhdGVkRGVwZW5kZW5jeTogRGVwZW5kZW5jeU1vZGVsKSB7XG4gICAgc3VwZXIoe1xuICAgICAgY3JlYXRlZEF0OiBjcmVhdGVkQXQsXG4gICAgICBhdXRob3I6IGF1dGhvclxuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIElzc3VlRXZlbnQgZXh0ZW5kcyBOZXdzZmVlZEVudHJ5TW9kZWwge1xuXG4gIGdldCBmb3JtYXR0ZWRJc3N1ZUJvZHkoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMucmF3SXNzdWVCb2R5KSB7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuIG1hcmtkb3duLnRvSFRNTCh0aGlzLnJhd0lzc3VlQm9keSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY3JlYXRlZEF0OiBtb21lbnQuTW9tZW50LFxuICAgIHB1YmxpYyBhdXRob3I6IEdpdGh1YlVzZXIsXG4gICAgcHVibGljIGlzc3VlVGl0bGU6IHN0cmluZyxcbiAgICBwdWJsaWMgcmF3SXNzdWVCb2R5OiBzdHJpbmcsXG4gICAgcHVibGljIGV4dGVybmFsTGlua1VybDogc3RyaW5nLFxuICAgIHB1YmxpYyByZWxhdGVkRGVwZW5kZW5jeTogRGVwZW5kZW5jeU1vZGVsKSB7XG4gICAgc3VwZXIoY3JlYXRlZEF0LCBhdXRob3IsIGV4dGVybmFsTGlua1VybCwgcmVsYXRlZERlcGVuZGVuY3kpO1xuICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIElzc3VlT3BlbmVkIGV4dGVuZHMgSXNzdWVFdmVudCB7XG59XG5cbmV4cG9ydCBjbGFzcyBJc3N1ZUNsb3NlZCBleHRlbmRzIElzc3VlRXZlbnQge1xufVxuXG5leHBvcnQgY2xhc3MgSXNzdWVSZW9wZW5lZCBleHRlbmRzIElzc3VlRXZlbnQge1xufVxuXG5leHBvcnQgY2xhc3MgUHVsbFJlcXVlc3RPcGVuZWQgZXh0ZW5kcyBJc3N1ZUV2ZW50IHtcbn1cblxuZXhwb3J0IGNsYXNzIFJlbGVhc2VQdWJsaXNoZWQgZXh0ZW5kcyBOZXdzZmVlZEVudHJ5TW9kZWwge1xuXG4gIGdldCBmb3JtYXR0ZWRDaGFuZ2VMb2coKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbWFya2Rvd24udG9IVE1MKHRoaXMucmF3Q2hhbmdlTG9nKTtcbiAgfVxuXG4gIGdldCBoYXNDaGFuZ2VMb2coKTogYm9vbGVhbiB7XG4gICAgdmFyIHJhd0NoYW5nZUxvZyA9ICh0aGlzLnJhd0NoYW5nZUxvZyB8fCBcIlwiKS50cmltKCk7XG4gICAgcmV0dXJuIHJhd0NoYW5nZUxvZyAhPSBcIlwiO1xuICB9XG5cbiAgZ2V0IG5vT2ZOZXdlclJlbGVhc2VzKCk6IG51bWJlciB7XG4gICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgIHZhciBjb3VudGluZyA9IGZhbHNlO1xuICAgIGNvbnN0IHJlbGVhc2VkVmVyc2lvbiA9IG5ldyBWZXJzaW9uTnVtYmVyKHRoaXMudGFnTmFtZSk7XG4gICAgdGhpcy5yZWxhdGVkRGVwZW5kZW5jeS52ZXJzaW9ucy5mb3JFYWNoKHZlcnNpb24gPT4ge1xuICAgICAgaWYgKFZlcnNpb25OdW1iZXIuZXF1YWwodmVyc2lvbi52ZXJzaW9uTnVtYmVyLCB0aGlzLnJlbGF0ZWREZXBlbmRlbmN5Lm9yaWdpbmFsVmVyc2lvbi52ZXJzaW9uTnVtYmVyKSkge1xuICAgICAgICBjb3VudGluZyA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoY291bnRpbmcgJiYgVmVyc2lvbk51bWJlci5jb21wYXJlKHJlbGVhc2VkVmVyc2lvbiwgdmVyc2lvbi52ZXJzaW9uTnVtYmVyKSA+PSAwKSB7XG4gICAgICAgICsrY291bnRlcjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfVxuXG4gIGdldCBwcm9qZWN0TmFtZSgpIDogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5yZWxhdGVkRGVwZW5kZW5jeS5uYW1lO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGNyZWF0ZWRBdDogbW9tZW50Lk1vbWVudCxcbiAgICBwdWJsaWMgYXV0aG9yOiBHaXRodWJVc2VyLFxuICAgIHB1YmxpYyB0YWdOYW1lOiBzdHJpbmcsXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHRhZ05hbWUsXG4gICAgcHVibGljIGV4dGVybmFsTGlua1VybDogc3RyaW5nLFxuICAgIHB1YmxpYyByZWxhdGVkRGVwZW5kZW5jeTogRGVwZW5kZW5jeU1vZGVsLFxuICAgIHB1YmxpYyByYXdDaGFuZ2VMb2c/OiBzdHJpbmcpIHtcbiAgICBzdXBlcihjcmVhdGVkQXQsIGF1dGhvciwgZXh0ZXJuYWxMaW5rVXJsLCByZWxhdGVkRGVwZW5kZW5jeSk7XG4gICAgaWYgKG5hbWUgPT0gbnVsbCAmJiB0YWdOYW1lICE9IG51bGwpIHtcbiAgICAgIHRoaXMubmFtZSA9IHRhZ05hbWU7XG4gICAgfVxuICB9XG5cbn1cblxuXG5leHBvcnQgY2xhc3MgUHVzaEV2ZW50IGV4dGVuZHMgTmV3c2ZlZWRFbnRyeU1vZGVsIHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY3JlYXRlZEF0OiBtb21lbnQuTW9tZW50LFxuICAgIHB1YmxpYyBhdXRob3I6IEdpdGh1YlVzZXIsXG4gICAgcHVibGljIGNvbW1pdE1lc3NhZ2VzOiBzdHJpbmdbXSxcbiAgICBwdWJsaWMgcmVsYXRlZERlcGVuZGVuY3k6IERlcGVuZGVuY3lNb2RlbCkge1xuICAgIHN1cGVyKGNyZWF0ZWRBdCwgYXV0aG9yLCBudWxsLCByZWxhdGVkRGVwZW5kZW5jeSk7XG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
