import Nav from "@components/Nav"
import "./_app.css"
import useSession from "@lib/session"

export default function App({ Component, pageProps }) {
    const session = useSession()
    const newPageProps = {
        ...pageProps,
        session
    }

    return (
        <>
        <Nav session={ session }/>
        <Component {...newPageProps} />
        </>
    )
}
