function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="w-full py-4 text-center text-gray-400 text-sm"
            style={{ backgroundColor: 'rgba(203, 203, 203, 0.1)' }}
        >
            Copyright &copy; {currentYear} Pokédex.
        </footer>
    );
}

export default Footer;
