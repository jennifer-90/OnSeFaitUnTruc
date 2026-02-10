// validation + nettoyage des données envoyées par le client
// body = l’objet qui contient les données envoyées par le client (req.body).

export function validationLogin(body) {

    //? ---EMAIL
    let email = "";

    if (body && body.email !== undefined && body.email !== null) {
        email = String(body.email).trim().toLowerCase();
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

    if (!email) throw new Error("Email obligatoire");
    if (!emailRegex.test(email)) throw new Error("Email invalide");


    //? ---PASSWORD
    let password = "";

    if (body && body.password !== undefined && body.password !== null) {
        password = String(body.password); // pas de trim sur password
    }
    if (!password) throw new Error("Mot de passe obligatoire");

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/;

    if (!passwordRegex.test(password)) {
        throw new Error("Mot de passe invalide (min 7 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial)");
    }

}