const yaml = require('js-yaml')

const CUSTOM_SCHEMA = yaml.DEFAULT_SCHEMA.extend([
  new yaml.Type('!ENV', {
    kind: 'scalar',
    construct: (data) => process.env[data],
  }),
  new yaml.Type('!ENV', {
    kind: 'sequence',
    construct: (data) => data.map((d) => process.env[d]),
  }),
  new yaml.Type('!JOIN', {
    kind: 'sequence',
    construct: (data) => data.join(''),
  }),
])

const loadYaml = (file, options) => yaml.load(file, { schema: CUSTOM_SCHEMA, ...options })

module.exports = { loadYaml }
