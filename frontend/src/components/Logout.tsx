import userLogout from '../hooks/userLogout'

const Logout = () => {
    const {loading, logout} = userLogout();

    return (
        <>
        { !loading ? (
            <p onClick={logout}>Log out</p>
            ) : (
            <p> Loading... </p>
        )}
        </>
    )
}

export default Logout