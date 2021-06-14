# 2D Canvas Planner Task

This is a starter application for building your very own Kitchen planner in TypeScript and Canvas 2D!

To get started just clone down the repo and run `npm install` in the directory. To start the app and run a watcher with webpack just run the comand `npm run start:dev`, this will start a server on http://localhost:9000 and automatically rebuild the bundle whenever you edit a file.

Your challenge is to extend the app and add the following:

---

## Widgets

### Base Units

Base units are kitchen units that are placed on the ground.
They can come in a variety of widths, depths and heights.

### Wall Units

Wall units are kitchen units that are attached to the walls.
They can come in a variety of widths, depths and heights.

### Tower Units

Tower units are just tall base units.

### Worktops

Worktops are large flat slabs of some material. They could be Quartz, Granite, Laminate, Wood or whatever else you want. 
They key features of worktops are:

-  resizeable
-  can be more complex shapes that just rectangles

### Decor Panels

Decor panels are decorative pieces that are placed on the side of units. 

Place a decor panel if:

-  there is no adjacent unit
-  the adjacent unit is shorter
-  the adjacent unit is shallower 

---

## Features

### Collision Detection and Resolution

The various objects in the kitchen should not be able to overlap with each other in 3D space.
Obviously you will want to be able to place wall units above base units even though they will look as
though they overlap in the 2D top down view.

### Snapping

To aid in design, units should snap to the sides and backs (if you implemented rotation) of each other.

### Rotation

In the real world kitchens aren't perfectly square. You units should be rotatable to any arbitrary angle around the Y axis.
In this program the axes are defined as follows:

+X - right across the screen
-X - left across the screen
+Z - down towards the bottom of the screen
-Z - up towards the top of the screen
+Y - out towards your face
-Y - in towards the monitor

### Final notes

The exact sizes of the units are up to you. For the purposes of this exercise they are not important.

Do not feel like you have to follow the widget hierarchy that has been defined thus far in the code. It is
only an example of one approach. It is a classical OOP class hierarchy, but you could use a Unity inspired
system of "Game Objects" and "Behavioural Components", something like an ECS (Entity Component System) or 
pretty much anything else.
