# Drone Transformations Project

## Table of Contents

1. [Introduction](#introduction)
2. [Project Description](#project-description)
3. [Functions Overview](#functions-overview)
   - [GetTransform Function](#gettransform-function)
   - [ApplyTransform Function](#applytransform-function)
   - [ResetTransform Function](#resettransform-function)
   - [BoostSpeed Function](#boostspeed-function)
   - [HoverMode Function](#hovermode-function)
   - [MouseMovement Function](#mousemovement-function)

---

## 1. Introduction

This project focuses on implementing **drone transformations** in a simulated environment. The drone can perform various movements including:
- Rotating left and right
- Moving up and down
- Zooming in and out
- Hovering
- Speed control

The transformations are applied using **mathematical operations on matrices** to control the drone’s position, scaling, and rotation.

---

## 2. Project Description

The drone’s movement is controlled using **matrix transformations**. The transformation functions apply **rotation, scaling, and translation** to update the drone's position dynamically. The system also allows for resetting the drone’s state and controlling its speed.

---

## 3. Functions Overview

### **GetTransform Function**
- This function performs **rotation, position, and scaling** transformations.
- Rotation values are **converted to radians** using:
  ```js
  let radians = (rotation * Math.PI) / 180;
  ```
- The rotation matrix uses **sin and cos** functions for transformation.
- The transformation matrix consists of:
  - **First column**: Scaling and rotation
  - **Second column**: Rotation values
  - **Third column**: Position translation

### **ApplyTransform Function**
- Multiplies two transformation matrices (`Transform1` and `Transform2`).
- Uses matrix multiplication rules to generate the final transformation matrix:
  ```js
  result[i * 3 + j] = trans1[i * 3 + 0] * trans2[0 * 3 + j] + trans1[i * 3 + 1] * trans2[1 * 3 + j] + trans1[i * 3 + 2] * trans2[2 * 3 + j];
  ```
- Outputs a **column-major ordered** matrix for further transformations.

### **ResetTransform Function**
- Resets the drone’s **position, scale, and altitude**.
- Uses **screen dimensions** (`window.innerWidth` and `window.innerHeight`) to center the drone:
  ```js
  drone.positionX = screenWidth / 2;
  drone.positionY = screenHeight / 2;
  ```
- Returns the drone to its **initial state**, making it stationary.

### **BoostSpeed Function**
- Increases the **altitude** and speed temporarily.
- Uses a **timeout function** to reset speed after 5 seconds:
  ```js
  drone.altitude = +10;
  setTimeout(() => {
      drone.altitude = 0;
  }, 5000);
  ```
- Simulates a **temporary speed boost**.

### **HoverMode Function**
- Stops **horizontal movement** and maintains the drone at a **fixed altitude**.
- Sets altitude to **50 units**:
  ```js
  drone.altitude = 50;
  ```
- Resets horizontal speed to **zero**, allowing the drone to **hover** in place.

### **MouseMovement Function**
- Updates the **drone’s position** based on **mouse movement**.
- The event object retrieves the **current cursor position**.
- If the drone is **not in hover mode**, it follows the cursor:
  ```js
  if (drone.altitude !== 50) {
      drone.positionX = event.clientX;
      drone.positionY = event.clientY;
  }
  ```
- Prevents horizontal movement while hovering.

---



