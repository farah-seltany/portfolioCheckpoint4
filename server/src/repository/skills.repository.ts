import { Skill } from './../models/skill';
import { MysqlConnection } from './../loaders/mysql';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
export class SkillsRepository {

    private static instance: SkillsRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'skills';

    static getInstance() {
        if (!this.instance) {
            this.instance = new SkillsRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all posts and return it in a promise.
     */
    findAll(): Promise<Skill[]> {
        return this.connection.query(`SELECT * from ${this.table}`)
          .then((results: any) => {
            return results.map((skill: any) => new Skill(skill));
          });
    }

    /**
     * Make a query to the database to retrieve one post by its id in parameter. 
     * Return the post found in a promise.
     * @param id post id
     */
    findById(id: number): Promise<Skill> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new Skill(results[0]));
    }


    /**
     * Make a query to the database to insert a new post and return the created post in a promise.
     * @param post post to create
     */
    insert(skill: Skill) {
      return this.connection.query(
        `INSERT INTO ${this.table} (title, description, user_id) VALUES (?,?,?) `,
        [skill.title, skill.description, skill.user_id]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing post and return the updated post in a promise.
     * @param post post to update
     */
    update(skill: Skill) {
      return this.connection.query(
        `UPDATE ${this.table} SET title = ?, description = ? WHERE id = ?`,
        [skill.title, skill.description, skill.id]
      ).then(() => {
        return this.findById(skill.id);
      });
    }

    /**
     * Make a query to the database to delete an existing post and return an empry promise
     * @param id post id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}
