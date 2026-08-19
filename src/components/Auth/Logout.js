const Logout = () => {
    // clear the local storage to remove the token and user information
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');

    // reload the page to reflect the changes and redirect to the login page
    window.location.reload()
}

export default Logout;