import img404 from "../../media/404.webp";

export default function Home() {
    return (
        <main>
            <h1>404</h1>
            <p>The page you are looking for does not exist!</p>
            <img src={img404} alt="404" />
        </main>
    );
}
