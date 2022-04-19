const site = {
  domain: 'http://localhost',
  port: '3000',
}

site.host = site.domain
if (parseInt(site.port) !== 80) site.host += `:${site.port}`

module.exports = site
