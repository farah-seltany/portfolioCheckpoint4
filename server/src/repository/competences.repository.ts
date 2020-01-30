import { Competence } from './../models/competence';
import { MysqlConnection } from './../loaders/mysql';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
export class CompetencesRepository {

    private static instance: CompetencesRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'competences';

    static getInstance() {
        if (!this.instance) {
            this.instance = new CompetencesRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all posts and return it in a promise.
     */
    findAll(): Promise<Competence[]> {
        return this.connection.query(`SELECT * from ${this.table} ORDER BY id DESC`)
          .then((results: any) => {
            return results.map((comp: any) => new Competence(comp));
          });
    }

    /**
     * Make a query to the database to retrieve one post by its id in parameter. 
     * Return the post found in a promise.
     * @param id post id
     */
    findById(id: number): Promise<Competence> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new Competence(results[0]));
    }


    /**
     * Make a query to the database to insert a new post and return the created post in a promise.
     * @param post post to create
     */
    insert(comp: Competence) {
      return this.connection.query(
        `INSERT INTO ${this.table} (title, image, rating, user_id) VALUES (?,?,?,?) `,
        [comp.title, comp.image, comp.rating, 1]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing post and return the updated post in a promise.
     * @param post post to update
     */
    update(comp: Competence) {
      return this.connection.query(
        `UPDATE ${this.table} SET title = ?, image = ?, rating = ? WHERE id = ?`,
        [comp.title, comp.image, comp.rating, comp.id]
      ).then(() => {
        return this.findById(comp.id);
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
