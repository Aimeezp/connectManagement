// 前后台设备类型对应关系
const appMapping = {
  smoke: {
    val: 'smoke-sensor',
    text: '烟感',
    src: require('../images/app/smoke.png'),
  },
  cover: {
    val: 'well-cover',
    text: '井盖',
    src: require('../images/app/cover.png'),
  },
  doorlock: {
    val: 'door-monitor',
    text: '门磁',
    src: require('../images/app/doorlock.png'),
  },
  dust: {
    val: 'area-dust-monitor',
    text: '扬尘',
    src: require('../images/app/dust.png'),
  },
  dustbin: {
    val: 'dustbin',
    text: '垃圾箱',
    src: require('../images/app/dustbin.png'),
  },
  infraRed: {
    val: 'infra-red',
    text: '红外',
    src: require('../images/app/infraRed.png'),
  },
  lift: {
    val: 'lift',
    text: '电梯',
    src: require('../images/app/lift.png'),
  },
  alarmBtn: {
    val: 'alarm-btn',
    text: '一键告警',
    src: require('../images/app/alarmBtn.png'),
  },
  geoMonitor: {
    val: 'geo-mnt',
    text: '地磁',
    src: require('../images/app/geoMonitor.png'),
  },
  hydrant: {
    val: 'fire-hydrant',
    text: '栓帽',
    src: require('../images/app/hydrant.png'),
  },
  firePressure: {
    val: 'fire-pressure',
    text: '水压',
    src: require('../images/app/firePressure.png'),
  },
  airQuality: {
    val: 'air-quality',
    text: '空气监测',
    src: require('../images/app/airQuality.png'),
  },
  gasMonitor: {
    val: 'gas-monitor',
    text: '燃气',
    src: require('../images/app/gasMonitor.png'),
  },
  light: {
    val: 'light',
    text: '灯杆',
    src: require('../images/app/light.png'),
  },
  temperature: {
    val: 'temperature',
    text: '温感',
    src: require('../images/app/temperature.png'),
  },
  h2s: {
    val: 'h2s',
    text: '硫化氢监测',
    src: require('../images/app/airQuality-H2S.png'),
  },
  nh3: {
    val: 'nh3',
    text: '氨气监测',
    src: require('../images/app/airQuality-NH3.png'),
  },
  noise: {
    val: 'noise',
    text: '噪声',
    src: require('../images/app/noise.png'),
  },
  ultrasonic: {
    val: 'ultrasonic',
    text: '超声波',
    src: require('../images/app/ultrasonic.png'),
  },
  water: {
    val: 'water-monitor',
    text: '水质监测',
    src: require('../images/app/water.png'),
  },
  environment: {
    val: 'env-monitor',
    text: '环境监测',
    src: require('../images/app/environment.png'),
  },
  rfid: {
    val: 'RFID',
    text: 'RFID',
    src: require('../images/app/RFID.png'),
  },
  bracelet: {
    val: 'bracelet',
    text: '手环',
    src: require('../images/app/bracelet.png'),
  },
  pad: {
    val: 'pad',
    text: 'PAD',
    src: require('../images/app/pad.png'),
  },
  arc: {
    val: 'arc',
    text: '电弧监测',
    src: require('../images/app/arc.png'),
  },
  pos: {
    val: 'pos',
    text: 'POS',
    src: require('../images/app/POS.png'),
  },
  g4Router: {
    val: '4gRouter',
    text: '4G路由',
    src: require('../images/app/4gRouter.png'),
  },
  gps: {
    val: 'gps',
    text: 'GPS',
    src: require('../images/app/gps.png'),
  },
  camera: {
    val: 'camera',
    text: '摄像头',
    src: require('../images/app/camera.png'),
  },
};
export default appMapping;
