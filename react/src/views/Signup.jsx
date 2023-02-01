import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Signup() {
    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()
    const { setUser, setToken } = useStateContext()
    const [errors, setErrors] = useState(null)

    const onSubmit = ev => {
        ev.preventDefault()

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Cadastre-se gratuitamente</h1>
                    {errors &&
                        <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={nameRef} type="text" placeholder="Nome completo" />
                    <input ref={emailRef} type="email" placeholder="Endereço de email" />
                    <input ref={passwordRef} type="password" placeholder="Senha" />
                    <input ref={passwordConfirmationRef} type="password" placeholder="Confirmar senha" />
                    <button className="btn btn-block">Cadastrar</button>
                    <p className="message">Já possui registro? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    )
}