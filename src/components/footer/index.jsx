function Footer() {
    return (
        <footer className="w-full py-4 text-center text-gray-400 text-sm"
            style={{ backgroundColor: 'rgba(203, 203, 203, 0.1)' }}
        >
            Data powered by{' '}
            <a
                href="https://pokeapi.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-600 transition"
            >
                PokéAPI
            </a>
        </footer>
    );
}

export default Footer;
