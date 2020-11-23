"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./../models/user");
var mysql_1 = require("./../loaders/mysql");
/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
var UsersRepository = /** @class */ (function () {
    function UsersRepository() {
        this.connection = mysql_1.MysqlConnection.getInstance();
        this.table = 'user';
    }
    UsersRepository.getInstance = function () {
        if (!this.instance) {
            this.instance = new UsersRepository();
        }
        return this.instance;
    };
    /**
     * Make a query to the database to retrieve all posts and return it in a promise.
     */
    UsersRepository.prototype.findAll = function () {
        return this.connection.query("SELECT * from " + this.table)
            .then(function (results) {
            return results.map(function (user) { return new user_1.User(user); });
        });
    };
    /**
     * Make a query to the database to retrieve one post by its id in parameter.
     * Return the post found in a promise.
     * @param id post id
     */
    UsersRepository.prototype.findById = function (id) {
        return this.connection.query("SELECT * FROM " + this.table + " WHERE id = ?", [id])
            .then(function (results) { return new user_1.User(results[0]); });
    };
    UsersRepository.prototype.findByEmail = function (email) {
        return this.connection.query("SELECT * FROM " + this.table + " WHERE email = ?", [email])
            .then(function (results) { return new user_1.User(results[0]); });
    };
    /**
     * Make a query to the database to insert a new post and return the created post in a promise.
     * @param post post to create
     */
    UsersRepository.prototype.insert = function (user) {
        var _this = this;
        return this.connection.query("INSERT INTO " + this.table + " (firstname, lastname, title, description, telephone, email, linkedin, github, twitter, cv, photo, password) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ", [user.firstname, user.lastname, user.title, user.description, user.telephone, user.email, user.linkedin, user.github, user.twitter, user.cv, user.photo, user.password]).then(function (result) {
            // After an insert the insert id is directly passed in the promise
            return _this.findById(result.insertId);
        });
    };
    /**
     * Make a query to the database to update an existing post and return the updated post in a promise.
     * @param post post to update
     */
    UsersRepository.prototype.update = function (user) {
        var _this = this;
        return this.connection.query("UPDATE " + this.table + " SET firstname = ?, lastname = ?, title = ?, description = ?, telephone = ?, email = ?, linkedin = ?, github = ?, twitter = ?, cv = ?, photo = ?, password = ? WHERE id = ?", [user.firstname, user.lastname, user.title, user.description, user.telephone, user.email, user.linkedin, user.github, user.twitter, user.cv, user.photo, user.password, user.id]).then(function () {
            return _this.findById(user.id);
        });
    };
    UsersRepository.prototype.changePassword = function (user) {
        var _this = this;
        return this.connection.query("UPDATE " + this.table + " SET password = ? WHERE id = ?", [user.password, user.id]).then(function () {
            return _this.findById(user.id);
        });
    };
    /**
     * Make a query to the database to delete an existing post and return an empry promise
     * @param id post id to delete
     */
    UsersRepository.prototype.delete = function (id) {
        return this.connection.query("DELETE FROM " + this.table + " WHERE id = ?", [id]);
    };
    return UsersRepository;
}());
exports.UsersRepository = UsersRepository;
