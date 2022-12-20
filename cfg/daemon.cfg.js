/**
 * @typedef {Object} daemonConfig
 * @property {string} orgDataFolder
 * @property {string} dstDataFolder
 * @property {string} projectRoot
 * @property {string} projectSrc
 * @property {string} projectCfg
 * @property {string} projectData
 */

const path = require('path')
const projectRoot = process.cwd()
const projectSrc = path.join(projectRoot, '/src')
const projectCfg = path.join(projectRoot, '/cfg')
const projectData = path.join(projectRoot, '/data')
const orgDataFolder = path.join(projectData, '/org')
const dstDataFolder = path.join(projectData, '/dst')

/**
 * Daemon Config
 * @type daemonConfig
 */
const config = {
  orgDataFolder,
  dstDataFolder,
  projectRoot,
  projectSrc,
  projectCfg,
  projectData
}

module.exports = config
