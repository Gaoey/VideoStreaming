# ModularKit

## How to setup

- Open project directory and remove file **.git** and **app.json**
- Change the name and version in **package.json** file which is given as a project name.
- run ```$npm install``` for install all dependency.
- run ```$react-native upgrade``` to generate /ios and /android folders again.
- run ```$react-native link``` for any external dependency.
- finally run ```$react-native run-ios``` or anything you want.

## Install

```json
  "dependencies": {
    "modular-kit": "git://github.com/sanigame/modular-kit.git",
    ...
  }
```
