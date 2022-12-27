let requireAll = requireContext => requireContext.keys().map(requireContext)
let svgs = require.context('./', false, /\.svg$/) // 第一个参数表示相对的文件目录，第二个参数表示是否包括子目录中的文件，第三个参数表示引入的文件匹配的正则表达式
requireAll(svgs) // webpack提供的require方法， 可以创建上下文环境， 相当于将svg目录下的svg文件require进来