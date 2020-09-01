import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/actions";

export default function Header() {
    const [isActiveNav, setIsActiveNav] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const isLoggingOut = useSelector((state) => state.user.isLoading);
    const dispatch = useDispatch();
    const navRef = useRef();

    const closeNav = () => {
        setIsActiveNav(false);
    };
    const handleClick = (e) => {
        if (isActiveNav && !navRef.current?.contains(e.target)) {
            closeNav();
        }
    };
    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    return (
        <nav ref={navRef} className='navbar' role='navigation' aria-label='main navigation'>
            <div className='navbar-brand'>
                <Link href='/'>
                    <a onClick={closeNav} className='navbar-item logo-wrapper'>
                        <img src='/logo.png' />
                    </a>
                </Link>

                <span
                    role='button'
                    className={isActiveNav ? "navbar-burger burger is-active" : "navbar-burger burger"}
                    aria-label='menu'
                    aria-expanded='false'
                    data-target='navbarBasicExample'
                    onClick={() => setIsActiveNav(!isActiveNav)}
                >
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                </span>
            </div>

            <div id='navbarBasicExample' className={isActiveNav ? "navbar-menu is-active" : "navbar-menu"}>
                <div className='navbar-start'>
                    <a onClick={closeNav} className='navbar-item'>
                        Đánh Giá Phim
                    </a>

                    <a onClick={closeNav} className='navbar-item'>
                        Đánh Giá Rạp
                    </a>
                </div>

                <div className='navbar-end'>
                    {isAuthenticated ? (
                        <div className='navbar-item'>
                            <button
                                onClick={handleLogout}
                                type='button'
                                className={`button is-primary is-outlined ${isLoggingOut ? "is-loading" : ""}`}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <div className='navbar-item'>
                            <div className='buttons'>
                                <Link href='/login'>
                                    <a onClick={closeNav} className='button is-primary'>
                                        Đăng nhập
                                    </a>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>
                {`
                    nav {
                        box-shadow: 1px 1px 1px #d4d4d4;
                    }
                    .logo-wrapper {
                        display: flex;
                        align-items: center;
                        padding-top: 0;
                        padding-bottom: 0;
                    }
                    .logo-wrapper img {
                        width: 2.75rem;
                        height: 2.75rem;
                        max-height: unset;
                        border-radius: 5px;
                    }
                `}
            </style>
        </nav>
    );
}