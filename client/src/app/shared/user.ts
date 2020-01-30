
export class User {
    firstname: string;
    lastname: string;
    title: string;
    description: string;
    telephone: string;
    email: number;
    linkedin: string;
    github: string;
    twitter: string;
    cv: string;
    photo: string;

    constructor(firstname: string, lastname: string, title: string, description: string, telephone: string, email: number, linkedin: string, 
        github: string, twitter: string, cv: string, photo: string)
        {
            this.firstname = firstname, 
            this.lastname = lastname,
            this.title = title, 
            this.description = description,
            this.telephone = telephone,
            this.email = email,
            this.linkedin = linkedin, 
            this.github = github,
            this.twitter = twitter,
            this.cv = cv,
            this.photo = photo
        }
}
