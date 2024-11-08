# Project Setup Guide

## Project Name: (TBD)

This should help you setup and install all the deps needed for this project!!


(IF you do not have NodeJS and NPM installed you need to download it from there site [NodeJS](https://nodejs.org/en) if your on ___Windows___)

If you are on linux, specifically ___Ubuntu___, you can use this command

```bash
sudo apt update
sudo apt install nodejs
sudo apt install npm
```

### 1. Install Required Global Packages

First, you’ll need to install a few packages globally. These will allow you to run Ionic and Capacitor commands from the command line.

```bash
npm install -g @ionic/cli @capacitor/assets
```

### 2. Clone the Repo
```bash
git clone https://github.com/Duhsten/web-app.git
```

### 3. Install Project Dependencies
```bash
cd web-app
npm install
```

### 4. Start the Project 

To view the project in a browser, use the following Ionic command:
```bash
ionic serve
```
Or, you can serve it through Angular using:
```bash
ng serve
```
