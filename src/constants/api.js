import { project } from '../config'

const { ENVIRONMENT, RELEASE_VERSION } = project

const API_ROOT = {
  alpha: {  // integration
    dev: 'http://api.dev.dotography.net',
    prod: 'http://api.dev.dotography.net'
  },
  beta: {  // develop
    dev: 'http://api.dev.dotography.net',
    prod: 'http://ms-service-1721240745.us-east-1.elb.amazonaws.com'
  },
  enterprise: { // master
    dev: 'http://api.dev.dotography.net',
    prod: 'http://ms-service-1721240745.us-east-1.elb.amazonaws.com'
  },
}

const api = {
  API_ROOT,
}

const finallyApi = {}
const setFinallyApi = (nextApi) => {
  finallyApi = {
    ...finallyApi,
    ...nextApi
  }
}

Object.keys(api).map(url => setFinallyApi({ [url]: api[url][RELEASE_VERSION][ENVIRONMENT] }))

export default finallyApi
