var express = require('express');
var router = express.Router();

/* GET home page. 
Initialisation du viewer

*/
const fs = require('fs')
const path = require('path')
const ROOT_DIR = path.resolve(__dirname,"..");

//recupere la liste de tous les dossiers/images/dzi
function getDirectories (srcpath) {
  return  new Promise((resolve,reject)=>{
    fs.readdir(srcpath, (err,dirs)=>{
      if(err){
        reject(err);
        return;
      }
      if(dirs){
        resolve(dirs.filter(file=>fs.lstatSync(path.join(srcpath, file)).isDirectory()));
      } else reject("invalid or empty path");
    })
    
  });
}




router.get('/', function(req, res, next) {

  //recup la liste des images presentes dans le dossier /public/images/dzi
  getDirectories("public/images/dzi").then(dirs=>{
    res.render('index', { title: 'Express',
              dirs:dirs,//la liste des images dans le dossier              
            
           });
  }).catch(err=>{
    console.log(err);
    res.send(err)
  })
  
});

module.exports = router;
