"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var competence_1 = require("./../models/competence");
var mysql_1 = require("./../loaders/mysql");
/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
var CompetencesRepository = /** @class */ (function () {
    function CompetencesRepository() {
        this.connection = mysql_1.MysqlConnection.getInstance();
        this.table = 'competences';
    }
    CompetencesRepository.getInstance = function () {
        if (!this.instance) {
            this.instance = new CompetencesRepository();
        }
        return this.instance;
    };
    /**
     * Make a query to the database to retrieve all posts and return it in a promise.
     */
    CompetencesRepository.prototype.findAll = function () {
        return this.connection.query("SELECT * from " + this.table + " ORDER BY id DESC")
            .then(function (results) {
            return results.map(function (comp) { return new competence_1.Competence(comp); });
        });
    };
    /**
     * Make a query to the database to retrieve one post by its id in parameter.
     * Return the post found in a promise.
     * @param id post id
     */
    CompetencesRepository.prototype.findById = function (id) {
        return this.connection.query("SELECT * FROM " + this.table + " WHERE id = ?", [id])
            .then(function (results) { return new competence_1.Competence(results[0]); });
    };
    /**
     * Make a query to the database to insert a new post and return the created post in a promise.
     * @param post post to create
     */
    CompetencesRepository.prototype.insert = function (comp) {
        var _this = this;
        return this.connection.query("INSERT INTO " + this.table + " (title, image, rating, user_id) VALUES (?,?,?,?) ", [comp.title, comp.image, comp.rating, 1]).then(function (result) {
            // After an insert the insert id is directly passed in the promise
            return _this.findById(result.insertId);
        });
    };
    /**
     * Make a query to the database to update an existing post and return the updated post in a promise.
     * @param post post to update
     */
    CompetencesRepository.prototype.update = function (comp) {
        var _this = this;
        return this.connection.query("UPDATE " + this.table + " SET title = ?, image = ?, rating = ? WHERE id = ?", [comp.title, comp.image, comp.rating, comp.id]).then(function () {
            return _this.findById(comp.id);
        });
    };
    /**
     * Make a query to the database to delete an existing post and return an empry promise
     * @param id post id to delete
     */
    CompetencesRepository.prototype.delete = function (id) {
        return this.connection.query("DELETE FROM " + this.table + " WHERE id = ?", [id]);
    };
    return CompetencesRepository;
}());
exports.CompetencesRepository = CompetencesRepository;
