var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "backbone", "handlebars", "text!../template/progressbar.html"], function (require, exports, Backbone, Handlebars) {
    var template = Handlebars.compile(require("text!../template/progressbar.html"));
    var ProgressBarView = (function (_super) {
        __extends(ProgressBarView, _super);
        function ProgressBarView(progress, title) {
            if (title === void 0) { title = "Gathering news from GitHub... "; }
            _super.call(this);
            this.progress = progress;
            this.title = title;
            this.template = template;
        }
        ProgressBarView.prototype.onTick = function (event) {
            this.$(".lbl-percentage").html(event.completedPercentage);
            this.$(".bar-inner").css("width", event.completedPercentage);
        };
        ProgressBarView.prototype.render = function () {
            this.$el.html(this.template({ title: this.title }));
            this.progress.addProgressListener(this.onTick.bind(this));
            return this;
        };
        return ProgressBarView;
    })(Backbone.View);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ProgressBarView;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vdmlldy9Qcm9ncmVzc0JhclZpZXcudHMiXSwibmFtZXMiOlsiUHJvZ3Jlc3NCYXJWaWV3IiwiUHJvZ3Jlc3NCYXJWaWV3LmNvbnN0cnVjdG9yIiwiUHJvZ3Jlc3NCYXJWaWV3Lm9uVGljayIsIlByb2dyZXNzQmFyVmlldy5yZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUtBLElBQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsQ0FBQztJQUVsRjtRQUE2Q0EsbUNBQTZCQTtRQUl4RUEseUJBQ1VBLFFBQTJCQSxFQUMzQkEsS0FBZ0RBO1lBQXhEQyxxQkFBd0RBLEdBQXhEQSx3Q0FBd0RBO1lBRXhEQSxpQkFBT0EsQ0FBQ0E7WUFIQUEsYUFBUUEsR0FBUkEsUUFBUUEsQ0FBbUJBO1lBQzNCQSxVQUFLQSxHQUFMQSxLQUFLQSxDQUEyQ0E7WUFKbERBLGFBQVFBLEdBQUdBLFFBQVFBLENBQUNBO1FBTzVCQSxDQUFDQTtRQUVNRCxnQ0FBTUEsR0FBYkEsVUFBY0EsS0FBb0JBO1lBQ2hDRSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7WUFDMURBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLEVBQUVBLEtBQUtBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7UUFDL0RBLENBQUNBO1FBRURGLGdDQUFNQSxHQUFOQTtZQUNFRyxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxFQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNsREEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDZEEsQ0FBQ0E7UUFFSEgsc0JBQUNBO0lBQURBLENBdEJBLEFBc0JDQSxFQXRCNEMsUUFBUSxDQUFDLElBQUksRUFzQnpEO0lBdEJEO3FDQXNCQyxDQUFBIiwiZmlsZSI6Im1haW4vdmlldy9Qcm9ncmVzc0JhclZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL3RlbXBsYXRlL3Byb2dyZXNzYmFyLmh0bWxcIiAvPlxuaW1wb3J0IEJhY2tib25lID0gcmVxdWlyZShcImJhY2tib25lXCIpO1xuaW1wb3J0IEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiaGFuZGxlYmFyc1wiKTtcbmltcG9ydCB7UHJvZ3Jlc3NJbmRpY2F0b3IsIFByb2dyZXNzRXZlbnR9IGZyb20gXCIuLi9tb2RlbC9Qcm9ncmVzc0luZGljYXRvclwiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShyZXF1aXJlKFwidGV4dCEuLi90ZW1wbGF0ZS9wcm9ncmVzc2Jhci5odG1sXCIpKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZ3Jlc3NCYXJWaWV3IGV4dGVuZHMgQmFja2JvbmUuVmlldzxCYWNrYm9uZS5Nb2RlbD4ge1xuXG4gIHByaXZhdGUgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHByb2dyZXNzOiBQcm9ncmVzc0luZGljYXRvcixcbiAgICBwcml2YXRlIHRpdGxlOiBzdHJpbmcgPSBcIkdhdGhlcmluZyBuZXdzIGZyb20gR2l0SHViLi4uIFwiXG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwdWJsaWMgb25UaWNrKGV2ZW50OiBQcm9ncmVzc0V2ZW50KSB7XG4gICAgdGhpcy4kKFwiLmxibC1wZXJjZW50YWdlXCIpLmh0bWwoZXZlbnQuY29tcGxldGVkUGVyY2VudGFnZSk7XG4gICAgdGhpcy4kKFwiLmJhci1pbm5lclwiKS5jc3MoXCJ3aWR0aFwiLCBldmVudC5jb21wbGV0ZWRQZXJjZW50YWdlKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoe3RpdGxlOiB0aGlzLnRpdGxlfSkpO1xuICAgIHRoaXMucHJvZ3Jlc3MuYWRkUHJvZ3Jlc3NMaXN0ZW5lcih0aGlzLm9uVGljay5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
