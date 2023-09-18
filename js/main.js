const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);

scene.background = new THREE.Color(0x000000)
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry(2,100,100);

const texture = new THREE.TextureLoader().load('textures/earth.png');
const material = new THREE.MeshBasicMaterial({map : texture });

const cube = new THREE.Mesh( geometry, material );
scene.add(cube);

const light = new THREE.PointLight( 0xff0000,2);
light.position.x = 2;
light.position.y = 3;
light.position.z = 4;
scene.add( light );

camera.position.z = 5;
// camera.position.x = 2;
// camera.position.y = 1;

let mouseX = 0;
let mouseY = 0;
let stars = [];
let targetX = 0;
let targetY = 0;

let onMouseMove = (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}
document.addEventListener("mousemove",onMouseMove);

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function addStars(){

    // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position. 
    for ( var z= -1000; z < 1000; z+=20 ) {

        var geometry   = new THREE.SphereGeometry(0.5, 32, 32)
        var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        var sphere = new THREE.Mesh(geometry, material)

        sphere.position.x = Math.random() * 1000 - 500;
        sphere.position.y = Math.random() * 1000 - 500;

        sphere.position.z = z;

        sphere.scale.x = sphere.scale.y = 1;

        scene.add( sphere );

        stars.push(sphere); 
    }
}

function animateStars() { 
				
    // loop through each star
    for(var i=0; i<stars.length; i++) {
        
        star = stars[i]; 
            
        // and move it forward dependent on the mouseY position. 
        star.position.z +=  i/10;
            
        // if the particle is too close move it to the back
        if(star.position.z>1000) star.position.z-=2000; 
        
    }

}


function animate(){

    requestAnimationFrame(animate);

    targetX = mouseX * 0.005
    targetY = mouseY * 0.005
    cube.rotation.y += 0.01;    
    // cube.rotation.y += 0.01;
    cube.rotation.y += .005 * (targetX - cube.rotation.y);
    cube.rotation.x += .0056 * (targetY - cube.rotation.x);
    renderer.render(scene,camera);
    animateStars();
}


function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

animate();
addStars();