define(["require", "exports", "../model/toPromise", "promise"], function (require, exports, toPromise_1) {
    var DefaultHttpClient = (function () {
        function DefaultHttpClient() {
        }
        DefaultHttpClient.prototype.getJSON = function (url) {
            var deferred = $.getJSON(url);
            return toPromise_1.default(deferred);
        };
        return DefaultHttpClient;
    })();
    function createHttpClient() {
        return new DefaultHttpClient();
    }
    exports.createHttpClient = createHttpClient;
    function createCORSHttpClient(proxyUrls) {
        return null;
    }
    exports.createCORSHttpClient = createCORSHttpClient;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vcmVtb3RlL0h0dHBDbGllbnQudHMiXSwibmFtZXMiOlsiRGVmYXVsdEh0dHBDbGllbnQiLCJEZWZhdWx0SHR0cENsaWVudC5jb25zdHJ1Y3RvciIsIkRlZmF1bHRIdHRwQ2xpZW50LmdldEpTT04iLCJjcmVhdGVIdHRwQ2xpZW50IiwiY3JlYXRlQ09SU0h0dHBDbGllbnQiXSwibWFwcGluZ3MiOiI7SUFVQTtRQUFBQTtRQU9BQyxDQUFDQTtRQUxRRCxtQ0FBT0EsR0FBZEEsVUFBZUEsR0FBV0E7WUFDeEJFLElBQU1BLFFBQVFBLEdBQUdBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2hDQSxNQUFNQSxDQUFDQSxtQkFBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDN0JBLENBQUNBO1FBRUhGLHdCQUFDQTtJQUFEQSxDQVBBLEFBT0NBLElBQUE7SUFFRDtRQUNFRyxNQUFNQSxDQUFDQSxJQUFJQSxpQkFBaUJBLEVBQUVBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUZlLHdCQUFnQixtQkFFL0IsQ0FBQTtJQUdELDhCQUFxQyxTQUFtQjtRQUN0REMsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7SUFDZEEsQ0FBQ0E7SUFGZSw0QkFBb0IsdUJBRW5DLENBQUEiLCJmaWxlIjoibWFpbi9yZW1vdGUvSHR0cENsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInByb21pc2VcIiAvPlxuaW1wb3J0IElUaGVuYWJsZSA9IFByb21pc2UuSVRoZW5hYmxlO1xuaW1wb3J0IHRvUHJvbWlzZSBmcm9tIFwiLi4vbW9kZWwvdG9Qcm9taXNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSHR0cENsaWVudCB7XG5cbiAgZ2V0SlNPTih1cmw6IHN0cmluZyk6IElUaGVuYWJsZTxhbnk+O1xuXG59XG5cbmNsYXNzIERlZmF1bHRIdHRwQ2xpZW50IGltcGxlbWVudHMgSHR0cENsaWVudCB7XG5cbiAgcHVibGljIGdldEpTT04odXJsOiBzdHJpbmcpOiBJVGhlbmFibGU8YW55PiB7XG4gICAgY29uc3QgZGVmZXJyZWQgPSAkLmdldEpTT04odXJsKTtcbiAgICByZXR1cm4gdG9Qcm9taXNlKGRlZmVycmVkKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIdHRwQ2xpZW50KCk6IEh0dHBDbGllbnQge1xuICByZXR1cm4gbmV3IERlZmF1bHRIdHRwQ2xpZW50KCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNPUlNIdHRwQ2xpZW50KHByb3h5VXJsczogc3RyaW5nW10pOiBIdHRwQ2xpZW50IHtcbiAgcmV0dXJuIG51bGw7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
