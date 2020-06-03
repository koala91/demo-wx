const oExtConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}

const oNewConfig = oExtConfig.config || {
  site_name: 'demo',
  site_id: '561e860b1ef9426a8e458da280b475d4',
  site_host: 'xiewei.wodavip.com',
  site_alias: 'xiewei',
  saas_site_host: 'site.youhaosuda.com',
  saas_api: 'youhaosuda.com/api'
}

const oConfig = {
  is_ext: !!oExtConfig.config,
  you_api_url: `https://${oNewConfig.saas_api}`,
  api_url: `https://${oNewConfig.saas_site_host}`,
  alias: oNewConfig.site_alias,
  host: oNewConfig.site_host,
  host_url: `https://${oNewConfig.site_host}`,
  shop: {
    site_id: oNewConfig.site_id || '',
    name: oNewConfig.site_name || ''
  }
}

module.exports = oConfig
