"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var competences_repository_1 = require("./../repository/competences.repository");
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les post doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
var CompetencesService = /** @class */ (function () {
    function CompetencesService() {
        this.repository = competences_repository_1.CompetencesRepository.getInstance();
    }
    CompetencesService.getInstance = function () {
        if (!this.instance) {
            this.instance = new CompetencesService();
        }
        return this.instance;
    };
    // Business logic
    /**
     * Return a promise which contains an array of posts.
     */
    CompetencesService.prototype.getAll = function () {
        return this.repository.findAll();
    };
    /**
     * Return a promise which contains the post relative to the id in parameter.
     * @param id post id
     */
    CompetencesService.prototype.getById = function (id) {
        return this.repository.findById(id);
    };
    /**
     * Create a new post and return a promise which contains the created post.
     * @param post post to create
     */
    CompetencesService.prototype.create = function (comp) {
        return this.repository.insert(comp);
    };
    /**
     * Update the post in parameter and return a promise which contains the updated post.
     * @param post post to update
     */
    CompetencesService.prototype.update = function (comp) {
        return this.repository.update(comp);
    };
    /**
     * Delete the post related to the id in parameter. Return an empty promise.
     * @param id post id
     */
    CompetencesService.prototype.delete = function (id) {
        return this.repository.delete(id);
    };
    return CompetencesService;
}());
exports.CompetencesService = CompetencesService;
