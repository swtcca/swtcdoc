module.exports = {
	// plugins: ['@vuepress/last-updated', '@vuepress/nprogress', '@vuepress/blog', '@vuepress/back-to-top'],
	themeConfig: {
		repo: 'swtcca/swtc-app-examples',
		lastUpdated: 'Last Updated', // string | boolean
		repoLabel: 'Contribute!',
		docsRepo: 'swtcca/swtc-app-examples',
		editLinks: true,
		nav: [
			{ text: '实例', link: '/' },
			{ text: 'LIB文档', link: '/doc/' },
			{ text: 'LIB增强', link: '/docswtc/' },
			{ text: '联盟链', link: '/docxlib/' },
			{ text: 'API', link: '/docapi/' }
		]
	}
}
