var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "backbone", "../model/NewsfeedEntryModel", "handlebars", "text!../template/newsfeed-entry-release-published.html", "text!../template/newsfeed-entry-issue.html", "text!../template/newsfeed-entry-push.html"], function (require, exports, Backbone, NewsfeedEntryModel_1, Handlebars) {
    var releasePublishedTemplate = Handlebars.compile(require("text!../template/newsfeed-entry-release-published.html"));
    var issueEventTemplate = Handlebars.compile(require("text!../template/newsfeed-entry-issue.html"));
    var pushEventTemplate = Handlebars.compile(require("text!../template/newsfeed-entry-push.html"));
    var IssueEventView = (function (_super) {
        __extends(IssueEventView, _super);
        function IssueEventView(entry, action, entity) {
            _super.call(this, {
                model: entry,
                className: "cnt-newsfeed-entry panel panel-info"
            });
            this.action = action;
            this.entity = entity;
            this.template = issueEventTemplate;
        }
        IssueEventView.prototype.render = function () {
            this.$el.html(this.template({
                entry: this.model,
                action: this.action,
                entity: this.entity
            }));
            return this;
        };
        return IssueEventView;
    })(Backbone.View);
    var ReleasePublishedView = (function (_super) {
        __extends(ReleasePublishedView, _super);
        function ReleasePublishedView(entry) {
            _super.call(this, {
                model: entry,
                className: "cnt-newsfeed-entry panel panel-warning"
            });
            this.template = releasePublishedTemplate;
        }
        ReleasePublishedView.prototype.render = function () {
            this.$el.html(this.template(this.model));
            return this;
        };
        return ReleasePublishedView;
    })(Backbone.View);
    var PushEventView = (function (_super) {
        __extends(PushEventView, _super);
        function PushEventView(entry) {
            _super.call(this, {
                model: entry,
                className: "cnt-newsfeed-entry panel panel-info"
            });
            this.template = pushEventTemplate;
        }
        PushEventView.prototype.render = function () {
            this.$el.html(this.template(this.model));
            return this;
        };
        return PushEventView;
    })(Backbone.View);
    function createViewFor(entry) {
        if (entry instanceof NewsfeedEntryModel_1.ReleasePublished) {
            return new ReleasePublishedView(entry);
        }
        else if (entry instanceof NewsfeedEntryModel_1.IssueEvent) {
            var action, entity = "issue";
            if (entry instanceof NewsfeedEntryModel_1.IssueOpened) {
                action = "opened";
            }
            else if (entry instanceof NewsfeedEntryModel_1.IssueClosed) {
                action = "closed";
            }
            else if (entry instanceof NewsfeedEntryModel_1.IssueReopened) {
                action = "reopened";
            }
            else if (entry instanceof NewsfeedEntryModel_1.PullRequestOpened) {
                action = "opened";
                entity = "pull request";
            }
            return new IssueEventView(entry, action, entity);
        }
        else if (entry instanceof NewsfeedEntryModel_1.PushEvent) {
            return new PushEventView(entry);
        }
        return null;
    }
    exports.createViewFor = createViewFor;
    var NewsfeedView = (function (_super) {
        __extends(NewsfeedView, _super);
        function NewsfeedView(newsfeed) {
            _super.call(this, {
                className: "cnt-newsfeed"
            });
            this.newsfeed = newsfeed;
            this.listenTo(newsfeed, "pageShown", this.displayViewsFor);
        }
        NewsfeedView.prototype.events = function () {
            return {
                "scroll": "onScroll"
            };
        };
        NewsfeedView.prototype.onScroll = function () {
            if (this.$el.scrollTop() + this.$el.innerHeight() >= this.$el[0].scrollHeight) {
                this.newsfeed.nextPage();
            }
        };
        NewsfeedView.prototype.displayViewsFor = function (entryModels) {
            var _this = this;
            _.chain(entryModels).map(createViewFor)
                .filter(function (view) { return view != null; })
                .each(function (view) { return view.render(); })
                .map(function (view) { return view.$el; })
                .each(function ($el) { return $el.appendTo(_this.$el); });
        };
        NewsfeedView.prototype.render = function () {
            this.$el.empty();
            this.displayViewsFor(this.newsfeed.visibleEntries);
            return this;
        };
        return NewsfeedView;
    })(Backbone.View);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = NewsfeedView;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vdmlldy9OZXdzZmVlZFZpZXcudHMiXSwibmFtZXMiOlsiSXNzdWVFdmVudFZpZXciLCJJc3N1ZUV2ZW50Vmlldy5jb25zdHJ1Y3RvciIsIklzc3VlRXZlbnRWaWV3LnJlbmRlciIsIlJlbGVhc2VQdWJsaXNoZWRWaWV3IiwiUmVsZWFzZVB1Ymxpc2hlZFZpZXcuY29uc3RydWN0b3IiLCJSZWxlYXNlUHVibGlzaGVkVmlldy5yZW5kZXIiLCJQdXNoRXZlbnRWaWV3IiwiUHVzaEV2ZW50Vmlldy5jb25zdHJ1Y3RvciIsIlB1c2hFdmVudFZpZXcucmVuZGVyIiwiY3JlYXRlVmlld0ZvciIsIk5ld3NmZWVkVmlldyIsIk5ld3NmZWVkVmlldy5jb25zdHJ1Y3RvciIsIk5ld3NmZWVkVmlldy5ldmVudHMiLCJOZXdzZmVlZFZpZXcub25TY3JvbGwiLCJOZXdzZmVlZFZpZXcuZGlzcGxheVZpZXdzRm9yIiwiTmV3c2ZlZWRWaWV3LnJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBWUEsSUFBTSx3QkFBd0IsR0FDNUIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsd0RBQXdELENBQUMsQ0FBQyxDQUFDO0lBRXhGLElBQU0sa0JBQWtCLEdBQ3RCLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLDRDQUE0QyxDQUFDLENBQUMsQ0FBQztJQUU1RSxJQUFNLGlCQUFpQixHQUNyQixVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDLENBQUM7SUFFM0U7UUFBNkJBLGtDQUF5QkE7UUFJcERBLHdCQUFZQSxLQUFpQkEsRUFBVUEsTUFBY0EsRUFBVUEsTUFBY0E7WUFDM0VDLGtCQUFNQTtnQkFDSkEsS0FBS0EsRUFBRUEsS0FBS0E7Z0JBQ1pBLFNBQVNBLEVBQUVBLHFDQUFxQ0E7YUFDakRBLENBQUNBLENBQUNBO1lBSmtDQSxXQUFNQSxHQUFOQSxNQUFNQSxDQUFRQTtZQUFVQSxXQUFNQSxHQUFOQSxNQUFNQSxDQUFR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c2ZlZWRWaWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi90ZW1wbGF0ZS9uZXdzZmVlZC1lbnRyeS1yZWxlYXNlLXB1Ymxpc2hlZC5odG1sXCIgLz5cbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vdGVtcGxhdGUvbmV3c2ZlZWQtZW50cnktaXNzdWUuaHRtbFwiIC8+XG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL3RlbXBsYXRlL25ld3NmZWVkLWVudHJ5LXB1c2guaHRtbFwiIC8+XG5pbXBvcnQgQmFja2JvbmUgPSByZXF1aXJlKFwiYmFja2JvbmVcIik7XG5pbXBvcnQgUHJvamVjdE1vZGVsIGZyb20gXCIuLi9tb2RlbC9Qcm9qZWN0TW9kZWxcIjtcbmltcG9ydCBOZXdzZmVlZENvbGxlY3Rpb24gZnJvbSBcIi4uL2NvbGxlY3Rpb24vTmV3c2ZlZWRDb2xsZWN0aW9uXCI7XG5pbXBvcnQge1xuICBOZXdzZmVlZEVudHJ5TW9kZWwsIFJlbGVhc2VQdWJsaXNoZWQsIElzc3VlRXZlbnQsIElzc3VlT3BlbmVkLCBJc3N1ZUNsb3NlZCwgSXNzdWVSZW9wZW5lZCwgUHVzaEV2ZW50LFxuICBQdWxsUmVxdWVzdE9wZW5lZFxufSBmcm9tIFwiLi4vbW9kZWwvTmV3c2ZlZWRFbnRyeU1vZGVsXCI7XG5pbXBvcnQgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJoYW5kbGViYXJzXCIpO1xuXG5jb25zdCByZWxlYXNlUHVibGlzaGVkVGVtcGxhdGUgPVxuICBIYW5kbGViYXJzLmNvbXBpbGUocmVxdWlyZShcInRleHQhLi4vdGVtcGxhdGUvbmV3c2ZlZWQtZW50cnktcmVsZWFzZS1wdWJsaXNoZWQuaHRtbFwiKSk7XG5cbmNvbnN0IGlzc3VlRXZlbnRUZW1wbGF0ZSA9XG4gIEhhbmRsZWJhcnMuY29tcGlsZShyZXF1aXJlKFwidGV4dCEuLi90ZW1wbGF0ZS9uZXdzZmVlZC1lbnRyeS1pc3N1ZS5odG1sXCIpKTtcblxuY29uc3QgcHVzaEV2ZW50VGVtcGxhdGUgPVxuICBIYW5kbGViYXJzLmNvbXBpbGUocmVxdWlyZShcInRleHQhLi4vdGVtcGxhdGUvbmV3c2ZlZWQtZW50cnktcHVzaC5odG1sXCIpKTtcblxuY2xhc3MgSXNzdWVFdmVudFZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3PElzc3VlRXZlbnQ+IHtcblxuICBwcml2YXRlIHRlbXBsYXRlID0gaXNzdWVFdmVudFRlbXBsYXRlO1xuXG4gIGNvbnN0cnVjdG9yKGVudHJ5OiBJc3N1ZUV2ZW50LCBwcml2YXRlIGFjdGlvbjogc3RyaW5nLCBwcml2YXRlIGVudGl0eTogc3RyaW5nKSB7XG4gICAgc3VwZXIoe1xuICAgICAgbW9kZWw6IGVudHJ5LFxuICAgICAgY2xhc3NOYW1lOiBcImNudC1uZXdzZmVlZC1lbnRyeSBwYW5lbCBwYW5lbC1pbmZvXCJcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKTogSXNzdWVFdmVudFZpZXcge1xuICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh7XG4gICAgICBlbnRyeTogdGhpcy5tb2RlbCxcbiAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb24sXG4gICAgICBlbnRpdHk6IHRoaXMuZW50aXR5XG4gICAgfSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbn1cblxuY2xhc3MgUmVsZWFzZVB1Ymxpc2hlZFZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3PFJlbGVhc2VQdWJsaXNoZWQ+IHtcblxuICBwcml2YXRlIHRlbXBsYXRlID0gcmVsZWFzZVB1Ymxpc2hlZFRlbXBsYXRlO1xuXG4gIGNvbnN0cnVjdG9yKGVudHJ5OiBSZWxlYXNlUHVibGlzaGVkKSB7XG4gICAgc3VwZXIoe1xuICAgICAgbW9kZWw6IGVudHJ5LFxuICAgICAgY2xhc3NOYW1lOiBcImNudC1uZXdzZmVlZC1lbnRyeSBwYW5lbCBwYW5lbC13YXJuaW5nXCJcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpOiBSZWxlYXNlUHVibGlzaGVkVmlldyB7XG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHRoaXMubW9kZWwpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG59XG5cbmNsYXNzIFB1c2hFdmVudFZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3PFB1c2hFdmVudD4ge1xuXG4gIHByaXZhdGUgdGVtcGxhdGUgPSBwdXNoRXZlbnRUZW1wbGF0ZTtcblxuICBjb25zdHJ1Y3RvcihlbnRyeTogUHVzaEV2ZW50KSB7XG4gICAgc3VwZXIoe1xuICAgICAgbW9kZWw6IGVudHJ5LFxuICAgICAgY2xhc3NOYW1lOiBcImNudC1uZXdzZmVlZC1lbnRyeSBwYW5lbCBwYW5lbC1pbmZvXCJcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKTogUHVzaEV2ZW50VmlldyB7XG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHRoaXMubW9kZWwpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWaWV3Rm9yKGVudHJ5OiBOZXdzZmVlZEVudHJ5TW9kZWwpOiBCYWNrYm9uZS5WaWV3PE5ld3NmZWVkRW50cnlNb2RlbD4ge1xuICBpZiAoZW50cnkgaW5zdGFuY2VvZiBSZWxlYXNlUHVibGlzaGVkKSB7XG4gICAgcmV0dXJuIG5ldyBSZWxlYXNlUHVibGlzaGVkVmlldyhlbnRyeSBhcyBSZWxlYXNlUHVibGlzaGVkKTtcbiAgfSBlbHNlIGlmIChlbnRyeSBpbnN0YW5jZW9mIElzc3VlRXZlbnQpIHtcbiAgICB2YXIgYWN0aW9uLCBlbnRpdHkgPSBcImlzc3VlXCI7XG4gICAgaWYgKGVudHJ5IGluc3RhbmNlb2YgSXNzdWVPcGVuZWQpIHtcbiAgICAgIGFjdGlvbiA9IFwib3BlbmVkXCI7XG4gICAgfSBlbHNlIGlmIChlbnRyeSBpbnN0YW5jZW9mIElzc3VlQ2xvc2VkKSB7XG4gICAgICBhY3Rpb24gPSBcImNsb3NlZFwiO1xuICAgIH0gZWxzZSBpZiAoZW50cnkgaW5zdGFuY2VvZiBJc3N1ZVJlb3BlbmVkKSB7XG4gICAgICBhY3Rpb24gPSBcInJlb3BlbmVkXCI7XG4gICAgfSBlbHNlIGlmIChlbnRyeSBpbnN0YW5jZW9mIFB1bGxSZXF1ZXN0T3BlbmVkKSB7XG4gICAgICBhY3Rpb24gPSBcIm9wZW5lZFwiO1xuICAgICAgZW50aXR5ID0gXCJwdWxsIHJlcXVlc3RcIjtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBJc3N1ZUV2ZW50VmlldyhlbnRyeSwgYWN0aW9uLCBlbnRpdHkpO1xuICB9IGVsc2UgaWYgKGVudHJ5IGluc3RhbmNlb2YgUHVzaEV2ZW50KSB7XG4gICAgcmV0dXJuIG5ldyBQdXNoRXZlbnRWaWV3KGVudHJ5IGFzIFB1c2hFdmVudCk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld3NmZWVkVmlldyBleHRlbmRzIEJhY2tib25lLlZpZXc8UHJvamVjdE1vZGVsPiB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZXdzZmVlZDogTmV3c2ZlZWRDb2xsZWN0aW9uKSAge1xuICAgIHN1cGVyKHtcbiAgICAgIGNsYXNzTmFtZTogXCJjbnQtbmV3c2ZlZWRcIlxuICAgIH0pO1xuICAgIHRoaXMubGlzdGVuVG8obmV3c2ZlZWQsIFwicGFnZVNob3duXCIsIHRoaXMuZGlzcGxheVZpZXdzRm9yKTtcbiAgfVxuXG4gIGV2ZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgXCJzY3JvbGxcIiA6IFwib25TY3JvbGxcIlxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgb25TY3JvbGwoKSB7XG4gICAgaWYodGhpcy4kZWwuc2Nyb2xsVG9wKCkgKyB0aGlzLiRlbC5pbm5lckhlaWdodCgpID49IHRoaXMuJGVsWzBdLnNjcm9sbEhlaWdodCkge1xuICAgICAgdGhpcy5uZXdzZmVlZC5uZXh0UGFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGlzcGxheVZpZXdzRm9yKGVudHJ5TW9kZWxzOiBOZXdzZmVlZEVudHJ5TW9kZWxbXSkge1xuICAgIF8uY2hhaW4oZW50cnlNb2RlbHMpLm1hcChjcmVhdGVWaWV3Rm9yKVxuICAgICAgLmZpbHRlcih2aWV3ID0+IHZpZXcgIT0gbnVsbClcbiAgICAgIC5lYWNoKHZpZXcgPT4gdmlldy5yZW5kZXIoKSlcbiAgICAgIC5tYXAodmlldyA9PiB2aWV3LiRlbClcbiAgICAgIC5lYWNoKCRlbCA9PiAkZWwuYXBwZW5kVG8odGhpcy4kZWwpKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgdGhpcy4kZWwuZW1wdHkoKTtcbiAgICB0aGlzLmRpc3BsYXlWaWV3c0Zvcih0aGlzLm5ld3NmZWVkLnZpc2libGVFbnRyaWVzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
