
const fs = require("fs");

// fichero de texto donde se guardan las preguntas
// con el JSON de quizzes
const DB_FILENAME = "quizzes.json";


//  Modelo de datos
//
// Quizzes existentes
// Es un array de objetos con los atributos  question y answer.
let quizzes = [
    {
        question: "Capital de Italia",
        answer: "Roma"
    },
    {
        question: "Capital de Francia",
        answer: "París"
    },
    {
        question: "Capital de España",
        answer: "Madrid"
    },
    {
        question: "Capital de Portugal",
        answer: "Lisboa"
}];

// Carga las preguntas guardadas en el fichero
// Carga el contenido del fichcero DB_FILENAME en la variable quizzes

const load = () => {

    fs.readFile(DB_FILENAME, (err, data) => {
        if (err){

            //La primera vez no existe el fichero
            if (err.code === "ENOENT"){
                save(); //valores iniciales
                return;
            }
            throw err;
        }

        let json = JSON.parse(data);

        if (json){
            quizzes = json;
        }
    });
};

// Guarda las preguntas en el fichero

const save = () => {

    fs.writeFile(DB_FILENAME,
        JSON.stringify(quizzes),
        err => {
            if (err) throw err;
        });
};




exports.count = () => quizzes.length;

exports.add = (question, answer) => {

    quizzes.push({
        question: (question || "").trim(),
        answer: (answer || "").trim()
    });
    save();
};

exports.update = (id, question, answer) => {

    const quiz = quizzes[id];
    if (typeof quiz === "undefined"){
        throw new Error(`El valor del parámetro id no es válido`);
    }
    quizzes.splice(id, 1, {
        question: (question || "").trim(),
        answer: (answer || "").trim()
    });
    save();
};

exports.getAll = () => JSON.parse(JSON.stringify(quizzes));

exports.getByIndex = id => {

    const quiz = quizzes[id];
    if(typeof  quiz === "undefined"){
        throw  new Error(`El valor del parámetro id no es válido.`);
    }
    return JSON.parse(JSON.stringify(quiz));
};

exports.deleteByIndex = id => {

    const quiz = quizzes[id];
    if(typeof  quiz === "undefined"){
        throw  new Error(`El valor del parámetro id no es válido`);
    }
    quizzes.splice(id, 1);
    save();
};

// Carga los quizzes almacenados en el fichero

load();
