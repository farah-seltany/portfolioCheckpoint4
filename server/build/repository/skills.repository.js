"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var skill_1 = require("./../models/skill");
var mysql_1 = require("./../loaders/mysql");
/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
var SkillsRepository = /** @class */ (function () {
    function SkillsRepository() {
        this.connection = mysql_1.MysqlConnection.getInstance();
        this.table = 'skills';
    }
    SkillsRepository.getInstance = function () {
        if (!this.instance) {
            this.instance = new SkillsRepository();
        }
        return this.instance;
    };
    /**
     * Make a query to the database to retrieve all posts and return it in a promise.
     */
    SkillsRepository.prototype.findAll = function () {
        return this.connection.query("SELECT * from " + this.table)
            .then(function (results) {
            return results.map(function (skill) { return new skill_1.Skill(skill); });
        });
    };
    /**
     * Make a query to the database to retrieve one post by its id in parameter.
     * Return the post found in a promise.
     * @param id post id
     */
    SkillsRepository.prototype.findById = function (id) {
        return this.connection.query("SELECT * FROM " + this.table + " WHERE id = ?", [id])
            .then(function (results) { return new skill_1.Skill(results[0]); });
    };
    /**
     * Make a query to the database to insert a new post and return the created post in a promise.
     * @param post post to create
     */
    SkillsRepository.prototype.insert = function (skill) {
        var _this = this;
        return this.connection.query("INSERT INTO " + this.table + " (title, description, user_id) VALUES (?,?,?) ", [skill.title, skill.description, skill.user_id]).then(function (result) {
            // After an insert the insert id is directly passed in the promise
            return _this.findById(result.insertId);
        });
    };
    /**
     * Make a query to the database to update an existing post and return the updated post in a promise.
     * @param post post to update
     */
    SkillsRepository.prototype.update = function (skill) {
        var _this = this;
        return this.connection.query("UPDATE " + this.table + " SET title = ?, description = ? WHERE id = ?", [skill.title, skill.description, skill.id]).then(function () {
            return _this.findById(skill.id);
        });
    };
    /**
     * Make a query to the database to delete an existing post and return an empry promise
     * @param id post id to delete
     */
    SkillsRepository.prototype.delete = function (id) {
        return this.connection.query("DELETE FROM " + this.table + " WHERE id = ?", [id]);
    };
    return SkillsRepository;
}());
exports.SkillsRepository = SkillsRepository;
