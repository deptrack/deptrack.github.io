define(["require", "exports"], function (require, exports) {
    function toPromise(jq, jsonMapper) {
        if (jsonMapper === void 0) { jsonMapper = function (obj) { return obj; }; }
        var rval = new Promise(function (resolve, reject) {
            jq.then(function (obj) {
                resolve(jsonMapper(obj));
            });
            jq.fail(function (failure) {
                reject(failure);
            });
        });
        return rval;
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = toPromise;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vbW9kZWwvdG9Qcm9taXNlLnRzIl0sIm5hbWVzIjpbInRvUHJvbWlzZSJdLCJtYXBwaW5ncyI6IjtJQUVBLG1CQUFxQyxFQUFzQixFQUFFLFVBQW1DO1FBQW5DQSwwQkFBbUNBLEdBQW5DQSxhQUF5QkEsVUFBQUEsR0FBR0EsSUFBSUEsT0FBQUEsR0FBR0EsRUFBSEEsQ0FBR0E7UUFDOUZBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLE9BQU9BLENBQUlBLFVBQ3hCQSxPQUF5QkEsRUFDekJBLE1BQTBCQTtZQUUxQkEsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBQUEsR0FBR0E7Z0JBQ1RBLE9BQU9BLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQzNCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNIQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFBQSxPQUFPQTtnQkFDYkEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDbEJBLENBQUNBLENBQUNBLENBQUFBO1FBQ0pBLENBQUNBLENBQUNBLENBQUNBO1FBQ0hBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO0lBQ2RBLENBQUNBO0lBYkQ7K0JBYUMsQ0FBQSIsImZpbGUiOiJtYWluL21vZGVsL3RvUHJvbWlzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b1Byb21pc2U8VD4oanE6IEpRdWVyeVByb21pc2U8YW55PiwganNvbk1hcHBlcjogKGFueSkgPT4gVCA9IG9iaiA9PiBvYmopOiBQcm9taXNlLklUaGVuYWJsZTxUPiB7XG4gIHZhciBydmFsID0gbmV3IFByb21pc2U8VD4oKFxuICAgIHJlc29sdmU6ICh2YWw6IFQpID0+IHZvaWQsXG4gICAgcmVqZWN0OiAoZXJyOiBhbnkpID0+IHZvaWRcbiAgKSA9PiB7XG4gICAganEudGhlbihvYmogPT4ge1xuICAgICAgcmVzb2x2ZShqc29uTWFwcGVyKG9iaikpO1xuICAgIH0pO1xuICAgIGpxLmZhaWwoZmFpbHVyZSA9PiB7XG4gICAgICByZWplY3QoZmFpbHVyZSk7XG4gICAgfSlcbiAgfSk7XG4gIHJldHVybiBydmFsO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
