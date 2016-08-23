define(["require", "exports"], function (require, exports) {
    var DisplayedVersionNumber = (function () {
        function DisplayedVersionNumber(label, versionNumber) {
            this.label = label;
            this.versionNumber = versionNumber;
        }
        Object.defineProperty(DisplayedVersionNumber.prototype, "value", {
            get: function () { return this.versionNumber.rawVersionString; },
            enumerable: true,
            configurable: true
        });
        return DisplayedVersionNumber;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = DisplayedVersionNumber;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vbW9kZWwvRGlzcGxheWVkVmVyc2lvbk51bWJlci50cyJdLCJuYW1lcyI6WyJEaXNwbGF5ZWRWZXJzaW9uTnVtYmVyIiwiRGlzcGxheWVkVmVyc2lvbk51bWJlci5jb25zdHJ1Y3RvciIsIkRpc3BsYXllZFZlcnNpb25OdW1iZXIudmFsdWUiXSwibWFwcGluZ3MiOiI7SUFFQTtRQUtFQSxnQ0FBbUJBLEtBQWFBLEVBQVNBLGFBQTRCQTtZQUFsREMsVUFBS0EsR0FBTEEsS0FBS0EsQ0FBUUE7WUFBU0Esa0JBQWFBLEdBQWJBLGFBQWFBLENBQWVBO1FBRXJFQSxDQUFDQTtRQUxERCxzQkFBSUEseUNBQUtBO2lCQUFUQSxjQUFjRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBLENBQUNBOzs7V0FBQUY7UUFPN0RBLDZCQUFDQTtJQUFEQSxDQVRBLEFBU0NBLElBQUE7SUFURDs0Q0FTQyxDQUFBIiwiZmlsZSI6Im1haW4vbW9kZWwvRGlzcGxheWVkVmVyc2lvbk51bWJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWZXJzaW9uTnVtYmVyIGZyb20gXCIuL1ZlcnNpb25OdW1iZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzcGxheWVkVmVyc2lvbk51bWJlciB7XG5cbiAgZ2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy52ZXJzaW9uTnVtYmVyLnJhd1ZlcnNpb25TdHJpbmc7IH1cblxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbDogc3RyaW5nLCBwdWJsaWMgdmVyc2lvbk51bWJlcjogVmVyc2lvbk51bWJlcikge1xuXG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
