define(["require", "exports"], function (require, exports) {
    var ProgressEvent = (function () {
        function ProgressEvent(total, completed, percentageRounding) {
            if (percentageRounding === void 0) { percentageRounding = 1; }
            this.total = total;
            this.completed = completed;
            this.percentageRounding = percentageRounding;
        }
        Object.defineProperty(ProgressEvent.prototype, "completedPercentage", {
            get: function () {
                if (this.total == 0) {
                    return "100%";
                }
                var percentage = (this.completed / this.total) * 100;
                percentage = Math.ceil(percentage / this.percentageRounding) * this.percentageRounding;
                return percentage + "%";
            },
            enumerable: true,
            configurable: true
        });
        return ProgressEvent;
    })();
    exports.ProgressEvent = ProgressEvent;
    var NoneProgressIndicator = (function () {
        function NoneProgressIndicator() {
        }
        NoneProgressIndicator.prototype.addProgressListener = function (listener) { };
        NoneProgressIndicator.prototype.tick = function () { };
        NoneProgressIndicator.prototype.setTotalStepCount = function (totalStepCount) { };
        return NoneProgressIndicator;
    })();
    exports.NO_PROGRESS = new NoneProgressIndicator();
    var ProgressIndicatorImpl = (function () {
        function ProgressIndicatorImpl(_totalStepCount, percentageRounding) {
            if (percentageRounding === void 0) { percentageRounding = 1; }
            this._totalStepCount = _totalStepCount;
            this.percentageRounding = percentageRounding;
            this.listeners = [];
            this.completedCount = 0;
        }
        ProgressIndicatorImpl.prototype.setTotalStepCount = function (totalStepCount) {
            this.totalStepCount = totalStepCount;
        };
        Object.defineProperty(ProgressIndicatorImpl.prototype, "totalStepCount", {
            get: function () {
                return this._totalStepCount;
            },
            set: function (totalStepCount) {
                this._totalStepCount = totalStepCount;
                this.triggerEvent();
            },
            enumerable: true,
            configurable: true
        });
        ProgressIndicatorImpl.prototype.currentStateEvent = function () {
            return new ProgressEvent(this.totalStepCount, this.completedCount, this.percentageRounding);
        };
        ProgressIndicatorImpl.prototype.addProgressListener = function (listener) {
            this.listeners.push(listener);
            listener(this.currentStateEvent());
        };
        ProgressIndicatorImpl.prototype.tick = function () {
            this.completedCount++;
            this.triggerEvent();
        };
        ProgressIndicatorImpl.prototype.triggerEvent = function () {
            var event = this.currentStateEvent();
            this.listeners.forEach(function (listener) { return listener(event); });
        };
        return ProgressIndicatorImpl;
    })();
    exports.ProgressIndicatorImpl = ProgressIndicatorImpl;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vbW9kZWwvUHJvZ3Jlc3NJbmRpY2F0b3IudHMiXSwibmFtZXMiOlsiUHJvZ3Jlc3NFdmVudCIsIlByb2dyZXNzRXZlbnQuY29uc3RydWN0b3IiLCJQcm9ncmVzc0V2ZW50LmNvbXBsZXRlZFBlcmNlbnRhZ2UiLCJOb25lUHJvZ3Jlc3NJbmRpY2F0b3IiLCJOb25lUHJvZ3Jlc3NJbmRpY2F0b3IuY29uc3RydWN0b3IiLCJOb25lUHJvZ3Jlc3NJbmRpY2F0b3IuYWRkUHJvZ3Jlc3NMaXN0ZW5lciIsIk5vbmVQcm9ncmVzc0luZGljYXRvci50aWNrIiwiTm9uZVByb2dyZXNzSW5kaWNhdG9yLnNldFRvdGFsU3RlcENvdW50IiwiUHJvZ3Jlc3NJbmRpY2F0b3JJbXBsIiwiUHJvZ3Jlc3NJbmRpY2F0b3JJbXBsLmNvbnN0cnVjdG9yIiwiUHJvZ3Jlc3NJbmRpY2F0b3JJbXBsLnNldFRvdGFsU3RlcENvdW50IiwiUHJvZ3Jlc3NJbmRpY2F0b3JJbXBsLnRvdGFsU3RlcENvdW50IiwiUHJvZ3Jlc3NJbmRpY2F0b3JJbXBsLmN1cnJlbnRTdGF0ZUV2ZW50IiwiUHJvZ3Jlc3NJbmRpY2F0b3JJbXBsLmFkZFByb2dyZXNzTGlzdGVuZXIiLCJQcm9ncmVzc0luZGljYXRvckltcGwudGljayIsIlByb2dyZXNzSW5kaWNhdG9ySW1wbC50cmlnZ2VyRXZlbnQiXSwibWFwcGluZ3MiOiI7SUFBQTtRQVdFQSx1QkFDU0EsS0FBYUEsRUFDYkEsU0FBaUJBLEVBQ2hCQSxrQkFBOEJBO1lBQXRDQyxrQ0FBc0NBLEdBQXRDQSxzQkFBc0NBO1lBRi9CQSxVQUFLQSxHQUFMQSxLQUFLQSxDQUFRQTtZQUNiQSxjQUFTQSxHQUFUQSxTQUFTQSxDQUFRQTtZQUNoQkEsdUJBQWtCQSxHQUFsQkEsa0JBQWtCQSxDQUFZQTtRQUNyQ0EsQ0FBQ0E7UUFiSkQsc0JBQUlBLDhDQUFtQkE7aUJBQXZCQTtnQkFDRUUsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsSUFBSUEs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QSxBQXlDQ0EsSUFBQTtJQXpDWSw2QkFBcUIsd0JBeUNqQyxDQUFBIiwiZmlsZSI6Im1haW4vbW9kZWwvUHJvZ3Jlc3NJbmRpY2F0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgUHJvZ3Jlc3NFdmVudCB7XG5cbiAgZ2V0IGNvbXBsZXRlZFBlcmNlbnRhZ2UoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy50b3RhbCA9PSAwKSB7XG4gICAgICByZXR1cm4gXCIxMDAlXCI7XG4gICAgfVxuICAgIGxldCBwZXJjZW50YWdlOiBudW1iZXIgPSAodGhpcy5jb21wbGV0ZWQgLyB0aGlzLnRvdGFsKSAqIDEwMDtcbiAgICBwZXJjZW50YWdlID0gTWF0aC5jZWlsKHBlcmNlbnRhZ2UgLyB0aGlzLnBlcmNlbnRhZ2VSb3VuZGluZykgKiB0aGlzLnBlcmNlbnRhZ2VSb3VuZGluZztcbiAgICByZXR1cm4gcGVyY2VudGFnZSArIFwiJVwiO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHRvdGFsOiBudW1iZXIsXG4gICAgcHVibGljIGNvbXBsZXRlZDogbnVtYmVyLFxuICAgIHByaXZhdGUgcGVyY2VudGFnZVJvdW5kaW5nOiBudW1iZXIgPSAxXG4gICkge31cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZXNzSW5kaWNhdG9yIHtcblxuICBhZGRQcm9ncmVzc0xpc3RlbmVyKGxpc3RlbmVyOiBQcm9ncmVzc0xpc3RlbmVyKTogdm9pZDtcblxuICB0aWNrKCk6IHZvaWQ7XG5cbiAgc2V0VG90YWxTdGVwQ291bnQodG90YWxTdGVwQ291bnQ6IG51bWJlcik7XG5cbn1cblxuY2xhc3MgTm9uZVByb2dyZXNzSW5kaWNhdG9yIGltcGxlbWVudHMgUHJvZ3Jlc3NJbmRpY2F0b3Ige1xuXG4gIGFkZFByb2dyZXNzTGlzdGVuZXIobGlzdGVuZXI6IFByb2dyZXNzTGlzdGVuZXIpOiB2b2lkIHsgfVxuXG4gIHRpY2soKTogdm9pZCB7IH1cblxuICBzZXRUb3RhbFN0ZXBDb3VudCh0b3RhbFN0ZXBDb3VudDogbnVtYmVyKSB7IH1cblxufVxuXG5leHBvcnQgY29uc3QgTk9fUFJPR1JFU1MgPSBuZXcgTm9uZVByb2dyZXNzSW5kaWNhdG9yKCk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3Jlc3NMaXN0ZW5lciB7XG5cbiAgKGV2ZW50OiBQcm9ncmVzc0V2ZW50KSA6IHZvaWQ7XG5cbn1cblxuXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NJbmRpY2F0b3JJbXBsIGltcGxlbWVudHMgIFByb2dyZXNzSW5kaWNhdG9yIHtcblxuICBwcml2YXRlIGxpc3RlbmVyczogUHJvZ3Jlc3NMaXN0ZW5lcltdID0gW107XG5cbiAgcHJpdmF0ZSBjb21wbGV0ZWRDb3VudCA9IDA7XG5cbiAgc2V0VG90YWxTdGVwQ291bnQodG90YWxTdGVwQ291bnQ6IG51bWJlcikge1xuICAgIHRoaXMudG90YWxTdGVwQ291bnQgPSB0b3RhbFN0ZXBDb3VudDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgdG90YWxTdGVwQ291bnQodG90YWxTdGVwQ291bnQ6IG51bWJlcikge1xuICAgIHRoaXMuX3RvdGFsU3RlcENvdW50ID0gdG90YWxTdGVwQ291bnQ7XG4gICAgdGhpcy50cmlnZ2VyRXZlbnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdG90YWxTdGVwQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsU3RlcENvdW50O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdG90YWxTdGVwQ291bnQ6IG51bWJlcixcbiAgICBwcml2YXRlIHBlcmNlbnRhZ2VSb3VuZGluZzogbnVtYmVyID0gMSkge31cblxuICBwcml2YXRlIGN1cnJlbnRTdGF0ZUV2ZW50KCk6IFByb2dyZXNzRXZlbnQge1xuICAgIHJldHVybiBuZXcgUHJvZ3Jlc3NFdmVudCh0aGlzLnRvdGFsU3RlcENvdW50LCB0aGlzLmNvbXBsZXRlZENvdW50LCB0aGlzLnBlcmNlbnRhZ2VSb3VuZGluZyk7XG4gIH1cblxuICBwdWJsaWMgYWRkUHJvZ3Jlc3NMaXN0ZW5lcihsaXN0ZW5lcjogUHJvZ3Jlc3NMaXN0ZW5lcikge1xuICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIGxpc3RlbmVyKHRoaXMuY3VycmVudFN0YXRlRXZlbnQoKSk7XG4gIH1cblxuICBwdWJsaWMgdGljaygpIHtcbiAgICB0aGlzLmNvbXBsZXRlZENvdW50Kys7XG4gICAgdGhpcy50cmlnZ2VyRXZlbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgdHJpZ2dlckV2ZW50KCkge1xuICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5jdXJyZW50U3RhdGVFdmVudCgpO1xuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIoZXZlbnQpKTtcbiAgfVxuXG59XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
