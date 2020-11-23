"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var realisation_1 = require("./../models/realisation");
var mysql_1 = require("./../loaders/mysql");
/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
var RealisationsRepository = /** @class */ (function () {
    function RealisationsRepository() {
        this.connection = mysql_1.MysqlConnection.getInstance();
        this.table = 'realisations';
    }
    RealisationsRepository.getInstance = function () {
        if (!this.instance) {
            this.instance = new RealisationsRepository();
        }
        return this.instance;
    };
    /**
     * Make a query to the database to retrieve all posts and return it in a promise.
     */
    RealisationsRepository.prototype.findAll = function () {
        return this.connection.query("SELECT * from " + this.table + " ORDER BY id DESC")
            .then(function (results) {
            return results.map(function (real) { return new realisation_1.Realisation(real); });
        });
    };
    /**
     * Make a query to the database to retrieve one post by its id in parameter.
     * Return the post found in a promise.
     * @param id post id
     */
    RealisationsRepository.prototype.findById = function (id) {
        return this.connection.query("SELECT * FROM " + this.table + " WHERE id = ?", [id])
            .then(function (results) { return new realisation_1.Realisation(results[0]); });
    };
    /**
     * Make a query to the database to insert a new post and return the created post in a promise.
     * @param post post to create
     */
    RealisationsRepository.prototype.insert = function (real) {
        var _this = this;
        return this.connection.query("INSERT INTO " + this.table + " (title, subtitle, image, description, user_id) VALUES (?,?,?,?,?) ", [real.title, real.subtitle, real.image, real.description, 1]).then(function (result) {
            // After an insert the insert id is directly passed in the promise
            return _this.findById(result.insertId);
        });
    };
    /**
     * Make a query to the database to update an existing post and return the updated post in a promise.
     * @param post post to update
     */
    RealisationsRepository.prototype.update = function (real) {
        var _this = this;
        return this.connection.query("UPDATE " + this.table + " SET title = ?, subtitle = ?, image = ?, description = ?, lien = ? WHERE id = ?", [real.title, real.subtitle, real.image, real.description, real.lien, real.id]).then(function () {
            return _this.findById(real.id);
        });
    };
    /**
     * Make a query to the database to delete an existing post and return an empry promise
     * @param id post id to delete
     */
    RealisationsRepository.prototype.delete = function (id) {
        return this.connection.query("DELETE FROM " + this.table + " WHERE id = ?", [id]);
    };
    return RealisationsRepository;
}());
exports.RealisationsRepository = RealisationsRepository;
