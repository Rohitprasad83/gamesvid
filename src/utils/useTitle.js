import { useEffect } from 'react'

function useTitle(msg) {
    useEffect(() => {
        document.title = `GamesVid  ${msg}`
    }, [msg])
}
export { useTitle }