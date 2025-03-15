
function GetTransform(positionX, positionY, rotation, scale) {
    // Convert the rotation from degrees to radians
    let radians = (rotation * Math.PI) / 180;
    
    // Cosine and sine of the rotation
    let cosTheta = Math.cos(radians);
    let sinTheta = Math.sin(radians);
    
    // Create the 3x3 transformation matrix in column-major order
    return [
        scale * cosTheta, sinTheta, 0,   // First column (scaling and rotation)
        -sinTheta, scale * cosTheta, 0,  // Second column (rotation)
        positionX, positionY, 1          // Third column (translation)
    ];
}

function ApplyTransform(trans1, trans2) {
    let result = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let sum = 0;
        for (let k = 0; k < 3; k++) {
          sum += trans1[i * 3 + k] * trans2[k * 3 + j];
        }
        result[i * 3 + j] = sum;
      }
    }
    return result;
  }

// Resets the drone’s position, rotation, scale, and altitude.
function resetTransform() {
    // Ekranın genişliğini ve yüksekliğini al
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    // Dronu ekranın ortasına yerleştir
    drone.positionX = screenWidth / 2;  // Ekranın ortası X
    drone.positionY = screenHeight / 2; // Ekranın ortası Y
    
    drone.rotation = 0;  // Dönüş açısını sıfırla
    drone.scale = 1;     // Ölçeği bir yap
    drone.altitude = 0;  // Yüksekliği sıfırla
}

// Temporarily increases the drone's speed for 5 seconds and then resets it to the normal speed.
function boostSpeed() {
    drone.altitude = +10
    setTimeout(() => {
        drone.altitude = 0; // Reset speed after 5 seconds
    }, 5000);
}

// Increases the altitude to 50 units and stops the drone from moving horizontally.
function hoverMode() {
    console.log("altitude",drone.altitude);
    drone.altitude = 50; // Set altitude to 50
    drone.speed = 0;     // Stop horizontal movement
}

// The drone follows the mouse unless it is in hover mode.
function mouseMovement(event) {
    if (drone.altitude !== 50) { // Only follow the mouse if not in hover mode
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        drone.positionX = mouseX;
        drone.positionY = mouseY;
        drone.altitude = drone.altitude;
    }
}

// Event listener for mouse movement (make sure this is attached to the window or relevant element)
document.addEventListener('mousemove', mouseMovement);
