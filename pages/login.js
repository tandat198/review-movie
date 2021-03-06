import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { withAuthServerSideProps, withAuth } from "../HOC/withAuth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/user/actions";
import FacebookIcon from "@material-ui/icons/Facebook";
import { useRouter } from "next/dist/client/router";
import { CLEAN_UP } from "../redux/user/action-types";
import { BulletList } from "react-content-loader";

function Login(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const { errors, loginType, isSuccess } = useSelector(
        (state) => state.user.client
    );
    const [emailErrMsg, setEmailErrMsg] = useState("");
    const [passwordErrMsg, setPasswordErrMsg] = useState("");
    const router = useRouter();

    const submitFormLogin = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        dispatch(login({ email, password }, "local"));
    };

    useEffect(() => {
        if (isSuccess) {
            router.replace("/");
        }

        return () => {
            dispatch({ type: CLEAN_UP });
        };
    }, [isSuccess]);

    useEffect(() => {
        if (errors.email && errors.email.includes("required")) {
            setEmailErrMsg("Vui lòng nhập email");
        } else if (errors.email && errors.email.includes("invalid")) {
            setEmailErrMsg("Email không hợp lệ");
        } else if (errors.email && errors.email.includes("not found")) {
            setEmailErrMsg("Email không tồn tại");
        } else {
            setEmailErrMsg("");
        }
    }, [errors.email]);

    useEffect(() => {
        if (errors.password && errors.password.includes("required")) {
            setPasswordErrMsg("Vui lòng nhập mật khẩu");
        } else if (errors.password && errors.password.includes("incorrect")) {
            setPasswordErrMsg("Mật khẩu không đúng");
        } else {
            setPasswordErrMsg("");
        }
    }, [errors.password]);

    const isAuthenticated = Object.keys(props.user).length > 0;

    if (isAuthenticated) {
        const windowWidth =
            typeof document !== "undefined"
                ? document.documentElement.clientWidth
                : 0;

        if (windowWidth >= 992) {
            return null;
        } else {
            return (
                <div className='px-3'>
                    <BulletList />
                </div>
            );
        }
    }

    return (
        <div className='login pt-5 pb-6 px-0 mb-5 has-background-white'>
            <Head>
                <title>
                    Đánh Giá Phim - Đăng Nhập để Đánh Giá Phim yêu thích
                </title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='title px-4'>Đăng Nhập vào Tài Khoản Của Bạn</div>
            <hr className='px-4' />

            <div className='form-container px-4'>
                <div className='buttons are-medium'>
                    <button
                        className={`button is-fullwidth has-text-black has-background-white mb-3 px-0 py-0 ${
                            loginType === "gg" ? "is-loading" : ""
                        }`}
                        disabled={loginType === "gg"}
                        onClick={() => dispatch(login(null, "gg"))}
                    >
                        <Link href='/api/auth/google'>
                            <a className='gg-link'>
                                {loginType !== "gg" ? (
                                    <>
                                        <span className='google-icon-wp'>
                                            <img
                                                alt='google-icon'
                                                src='/google-icon.svg'
                                            />
                                        </span>
                                        <span className='ml-3 d-inline-block has-text-black'>
                                            Đăng Nhập với Google
                                        </span>
                                    </>
                                ) : null}
                            </a>
                        </Link>
                    </button>
                    <button
                        disabled={loginType === "fb"}
                        onClick={() => dispatch(login(null, "fb"))}
                        className={`fb-btn button is-fullwidth px-0 has-text-white px-0 py-0 ${
                            loginType === "fb" ? "is-loading" : ""
                        }`}
                    >
                        <Link href='/api/auth/facebook'>
                            <a className='fb-link has-text-white'>
                                {loginType !== "fb" ? (
                                    <>
                                        <FacebookIcon />
                                        <span className='ml-3 d-inline-block'>
                                            Đăng Nhập với Facebook
                                        </span>
                                    </>
                                ) : null}
                            </a>
                        </Link>
                    </button>
                </div>
                <div className='has-text-centered my-3 or-wrapper'>
                    <hr />
                    <span className='or'>Hoặc</span>
                </div>
                <form className='mb-3'>
                    <div className='field'>
                        <label className='label'>Email</label>
                        <div className='control'>
                            <input
                                ref={emailRef}
                                className='input is-medium'
                                type='email'
                                placeholder='Địa chỉ email'
                            />
                        </div>
                        {emailErrMsg ? (
                            <p className='has-text-danger mt-1'>
                                {emailErrMsg}
                            </p>
                        ) : null}
                    </div>
                    <div className='field mb-3'>
                        <label className='label'>Mật khẩu</label>
                        <div className='control'>
                            <input
                                ref={passwordRef}
                                className='input is-medium'
                                type='password'
                                placeholder='Mật khẩu'
                            />
                        </div>
                        {passwordErrMsg ? (
                            <p className='has-text-danger mt-1'>
                                {passwordErrMsg}
                            </p>
                        ) : null}
                    </div>
                    <button
                        disabled={loginType === "local"}
                        className={`button is-primary is-fullwidth is-medium ${
                            loginType === "local" ? "is-loading" : ""
                        }`}
                        type='submit'
                        onClick={submitFormLogin}
                    >
                        Đăng Nhập
                    </button>
                </form>

                <div className='register-and-forgot-pass-wp'>
                    <div className='register-wp'>
                        <span>Bạn chưa có tài khoản? </span>
                        <Link href='/register'>
                            <a>Đăng Ký</a>
                        </Link>
                    </div>
                    <div className='forgot-pass-wp'>
                        <Link href='/forgot-password'>
                            <a>Quên Mật Khẩu</a>
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>
                {`
                    .login {
                        min-height: calc(100vh - 3.25rem);
                    }
                    .title,
                    .form-container,
                    hr {
                        width: 100%;
                    }
                    .title {
                        font-size: 1rem;
                    }
                    .or-wrapper {
                        position: relative;
                    }
                    .or {
                        position: absolute;
                        top: 0;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: #fff;
                        display: inline-block;
                        padding: 0.3rem;
                        z-index: 2;
                    }
                    .form-container {
                        margin: 0 auto;
                    }
                    hr {
                        margin: 1rem auto;
                    }

                    .icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .google-icon-wp {
                        width: 1.25rem;
                        height: 1.25rem;
                        display: flex;
                        align-items: center;
                    }
                    .google-icon-wp img {
                        width: 100%;
                    }
                    .fb-link,
                    .gg-link {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .fb-btn {
                        background: #3b5998;
                    }
                    .register-and-forgot-pass-wp {
                        display: flex;
                        flex-direction: column;
                    }
                    .register-wp {
                        width: 100%;
                    }
                    .forgot-pass-wp {
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                    }
                    @media only screen and (min-width: 576px) {
                        .title,
                        .form-container,
                        hr {
                            width: 30rem;
                        }
                        .title {
                            margin: 0 auto;
                            font-size: 1.4rem;
                        }
                        .register-and-forgot-pass-wp {
                            flex-direction: row;
                            justify-content: space-between;
                        }
                        .register-wp {
                            width: 65%;
                        }
                        .forgot-pass-wp {
                            width: 25%;
                            display: flex;
                            justify-content: flex-end;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export const getServerSideProps = withAuthServerSideProps();

export default withAuth(Login);
