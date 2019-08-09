export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
        console.log('请求', config.url)
    })

    $axios.onResponse((a) => {
        console.log('收到响应', a.data)
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    })
}
