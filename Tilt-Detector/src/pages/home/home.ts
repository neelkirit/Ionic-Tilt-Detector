import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DeviceMotion, DeviceMotionAccelerationData} from '@ionic-native/device-motion';
import {DeviceOrientation, DeviceOrientationCompassHeading} from '@ionic-native/device-orientation';
import {Observable} from "rxjs/Rx";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  orientationValue: any;
  motionValue: any;
  frontBendDetect: any;
  sideBendDetect: any;
  rotationDetect: any;

  constructor(public navCtrl: NavController, private deviceMotion: DeviceMotion, private deviceOrientation: DeviceOrientation) {

  }

  ngOnInit(): void {
    let z = 0;
    let xaxis = 0;
    let yaxis = 0;


    Observable.interval(200).subscribe(x => {
      this.deviceMotion.getCurrentAcceleration().then((acceleration: DeviceMotionAccelerationData) => {

        this.motionValue = JSON.stringify(acceleration);


        if (z - acceleration.z > 0) {
          let val = 9.8 / acceleration.z;
          let angle = Math.asin(val);
          this.frontBendDetect = "Tilting Forward " + (val) + "" + (angle);
        } else if (z - acceleration.z == 0) {
          this.frontBendDetect = "Vertically Stable";
        } else {
          this.frontBendDetect = "Tilting Backward " + (acceleration.z * 10);
        }

        if (xaxis - acceleration.x < 0) {

          this.sideBendDetect = "Tilting Left " + (acceleration.x * 10);
        } else if (xaxis - acceleration.x == 0) {
          this.sideBendDetect = "Vertically Center " + (acceleration.x * 10);
        } else {
          this.sideBendDetect = "Tilting Right";
        }

        if (yaxis - acceleration.y < 0) {
          this.rotationDetect = "Possibly Standing Heading Up " + (acceleration.y * 10);
        } else if (yaxis - acceleration.y == 0) {
          this.rotationDetect = "Lying Down";
        } else {
          this.rotationDetect = "Standing Upside Down " + (acceleration.y * 10);
        }


      })
    });

    // this.deviceMotion.getCurrentAcceleration().then(
    //   (acceleration: DeviceMotionAccelerationData) =>
    //
    // );

    // this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
    //   this.motionValue = JSON.stringify(acceleration);
    // });

    this.deviceOrientation.watchHeading().subscribe(
      (data: DeviceOrientationCompassHeading) => {
        console.log(data);
        this.orientationValue = JSON.stringify(data)
      }
    );

  }


}
