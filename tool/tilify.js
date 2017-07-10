var sharp = require("sharp");
var fs = require('fs');
var path = require('path')
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;


const VALID_EXTENTIONS = [".jpg",".png",".tif"];


var args = process.argv.slice(2);
console.log(args);
if(args.length < 1){
  //no arguments, reject
  console.log("Erreur: Aucun arguments!!!");
  console.log(`Usage:
  node test-sharp.js path/to/file.[png|jpg|tif] path/to/folder`);

  process.exit(0);
}

let image = args[0];
let dist = args[1] || '../leafback/public/images/dzi';//defaut export to backend
console.log(path.extname(image))
//verifie si image existe
if (!fs.existsSync(image) || VALID_EXTENTIONS.indexOf(path.extname(image))==-1 ) {
    console.log("Erreur: Image invalide ou format non supporté!!!");
    console.log(`Usage:
    node test-sharp.js path/to/file.[png|jpg|tif] path/to/folder`);

    process.exit(0);
}
let name = path.basename(image).split('.')[0];
//if already exist, delete
if(!fs.existsSync(`${dist}/${name}`)) fs.mkdirSync(`${dist}/${name}`);


console.log("Processing image, please wait...");
//load l'image

sharp(image)
  .tile(256).toFile(`${dist}/${name}/output.dzi`, function(err, info) {
  // open xml file and add maxzoom attribute to size
  fs.readFile(`${dist}/${name}/output.dzi.dzi`, (err, data)=>{
    if(err){
      console.log(err);
      console.log("Impossible d'enregistrer le max zoom, ca va bugger....");
      return;
    }
    fs.readdir(`${dist}/${name}/output.dzi_files`, (err, files) => {
      //parse le fichier et ajoute le maxzoom

      let parser = new DOMParser();
      let xml = parser.parseFromString(data.toString('utf8'),'text/xml');
      
      xml.documentElement.getElementsByTagName("Size")[0].setAttribute('maxzoom',files.length-1); //0 based

      //save
      var XMLS = new XMLSerializer(); 
      var inp_xmls = XMLS.serializeToString(xml);
      fs.writeFileSync(`${dist}/${name}/output.dzi.dzi`,inp_xmls);
    });
    
  })

 
});

