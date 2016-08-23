var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "backbone", "../model/DependencyModel"], function (require, exports, Backbone, DependencyModel_1) {
    var DependencyCollection = (function (_super) {
        __extends(DependencyCollection, _super);
        function DependencyCollection() {
            _super.apply(this, arguments);
            this.model = DependencyModel_1.default;
        }
        DependencyCollection.prototype.comparator = function (e1, e2) {
            return DependencyCollection.compare(e1, e2);
        };
        DependencyCollection.compare = function (e1, e2) {
            if (e1.isObsolete && !e2.isObsolete) {
                return -1;
            }
            else if (e2.isObsolete && !e1.isObsolete) {
                return 1;
            }
            else if (e1.name === e2.name) {
                return 0;
            }
            else if (e1.name < e2.name) {
                return -1;
            }
            else {
                return 1;
            }
        };
        return DependencyCollection;
    })(Backbone.Collection);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = DependencyCollection;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vY29sbGVjdGlvbi9EZXBlbmRlbmN5Q29sbGVjdGlvbi50cyJdLCJuYW1lcyI6WyJEZXBlbmRlbmN5Q29sbGVjdGlvbiIsIkRlcGVuZGVuY3lDb2xsZWN0aW9uLmNvbnN0cnVjdG9yIiwiRGVwZW5kZW5jeUNvbGxlY3Rpb24uY29tcGFyYXRvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBR0E7UUFBa0RBLHdDQUFvQ0E7UUFBdEZBO1lBQWtEQyw4QkFBb0NBO1lBZ0JwRkEsVUFBS0EsR0FBR0EseUJBQWVBLENBQUNBO1FBSzFCQSxDQUFDQTtRQUhDRCx5Q0FBVUEsR0FBVkEsVUFBV0EsRUFBbUJBLEVBQUVBLEVBQW9CQTtZQUNsREUsTUFBTUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUM5Q0EsQ0FBQ0E7UUFsQk1GLDRCQUFPQSxHQUFHQSxVQUFVQSxFQUFtQkEsRUFBRUEsRUFBb0JBO1lBQ2xFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1osQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNaLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQztRQUNILENBQUMsQ0FBQUE7UUFPSEEsMkJBQUNBO0lBQURBLENBckJBLEFBcUJDQSxFQXJCaUQsUUFBUSxDQUFDLFVBQVUsRUFxQnBFO0lBckJEOzBDQXFCQyxDQUFBIiwiZmlsZSI6Im1haW4vY29sbGVjdGlvbi9EZXBlbmRlbmN5Q29sbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSA9IHJlcXVpcmUoXCJiYWNrYm9uZVwiKTtcbmltcG9ydCBEZXBlbmRlbmN5TW9kZWwgZnJvbSBcIi4uL21vZGVsL0RlcGVuZGVuY3lNb2RlbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXBlbmRlbmN5Q29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb248RGVwZW5kZW5jeU1vZGVsPiB7XG5cbiAgc3RhdGljIGNvbXBhcmUgPSBmdW5jdGlvbiAoZTE6IERlcGVuZGVuY3lNb2RlbCwgZTI/OiBEZXBlbmRlbmN5TW9kZWwpOiBudW1iZXIge1xuICAgIGlmIChlMS5pc09ic29sZXRlICYmICFlMi5pc09ic29sZXRlKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSBlbHNlIGlmIChlMi5pc09ic29sZXRlICYmICFlMS5pc09ic29sZXRlKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGUxLm5hbWUgPT09IGUyLm5hbWUpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSBpZiAoZTEubmFtZSA8IGUyLm5hbWUpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICB9XG5cbiAgbW9kZWwgPSBEZXBlbmRlbmN5TW9kZWw7XG5cbiAgY29tcGFyYXRvcihlMTogRGVwZW5kZW5jeU1vZGVsLCBlMj86IERlcGVuZGVuY3lNb2RlbCk6IG51bWJlciB7XG4gICAgcmV0dXJuIERlcGVuZGVuY3lDb2xsZWN0aW9uLmNvbXBhcmUoZTEsIGUyKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
