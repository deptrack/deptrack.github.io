define(["require", "exports", "semver"], function (require, exports, SemVer) {
    var VersionNumber = (function () {
        function VersionNumber(_rawVersionString) {
            this._rawVersionString = _rawVersionString;
            if (this.isSemVer()) {
                this.semver = new SemVer.SemVer(_rawVersionString);
            }
        }
        Object.defineProperty(VersionNumber.prototype, "rawVersionString", {
            get: function () {
                return this._rawVersionString;
            },
            enumerable: true,
            configurable: true
        });
        VersionNumber.prototype.toString = function () {
            return this._rawVersionString;
        };
        VersionNumber.prototype.requireSemVer = function () {
            if (!this.isSemVer()) {
                throw new Error(this._rawVersionString + " is not a semver");
            }
        };
        VersionNumber.prototype.major = function () {
            this.requireSemVer();
            return this.semver.major;
        };
        VersionNumber.prototype.minor = function () {
            this.requireSemVer();
            return this.semver.minor;
        };
        VersionNumber.prototype.isSemVer = function () {
            return SemVer.valid(this._rawVersionString) != null;
        };
        VersionNumber.compare = function (v1, v2) {
            if (!(v1.isSemVer() && v2.isSemVer())) {
                throw new Error("both v1 and v2 should be semver");
            }
            return SemVer.compare(v1.rawVersionString, v2.rawVersionString);
        };
        VersionNumber.equal = function (v1, v2) {
            return VersionNumber.compare(v1, v2) === 0;
        };
        return VersionNumber;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = VersionNumber;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vbW9kZWwvVmVyc2lvbk51bWJlci50cyJdLCJuYW1lcyI6WyJWZXJzaW9uTnVtYmVyIiwiVmVyc2lvbk51bWJlci5jb25zdHJ1Y3RvciIsIlZlcnNpb25OdW1iZXIucmF3VmVyc2lvblN0cmluZyIsIlZlcnNpb25OdW1iZXIudG9TdHJpbmciLCJWZXJzaW9uTnVtYmVyLnJlcXVpcmVTZW1WZXIiLCJWZXJzaW9uTnVtYmVyLm1ham9yIiwiVmVyc2lvbk51bWJlci5taW5vciIsIlZlcnNpb25OdW1iZXIuaXNTZW1WZXIiXSwibWFwcGluZ3MiOiI7SUFFQTtRQW1CRUEsdUJBQW9CQSxpQkFBeUJBO1lBQXpCQyxzQkFBaUJBLEdBQWpCQSxpQkFBaUJBLENBQVFBO1lBQzNDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDcEJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7WUFDckRBLENBQUNBO1FBQ0hBLENBQUNBO1FBUkRELHNCQUFXQSwyQ0FBZ0JBO2lCQUEzQkE7Z0JBQ0VFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0E7WUFDaENBLENBQUNBOzs7V0FBQUY7UUFRREEsZ0NBQVFBLEdBQVJBO1lBQ0VHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0E7UUFDaENBLENBQUNBO1FBRU9ILHFDQUFhQSxHQUFyQkE7WUFDRUksRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3JCQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7WUFDL0RBLENBQUNBO1FBQ0hBLENBQUNBO1FBRU1KLDZCQUFLQSxHQUFaQTtZQUNFSyxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQTtZQUNyQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDM0JBLENBQUNBO1FBRU1MLDZCQUFLQSxHQUFaQTtZQUNFTSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQTtZQUNyQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDM0JBLENBQUNBO1FBRU1OLGdDQUFRQSxHQUFmQTtZQUNFTyxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLElBQUlBLENBQUNBO1FBQ3REQSxDQUFDQTtRQTdDTVAscUJBQU9BLEdBQUdBLFVBQVNBLEVBQWlCQSxFQUFFQSxFQUFpQkE7WUFDNUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUNyRCxDQUFDO1lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FBQUE7UUFFTUEsbUJBQUtBLEdBQUdBLFVBQVNBLEVBQWlCQSxFQUFFQSxFQUFpQkE7WUFDMUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUFBO1FBc0NIQSxvQkFBQ0E7SUFBREEsQ0FqREEsQUFpRENBLElBQUE7SUFqREQ7bUNBaURDLENBQUEiLCJmaWxlIjoibWFpbi9tb2RlbC9WZXJzaW9uTnVtYmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlbVZlciA9IHJlcXVpcmUoXCJzZW12ZXJcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlcnNpb25OdW1iZXIge1xuXG4gIHN0YXRpYyBjb21wYXJlID0gZnVuY3Rpb24odjE6IFZlcnNpb25OdW1iZXIsIHYyOiBWZXJzaW9uTnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoISh2MS5pc1NlbVZlcigpICYmIHYyLmlzU2VtVmVyKCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJib3RoIHYxIGFuZCB2MiBzaG91bGQgYmUgc2VtdmVyXCIpO1xuICAgIH1cbiAgICByZXR1cm4gU2VtVmVyLmNvbXBhcmUodjEucmF3VmVyc2lvblN0cmluZywgdjIucmF3VmVyc2lvblN0cmluZyk7XG4gIH1cblxuICBzdGF0aWMgZXF1YWwgPSBmdW5jdGlvbih2MTogVmVyc2lvbk51bWJlciwgdjI6IFZlcnNpb25OdW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gVmVyc2lvbk51bWJlci5jb21wYXJlKHYxLCB2MikgPT09IDA7XG4gIH1cblxuICBwcml2YXRlIHNlbXZlcjogU2VtVmVyLlNlbVZlcjtcblxuICBwdWJsaWMgZ2V0IHJhd1ZlcnNpb25TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3VmVyc2lvblN0cmluZztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Jhd1ZlcnNpb25TdHJpbmc6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmlzU2VtVmVyKCkpIHtcbiAgICAgIHRoaXMuc2VtdmVyID0gbmV3IFNlbVZlci5TZW1WZXIoX3Jhd1ZlcnNpb25TdHJpbmcpO1xuICAgIH1cbiAgfVxuXG4gIHRvU3RyaW5nKCk6IFN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd1ZlcnNpb25TdHJpbmc7XG4gIH1cblxuICBwcml2YXRlIHJlcXVpcmVTZW1WZXIoKSB7XG4gICAgaWYgKCF0aGlzLmlzU2VtVmVyKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLl9yYXdWZXJzaW9uU3RyaW5nICsgXCIgaXMgbm90IGEgc2VtdmVyXCIpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBtYWpvcigpOiBudW1iZXIge1xuICAgIHRoaXMucmVxdWlyZVNlbVZlcigpO1xuICAgIHJldHVybiB0aGlzLnNlbXZlci5tYWpvcjtcbiAgfVxuXG4gIHB1YmxpYyBtaW5vcigpOiBudW1iZXIge1xuICAgIHRoaXMucmVxdWlyZVNlbVZlcigpO1xuICAgIHJldHVybiB0aGlzLnNlbXZlci5taW5vcjtcbiAgfVxuXG4gIHB1YmxpYyBpc1NlbVZlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gU2VtVmVyLnZhbGlkKHRoaXMuX3Jhd1ZlcnNpb25TdHJpbmcpICE9IG51bGw7XG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
