const app = require("express")();
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const { logger } = require("./helpers/logger.js");


const mailRouter = require("./routes/mailRouter")

var allowedDomains = [
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.all("*", function (req,res,next){
  logger.info({
    method: req.method,
    url:req.url,
    query: req.query || {},
    body: req.body || {},
  });
  next();
});


app.use("/api/v1", mailRouter);

const Port = process.env.PORT || 8000;
app.listen(Port,() =>{
  console.log(`server listening at port: ${Port}`);
})
