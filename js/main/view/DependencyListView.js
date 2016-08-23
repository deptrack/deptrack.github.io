/// <amd-dependency path="text!../template/dependencylist.html" />
/// <amd-dependency path="text!../template/dependencylist-item.html" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "backbone", "handlebars", "clipboard", "text!../template/dependencylist.html", "text!../template/dependencylist-item.html"], function (require, exports, Backbone, Handlebars, Clipboard) {
    var itemTemplate = Handlebars.compile(require("text!../template/dependencylist-item.html"));
    var template = Handlebars.compile(require("text!../template/dependencylist.html"));
    var DependencyListView = (function (_super) {
        __extends(DependencyListView, _super);
        function DependencyListView(model) {
            _super.call(this, { model: model });
            this.template = template;
        }
        DependencyListView.prototype.events = function () {
            return {
                "click .btn-reset": "resetVersions",
                "click .btn-view-packagejson": "viewPackageJson",
                "click #dlg-package-json .btn-close": "hidePackageJson"
            };
        };
        DependencyListView.prototype.resetVersions = function () {
            this.model.reset();
        };
        DependencyListView.prototype.dlgPackageJson = function () {
            return this.$("#dlg-package-json");
        };
        DependencyListView.prototype.viewPackageJson = function () {
            _paq.push(['trackEvent', 'User', 'ViewMyUpdateDep']);
            this.dlgPackageJson().modal();
            this.dlgPackageJson().find("textarea").val(this.model.formattedPackageJson);
            new Clipboard("#dlg-package-json .btn-clipboard");
        };
        DependencyListView.prototype.hidePackageJson = function () {
            this.dlgPackageJson().modal("hide");
        };
        DependencyListView.prototype.render = function () {
            this.$el.html(this.template({
                project: this.model
            }));
            var $listGroup = this.$el.find(".list-group");
            this.model.dependencies.each(function (dep) { return new DependencyView(dep).render().$el.appendTo($listGroup); });
            return this;
        };
        return DependencyListView;
    })(Backbone.View);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = DependencyListView;
    var DependencyView = (function (_super) {
        __extends(DependencyView, _super);
        function DependencyView(model) {
            _super.call(this, {
                model: model,
                tagName: "span",
                className: "list-group-item"
            });
            this.template = itemTemplate;
            this.listenTo(this.model, "change", this.render);
        }
        DependencyView.prototype.events = function () {
            return {
                "change select": "changeCurrentVersion"
            };
        };
        DependencyView.prototype.changeCurrentVersion = function (event) {
            this.model.setCurrentVersion($(event.target).val());
        };
        DependencyView.prototype.render = function (model) {
            if (model === void 0) { model = this.model; }
            this.$el.html(this.template(model));
            this.$("select").val(model.currentVersion.versionNumber.rawVersionString);
            return this;
        };
        return DependencyView;
    })(Backbone.View);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vdmlldy9EZXBlbmRlbmN5TGlzdFZpZXcudHMiXSwibmFtZXMiOlsiRGVwZW5kZW5jeUxpc3RWaWV3IiwiRGVwZW5kZW5jeUxpc3RWaWV3LmNvbnN0cnVjdG9yIiwiRGVwZW5kZW5jeUxpc3RWaWV3LmV2ZW50cyIsIkRlcGVuZGVuY3lMaXN0Vmlldy5yZXNldFZlcnNpb25zIiwiRGVwZW5kZW5jeUxpc3RWaWV3LmRsZ1BhY2thZ2VKc29uIiwiRGVwZW5kZW5jeUxpc3RWaWV3LnZpZXdQYWNrYWdlSnNvbiIsIkRlcGVuZGVuY3lMaXN0Vmlldy5oaWRlUGFja2FnZUpzb24iLCJEZXBlbmRlbmN5TGlzdFZpZXcucmVuZGVyIiwiRGVwZW5kZW5jeVZpZXciLCJEZXBlbmRlbmN5Vmlldy5jb25zdHJ1Y3RvciIsIkRlcGVuZGVuY3lWaWV3LmV2ZW50cyIsIkRlcGVuZGVuY3lWaWV3LmNoYW5nZUN1cnJlbnRWZXJzaW9uIiwiRGVwZW5kZW5jeVZpZXcucmVuZGVyIl0sIm1hcHBpbmdzIjoiQUFBQSxrRUFBa0U7QUFDbEUsdUVBQXVFOzs7Ozs7O0lBUXZFLElBQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLDJDQUEyQyxDQUFDLENBQUMsQ0FBQztJQUU5RixJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLENBQUM7SUFJckY7UUFBZ0RBLHNDQUEyQkE7UUErQnpFQSw0QkFBWUEsS0FBbUJBO1lBQzdCQyxrQkFBTUEsRUFBRUEsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUE5QmxCQSxhQUFRQSxHQUFHQSxRQUFRQSxDQUFDQTtRQStCNUJBLENBQUNBO1FBN0JNRCxtQ0FBTUEsR0FBYkE7WUFDRUUsTUFBTUEsQ0FBQ0E7Z0JBQ0xBLGtCQUFrQkEsRUFBRUEsZUFBZUE7Z0JBQ25DQSw2QkFBNkJBLEVBQUVBLGlCQUFpQkE7Z0JBQ2hEQSxvQ0FBb0NBLEVBQUdBLGlCQUFpQkE7YUFDekRBLENBQUNBO1FBQ0pBLENBQUNBO1FBRU1GLDBDQUFhQSxHQUFwQkE7WUFDRUcsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7UUFDckJBLENBQUNBO1FBRU1ILDJDQUFjQSxHQUFyQkE7WUFDRUksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxDQUFDQTtRQUNyQ0EsQ0FBQ0E7UUFFTUosNENBQWVBLEdBQXRCQTtZQUNFSyxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxZQUFZQSxFQUFFQSxNQUFNQSxFQUFFQSxpQkFBaUJBLENBQUNBLENBQUNBLENBQUNBO1lBQ3JEQSxJQUFJQSxDQUFDQSxjQUFjQSxFQUFFQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtZQUM5QkEsSUFBSUEsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxDQUFDQTtZQUM1RUEsSUFBSUEsU0FBU0EsQ0FBQ0Esa0NBQWtDQSxDQUFDQSxDQUFDQTtRQUNwREEsQ0FBQ0E7UUFFTUwsNENBQWVBLEdBQXRCQTtZQUNFTSxJQUFJQSxDQUFDQSxjQUFjQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUN0Q0EsQ0FBQ0E7UUFNRE4sbUNBQU1BLEdBQU5BO1lBQ0VPLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO2dCQUMxQkEsT0FBT0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0E7YUFDcEJBLENBQUNBLENBQUNBLENBQUNBO1lBQ0pBLElBQUlBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1lBQzlDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFBQSxHQUFHQSxJQUFJQSxPQUFBQSxJQUFJQSxjQUFjQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQSxFQUF6REEsQ0FBeURBLENBQUNBLENBQUNBO1lBQy9GQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNkQSxDQUFDQTtRQUVIUCx5QkFBQ0E7SUFBREEsQ0E1Q0EsQUE0Q0NBLEVBNUMrQyxRQUFRLENBQUMsSUFBSSxFQTRDNUQ7SUE1Q0Q7d0NBNENDLENBQUE7SUFFRDtRQUE2QlEsa0NBQThCQTtRQUl6REEsd0JBQVlBLEtBQXNCQTtZQUNoQ0Msa0JBQU1BO2dCQUNKQSxLQUFLQSxFQUFFQSxLQUFLQTtnQkFDWkEsT0FBT0EsRUFBRUEsTUFBTUE7Z0JBQ2ZBLFNBQVNBLEVBQUVBLGlCQUFpQkE7YUFDN0JBLENBQUNBLENBQUNBO1lBUEdBLGFBQVFBLEdBQUdBLFlBQVlBLENBQUNBO1lBUTlCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUNuREEsQ0FBQ0E7UUFFREQsK0JBQU1BLEdBQU5BO1lBQ0VFLE1BQU1BLENBQUNBO2dCQUNMQSxlQUFlQSxFQUFFQSxzQkFBc0JBO2FBQ3hDQSxDQUFDQTtRQUNKQSxDQUFDQTtRQUVERiw2Q0FBb0JBLEdBQXBCQSxVQUFxQkEsS0FBd0JBO1lBQzNDRyxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBO1FBQ3REQSxDQUFDQTtRQUVESCwrQkFBTUEsR0FBTkEsVUFBT0EsS0FBbUNBO1lBQW5DSSxxQkFBbUNBLEdBQW5DQSxRQUF5QkEsSUFBSUEsQ0FBQ0EsS0FBS0E7WUFDeENBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1lBQ3BDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxjQUFjQSxDQUFDQSxhQUFhQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBO1lBQzFFQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNkQSxDQUFDQTtRQUVISixxQkFBQ0E7SUFBREEsQ0E3QkEsQUE2QkNBLEVBN0I0QixRQUFRLENBQUMsSUFBSSxFQTZCekMiLCJmaWxlIjoibWFpbi92aWV3L0RlcGVuZGVuY3lMaXN0Vmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vdGVtcGxhdGUvZGVwZW5kZW5jeWxpc3QuaHRtbFwiIC8+XG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL3RlbXBsYXRlL2RlcGVuZGVuY3lsaXN0LWl0ZW0uaHRtbFwiIC8+XG5cbmltcG9ydCBCYWNrYm9uZSA9IHJlcXVpcmUoXCJiYWNrYm9uZVwiKTtcbmltcG9ydCBQcm9qZWN0TW9kZWwgZnJvbSBcIi4uL21vZGVsL1Byb2plY3RNb2RlbFwiO1xuaW1wb3J0IERlcGVuZGVuY3lNb2RlbCBmcm9tIFwiLi4vbW9kZWwvRGVwZW5kZW5jeU1vZGVsXCI7XG5pbXBvcnQgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJoYW5kbGViYXJzXCIpO1xuaW1wb3J0IENsaXBib2FyZCA9IHJlcXVpcmUoXCJjbGlwYm9hcmRcIik7XG5cbmNvbnN0IGl0ZW1UZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShyZXF1aXJlKFwidGV4dCEuLi90ZW1wbGF0ZS9kZXBlbmRlbmN5bGlzdC1pdGVtLmh0bWxcIikpO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShyZXF1aXJlKFwidGV4dCEuLi90ZW1wbGF0ZS9kZXBlbmRlbmN5bGlzdC5odG1sXCIpKTtcblxuZGVjbGFyZSB2YXIgX3BhcTogYW55W107XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlcGVuZGVuY3lMaXN0VmlldyBleHRlbmRzIEJhY2tib25lLlZpZXc8UHJvamVjdE1vZGVsPiB7XG5cbiAgcHJpdmF0ZSB0ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuXG4gIHB1YmxpYyBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFwiY2xpY2sgLmJ0bi1yZXNldFwiOiBcInJlc2V0VmVyc2lvbnNcIixcbiAgICAgIFwiY2xpY2sgLmJ0bi12aWV3LXBhY2thZ2Vqc29uXCI6IFwidmlld1BhY2thZ2VKc29uXCIsXG4gICAgICBcImNsaWNrICNkbGctcGFja2FnZS1qc29uIC5idG4tY2xvc2VcIiA6IFwiaGlkZVBhY2thZ2VKc29uXCJcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHJlc2V0VmVyc2lvbnMoKSB7XG4gICAgdGhpcy5tb2RlbC5yZXNldCgpO1xuICB9XG5cbiAgcHVibGljIGRsZ1BhY2thZ2VKc29uKCk6IEpRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMuJChcIiNkbGctcGFja2FnZS1qc29uXCIpO1xuICB9XG5cbiAgcHVibGljIHZpZXdQYWNrYWdlSnNvbigpIHtcbiAgICBfcGFxLnB1c2goWyd0cmFja0V2ZW50JywgJ1VzZXInLCAnVmlld015VXBkYXRlRGVwJ10pO1xuICAgIHRoaXMuZGxnUGFja2FnZUpzb24oKS5tb2RhbCgpO1xuICAgIHRoaXMuZGxnUGFja2FnZUpzb24oKS5maW5kKFwidGV4dGFyZWFcIikudmFsKHRoaXMubW9kZWwuZm9ybWF0dGVkUGFja2FnZUpzb24pO1xuICAgIG5ldyBDbGlwYm9hcmQoXCIjZGxnLXBhY2thZ2UtanNvbiAuYnRuLWNsaXBib2FyZFwiKTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlUGFja2FnZUpzb24oKSB7XG4gICAgdGhpcy5kbGdQYWNrYWdlSnNvbigpLm1vZGFsKFwiaGlkZVwiKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG1vZGVsOiBQcm9qZWN0TW9kZWwpIHtcbiAgICBzdXBlcih7IG1vZGVsOiBtb2RlbCB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoe1xuICAgICAgcHJvamVjdDogdGhpcy5tb2RlbFxuICAgIH0pKTtcbiAgICB2YXIgJGxpc3RHcm91cCA9IHRoaXMuJGVsLmZpbmQoXCIubGlzdC1ncm91cFwiKTtcbiAgICB0aGlzLm1vZGVsLmRlcGVuZGVuY2llcy5lYWNoKGRlcCA9PiBuZXcgRGVwZW5kZW5jeVZpZXcoZGVwKS5yZW5kZXIoKS4kZWwuYXBwZW5kVG8oJGxpc3RHcm91cCkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbn1cblxuY2xhc3MgRGVwZW5kZW5jeVZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3PERlcGVuZGVuY3lNb2RlbD4ge1xuXG4gIHByaXZhdGUgdGVtcGxhdGUgPSBpdGVtVGVtcGxhdGU7XG5cbiAgY29uc3RydWN0b3IobW9kZWw6IERlcGVuZGVuY3lNb2RlbCkge1xuICAgIHN1cGVyKHtcbiAgICAgIG1vZGVsOiBtb2RlbCxcbiAgICAgIHRhZ05hbWU6IFwic3BhblwiLFxuICAgICAgY2xhc3NOYW1lOiBcImxpc3QtZ3JvdXAtaXRlbVwiXG4gICAgfSk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCBcImNoYW5nZVwiLCB0aGlzLnJlbmRlcik7XG4gIH1cblxuICBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFwiY2hhbmdlIHNlbGVjdFwiOiBcImNoYW5nZUN1cnJlbnRWZXJzaW9uXCJcbiAgICB9O1xuICB9XG5cbiAgY2hhbmdlQ3VycmVudFZlcnNpb24oZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSB7XG4gICAgdGhpcy5tb2RlbC5zZXRDdXJyZW50VmVyc2lvbigkKGV2ZW50LnRhcmdldCkudmFsKCkpO1xuICB9XG5cbiAgcmVuZGVyKG1vZGVsOiBEZXBlbmRlbmN5TW9kZWwgPSB0aGlzLm1vZGVsKSB7XG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKG1vZGVsKSk7XG4gICAgdGhpcy4kKFwic2VsZWN0XCIpLnZhbChtb2RlbC5jdXJyZW50VmVyc2lvbi52ZXJzaW9uTnVtYmVyLnJhd1ZlcnNpb25TdHJpbmcpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
