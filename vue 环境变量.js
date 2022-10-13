const ev = process.env.NODE_ENV

const baseurl = {
    production :'生产环境',
    development :'开发环境',
}

export default  {
  baseUrl : baseurl[ev]
}
   // NODE_ENV: "production"
    // NODE_ENV: "development"