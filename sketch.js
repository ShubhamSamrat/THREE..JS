import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 1000, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

// instantiate a loader


//
//const loader = new THREE.FBXLoader();
//const loader = new THREE.FBXLoader();

/*loader.load(
	// resource URL
	`model/source/pubgmale.fbx`, function( object ) {
		//mesh = group.children[0];
		//mesh.material = new THREE.MeshPhongMaterial();
		scene.add( object);
	});*/

renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );


//Controls
//const controls = new THREE.OrbitControls(camera,renderer.domElement);


//create the Shape
const geometry = new THREE.BoxGeometry(1,1,1);

//create  a material,colour or imageTexture

	//Cube Textures Array
	var cubeMaterial = [
		new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('Texture/1.png'), side: THREE.DoubleSide } ),//Right
		new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('Texture/1.png'), side: THREE.DoubleSide } ),//Left
		new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('Texture/1.png'), side: THREE.DoubleSide } ),//Top
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('Texture/4.png'), side: THREE.DoubleSide } ),//Bottom
		new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader().load('Texture/1.png'), side: THREE.DoubleSide } ),//Front
		new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load('Texture/1.png'), side: THREE.DoubleSide } ),//Back
	];

var material = new THREE.MeshFaceMaterial(cubeMaterial);
var cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

//Position of camera
camera.position.z = 3;

//Light
var ambientLight = new THREE.AmbientLight(0x00ffff,2);
scene.add(ambientLight);


//Resize View Event
window.addEventListener('resize',function(){
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
})




//Game Logic
var update = function(){
	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;
	

}

//draw Scene
var render = function(){
	renderer.render(scene,camera);
}
            
//run Gameloop(update,render,repeat)
const animate = function () {
	requestAnimationFrame( animate );

	

	update();
	render();
}

//LoadAnimatedModel() {
    const loader = new FBXLoader();
    loader.setPath('./assets/');
    loader.load('swat.fbx', (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;
      });

      const params = {
        target: fbx,
        camera: camera,
      }
      //const controls = new BasicCharacterControls(params);

      const idleA = new FBXLoader();
      idleA.setPath('./assets/');
      idleA.load('walk.fbx', (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        //this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      scene.add(fbx);
    });
  //}

animate();