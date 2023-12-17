const { port } = require("./configs/server.config");
const handlebars = require("express-handlebars");
const app = require("./server");

// Configuro motor de plantillas
// Aplicacion de express vamos a utilizar un motor ("motorHandlebars" nombre que usaré en los métodos)
app.engine("handlebars", handlebars.engine());
// Configuro donde están las plantillas
app.set("views", process.cwd() + "/src/views");
// Configuro la plantilla por default. Si no quiero usar el .handlebars en views
//  Ejemplo: products.handlebars
app.set("view engine", "handlebars");

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
