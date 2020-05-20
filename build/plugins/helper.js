const path = require('path')

exports.findExternalModules = c => {
	return (
		c.modules
			.filter((module) => module.external)
			.map((external) => external.userRequest)
			// ignore special relative external path
			.filter((name) => !name.startsWith('.'))
	)
}


exports.parseExternalDefinition = s => {
	const dev = process.env.NODE_ENV == 'development'
	const env = dev ? {
		virtualHost: '',
		workspace: ''
	} : {
		virtualHost: 'https://cn-hangzhou-mdsweb.cloud.alipay.com',
		workspace: '1957919251958_FinMallDev'
	}
	const body = []

	s.forEach(item => {
		if(/^@script/.test(item)){
			body.push({
				tagName: 'script',
				closeTag: true,
				attributes: {
					type: 'text/javascript',
					src:path.join(env.virtualHost, env.workspace, item.replace('@script', ''))
				}
			})
		}
	})

	return {body}
}