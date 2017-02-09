define(["require", "exports"], function (require, exports) {
    var Notification = (function () {
        function Notification(owner, type, title) {
            this.owner = owner;
            this.type = type;
            this.title = title;
            this.visibilityDurationInMs = 0;
            this._delayInMs = 0;
        }
        Object.defineProperty(Notification.prototype, "delayInMs", {
            get: function () {
                return this._delayInMs;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Notification.prototype.withBody = function (body) {
            this.body = body;
            return this;
        };
        Notification.prototype.visibleFor = function (visibilityDurationInMs) {
            this.visibilityDurationInMs = visibilityDurationInMs;
            return this;
        };
        Notification.prototype.delay = function (delayInMs) {
            this._delayInMs = delayInMs;
            return this;
        };
        Notification.prototype.emit = function () {
            if (this.delayInMs) {
                setTimeout(this.owner.emit.bind(this.owner, this), this.delayInMs);
            }
            else {
                this.owner.emit(this);
            }
        };
        Notification.prototype.willBeHidden = function () {
            return this.visibilityDurationInMs != 0;
        };
        return Notification;
    })();
    exports.Notification = Notification;
    var NotificationArea = (function () {
        function NotificationArea() {
            this.displayListeners = [];
        }
        NotificationArea.prototype.warning = function (title) {
            return new Notification(this, "warning", title);
        };
        NotificationArea.prototype.info = function (title) {
            return new Notification(this, "info", title);
        };
        NotificationArea.prototype.addListener = function (listener) {
            this.displayListeners.push(listener);
        };
        NotificationArea.prototype.triggerListener = function (listener, notif) {
            try {
                listener(notif);
            }
            catch (e) {
                console.error(e);
            }
        };
        NotificationArea.prototype.createHidingTrigger = function (notif) {
            var _this = this;
            return function () {
                _this.displayListeners.forEach(function (listener) { return listener.hide(notif); });
            };
        };
        NotificationArea.prototype.emit = function (notif) {
            var _this = this;
            if (notif.willBeHidden()) {
                setTimeout(this.createHidingTrigger(notif), notif.visibilityDurationInMs);
            }
            this.displayListeners.forEach(function (listener) { return _this.triggerListener(listener.display.bind(listener), notif); });
        };
        return NotificationArea;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = NotificationArea;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vbW9kZWwvTm90aWZpY2F0aW9uQXJlYS50cyJdLCJuYW1lcyI6WyJOb3RpZmljYXRpb24iLCJOb3RpZmljYXRpb24uY29uc3RydWN0b3IiLCJOb3RpZmljYXRpb24uZGVsYXlJbk1zIiwiTm90aWZpY2F0aW9uLndpdGhCb2R5IiwiTm90aWZpY2F0aW9uLnZpc2libGVGb3IiLCJOb3RpZmljYXRpb24uZGVsYXkiLCJOb3RpZmljYXRpb24uZW1pdCIsIk5vdGlmaWNhdGlvbi53aWxsQmVIaWRkZW4iLCJOb3RpZmljYXRpb25BcmVhIiwiTm90aWZpY2F0aW9uQXJlYS5jb25zdHJ1Y3RvciIsIk5vdGlmaWNhdGlvbkFyZWEud2FybmluZyIsIk5vdGlmaWNhdGlvbkFyZWEuaW5mbyIsIk5vdGlmaWNhdGlvbkFyZWEuYWRkTGlzdGVuZXIiLCJOb3RpZmljYXRpb25BcmVhLnRyaWdnZXJMaXN0ZW5lciIsIk5vdGlmaWNhdGlvbkFyZWEuY3JlYXRlSGlkaW5nVHJpZ2dlciIsIk5vdGlmaWNhdGlvbkFyZWEuZW1pdCJdLCJtYXBwaW5ncyI6IjtJQVVBO1FBWUVBLHNCQUFvQkEsS0FBdUJBLEVBQ3hCQSxJQUFZQSxFQUNaQSxLQUFhQTtZQUZaQyxVQUFLQSxHQUFMQSxLQUFLQSxDQUFrQkE7WUFDeEJBLFNBQUlBLEdBQUpBLElBQUlBLENBQVFBO1lBQ1pBLFVBQUtBLEdBQUxBLEtBQUtBLENBQVFBO1lBVnpCQSwyQkFBc0JBLEdBQVdBLENBQUNBLENBQUNBO1lBRWxDQSxlQUFVQSxHQUFXQSxDQUFDQSxDQUFDQTtRQVFJQSxDQUFDQTtRQU5wQ0Qsc0JBQVdBLG1DQUFTQTtpQkFBcEJBO2dCQUNFRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUN6QkEsQ0FBQ0E7OztXQUFBRjs7UUFNTUEsK0JBQVFBLEdBQWZBLFVBQWdCQSxJQUFZQTtZQUMxQkcsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDakJBLE1BQU1BLENB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Q0EsS0FBS0EsQ0FBQ0EsRUFBRUEsS0FBS0EsQ0FBQ0Esc0JBQXNCQSxDQUFDQSxDQUFDQTtZQUM1RUEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxPQUFPQSxDQUMzQkEsVUFBQUEsUUFBUUEsSUFBSUEsT0FBQUEsS0FBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsRUFBRUEsS0FBS0EsQ0FBQ0EsRUFBNURBLENBQTREQSxDQUN6RUEsQ0FBQ0E7UUFDSkEsQ0FBQ0E7UUFHSFAsdUJBQUNBO0lBQURBLENBeENBLEFBd0NDQSxJQUFBO0lBeENEO3NDQXdDQyxDQUFBIiwiZmlsZSI6Im1haW4vbW9kZWwvTm90aWZpY2F0aW9uQXJlYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSA9IHJlcXVpcmUoXCJiYWNrYm9uZVwiKTtcblxuZXhwb3J0IGludGVyZmFjZSBOb3RpZkRpc3BsYXlMaXN0ZW5lciB7XG5cbiAgZGlzcGxheShub3RpZjogTm90aWZpY2F0aW9uKTogIHZvaWQ7XG5cbiAgaGlkZShub3RpZjogTm90aWZpY2F0aW9uKTogdm9pZDtcblxufVxuXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uIHtcblxuICBwdWJsaWMgYm9keTtcblxuICBwdWJsaWMgdmlzaWJpbGl0eUR1cmF0aW9uSW5NczogbnVtYmVyID0gMDtcblxuICBwcml2YXRlIF9kZWxheUluTXM6IG51bWJlciA9IDA7XG5cbiAgcHVibGljIGdldCBkZWxheUluTXMoKSA6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGF5SW5NcztcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG93bmVyOiBOb3RpZmljYXRpb25BcmVhLFxuICAgICAgICAgICAgICBwdWJsaWMgdHlwZTogc3RyaW5nLFxuICAgICAgICAgICAgICBwdWJsaWMgdGl0bGU6IHN0cmluZykge31cblxuICBwdWJsaWMgd2l0aEJvZHkoYm9keTogc3RyaW5nKTogTm90aWZpY2F0aW9uIHtcbiAgICB0aGlzLmJvZHkgPSBib2R5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIHZpc2libGVGb3IodmlzaWJpbGl0eUR1cmF0aW9uSW5NczogbnVtYmVyKTogTm90aWZpY2F0aW9uIHtcbiAgICB0aGlzLnZpc2liaWxpdHlEdXJhdGlvbkluTXMgPSB2aXNpYmlsaXR5RHVyYXRpb25Jbk1zO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIGRlbGF5KGRlbGF5SW5NczogbnVtYmVyKTogTm90aWZpY2F0aW9uIHtcbiAgICB0aGlzLl9kZWxheUluTXMgPSBkZWxheUluTXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgZW1pdCgpIHtcbiAgICBpZiAodGhpcy5kZWxheUluTXMpIHtcbiAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgIHRoaXMub3duZXIuZW1pdC5iaW5kKHRoaXMub3duZXIsIHRoaXMpLFxuICAgICAgICB0aGlzLmRlbGF5SW5Nc1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vd25lci5lbWl0KHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB3aWxsQmVIaWRkZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuIHZpc2liaWxpdHlEdXJhdGlvbkluTXMgIT0gMDtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGlmaWNhdGlvbkFyZWEge1xuXG4gIHByaXZhdGUgZGlzcGxheUxpc3RlbmVyczogTm90aWZEaXNwbGF5TGlzdGVuZXJbXSA9IFtdO1xuXG4gIHdhcm5pbmcodGl0bGU6IHN0cmluZyk6IE5vdGlmaWNhdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBOb3RpZmljYXRpb24odGhpcywgXCJ3YXJuaW5nXCIsIHRpdGxlKTtcbiAgfVxuXG4gIGluZm8odGl0bGU6IHN0cmluZyk6IE5vdGlmaWNhdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBOb3RpZmljYXRpb24odGhpcywgXCJpbmZvXCIsIHRpdGxlKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRMaXN0ZW5lcihsaXN0ZW5lcjogTm90aWZEaXNwbGF5TGlzdGVuZXIpIHtcbiAgICB0aGlzLmRpc3BsYXlMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gIH1cblxuICBwcml2YXRlIHRyaWdnZXJMaXN0ZW5lcihsaXN0ZW5lcjogKG5vdGlmOiBOb3RpZmljYXRpb24pID0+IHZvaWQsIG5vdGlmOiBOb3RpZmljYXRpb24pIHtcbiAgICB0cnkge1xuICAgICAgbGlzdGVuZXIobm90aWYpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVIaWRpbmdUcmlnZ2VyKG5vdGlmOiBOb3RpZmljYXRpb24pIHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdGhpcy5kaXNwbGF5TGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIuaGlkZShub3RpZikpO1xuICAgIH07XG4gIH1cblxuICBlbWl0KG5vdGlmOiBOb3RpZmljYXRpb24pIHtcbiAgICBpZiAobm90aWYud2lsbEJlSGlkZGVuKCkpIHtcbiAgICAgIHNldFRpbWVvdXQodGhpcy5jcmVhdGVIaWRpbmdUcmlnZ2VyKG5vdGlmKSwgbm90aWYudmlzaWJpbGl0eUR1cmF0aW9uSW5Ncyk7XG4gICAgfVxuICAgIHRoaXMuZGlzcGxheUxpc3RlbmVycy5mb3JFYWNoKFxuICAgICAgbGlzdGVuZXIgPT4gdGhpcy50cmlnZ2VyTGlzdGVuZXIobGlzdGVuZXIuZGlzcGxheS5iaW5kKGxpc3RlbmVyKSwgbm90aWYpXG4gICAgKTtcbiAgfVxuXG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
