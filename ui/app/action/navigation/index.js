module.exports = {
    navigate(route) {
        window.location.hash = `#${route}`;
    }
};
