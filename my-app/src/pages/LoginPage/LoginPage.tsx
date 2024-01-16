import { useNavigate } from 'react-router-dom';
import { SetPage } from '../../models/common.ts';
import { useAppDispatch } from '../../store/hooks.ts';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { login as loginThunk, useError, useLoading, useUser, userActions } from '../../store/user'
import { Loader } from '../../components/Loader/Loader.tsx';

interface LoginPageProps {
    setPage: SetPage
    mainPageLink: string
}

const LoginPage = ({ setPage, mainPageLink }: LoginPageProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const error = useError()
    const loading = useLoading()
    const user = useUser()

    const handleSubmit = () => {
        console.log('handle called')
       dispatch(loginThunk({login, password}))
    };

    useEffect(() => {
        setPage()
    }, [])

    useEffect(() => {
        if (error) {
            toast.warn(error)
            dispatch(userActions.resetError())
        }
    }, [error] )

    useEffect(() => {
        if (user) {
            navigate(mainPageLink)
        }
    }, [user])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            <Container>
                <ToastContainer position="top-center" newestOnTop={false} />
                <Row className="justify-content-center">
                    <Col md={5}>
                        <div className="bg p-4 rounded">
                            <h2 className="text-center mb-4">Авторизация</h2>
                            <Form.Label className="font-weight-bold text-left">Логин</Form.Label>
                            <Form.Control
                                onChange={(e) => setLogin(e.target.value)}
                                type="login"
                                placeholder="Введите логин"
                                required
                            />

                            <Form.Label className="mt-3">Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Введите пароль"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <Button variant="primary" type="submit" className="w-100 mt-4" onClick={handleSubmit}
                                    style={{borderRadius: '10px'}}>
                                Войти
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LoginPage;
