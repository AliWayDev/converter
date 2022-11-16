const socket = io()
const input = document.getElementById('text')
const btn = document.getElementById('btn')

btn.addEventListener('click', (e) => {
    e.preventDefault()

    if (input.value) {
        socket.emit('base64', { base64: input.value })
        input.value = ''
    }
})

window.addEventListener('load', () => {
    socket.on('base64', (data) => {
        if (data.reload) {
            window.location.reload();
        }
    })
})