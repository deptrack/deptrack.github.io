var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "backbone", "../model/NewsfeedLoading"], function (require, exports, Backbone, NewsfeedLoading_1) {
    /// <amd-dependency path="promise" />
    var NewsfeedCollection = (function (_super) {
        __extends(NewsfeedCollection, _super);
        function NewsfeedCollection(allEntries, pageSize) {
            if (pageSize === void 0) { pageSize = 10; }
            _super.call(this, []);
            this.pageSize = pageSize;
            this.visibleEntryCount = 0;
            this.visibleEntryCount = pageSize;
            this.allEntries = allEntries.sort(function (a, b) { return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime(); });
            this.reset(this.allEntries);
        }
        NewsfeedCollection.createFor = function (deps) {
            return new NewsfeedLoading_1.default(deps);
        };
        Object.defineProperty(NewsfeedCollection.prototype, "visibleEntries", {
            get: function () {
                return this.allEntries.slice(0, Math.min(this.visibleEntryCount, this.allEntries.length));
            },
            enumerable: true,
            configurable: true
        });
        ;
        NewsfeedCollection.prototype.nextPage = function () {
            var args = this.allEntries.slice(this.visibleEntryCount, this.visibleEntryCount += this.pageSize);
            this.trigger("pageShown", args);
        };
        return NewsfeedCollection;
    })(Backbone.Collection);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = NewsfeedCollection;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vY29sbGVjdGlvbi9OZXdzZmVlZENvbGxlY3Rpb24udHMiXSwibmFtZXMiOlsiTmV3c2ZlZWRDb2xsZWN0aW9uIiwiTmV3c2ZlZWRDb2xsZWN0aW9uLmNvbnN0cnVjdG9yIiwiTmV3c2ZlZWRDb2xsZWN0aW9uLmNyZWF0ZUZvciIsIk5ld3NmZWVkQ29sbGVjdGlvbi52aXNpYmxlRW50cmllcyIsIk5ld3NmZWVkQ29sbGVjdGlvbi5uZXh0UGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBTUEscUNBQXFDO0lBRXJDO1FBQWdEQSxzQ0FBdUNBO1FBY3JGQSw0QkFBWUEsVUFBZ0NBLEVBQ2hDQSxRQUFxQkE7WUFBN0JDLHdCQUE2QkEsR0FBN0JBLGFBQTZCQTtZQUMvQkEsa0JBQU1BLEVBQUVBLENBQUNBLENBQUNBO1lBREFBLGFBQVFBLEdBQVJBLFFBQVFBLENBQWFBO1lBUHpCQSxzQkFBaUJBLEdBQVdBLENBQUNBLENBQUNBO1lBU3BDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLFFBQVFBLENBQUNBO1lBQ2xDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFNQSxPQUFBQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxPQUFPQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxPQUFPQSxFQUFFQSxFQUEvREEsQ0FBK0RBLENBQUNBLENBQUNBO1lBQzlHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUM5QkEsQ0FBQ0E7UUFsQk1ELDRCQUFTQSxHQUFoQkEsVUFBaUJBLElBQXVCQTtZQUN0Q0UsTUFBTUEsQ0FBQ0EsSUFBSUEseUJBQWVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ25DQSxDQUFDQTtRQU1ERixzQkFBV0EsOENBQWNBO2lCQUF6QkE7Z0JBQ0VHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsRUFBRUEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDNUZBLENBQUNBOzs7V0FBQUg7O1FBVU1BLHFDQUFRQSxHQUFmQTtZQUNFSSxJQUFNQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEVBQUVBLElBQUlBLENBQUNBLGlCQUFpQkEsSUFBSUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDcEdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1FBQ2xDQSxDQUFDQTtRQUVISix5QkFBQ0E7SUFBREEsQ0EzQkEsQUEyQkNBLEVBM0IrQyxRQUFRLENBQUMsVUFBVSxFQTJCbEU7SUEzQkQ7d0NBMkJDLENBQUEiLCJmaWxlIjoibWFpbi9jb2xsZWN0aW9uL05ld3NmZWVkQ29sbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSA9IHJlcXVpcmUoXCJiYWNrYm9uZVwiKTtcbmltcG9ydCB7IE5ld3NmZWVkRW50cnlNb2RlbCB9IGZyb20gXCIuLi9tb2RlbC9OZXdzZmVlZEVudHJ5TW9kZWxcIjtcbmltcG9ydCBEZXBlbmRlbmN5TW9kZWwgZnJvbSBcIi4uL21vZGVsL0RlcGVuZGVuY3lNb2RlbFwiO1xuaW1wb3J0IHRvUHJvbWlzZSBmcm9tIFwiLi4vbW9kZWwvdG9Qcm9taXNlXCI7XG5pbXBvcnQgUHJvbWlzZUNvbXBsZXRpb24gZnJvbSBcIi4uL21vZGVsL1Byb21pc2VDb21wbGV0aW9uXCJcbmltcG9ydCBOZXdzZmVlZExvYWRpbmcgZnJvbSBcIi4uL21vZGVsL05ld3NmZWVkTG9hZGluZ1wiO1xuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwicHJvbWlzZVwiIC8+XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld3NmZWVkQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb248TmV3c2ZlZWRFbnRyeU1vZGVsPiB7XG5cbiAgc3RhdGljIGNyZWF0ZUZvcihkZXBzOiBEZXBlbmRlbmN5TW9kZWxbXSk6IFByb21pc2UuSVRoZW5hYmxlPE5ld3NmZWVkQ29sbGVjdGlvbj4ge1xuICAgIHJldHVybiBuZXcgTmV3c2ZlZWRMb2FkaW5nKGRlcHMpO1xuICB9XG5cbiAgcHVibGljIGFsbEVudHJpZXM6IE5ld3NmZWVkRW50cnlNb2RlbFtdO1xuXG4gIHByaXZhdGUgdmlzaWJsZUVudHJ5Q291bnQ6IG51bWJlciA9IDA7XG5cbiAgcHVibGljIGdldCB2aXNpYmxlRW50cmllcygpOiBOZXdzZmVlZEVudHJ5TW9kZWxbXSB7XG4gICAgcmV0dXJuIHRoaXMuYWxsRW50cmllcy5zbGljZSgwLCBNYXRoLm1pbih0aGlzLnZpc2libGVFbnRyeUNvdW50LCB0aGlzLmFsbEVudHJpZXMubGVuZ3RoKSk7XG4gIH07XG5cbiAgY29uc3RydWN0b3IoYWxsRW50cmllczogTmV3c2ZlZWRFbnRyeU1vZGVsW10sXG4gICAgICBwcml2YXRlIHBhZ2VTaXplOiBudW1iZXIgPSAxMCkge1xuICAgIHN1cGVyKFtdKTtcbiAgICB0aGlzLnZpc2libGVFbnRyeUNvdW50ID0gcGFnZVNpemU7XG4gICAgdGhpcy5hbGxFbnRyaWVzID0gYWxsRW50cmllcy5zb3J0KChhLCBiKSA9PiAgYi5jcmVhdGVkQXQudG9EYXRlKCkuZ2V0VGltZSgpIC0gYS5jcmVhdGVkQXQudG9EYXRlKCkuZ2V0VGltZSgpKTtcbiAgICB0aGlzLnJlc2V0KHRoaXMuYWxsRW50cmllcyk7XG4gIH1cblxuICBwdWJsaWMgbmV4dFBhZ2UoKTogdm9pZCB7XG4gICAgY29uc3QgYXJncyA9IHRoaXMuYWxsRW50cmllcy5zbGljZSh0aGlzLnZpc2libGVFbnRyeUNvdW50LCB0aGlzLnZpc2libGVFbnRyeUNvdW50ICs9IHRoaXMucGFnZVNpemUpO1xuICAgIHRoaXMudHJpZ2dlcihcInBhZ2VTaG93blwiLCBhcmdzKTtcbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
