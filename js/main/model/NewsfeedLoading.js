define(["require", "exports", "../collection/NewsfeedCollection", "./ProgressIndicator", "./NewsfeedEntryModel", "./PromiseCompletion", "./toPromise"], function (require, exports, NewsfeedCollection_1, ProgressIndicator_1, NewsfeedEntryModel_1, PromiseCompletion_1, toPromise_1) {
    /// <amd-dependency path="promise" />
    function nonNull(arg) {
        return arg !== null;
    }
    var NewsfeedLoading = (function () {
        function NewsfeedLoading(deps) {
            this.deps = deps;
            this._progress = new ProgressIndicator_1.ProgressIndicatorImpl(deps.length);
            var depsByName = _.indexBy(deps, function (dep) { return dep.gitUrl; });
            function depByName(name) {
                var rval = _.find(deps, function (e) {
                    return e.gitUrl.indexOf(name) > -1;
                });
                if (!rval)
                    console.log("could not found dep by name [" + name + "]");
                return rval;
            }
            var requestPromises = _.chain(deps)
                .map(function (dep) { return dep.githubEventsUrl; })
                .filter(nonNull)
                .map(function (url) { return $.getJSON(url); })
                .map(function (xhr) { return toPromise_1.default(xhr); })
                .value();
            this.promise = PromiseCompletion_1.default.waitFor(requestPromises, this._progress)
                .catch(function (errors) { return console.log(errors); })
                .then(function (rawEvents) { return _.chain(rawEvents)
                .flatten(true)
                .map(function (json) { return NewsfeedEntryModel_1.NewsfeedEntryModel.forRawJson(json, depByName(json.repo.name)); })
                .filter(nonNull)
                .value(); })
                .then(function (entries) { return new NewsfeedCollection_1.default(entries); });
        }
        Object.defineProperty(NewsfeedLoading.prototype, "progress", {
            get: function () {
                return this._progress;
            },
            enumerable: true,
            configurable: true
        });
        NewsfeedLoading.prototype.then = function (onFulfilled, onRejected) {
            return this.promise.then(onFulfilled, onRejected);
        };
        NewsfeedLoading.prototype.catch = function (onRejected) {
            return this.promise.catch(onRejected);
        };
        NewsfeedLoading.prototype.done = function (onFulfilled, onRejected) {
            return this.promise.done(onFulfilled, onRejected);
        };
        NewsfeedLoading.prototype.nodeify = function (callback) {
            return this.promise.nodeify(callback);
        };
        return NewsfeedLoading;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = NewsfeedLoading;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vbW9kZWwvTmV3c2ZlZWRMb2FkaW5nLnRzIl0sIm5hbWVzIjpbIm5vbk51bGwiLCJOZXdzZmVlZExvYWRpbmciLCJOZXdzZmVlZExvYWRpbmcuY29uc3RydWN0b3IiLCJOZXdzZmVlZExvYWRpbmcuY29uc3RydWN0b3IuZGVwQnlOYW1lIiwiTmV3c2ZlZWRMb2FkaW5nLnByb2dyZXNzIiwiTmV3c2ZlZWRMb2FkaW5nLnRoZW4iLCJOZXdzZmVlZExvYWRpbmcuY2F0Y2giLCJOZXdzZmVlZExvYWRpbmcuZG9uZSIsIk5ld3NmZWVkTG9hZGluZy5ub2RlaWZ5Il0sIm1hcHBpbmdzIjoiO0lBTUEscUNBQXFDO0lBRXJDLGlCQUFpQixHQUFHO1FBQ2xCQSxNQUFNQSxDQUFDQSxHQUFHQSxLQUFLQSxJQUFJQSxDQUFDQTtJQUN0QkEsQ0FBQ0E7SUFFRDtRQTBCRUMseUJBQW9CQSxJQUF1QkE7WUFBdkJDLFNBQUlBLEdBQUpBLElBQUlBLENBQW1CQTtZQUN6Q0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEseUNBQXFCQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUN4REEsSUFBTUEsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsVUFBQUEsR0FBR0EsSUFBSUEsT0FBQUEsR0FBR0EsQ0FBQ0EsTUFBTUEsRUFBVkEsQ0FBVUEsQ0FBQ0EsQ0FBQ0E7WUFDdERBLG1CQUFtQkEsSUFBWUE7Z0JBQzdCQyxJQUFNQSxJQUFJQSxHQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxVQUFBQSxDQUFDQTtvQkFDMUJBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUNyQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ0hBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElB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RENBLElBQUE7SUF0REQ7cUNBc0RDLENBQUEiLCJmaWxlIjoibWFpbi9tb2RlbC9OZXdzZmVlZExvYWRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV3c2ZlZWRDb2xsZWN0aW9uIGZyb20gXCIuLi9jb2xsZWN0aW9uL05ld3NmZWVkQ29sbGVjdGlvblwiO1xuaW1wb3J0IHtQcm9ncmVzc0luZGljYXRvciwgTk9fUFJPR1JFU1MsIFByb2dyZXNzSW5kaWNhdG9ySW1wbH0gZnJvbSBcIi4vUHJvZ3Jlc3NJbmRpY2F0b3JcIjtcbmltcG9ydCBEZXBlbmRlbmN5TW9kZWwgZnJvbSBcIi4vRGVwZW5kZW5jeU1vZGVsXCI7XG5pbXBvcnQge05ld3NmZWVkRW50cnlNb2RlbH0gZnJvbSBcIi4vTmV3c2ZlZWRFbnRyeU1vZGVsXCI7XG5pbXBvcnQgUHJvbWlzZUNvbXBsZXRpb24gZnJvbSBcIi4vUHJvbWlzZUNvbXBsZXRpb25cIjtcbmltcG9ydCB0b1Byb21pc2UgZnJvbSBcIi4vdG9Qcm9taXNlXCI7XG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJwcm9taXNlXCIgLz5cblxuZnVuY3Rpb24gbm9uTnVsbChhcmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGFyZyAhPT0gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3c2ZlZWRMb2FkaW5nIGltcGxlbWVudHMgUHJvbWlzZS5JVGhlbmFibGU8TmV3c2ZlZWRDb2xsZWN0aW9uPiB7XG5cbiAgcHJpdmF0ZSBwcm9taXNlOiBQcm9taXNlLklUaGVuYWJsZTxOZXdzZmVlZENvbGxlY3Rpb24+O1xuXG4gIHByaXZhdGUgX3Byb2dyZXNzOiBQcm9ncmVzc0luZGljYXRvcjtcblxuICBwdWJsaWMgZ2V0IHByb2dyZXNzKCk6IFByb2dyZXNzSW5kaWNhdG9yIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvZ3Jlc3M7XG4gIH1cblxuICB0aGVuPFI+KG9uRnVsZmlsbGVkPzogKHZhbHVlOiBOZXdzZmVlZENvbGxlY3Rpb24pPT4oUHJvbWlzZS5JVGhlbmFibGU8Uj58UiksIG9uUmVqZWN0ZWQ/OiAoZXJyb3I6IGFueSk9PihQcm9taXNlLklUaGVuYWJsZTxSPnxSKSk6IFByb21pc2UuSVRoZW5hYmxlPFI+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9taXNlLnRoZW48Uj4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpO1xuICB9XG5cbiAgY2F0Y2gob25SZWplY3RlZD86IChlcnJvcjogYW55KT0+KFByb21pc2UuSVRoZW5hYmxlPE5ld3NmZWVkQ29sbGVjdGlvbj58TmV3c2ZlZWRDb2xsZWN0aW9uKSk6IFByb21pc2UuSVRoZW5hYmxlPE5ld3NmZWVkQ29sbGVjdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnByb21pc2UuY2F0Y2gob25SZWplY3RlZCk7XG4gIH1cblxuICBkb25lPFI+KG9uRnVsZmlsbGVkPzogKHZhbHVlOiBOZXdzZmVlZENvbGxlY3Rpb24pPT4oUHJvbWlzZS5JVGhlbmFibGU8Uj58UiksIG9uUmVqZWN0ZWQ/OiAoZXJyb3I6IGFueSk9PihQcm9taXNlLklUaGVuYWJsZTxSPnxSKSk6IFByb21pc2UuSVRoZW5hYmxlPFI+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9taXNlLmRvbmUob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpO1xuICB9XG5cbiAgbm9kZWlmeTxSPihjYWxsYmFjazogRnVuY3Rpb24pOiBQcm9taXNlLklUaGVuYWJsZTxSPiB7XG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZS5ub2RlaWZ5KGNhbGxiYWNrKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVwczogRGVwZW5kZW5jeU1vZGVsW10pIHtcbiAgICB0aGlzLl9wcm9ncmVzcyA9IG5ldyBQcm9ncmVzc0luZGljYXRvckltcGwoZGVwcy5sZW5ndGgpO1xuICAgIGNvbnN0IGRlcHNCeU5hbWUgPSBfLmluZGV4QnkoZGVwcywgZGVwID0+IGRlcC5naXRVcmwpO1xuICAgIGZ1bmN0aW9uIGRlcEJ5TmFtZShuYW1lOiBzdHJpbmcpOiBEZXBlbmRlbmN5TW9kZWwge1xuICAgICAgY29uc3QgcnZhbCA9ICBfLmZpbmQoZGVwcywgZSA9PiB7XG4gICAgICAgIHJldHVybiBlLmdpdFVybC5pbmRleE9mKG5hbWUpID4gLTE7XG4gICAgICB9KTtcbiAgICAgIGlmICghcnZhbCkgY29uc29sZS5sb2coXCJjb3VsZCBub3QgZm91bmQgZGVwIGJ5IG5hbWUgW1wiICsgbmFtZSArIFwiXVwiKVxuICAgICAgcmV0dXJuIHJ2YWw7XG4gICAgfVxuICAgIGNvbnN0IHJlcXVlc3RQcm9taXNlczogUHJvbWlzZS5JVGhlbmFibGU8YW55PltdID0gXy5jaGFpbihkZXBzKVxuICAgICAgLm1hcChkZXAgPT4gIGRlcC5naXRodWJFdmVudHNVcmwpXG4gICAgICAuZmlsdGVyKG5vbk51bGwpXG4gICAgICAubWFwKHVybCA9PiAkLmdldEpTT04odXJsKSlcbiAgICAgIC5tYXAoeGhyID0+IHRvUHJvbWlzZSh4aHIpKVxuICAgICAgLnZhbHVlKCk7XG4gICAgdGhpcy5wcm9taXNlID0gUHJvbWlzZUNvbXBsZXRpb24ud2FpdEZvcihyZXF1ZXN0UHJvbWlzZXMsIHRoaXMuX3Byb2dyZXNzKVxuICAgICAgLmNhdGNoKGVycm9ycyA9PiBjb25zb2xlLmxvZyhlcnJvcnMpKVxuICAgICAgLnRoZW4ocmF3RXZlbnRzID0+IF8uY2hhaW4ocmF3RXZlbnRzKVxuICAgICAgICAuZmxhdHRlbih0cnVlKVxuICAgICAgICAubWFwKGpzb24gPT4gTmV3c2ZlZWRFbnRyeU1vZGVsLmZvclJhd0pzb24oanNvbiwgZGVwQnlOYW1lKGpzb24ucmVwby5uYW1lKSkpXG4gICAgICAgIC5maWx0ZXIobm9uTnVsbClcbiAgICAgICAgLnZhbHVlKCkpXG4gICAgICAudGhlbihlbnRyaWVzID0+IG5ldyBOZXdzZmVlZENvbGxlY3Rpb24oZW50cmllcykpO1xuICB9XG5cblxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
