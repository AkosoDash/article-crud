import validator from 'email-validator';

function authorRegisterValidatorFunction ({username, password, telp, email}){
    if (!username) throw new Error("Username can't be empty");
    if (typeof username !== 'string') throw new Error("Username must be string");
    
    if (!password) throw new Error("Password can't be empty");
    if (typeof password !== 'string') throw new Error("Password must be string");

    if (!telp) throw new Error("Telp can't be empty");
    if (typeof telp !== 'string') throw new Error("Telp must be string");

    if (!email) throw new Error("Email can't be empty");
    if (typeof email !== 'string') throw new Error("Email must be string");
    if (!validator.validate(email)) throw new Error("Email format was wrong");

    return{
        getUsername: () => username,
        getPassword: () => password,
        getTelp: () => telp,
        getEmail: () => email
    }
}

function authorLoginValidatorFunction ({username, password}){
    if (!username) throw new Error("Username can't be empty");
    if (typeof username !== 'string') throw new Error("Username must be string");
    
    if (!password) throw new Error("Password can't be empty");
    if (typeof password !== 'string') throw new Error("Password must be string");

    return{
        getUsername: () => username,
        getPassword: () => password
    }
}

export default {authorLoginValidatorFunction, authorRegisterValidatorFunction};