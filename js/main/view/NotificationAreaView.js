var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "backbone", "handlebars", "text!../template/notification.html"], function (require, exports, Backbone, Handlebars) {
    var template = Handlebars.compile(require("text!../template/notification.html"));
    var NotificationView = (function (_super) {
        __extends(NotificationView, _super);
        function NotificationView(_notif, area) {
            _super.call(this, {
                className: "cnt-notification"
            });
            this._notif = _notif;
            this.area = area;
            this.template = template;
        }
        NotificationView.prototype.events = function () {
            return {
                "click .btn-notification-close": "close"
            };
        };
        NotificationView.prototype.close = function () {
            this.$el.fadeOut();
            this.area.notifClosed(this);
        };
        Object.defineProperty(NotificationView.prototype, "notif", {
            get: function () {
                return this._notif;
            },
            enumerable: true,
            configurable: true
        });
        NotificationView.prototype.render = function () {
            this.$el.html(this.template(this._notif));
            var typeClass = this._notif.type === "warning"
                ? "cnt-notification-warning"
                : "cnt-notification-success";
            this.$el.addClass(typeClass);
            return this;
        };
        return NotificationView;
    })(Backbone.View);
    exports.NotificationView = NotificationView;
    var NotificationAreaView = (function (_super) {
        __extends(NotificationAreaView, _super);
        function NotificationAreaView(notifArea) {
            _super.call(this, {
                className: "cnt-notification-list"
            });
            this.childViews = [];
            notifArea.addListener(this);
        }
        NotificationAreaView.prototype.childViewByModel = function (notif) {
            return _.find(this.childViews, function (view) { return view.notif === notif; });
        };
        NotificationAreaView.prototype.display = function (notif) {
            var childView = new NotificationView(notif, this);
            this.childViews.push(childView);
            childView.render().$el.appendTo(this.$el);
        };
        NotificationAreaView.prototype.notifClosed = function (child) {
            var idx = this.childViews.indexOf(child);
            if (idx >= 0) {
                this.childViews.splice(idx, 1);
            }
        };
        NotificationAreaView.prototype.hide = function (notif) {
            this.childViewByModel(notif).$el.fadeOut();
        };
        NotificationAreaView.prototype.render = function () {
            console.log("rendering NotifAreaView", this.$el);
            return this;
        };
        return NotificationAreaView;
    })(Backbone.View);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = NotificationAreaView;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vdmlldy9Ob3RpZmljYXRpb25BcmVhVmlldy50cyJdLCJuYW1lcyI6WyJOb3RpZmljYXRpb25WaWV3IiwiTm90aWZpY2F0aW9uVmlldy5jb25zdHJ1Y3RvciIsIk5vdGlmaWNhdGlvblZpZXcuZXZlbnRzIiwiTm90aWZpY2F0aW9uVmlldy5jbG9zZSIsIk5vdGlmaWNhdGlvblZpZXcubm90aWYiLCJOb3RpZmljYXRpb25WaWV3LnJlbmRlciIsIk5vdGlmaWNhdGlvbkFyZWFWaWV3IiwiTm90aWZpY2F0aW9uQXJlYVZpZXcuY29uc3RydWN0b3IiLCJOb3RpZmljYXRpb25BcmVhVmlldy5jaGlsZFZpZXdCeU1vZGVsIiwiTm90aWZpY2F0aW9uQXJlYVZpZXcuZGlzcGxheSIsIk5vdGlmaWNhdGlvbkFyZWFWaWV3Lm5vdGlmQ2xvc2VkIiwiTm90aWZpY2F0aW9uQXJlYVZpZXcuaGlkZSIsIk5vdGlmaWNhdGlvbkFyZWFWaWV3LnJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBT0EsSUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxDQUFDO0lBRW5GO1FBQXNDQSxvQ0FBNkJBO1FBbUJqRUEsMEJBQ1VBLE1BQW9CQSxFQUNwQkEsSUFBMEJBO1lBRWxDQyxrQkFBTUE7Z0JBQ0pBLFNBQVNBLEVBQUVBLGtCQUFrQkE7YUFDOUJBLENBQUNBLENBQUNBO1lBTEtBLFdBQU1BLEdBQU5BLE1BQU1BLENBQWNBO1lBQ3BCQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFzQkE7WUFuQjVCQSxhQUFRQSxHQUFHQSxRQUFRQSxDQUFDQTtRQXdCNUJBLENBQUNBO1FBdEJERCxpQ0FBTUEsR0FBTkE7WUFDRUUsTUFBTUEsQ0FBQ0E7Z0JBQ0xBLCtCQUErQkEsRUFBR0EsT0FBT0E7YUFDMUNBLENBQUNBO1FBQ0pBLENBQUNBO1FBRURGLGdDQUFLQSxHQUFMQTtZQUNFRyxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxP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QUFDQTtJQUFEQSxDQXRDQSxBQXNDQ0EsRUF0Q2lELFFBQVEsQ0FBQyxJQUFJLEVBc0M5RDtJQXRDRDswQ0FzQ0MsQ0FBQSIsImZpbGUiOiJtYWluL3ZpZXcvTm90aWZpY2F0aW9uQXJlYVZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL3RlbXBsYXRlL25vdGlmaWNhdGlvbi5odG1sXCIgLz5cbmltcG9ydCBCYWNrYm9uZSA9IHJlcXVpcmUoXCJiYWNrYm9uZVwiKTtcbmltcG9ydCAkID0gcmVxdWlyZShcImpxdWVyeVwiKTtcbmltcG9ydCBIYW5kbGViYXJzID0gcmVxdWlyZShcImhhbmRsZWJhcnNcIik7XG5pbXBvcnQgTm90aWZpY2F0aW9uQXJlYSBmcm9tIFwiLi4vbW9kZWwvTm90aWZpY2F0aW9uQXJlYVwiO1xuaW1wb3J0IHtOb3RpZkRpc3BsYXlMaXN0ZW5lciwgTm90aWZpY2F0aW9ufSBmcm9tIFwiLi4vbW9kZWwvTm90aWZpY2F0aW9uQXJlYVwiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShyZXF1aXJlKFwidGV4dCEuLi90ZW1wbGF0ZS9ub3RpZmljYXRpb24uaHRtbFwiKSk7XG5cbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25WaWV3IGV4dGVuZHMgQmFja2JvbmUuVmlldzxCYWNrYm9uZS5Nb2RlbD4ge1xuXG4gIHByaXZhdGUgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcblxuICBldmVudHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFwiY2xpY2sgLmJ0bi1ub3RpZmljYXRpb24tY2xvc2VcIiA6IFwiY2xvc2VcIlxuICAgIH07XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLiRlbC5mYWRlT3V0KCk7XG4gICAgdGhpcy5hcmVhLm5vdGlmQ2xvc2VkKHRoaXMpO1xuICB9XG5cbiAgZ2V0IG5vdGlmKCk6IE5vdGlmaWNhdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX25vdGlmO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfbm90aWY6IE5vdGlmaWNhdGlvbixcbiAgICBwcml2YXRlIGFyZWE6IE5vdGlmaWNhdGlvbkFyZWFWaWV3XG4gICkge1xuICAgIHN1cGVyKHtcbiAgICAgIGNsYXNzTmFtZTogXCJjbnQtbm90aWZpY2F0aW9uXCJcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpOiBOb3RpZmljYXRpb25WaWV3IHtcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUodGhpcy5fbm90aWYpKTtcbiAgICBjb25zdCB0eXBlQ2xhc3MgPSB0aGlzLl9ub3RpZi50eXBlID09PSBcIndhcm5pbmdcIlxuICAgICAgPyBcImNudC1ub3RpZmljYXRpb24td2FybmluZ1wiXG4gICAgICA6IFwiY250LW5vdGlmaWNhdGlvbi1zdWNjZXNzXCI7XG4gICAgdGhpcy4kZWwuYWRkQ2xhc3ModHlwZUNsYXNzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90aWZpY2F0aW9uQXJlYVZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3PEJhY2tib25lLk1vZGVsPlxuICBpbXBsZW1lbnRzIE5vdGlmRGlzcGxheUxpc3RlbmVyIHtcblxuICBwcml2YXRlIGNoaWxkVmlld3M6IE5vdGlmaWNhdGlvblZpZXdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKG5vdGlmQXJlYTogTm90aWZpY2F0aW9uQXJlYSkge1xuICAgIHN1cGVyKHtcbiAgICAgIGNsYXNzTmFtZTogXCJjbnQtbm90aWZpY2F0aW9uLWxpc3RcIlxuICAgIH0pO1xuICAgIG5vdGlmQXJlYS5hZGRMaXN0ZW5lcih0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hpbGRWaWV3QnlNb2RlbChub3RpZjogTm90aWZpY2F0aW9uKTogTm90aWZpY2F0aW9uVmlldyB7XG4gICAgcmV0dXJuIF8uZmluZCh0aGlzLmNoaWxkVmlld3MsIHZpZXcgPT4gdmlldy5ub3RpZiA9PT0gbm90aWYpO1xuICB9XG5cbiAgZGlzcGxheShub3RpZjogTm90aWZpY2F0aW9uKSB7XG4gICAgY29uc3QgY2hpbGRWaWV3ID0gbmV3IE5vdGlmaWNhdGlvblZpZXcobm90aWYsIHRoaXMpO1xuICAgIHRoaXMuY2hpbGRWaWV3cy5wdXNoKGNoaWxkVmlldyk7XG4gICAgY2hpbGRWaWV3LnJlbmRlcigpLiRlbC5hcHBlbmRUbyh0aGlzLiRlbCk7XG4gIH1cblxuICBub3RpZkNsb3NlZChjaGlsZDogTm90aWZpY2F0aW9uVmlldykge1xuICAgIGNvbnN0IGlkeCA9IHRoaXMuY2hpbGRWaWV3cy5pbmRleE9mKGNoaWxkKTtcbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIHRoaXMuY2hpbGRWaWV3cy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG4gIH1cblxuICBoaWRlKG5vdGlmOiBOb3RpZmljYXRpb24pIHtcbiAgICB0aGlzLmNoaWxkVmlld0J5TW9kZWwobm90aWYpLiRlbC5mYWRlT3V0KCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc29sZS5sb2coXCJyZW5kZXJpbmcgTm90aWZBcmVhVmlld1wiLCB0aGlzLiRlbCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
