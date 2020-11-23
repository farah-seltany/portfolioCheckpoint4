"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var users_repository_1 = require("./../repository/users.repository");
var jwt = __importStar(require("jsonwebtoken"));
var argon2 = __importStar(require("argon2"));
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les post doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
var UsersService = /** @class */ (function () {
    function UsersService() {
        this.repository = users_repository_1.UsersRepository.getInstance();
    }
    UsersService.getInstance = function () {
        if (!this.instance) {
            this.instance = new UsersService();
        }
        return this.instance;
    };
    UsersService.prototype.signup = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = user;
                        return [4 /*yield*/, argon2.hash(user.password)];
                    case 1:
                        _a.password = _b.sent();
                        return [2 /*return*/, this.repository.insert(user)];
                }
            });
        });
    };
    UsersService.prototype.signin = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isValid, userToken, secret, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.findByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('Les informations ne sont pas valide');
                        }
                        return [4 /*yield*/, argon2.verify(user.password, password)];
                    case 2:
                        isValid = _a.sent();
                        if (!isValid) {
                            throw new Error('Les informations ne sont pas valide');
                        }
                        userToken = {
                            email: user.email,
                            id: user.id
                        };
                        secret = process.env.JWT_SECRET;
                        if (!secret) {
                            throw new Error('Pas de secret setup');
                        }
                        token = jwt.sign(userToken, secret);
                        return [2 /*return*/, {
                                token: token,
                                email: user.email,
                                id: user.id,
                            }];
                }
            });
        });
    };
    UsersService.prototype.changePassword = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = user;
                        return [4 /*yield*/, argon2.hash(user.password)];
                    case 1:
                        _a.password = _b.sent();
                        return [2 /*return*/, this.repository.changePassword(user)];
                }
            });
        });
    };
    UsersService.prototype.verifyToken = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var authorization, bearerToken, secret, results, user, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        authorization = req.headers.authorization;
                        bearerToken = (_a = authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                        if (!!bearerToken) return [3 /*break*/, 1];
                        res.sendStatus(401);
                        return [3 /*break*/, 5];
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
                        return [4 /*yield*/, jwt.verify(bearerToken, secret)];
                    case 2:
                        results = _b.sent();
                        return [4 /*yield*/, users_repository_1.UsersRepository.getInstance().findByEmail(results.email)];
                    case 3:
                        user = _b.sent();
                        req.user = __assign(__assign({}, user), { password: undefined });
                        next();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        console.log(e_1);
                        res.sendStatus(401);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Business logic
    /**
     * Return a promise which contains an array of posts.
     */
    UsersService.prototype.getAll = function () {
        return this.repository.findAll();
    };
    /**
     * Return a promise which contains the post relative to the id in parameter.
     * @param id post id
     */
    UsersService.prototype.getById = function (id) {
        return this.repository.findById(id);
    };
    /**
     * Create a new post and return a promise which contains the created post.
     * @param post post to create
     */
    UsersService.prototype.create = function (user) {
        return this.repository.insert(user);
    };
    /**
     * Update the post in parameter and return a promise which contains the updated post.
     * @param post post to update
     */
    UsersService.prototype.update = function (post) {
        return this.repository.update(post);
    };
    /**
     * Delete the post related to the id in parameter. Return an empty promise.
     * @param id post id
     */
    UsersService.prototype.delete = function (id) {
        return this.repository.delete(id);
    };
    return UsersService;
}());
exports.UsersService = UsersService;
