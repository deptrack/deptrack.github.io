/// <amd-dependency path="text!../template/layout.html" />
define(["require", "exports", "jquery", "handlebars", "text!../template/layout.html"], function (require, exports, $, Handlebars) {
    "use strict";
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
            }, 2000);
        };
        LayoutView.prototype.setCenterPane = function (pane) {
            pane.$el.appendTo(this.$el.find(".cnt-newsfeed"));
        };
        LayoutView.prototype.render = function () {
            this.$el.html(this.template({}));
            return this;
        };
        return LayoutView;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = LayoutView;
});
//# sourceMappingURL=LayoutView.js.map