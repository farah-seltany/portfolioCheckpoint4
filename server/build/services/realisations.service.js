"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var realisations_repository_1 = require("./../repository/realisations.repository");
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les post doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
var RealisationsService = /** @class */ (function () {
    function RealisationsService() {
        this.repository = realisations_repository_1.RealisationsRepository.getInstance();
    }
    RealisationsService.getInstance = function () {
        if (!this.instance) {
            this.instance = new RealisationsService();
        }
        return this.instance;
    };
    // Business logic
    /**
     * Return a promise which contains an array of posts.
     */
    RealisationsService.prototype.getAll = function () {
        return this.repository.findAll();
    };
    /**
     * Return a promise which contains the post relative to the id in parameter.
     * @param id post id
     */
    RealisationsService.prototype.getById = function (id) {
        return this.repository.findById(id);
    };
    /**
     * Create a new post and return a promise which contains the created post.
     * @param post post to create
     */
    RealisationsService.prototype.create = function (real) {
        return this.repository.insert(real);
    };
    /**
     * Update the post in parameter and return a promise which contains the updated post.
     * @param post post to update
     */
    RealisationsService.prototype.update = function (real) {
        return this.repository.update(real);
    };
    /**
     * Delete the post related to the id in parameter. Return an empty promise.
     * @param id post id
     */
    RealisationsService.prototype.delete = function (id) {
        return this.repository.delete(id);
    };
    return RealisationsService;
}());
exports.RealisationsService = RealisationsService;
