/// <amd-dependency path="text!../template/layout.html" />
define(["require", "exports", "jquery", "handlebars", "text!../template/layout.html"], function (require, exports, $, Handlebars) {
    var template = Handlebars.compile(require("text!../template/layout.html"));
    var LayoutView = (function () {
        function LayoutView(el) {
            this.el = el;
            this.template = template;
            this.$el = $(el);
        }
        LayoutView.prototype.setLeftPane = function (pane) {
            this.render();
            this.$cntLeft = this.$el.find(".cnt-left");
            pane.$el.appendTo(this.$cntLeft);
            // if (_paq) {
            this.setupSubscribeNotif();
            // }
        };
        LayoutView.prototype.setupSubscribeNotif = function () {
            var _this = this;
            console.log("notif setup");
            setTimeout(function () {
                console.log("notif running");
                _this.$el.find(".cnt-notification-list").show();
                _this.$el.find(".cnt-notification").each(function (idx, notif) {
                    var $notif = $(notif);
                    $notif.find(".btn-notification-close").click(function () {
                        $notif.fadeOut();
                    });
                });
            }, 12000);
        };
        LayoutView.prototype.setCenterPane = function (pane) {
            pane.$el.appendTo(this.$el.find(".cnt-newsfeed"));
        };
        LayoutView.prototype.render = function () {
            this.$el.html(this.template({}));
            return this;
        };
        return LayoutView;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = LayoutView;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vdmlldy9MYXlvdXRWaWV3LnRzIl0sIm5hbWVzIjpbIkxheW91dFZpZXciLCJMYXlvdXRWaWV3LmNvbnN0cnVjdG9yIiwiTGF5b3V0Vmlldy5zZXRMZWZ0UGFuZSIsIkxheW91dFZpZXcuc2V0dXBTdWJzY3JpYmVOb3RpZiIsIkxheW91dFZpZXcuc2V0Q2VudGVyUGFuZSIsIkxheW91dFZpZXcucmVuZGVyIl0sIm1hcHBpbmdzIjoiQUFBQSwwREFBMEQ7O0lBTzFELElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQztJQUkzRTtRQVFFQSxvQkFBb0JBLEVBQWVBO1lBQWZDLE9BQUVBLEdBQUZBLEVBQUVBLENBQWFBO1lBTjNCQSxhQUFRQSxHQUFHQSxRQUFRQSxDQUFDQTtZQU8xQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDbkJBLENBQUNBO1FBRU1ELGdDQUFXQSxHQUFsQkEsVUFBbUJBLElBQXdCQTtZQUN6Q0UsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7WUFDZEEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7WUFDM0NBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1lBQ2pDQSxjQUFjQTtZQUNaQSxJQUFJQSxDQUFDQSxtQkFBbUJBLEVBQUVBLENBQUNBO1lBQzdCQSxJQUFJQTtRQUNOQSxDQUFDQTtRQUVNRix3Q0FBbUJBLEdBQTFCQTtZQUFBRyxpQkFZQ0E7WUFYQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQUE7WUFDMUJBLFVBQVVBLENBQUNBO2dCQUNUQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFBQTtnQkFDNUJBLEtBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLHdCQUF3QkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7Z0JBQy9DQSxLQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxtQkFBbUJBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVNBLEdBQUdBLEVBQUVBLEtBQUtBO29CQUN6RCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQzNDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDbkIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDQSxDQUFDQTtZQUNMQSxDQUFDQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUNaQSxDQUFDQTtRQUVNSCxrQ0FBYUEsR0FBcEJBLFVBQXFCQSxJQUF3QkE7WUFDM0NJLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBLENBQUNBO1FBQ3BEQSxDQUFDQTtRQUVNSiwyQkFBTUEsR0FBYkE7WUFDRUssSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDakNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2RBLENBQUNBO1FBRUhMLGlCQUFDQTtJQUFEQSxDQTVDQSxBQTRDQ0EsSUFBQTtJQTVDRDtnQ0E0Q0MsQ0FBQSIsImZpbGUiOiJtYWluL3ZpZXcvTGF5b3V0Vmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vdGVtcGxhdGUvbGF5b3V0Lmh0bWxcIiAvPlxuXG5pbXBvcnQgQmFja2JvbmUgPSByZXF1aXJlKFwiYmFja2JvbmVcIik7XG5pbXBvcnQgJCA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5pbXBvcnQgSGFuZGxlYmFycyA9IHJlcXVpcmUoXCJoYW5kbGViYXJzXCIpO1xuXG5cbnZhciB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShyZXF1aXJlKFwidGV4dCEuLi90ZW1wbGF0ZS9sYXlvdXQuaHRtbFwiKSk7XG5cbmRlY2xhcmUgY29uc3QgX3BhcTogYW55W107XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExheW91dFZpZXcge1xuXG4gIHByaXZhdGUgdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcblxuICBwcml2YXRlICRlbDogSlF1ZXJ5O1xuXG4gIHByaXZhdGUgJGNudExlZnQ6IEpRdWVyeTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuJGVsID0gJChlbCk7XG4gIH1cblxuICBwdWJsaWMgc2V0TGVmdFBhbmUocGFuZTogQmFja2JvbmUuVmlldzxhbnk+KSB7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgICB0aGlzLiRjbnRMZWZ0ID0gdGhpcy4kZWwuZmluZChcIi5jbnQtbGVmdFwiKTtcbiAgICBwYW5lLiRlbC5hcHBlbmRUbyh0aGlzLiRjbnRMZWZ0KTtcbiAgICAvLyBpZiAoX3BhcSkge1xuICAgICAgdGhpcy5zZXR1cFN1YnNjcmliZU5vdGlmKCk7XG4gICAgLy8gfVxuICB9XG5cbiAgcHVibGljIHNldHVwU3Vic2NyaWJlTm90aWYoKSB7XG4gICAgY29uc29sZS5sb2coXCJub3RpZiBzZXR1cFwiKVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJub3RpZiBydW5uaW5nXCIpXG4gICAgICB0aGlzLiRlbC5maW5kKFwiLmNudC1ub3RpZmljYXRpb24tbGlzdFwiKS5zaG93KCk7XG4gICAgICB0aGlzLiRlbC5maW5kKFwiLmNudC1ub3RpZmljYXRpb25cIikuZWFjaChmdW5jdGlvbihpZHgsIG5vdGlmKSB7XG4gICAgICAgIHZhciAkbm90aWYgPSAkKG5vdGlmKTtcbiAgICAgICAgJG5vdGlmLmZpbmQoXCIuYnRuLW5vdGlmaWNhdGlvbi1jbG9zZVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAkbm90aWYuZmFkZU91dCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sIDEyMDAwKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRDZW50ZXJQYW5lKHBhbmU6IEJhY2tib25lLlZpZXc8YW55Pikge1xuICAgIHBhbmUuJGVsLmFwcGVuZFRvKHRoaXMuJGVsLmZpbmQoXCIuY250LW5ld3NmZWVkXCIpKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKHt9KSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
