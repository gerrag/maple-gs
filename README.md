# G08 MAPLE Capstone - Ground Station Sub-System

This is the repository for the Ground Station Sub-System.
This subsystem is responsible for providing administrators control over the Dart's on-board system over a wireless communication system.

## Hardware Overview

This application runs on a Raspberry Pi 4 Model B, connected to an XBee Radio Module for wireless communication.
An ethernet cable can be used to connect a laptop to the Raspberry Pi, creating a local network to allow the laptop peripherals to interact with the interface.

## Software Overview

The application uses an Electron implementation, using ReactJS to create an intuitive and reactive user interface. NodeJS drives the backend, connected to a MariaDB MySQL database.
MariaDB allows a local database to exist directly on the Raspberry Pi so that the MySQL library can directly query the database.
The SerialPort library is also used to allow the Electron application to interface with the XBee module over the UART bus.

# MAPLE Overview

MAPLE is a project being worked on by Magellan Aerospace for future Lunar Exploration.
MAPLE stands for Multipurpose Autonomous Penetrator for Lunar Exploration.
The goal is to create a ballistic-powered "dart" to be shot into the moon penetrating the regolith. Once in the ground, it will allow various data collection methods to be conducted to analyze things such as water levels and material makeup.
