import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import renderScenes from './utils/renderScene'
import { project } from './config'
import * as scene from './scenes'

export const Scenes = [
  { key: `${project.name}About`, component: 'About', title: 'm About', options: {} },
  { key: `${project.name}Form`, component: 'Form', title: 'm Form', options: {} },
  { key: `${project.name}DefaultForm`, component: 'DefaultFrom', title: 'm DefaultForm', options: {} },
  { key: `${project.name}InitForm`, component: 'InitFrom', title: 'm InitForm', options: {} },
  { key: `${project.name}ValidateForm`, component: 'ValidateFrom', title: 'm ValidateForm', options: {} },
]

const Routes = () => (
  <Router sceneStyle={{ marginTop: 70 }}>
    <Scene key="modularHome" component={scene.Home} title="m Home" initial />
    <Scene key="errorPage" component={scene.ErrorToken} />
    {renderScenes(Scenes, scene)}
  </Router>
)

export default Routes
