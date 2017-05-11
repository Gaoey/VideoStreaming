import { name } from '../../package.json'
// get environment
const ENVIRONMENT = !global.__DEV__ ? 'prod' : 'dev'
// config version app release build (alpha, beta, enterprise)
const RELEASE_VERSION = 'alpha'

const project = {
  name,
  ENVIRONMENT,
  RELEASE_VERSION
}

export default project
