// validation + nettoyage des données envoyées par le client
// body = l’objet qui contient les données envoyées par le client (req.body).

const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/;


export function validationLogin(body) {

    //? ---EMAIL
    let email = "";
    if (body && body.email !== undefined && body.email !== null) {
        email = String(body.email).trim().toLowerCase();
    }
    if (!email) throw new Error("Email obligatoire");
    if (!emailRegex.test(email)) throw new Error("Email invalide");


    //? ---PASSWORD
    let password = "";
    if (body && body.password !== undefined && body.password !== null) {
        password = String(body.password); // pas de trim sur password
    }
    if (!password) throw new Error("Mot de passe obligatoire");
    if (!passwordRegex.test(password)) {
        throw new Error("Mot de passe invalide (min 7 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial)");
    }

    return {email, password}
}

export function validationRegister(body) {

    //?---EMAIL
    let email = "";
    if (body && body.email !== undefined && body.email !== null) {
        email = String(body.email).trim().toLocaleLowerCase();
    }
    if (!email) throw new Error("Email obligatoire");
    if (!emailRegex.test(email)) throw new Error("Email invalide");


    //?---PSEUDO
    let pseudo = "";
    if (body && body.pseudo !== undefined && body.pseudo !== null) {
        pseudo = String(body.pseudo).trim().toLocaleLowerCase();
    }
    if (!pseudo) throw new Error("Peudo obligatoire");
    if (pseudo.length < 3) throw new Error("Pseudo trop court min 3 caractère)");
    if (pseudo.length > 30) throw new Error("Pseudo trop long (max 30 caractères)")


    //?---PASSWORD
    let password = "";
    if (body && body.password !== undefined && body.password !== null) {
        password = String(body.password);
    }
    if (!passwordRegex.test(password)) {
        throw new Error("Mot de passe invalide (min 7 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial)")
    }

    return { email, pseudo, password }
}