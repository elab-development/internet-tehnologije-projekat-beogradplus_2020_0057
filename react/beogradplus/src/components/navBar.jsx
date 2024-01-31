const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-blue">
      <a className="navbar-brand text-white ml-5" href="#">
        Beograd Plus
      </a>

      <div className="dropdown ms-auto mr-5">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Logged User
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a href="" className="dropdown-item">
            Register
          </a>
          <a href="" className="dropdown-item">
            Log in
          </a>
          <a href="" className="dropdown-item">
            Log out
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
