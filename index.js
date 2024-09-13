import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app=express();
const port=3000;
const key= '362dd107cf67e11632c9ebdd97ae5372';
const url="https://api.openweathermap.org/data/2.5/weather"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs")
})


app.post("/submit",async(req,res)=>{
    try{
        const result=await axios.get(url,{
            params:{
                lat:req.body.lat,
                lon:req.body.lon,
                appid:key,
        }
        });
        res.render("index.ejs",{
            description:(result.data.weather[0].description),
        });
    }
    catch(error){
        res.send(error.message);
    }
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})

