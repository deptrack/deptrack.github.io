define(["require", "exports"], function (require, exports) {
    var GithubUser = (function () {
        function GithubUser(login, id) {
            this.login = login;
            this.id = id;
        }
        Object.defineProperty(GithubUser.prototype, "avatarUrl", {
            get: function () {
                return "https://avatars.githubusercontent.com/u/" + this.id + "?v=3";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GithubUser.prototype, "githubProfileUrl", {
            get: function () {
                return "https://github.com/" + this.login;
            },
            enumerable: true,
            configurable: true
        });
        return GithubUser;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = GithubUser;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vbW9kZWwvR2l0aHViVXNlci50cyJdLCJuYW1lcyI6WyJHaXRodWJVc2VyIiwiR2l0aHViVXNlci5jb25zdHJ1Y3RvciIsIkdpdGh1YlVzZXIuYXZhdGFyVXJsIiwiR2l0aHViVXNlci5naXRodWJQcm9maWxlVXJsIl0sIm1hcHBpbmdzIjoiO0lBQUE7UUFFRUEsb0JBQ1NBLEtBQWFBLEVBQ2JBLEVBQVVBO1lBRFZDLFVBQUtBLEdBQUxBLEtBQUtBLENBQVFBO1lBQ2JBLE9BQUVBLEdBQUZBLEVBQUVBLENBQVFBO1FBQ2ZBLENBQUNBO1FBRUxELHNCQUFJQSxpQ0FBU0E7aUJBQWJBO2dCQUNFRSxNQUFNQSxDQUFDQSwwQ0FBMENBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLE1BQU1BLENBQUNBO1lBQ3ZFQSxDQUFDQTs7O1dBQUFGO1FBRURBLHNCQUFJQSx3Q0FBZ0JBO2lCQUFwQkE7Z0JBQ0VHLE1BQU1BLENBQUNBLHFCQUFxQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDNUNBLENBQUNBOzs7V0FBQUg7UUFFSEEsaUJBQUNBO0lBQURBLENBZkEsQUFlQ0EsSUFBQTtJQWZEO2dDQWVDLENBQUEiLCJmaWxlIjoibWFpbi9tb2RlbC9HaXRodWJVc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2l0aHViVXNlciB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGxvZ2luOiBzdHJpbmcsXG4gICAgcHVibGljIGlkOiBudW1iZXJcbiAgKSB7IH1cblxuICBnZXQgYXZhdGFyVXJsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFwiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91L1wiICsgdGhpcy5pZCArIFwiP3Y9M1wiO1xuICB9XG5cbiAgZ2V0IGdpdGh1YlByb2ZpbGVVcmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCJodHRwczovL2dpdGh1Yi5jb20vXCIgKyB0aGlzLmxvZ2luO1xuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
