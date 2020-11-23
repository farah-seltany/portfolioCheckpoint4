"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var skills_repository_1 = require("./../repository/skills.repository");
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les post doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
var SkillsService = /** @class */ (function () {
    function SkillsService() {
        this.repository = skills_repository_1.SkillsRepository.getInstance();
    }
    SkillsService.getInstance = function () {
        if (!this.instance) {
            this.instance = new SkillsService();
        }
        return this.instance;
    };
    // Business logic
    /**
     * Return a promise which contains an array of posts.
     */
    SkillsService.prototype.getAll = function () {
        return this.repository.findAll();
    };
    /**
     * Return a promise which contains the post relative to the id in parameter.
     * @param id post id
     */
    SkillsService.prototype.getById = function (id) {
        return this.repository.findById(id);
    };
    /**
     * Create a new post and return a promise which contains the created post.
     * @param post post to create
     */
    SkillsService.prototype.create = function (skill) {
        return this.repository.insert(skill);
    };
    /**
     * Update the post in parameter and return a promise which contains the updated post.
     * @param post post to update
     */
    SkillsService.prototype.update = function (skill) {
        return this.repository.update(skill);
    };
    /**
     * Delete the post related to the id in parameter. Return an empty promise.
     * @param id post id
     */
    SkillsService.prototype.delete = function (id) {
        return this.repository.delete(id);
    };
    return SkillsService;
}());
exports.SkillsService = SkillsService;
