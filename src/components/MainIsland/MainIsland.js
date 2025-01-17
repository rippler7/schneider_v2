/* eslint-disable */
import React, { Suspense } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import eventBus from '../../eventBus';
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';
// const TWEEN = require('@tweenjs/tween.js');

let mouse, raycaster, camera, scene, renderer, controls;
let stad1, stad2, stad3, stad4, office, academy, podium, house, grouped, island;
let signlq1, signlq2, signlq3, signlq4, signVote, signEntry, signFame, signReport, plaque;
let modalStat = "closed";
let camInit, tweenCam;
let header;
let zoom, zoomEnd, targetObj;
let material = new THREE.MeshLambertMaterial();
let asset3DFolder = './assets/object/';

let clock = new THREE.Clock();
let delta = 0;
// 30 fps
let interval = 1 / 30;


class MainIsland extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedMenu: "",
      modalStat: "",
      clickedObj: "",
      targetObject: '',
      cam: ''
    }
    this.clickObj = this.clickObj.bind(this);
  }


  componentDidMount() {
    eventBus.remove("menuSelected");
    eventBus.remove("clickedObj");
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 25, 25);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    this.mount.appendChild(renderer.domElement);
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    controls = new OrbitControls(camera, renderer.domElement);

    let loader = new FBXLoader();

    island = new THREE.Object3D();
    stad1 = new THREE.Object3D();
    stad2 = new THREE.Object3D();
    stad3 = new THREE.Object3D();
    stad4 = new THREE.Object3D();
    academy = new THREE.Object3D();
    office = new THREE.Object3D();
    podium = new THREE.Object3D();
    house = new THREE.Object3D();

    signlq1 = new THREE.Object3D();
    signlq2 = new THREE.Object3D();
    signlq3 = new THREE.Object3D();
    signlq4 = new THREE.Object3D();
    signVote = new THREE.Object3D();
    signEntry = new THREE.Object3D();
    signFame = new THREE.Object3D();
    signReport = new THREE.Object3D();
    plaque = new THREE.Object3D();

    header = document.getElementById("modalHeader");

    eventBus.on('menuSelected', (data) => {
      let camFocus = data.selectedMenu;
      let trgt;
      switch (camFocus) {
        case 'lead':
          trgt = stad1.position;
          break;
        case 'vote':
          trgt = academy.position;
          break;
        case 'submit':
          trgt = office.position;
          break;
        case 'fame':
          trgt = podium.position;
          break;
        case 'report':
          trgt = house.position;
          break;
        default:
          trgt = island.position;
          camera.position.set(camInit.x, camInit.y, camInit.z);
          break;
      }
      let positionToLookAt = trgt;
      let evt = new Event('click');

      document.dispatchEvent(evt);
      controls.update();
      this.clickObj(evt);
      camera.lookAt(positionToLookAt);
    });

    const stadiumLoader = asset3DFolder + 'stadium_lp.fbx';
    const stadium2Loader = asset3DFolder + 'stadium2.fbx';
    const stadium3Loader = asset3DFolder + 'stadium1.fbx';
    const stadium4Loader = asset3DFolder + 'stadium4.fbx';
    const podiumLoader = asset3DFolder + 'podium.fbx';
    const academyLoader = asset3DFolder + 'academy.fbx';
    const officeLoader = asset3DFolder + 'buleBldg.fbx';
    const houseLoader = asset3DFolder + 'house.fbx';
    const islandLoader = asset3DFolder + 'islandGrp.fbx';
    const sign1Loader = asset3DFolder + 'signPost_lQ1.fbx';
    const sign2Loader = asset3DFolder + 'signPost_lQ2.fbx';
    const sign3Loader = asset3DFolder + 'signPost_lQ3.fbx';
    const sign4Loader = asset3DFolder + 'signPost_lQ4.fbx';
    const signVoteLoader = asset3DFolder + 'signPost_Vote.fbx';
    const signEntryLoader = asset3DFolder + 'signPost_Entry.fbx';
    const signFameLoader = asset3DFolder + 'signPost_Fame.fbx';
    const signReportLoader = asset3DFolder + 'signPost_Report.fbx';
    const plaqueLoader = asset3DFolder + 'plaque.fbx';

    loader.load(stadiumLoader, (fbx) => {
      stad1.add(fbx);
      fbx.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
    }, undefined, (error) => {
      console.error(error);
    });

    loader.load(stadium2Loader, (fbx) => stad2.add(fbx), undefined, (error) => console.error(error));
    loader.load(stadium3Loader, (fbx) => stad3.add(fbx), undefined, (error) => console.error(error));
    loader.load(stadium4Loader, (fbx) => stad4.add(fbx), undefined, (error) => console.error(error));
    loader.load(podiumLoader, (fbx) => podium.add(fbx), undefined, (error) => console.error(error));
    loader.load(academyLoader, (fbx) => academy.add(fbx), undefined, (error) => console.error(error));
    loader.load(officeLoader, (fbx) => office.add(fbx), undefined, (error) => console.error(error));
    loader.load(houseLoader, (fbx) => house.add(fbx), undefined, (error) => console.error(error));
    loader.load(islandLoader, (fbx) => island.add(fbx), undefined, (error) => console.error(error));
    loader.load(sign1Loader, (fbx) => signlq1.add(fbx), undefined, (error) => console.error(error));
    loader.load(sign2Loader, (fbx) => signlq2.add(fbx), undefined, (error) => console.error(error));
    loader.load(sign3Loader, (fbx) => signlq3.add(fbx), undefined, (error) => console.error(error));
    loader.load(sign4Loader, (fbx) => signlq4.add(fbx), undefined, (error) => console.error(error));
    loader.load(signVoteLoader, (fbx) => signVote.add(fbx), undefined, (error) => console.error(error));
    loader.load(signEntryLoader, (fbx) => signEntry.add(fbx), undefined, (error) => console.error(error));
    loader.load(signFameLoader, (fbx) => signFame.add(fbx), undefined, (error) => console.error(error));
    loader.load(signReportLoader, (fbx) => signReport.add(fbx), undefined, (error) => console.error(error));
    loader.load(plaqueLoader, (fbx) => plaque.add(fbx), undefined, (error) => console.error(error));


    let light = new THREE.HemisphereLight(0xffffbb, 0x080820, 4);
    let dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(1, 70, 100);
    light.position.set(1, 1, 0);
    let r = 2;
    let mapSize = 512;
    dirLight.castShadow = true;
    dirLight.shadow.bias = -0.0001;
    dirLight.shadow.radius = r;
    dirLight.shadow.mapSize.width = mapSize;
    dirLight.shadow.mapSize.height = mapSize;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 1000;
    dirLight.quaternion.copy(camera.quaternion);

    scene.add(dirLight);
    scene.add(light);

    grouped = new THREE.Group();

    let stad1Pos = { x: -4.2, y: 0.9, z: -0.9 };
    stad1.position.set(stad1Pos.x, stad1Pos.y, stad1Pos.z);

    let stad2Pos = { x: -4.5, y: 1, z: 4 };
    stad2.position.set(stad2Pos.x, stad2Pos.y, stad2Pos.z);

    let stad3Pos = { x: 3, y: 1, z: 1 };
    stad3.position.set(stad3Pos.x, stad3Pos.y, stad3Pos.z);

    let stad4Pos = { x: 3, y: 1, z: 5.5 };
    stad4.position.set(stad4Pos.x, stad4Pos.y, stad4Pos.z);

    let acadPos = { x: -4.2, y: 1, z: -6 };
    academy.position.set(acadPos.x, acadPos.y, acadPos.z);

    let podPos = { x: 6.3, y: 1, z: -0.8 };
    podium.position.set(podPos.x, podPos.y, podPos.z);

    let officePos = { x: 3.2, y: 1.1, z: -5.5 };
    office.position.set(officePos.x, officePos.y, officePos.z);

    let housePos = { x: 6.5, y: 0.9, z: -5.5 };
    house.position.set(housePos.x, housePos.y, housePos.z);

    let signPoslq1 = { x: -3.2, y: 1, z: 1.3 };
    signlq1.scale.set(0.3, 0.3, 0.3);
    signlq1.position.set(signPoslq1.x, signPoslq1.y, signPoslq1.z);

    let signPoslq2 = { x: stad2Pos.x + 2, y: stad2Pos.y, z: stad2Pos.z + 3 };
    signlq2.scale.set(0.3, 0.3, 0.3);
    signlq2.position.set(signPoslq2.x, signPoslq2.y, signPoslq2.z);

    let signPoslq3 = { x: stad4Pos.x + 2.5, y: stad4Pos.y, z: stad4Pos.z + 1.7 };
    signlq3.scale.set(0.3, 0.3, 0.3);
    signlq3.position.set(signPoslq3.x, signPoslq3.y, signPoslq3.z);

    let signPoslq4 = { x: stad3Pos.x + 2, y: stad3Pos.y, z: stad3Pos.z + 2 };
    signlq4.scale.set(0.3, 0.3, 0.3);
    signlq4.position.set(signPoslq4.x, signPoslq4.y, signPoslq4.z);

    let signPosVote = { x: acadPos.x - 2.5, y: acadPos.y, z: acadPos.z + 1 };
    signVote.scale.set(0.3, 0.3, 0.3);
    signVote.position.set(signPosVote.x, signPosVote.y, signPosVote.z);

    let signPosReport = { x: housePos.x - 1, y: housePos.y, z: housePos.z + 1 };
    signReport.scale.set(0.3, 0.3, 0.3);
    signReport.position.set(signPosReport.x, signPosReport.y, signPosReport.z);

    let signPosEntry = { x: officePos.x - 1.4, y: officePos.y, z: officePos.z + 1 };
    signEntry.scale.set(0.3, 0.3, 0.3);
    signEntry.position.set(signPosEntry.x, signPosEntry.y, signPosEntry.z);

    let signPosFame = { x: podPos.x, y: podPos.y, z: podPos.z + 1.5 };
    signFame.scale.set(0.3, 0.3, 0.3);
    signFame.position.set(signPosFame.x, signPosFame.y, signPosFame.z);

    let plaquePos = { x: 0, y: 0.6, z: 8.7 };
    plaque.scale.set(0.5, 0.5, 0.5);
    plaque.position.set(plaquePos.x, plaquePos.y, plaquePos.z);

    island.scale.set(0.7, 0.7, 0.7);
    stad1.scale.set(0.25, 0.25, 0.25);
    stad1.rotation.y = -1.56;
    stad2.scale.set(0.5, 0.5, 0.5);
    stad3.scale.set(0.5, 0.5, 0.5);
    stad4.scale.set(0.5, 0.5, 0.5);
    stad4.rotation.y = -1.56;
    academy.scale.set(0.7, 0.7, 0.7);
    academy.rotation.y = -1.56;
    office.scale.set(0.008, 0.008, 0.008);
    podium.scale.set(0.2, 0.2, 0.2);
    house.scale.set(0.2, 0.2, 0.2);
    grouped.rotation.y = -0.2;

    stad1.castShadow = true;
    stad1.receiveShadow = true;
    stad2.castShadow = true;
    stad2.receiveShadow = true;
    stad3.castShadow = true;
    stad3.receiveShadow = true;
    stad4.castShadow = true;
    stad4.receiveShadow = true;
    office.castShadow = true;
    office.receiveShadow = true;
    academy.castShadow = true;
    academy.receiveShadow = true;
    podium.castShadow = true;
    podium.receiveShadow = true;
    house.castShadow = true;
    house.receiveShadow = true;
    island.castShadow = true;
    island.receiveShadow = true;

    grouped.add(island);
    grouped.add(stad1);
    grouped.add(stad2);
    grouped.add(stad3);
    grouped.add(stad4);
    grouped.add(academy);
    grouped.add(office);
    grouped.add(podium);
    grouped.add(house);
    grouped.add(signlq1);
    grouped.add(signlq2);
    grouped.add(signlq3);
    grouped.add(signlq4);
    grouped.add(signVote);
    grouped.add(signEntry);
    grouped.add(signFame);
    grouped.add(signReport);
    grouped.add(plaque);
    scene.add(grouped);


    camInit = { x: 0, y: 15, z: 15 };
    camera.position.set(camInit.x, camInit.y, camInit.z);
    controls.dampingFactor = 0.2;
    camera.lookAt({ x: 0, y: 0, z: 0 });
    controls.update();
    scene.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    grouped.castShadow = true;
    grouped.receiveShadow = true;
    grouped.traverse(function (ch) {
      ch.castShadow = true;
      ch.receiveShadow = true;
      grouped.material = material;
    });
    renderer.gammaOutput = true;
    renderer.gammaFactor = 0.2;
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    console.log(scene);
    window.addEventListener('resize', this.onWindowResize, false);
    document.addEventListener('click', this.clickObj, false);


    let animate = function () {
      requestAnimationFrame(animate);
      delta += clock.getDelta();
      grouped.rotation.y += 0.0001;
      if (delta > interval) {
        TWEEN.update();
        renderer.render(scene, camera);
        delta = delta % interval;
      }
    }


    animate();
  }

  clickObj(event) {
    event.preventDefault();
    event.stopPropagation();
    if (modalStat === "closed") {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      let intersects = raycaster.intersectObjects(grouped.children);
      if (intersects && intersects.length > 0) {
        if (intersects[0].object.name) {
          if (intersects[0].object.name !== 'polySurface22') {
            console.log(intersects[0].object.name);
            console.log(this);
            let tId;
            let headerTitle = '';
            let currTarget;
            let year, quarter;
            let icon;
            zoom = {
              value: camera.zoom // from current zoom (no matter if it's more or less than 1)
            };
            zoomEnd = {
              value: 1 // to the zoom of 1
            };
            switch (intersects[0].object.name) {
              case 'podiumSimple':
                tId = 'fame'
                headerTitle = 'Hall of Fame';
                currTarget = document.getElementById('btn_Fame');
                targetObj = podium;
                icon = "podium.png";
                break;
              case 'stadium1_lp':
                tId = 'lead';
                year = 2022;
                quarter = 'Q1';
                headerTitle = 'Leaderboards: ' + quarter + ' ' + year;
                currTarget = document.getElementById('btn_Lead');
                targetObj = stad1;
                icon = "stadSW.png";
                break;
              case 'Fst_Eng_002':
                tId = 'lead';
                year = 2022;
                quarter = 'Q2';
                headerTitle = 'Leaderboards: ' + quarter + ' ' + year;
                currTarget = document.getElementById('btn_Lead');
                targetObj = stad2;
                icon = "stadSE.png";
                break;
              case 'FSt_Ita_003':
                tId = 'lead';
                year = 2022;
                quarter = 'Q3';
                headerTitle = 'Leaderboards: ' + quarter + ' ' + year;
                currTarget = document.getElementById('btn_Lead');
                targetObj = stad4;
                icon = "stadNE.png";
                break;
              case 'FSt_Fra_002':
                tId = 'lead';
                year = 2022;
                quarter = 'Q4';
                headerTitle = 'Leaderboards: ' + quarter + ' ' + year;
                currTarget = document.getElementById('btn_Lead');
                targetObj = stad3;
                icon = "stadSW-old.png";
                break;
              case 'SchoolMesh':
                tId = 'vote'
                headerTitle = 'Vote Now';
                currTarget = document.getElementById('btn_Vote');
                targetObj = academy;
                icon = "academy.png";
                break;
              case 'blueBldg1':
                tId = 'submit'
                headerTitle = 'Submit Entry';
                currTarget = document.getElementById('btn_Entry');
                targetObj = office;
                icon = "office.png";
                break;
              case 'houseBldg':
                tId = 'report'
                headerTitle = 'Submission List';
                currTarget = document.getElementById('btn_Report');
                targetObj = house;
                icon = "house.png";
                break;
              default:
                headerTitle = "Home"
                tId = 'home'
                targetObj = island;
                icon = "academy.png";
                break;
            }
            if (intersects[0].object.name !== 'undefined') {
              if (targetObj == 'undefined') {
                targetObj = island;
              }
              let time = { t: 0 };
              let positionToLookAt = targetObj.position;
              let startQuaternion = camera.quaternion.clone(); //set initial angle
              camera.lookAt(positionToLookAt);
              let endQuaternion = camera.quaternion.clone(); //set destination angle
              camera.quaternion.copy(startQuaternion);
              zoom = camera.zoom;
              new TWEEN.Tween(time)
                .to({ t: 1 }, 1000) //duration in milliseconds
                .onUpdate(() => {
                  THREE.Quaternion.slerp(startQuaternion, endQuaternion, camera.quaternion, time.t);
                })
                .easing(TWEEN.Easing.Quadratic.InOut).onComplete(() => {
                  try {
                    if (currTarget !== "undefined" || targetObj !== "undefined") {
                      const targetPosition = { x: targetObj.position.x, y: targetObj.position.y + 5, z: targetObj.position.z + 3 };
                      const initialPosition = { x: camInit.x, y: camInit.y, z: camInit.z };
                      const positionToMoveTo = tId === 'home' ? initialPosition : targetPosition;

                      const cameraTween = new TWEEN.Tween(camera.position)
                        .to(positionToMoveTo, 500)
                        .onUpdate(() => {
                          controls.target.set(targetObj.position.x, targetObj.position.y, targetObj.position.z);
                          camera.lookAt(targetObj.position);
                        })
                        .easing(TWEEN.Easing.Quadratic.InOut)
                        .onComplete(() => {
                          if (currTarget) {
                            currTarget.click(event);
                          }
                          header.innerHTML = headerTitle;
                          document.getElementById("bldgIcon").src = `./assets/img/${icon}`;
                          renderer.setAnimationLoop(null);
                          controls.update();
                        })
                        .start();
                    }
                    this.setState({ selectedMenu: tId });
                  }
                  catch (err) {
                    header.innerHTML = "There is an error!";
                    console.log(err.message);
                  }
                }).start();
            }
          }
        }
      }
    }
  }
  onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.alpha = true;
  }

  render() {
    return <>
      <Suspense>
        <div ref={ref => (this.mount = ref)}></div>
      </Suspense>
    </>
  }
}

export default MainIsland;
