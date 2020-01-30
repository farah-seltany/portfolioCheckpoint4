import { Realisation } from './../models/realisation';
import { MysqlConnection } from './../loaders/mysql';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
export class RealisationsRepository {

    private static instance: RealisationsRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'realisations';

    static getInstance() {
        if (!this.instance) {
            this.instance = new RealisationsRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all posts and return it in a promise.
     */
    findAll(): Promise<Realisation[]> {
        return this.connection.query(`SELECT * from ${this.table} ORDER BY id DESC`)
          .then((results: any) => {
            return results.map((real: any) => new Realisation(real));
          });
    }

    /**
     * Make a query to the database to retrieve one post by its id in parameter. 
     * Return the post found in a promise.
     * @param id post id
     */
    findById(id: number): Promise<Realisation> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new Realisation(results[0]));
    }


    /**
     * Make a query to the database to insert a new post and return the created post in a promise.
     * @param post post to create
     */
    insert(real: Realisation) {
      return this.connection.query(
        `INSERT INTO ${this.table} (title, subtitle, image, description, user_id) VALUES (?,?,?,?,?) `,
        [real.title, real.subtitle, real.image, real.description, 1]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing post and return the updated post in a promise.
     * @param post post to update
     */
    update(real: Realisation) {
      return this.connection.query(
        `UPDATE ${this.table} SET title = ?, subtitle = ?, image = ?, description = ?, lien = ? WHERE id = ?`,
        [real.title, real.subtitle, real.image, real.description, real.lien, real.id]
      ).then(() => {
        return this.findById(real.id);
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
