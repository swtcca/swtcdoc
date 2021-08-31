module.exports = {
  // plugins: ['@vuepress/last-updated', '@vuepress/nprogress', '@vuepress/blog', '@vuepress/back-to-top'],
  title: "SWTCLIB",
  description: "社区版swtc公链node.js开发库",
  markdown: {
    toc: { includeLevel: [2,3,4] }
  },
  themeConfig: {
    repo: "swtcca/swtcdoc",
    lastUpdated: "Last Updated", // string | boolean
    repoLabel: "Contribute!",
    docsRepo: "swtcca/swtcdoc",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "帮助维护文档!",
    nav: [
      { text: "国密综合", link: "/docs/swtcxlib/" },
      { text: "钱包", link: "/docs/wallet/" },
      { text: "rpc文档", link: "/docs/swtcrpc/" },
      { text: "lib文档", link: "/docs/swtclib/" },
      { text: "proxy文档", link: "/docs/swtcproxy/" },
      { text: "api文档", link: "/docs/api/" },
      { text: "实例", link: "/docs/examples/" },
      { text: "增强", link: "/docs/swtc/" },
      { text: "练习", link: "https://swtclearn.netlify.com" }
    ]
  }
}
