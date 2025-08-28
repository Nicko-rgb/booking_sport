import React, { useState } from 'react';
import '../styles/LoginRegister.css';
import { FaGoogle } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { FiEyeOff } from "react-icons/fi";
import { useLoginRegister } from '../hooks/useLoginRegister';
import SelectPhone from './SelectPhone';
import Modal from '../../../shared/components/ui/Modal';
import ResetPassword from './ResetPassword';

const OpcionsIconsLoginRegister = () => {
    return (
        <div className='opcions-icons'>
            <FaGoogle />
            <FaTwitter />
            <FaFacebookF />
        </div>
    )
}

const LoginRegister = () => {
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);

    const {
        handleSubmit,
        isLogin,
        showPassword,
        handleToggleMode,
        handleShowPassword
    } = useLoginRegister();

    const handleForgotPasswordClick = (e) => {
        e.preventDefault();
        setIsResetPasswordModalOpen(true);
    };

    const handleCloseResetPasswordModal = () => {
        setIsResetPasswordModalOpen(false);
    };

    return (
        <div className='login-register'>
            <main className={isLogin ? 'login-mode' : 'register-mode'}>
                <div className={`fondo-translate ${isLogin ? 'login-position' : 'register-position'}`}></div>

                {/* Contenedor dinámico */}
                <div className="content-container">
                    {/* Formulario de Login */}
                    <div className={`form-section login-form ${isLogin ? 'active' : 'inactive'}`}>
                        <h2>Sign In</h2>
                        <OpcionsIconsLoginRegister />
                        <p>or use your email account</p>
                        <form>
                            <div className="input-group">
                                <input 
                                    type="email"
                                    name="email"
                                    placeholder=""
                                    required 
                                />
                                <label>Email</label>
                                <HiOutlineMail className='ico' />

                            </div>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder=""
                                    required
                                />
                                <label>Password</label>
                                {showPassword ? <FiEyeOff className='ico-pass ico' onClick={handleShowPassword} /> : <IoEyeOutline className='ico-pass ico' onClick={handleShowPassword} />}

                            </div>
                            <a href="#" onClick={handleForgotPasswordClick}>Forgot password?</a>
                            
                            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Iniciar Sesión</button>
                        </form>
                    </div>

                    {/* Panel de bienvenida para Login */}
                    <div className={`welcome-section login-welcome ${isLogin ? 'active' : 'inactive'}`}>
                        <h2>Hello, Friend!</h2>
                        <p>Enter your personal details to use all of site features</p>
                        <button onClick={handleToggleMode} className="btn btn-outline">Registrarse</button>
                    </div>

                    {/* Panel de bienvenida para Register */}
                    <div className={`welcome-section register-welcome ${!isLogin ? 'active' : 'inactive'}`}>
                        <h2>Welcome Back!</h2>
                        <p>To keep connected with us please login with your personal info</p>
                        <button onClick={handleToggleMode} className="btn btn-outline">Sign In</button>
                    </div>

                    {/* Formulario de Register */}
                    <div className={`form-section register-form ${!isLogin ? 'active' : 'inactive'}`}>
                        <h2>Create Account</h2>
                        <OpcionsIconsLoginRegister />
                        <p>or use your email for registration</p>
                        <form>
                            <aside>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="name"
                                        className='input-txt'
                                        placeholder=""
                                        required
                                    />
                                    <label>Name</label>
                                    <HiOutlineUser className='ico' />
                                </div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="lastname"
                                        className='input-txt'
                                        placeholder=""
                                        required
                                    />
                                    <label>Last Name</label>
                                    <HiOutlineUser className='ico' />
                                </div>
                            </aside>
                            <SelectPhone />
                            <div className="input-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder=""
                                    required
                                />
                                <label>Email</label>
                                <HiOutlineMail className='ico' />
                            </div>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder=""
                                    required
                                />
                                <label>Password</label>
                                {showPassword ? <FiEyeOff className='ico-pass ico' onClick={handleShowPassword} /> : <IoEyeOutline className='ico-pass ico' onClick={handleShowPassword} />}

                            </div>
                            <button onClick={handleSubmit} type="submit" className="btn btn-primary"></button>
                        </form>
                    </div>
                </div>
            </main>
            
            {/* Modal para Reset Password */}
            <Modal 
                isOpen={isResetPasswordModalOpen} 
                onClose={handleCloseResetPasswordModal}
                title="Restablecer Contraseña"
                size='medium'
                headerColor='purple'
            >
                <ResetPassword onClose={handleCloseResetPasswordModal} isOpen={isResetPasswordModalOpen} />
            </Modal>
        </div>
    )
}

export default LoginRegister