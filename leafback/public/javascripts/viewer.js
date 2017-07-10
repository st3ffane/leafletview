var VIEWER = (function(){

function loadDZIDescriptor(name){
  return new Promise( (resolve, reject)=>{
      var xhr = new  XMLHttpRequest();
      xhr.onload = function(){
      //init tout ....
      let xmlString = this.responseText;
      let dp = new DOMParser();
            
      let xDoc = dp.parseFromString(xmlString, "text/xml");
      let image = xDoc.getElementsByTagName("Size")[0];
      
      let width = +image.getAttribute("Width");
      let height = +image.getAttribute("Height");
      let maxzoom = +image.getAttribute("maxzoom") || 14;

      document.getElementById("spinner").style.display = "none";


      

      //test calcule ratio
      let ratio = width/height;
     
        /*var southWest = L.latLng(-1, ratio),
        northEast = L.latLng(0, 0);*/
        var southWest = map.unproject([1, height - 1], maxzoom);
      var northEast = map.unproject([width - 1, 1], maxzoom);
        var bounds = L.latLngBounds(southWest, northEast);

        if(layer) map.removeLayer(layer);

        layer  = L.tileLayer(`http://localhost:3000/images/dzi/${name}/output.dzi_files/{z}/{x}_{y}.jpeg`, {
                  width: width, 
                  height: height,
                  tolerance: 0.8,
                  
                  tileSize: 256,
                  //continuousWorld: true,
                noWrap: true,
                maxBoundsViscosity: 1.0,
                minZoom: 9, maxZoom: maxzoom,
                bounds:bounds
        });
        layer.addTo(map);

        
        //calculate best fiting zoom?
        let ww = window.innerWidth;
        let wh=window.innerHeight;
        //get zoom value based on window size
        //avec maxzoom=> width, height
        //maxzoom - 1 => width/2, height/2
        let current_zoom = maxzoom;//par defaut
        let [w,h]=[width,height];

        for(current_zoom=maxzoom;current_zoom>8;current_zoom--){
          if(w < ww || h < wh) {
            break;
          }
          w=w/2;
          h=h/2;
        }
        current_zoom++;
        


      map.setView([0.25, 0.25], current_zoom);
      
      /*var southWest = map.unproject([1, width - 1], maxzoom);
      var northEast = map.unproject([height - 1, 1], maxzoom);*/
      map.setMaxBounds(new L.LatLngBounds(southWest, northEast));
      map.fitBounds(map.getBounds());
      map.invalidateSize();
      resolve();


    };
    xhr.onerror = function(){
      console.log(err);
      document.getElementById("spinner").style.display = "none";
      //previent l'utilisateur TODO
      reject();
    };

    xhr.open("GET",`http://localhost:3000/images/dzi/${name}/output.dzi.dzi`, true);
    xhr.send();
  })



}
/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("menu_btn").style.visibility="hidden";
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("menu_btn").style.visibility="visible";
}

function loadImage(name){
  closeNav();
  //show spinner
  document.getElementById("spinner").style.display ="block";
  return loadDZIDescriptor(name);
}

//init la map
var map = null;
var layer = null;


window.addEventListener("load",()=>{
  map = L.map('map', {
    crs: L.CRS.Simple,
    center: [0.0, 0.0]
  });
})



return {
  openNav:openNav,
  closeNav: closeNav,
  loadImage:loadImage
}

})();