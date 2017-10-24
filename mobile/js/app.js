var self = this;
var mAccelerometer = null;
var mWatchId = null;;

/**
 * We only want a single instance of AWAccelerometer
 * All access to the AWAccelerometer instance should come through this function
 */
function getAccelerometerInstance() {
  if(mAccelerometer == null) {
    self.mAccelerometer = new Appworks.AWAccelerometer(
      function(position) {
        var string = "";
        string += "Acceleration X: " + position.x + "<br/>";
        string += "Acceleration Y: " + position.y + "<br/>";
        string += "Acceleration Z: " + position.z + "<br/>";
        string += "Timestamp: " + position.timestamp;
        out(string);
      }, function(error) {
        var string = "";
        string += "Code: " + error.code + "<br/>";
        string += "Message: " + error.message;
        out(error);
    });
  }

  return self.mAccelerometer;
}

/**
 * Get the current accelerometer position
 */
function getAccelerometer() {
  var accelerometer = getAccelerometerInstance();
  accelerometer.getCurrentAcceleration();
}

/**
 * Continually retrieve the accelerometer position
 * Pass in a frequency (milliseconds) for the interval in which position should return
 * Keep track of the watch ID, so we can turn it off.
 */
function watchAccelerometer() {
  var accelerometer = getAccelerometerInstance();
  mWatchId = accelerometer.watchAcceleration({ frequency: 1000 }); // update every 1 second
}

/**
 * Use the watch ID obtained when setting an accelerometer watch to clear it.
 */
function clearAccelerometer() {
  var accelerometer = getAccelerometerInstance();
  accelerometer.clearWatch(mWatchId);
}

function out(message) {
  console.log(message);
  if(typeof(message) == "object") {
    getObject("result").innerHTML = JSON.stringify(message);
  } else {
    getObject("result").innerHTML = message;
  }
}

function getObject(name) {
  return document.getElementById(name);
}
