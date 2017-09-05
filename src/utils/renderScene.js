import React from 'react'
import { Scene } from 'react-native-router-flux'
import PropTypes from 'prop-types'

const sceneItem = ({ key, component, options, childrens = [] }, module) => {
  const props = {
    key,
    component: component ? module[component] : undefined,
    ...options
  }
  return (
    <Scene {...props}>
      {childrens.map(children => sceneItem(children, module))}
    </Scene>
  )
}

const renderScenes = (sceneArr = [], module) => (
  sceneArr.map(value => sceneItem(value, module))
)

sceneItem.propTypes = {
  key: PropTypes.string.isRequired,
  component: PropTypes.string,
  initial: PropTypes.bool,
  title: PropTypes.string,
  childrens: PropTypes.array,
  options: PropTypes.object
}

export default renderScenes
