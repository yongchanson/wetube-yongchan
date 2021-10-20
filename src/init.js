import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

// const PORT = 4000;
const PORT = process.env.PORT || 4000;

const handleListening = () => 
console.log(`✅Server listenting on http://localhost:${PORT}🚀`);

// app.listen(PORT, handleListening);
app.listen(PORT, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

//https://wetube-yongchan.herokuapp.com/

//tc1iofCbUMBVNChx
//mongodb+srv://yongchan:tc1iofCbUMBVNChx@cluster0.ybfcy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//9RL8DulupnQr6jQQ
//mongodb+srv://yongchan:9RL8DulupnQr6jQQ@cluster0.1mm3h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//heroku login
//heroku git:remote -a wetube-yongchan

