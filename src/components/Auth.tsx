import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Context } from '../index';
import { REGISTRATION_ROUTE } from "../utils/consts";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GoogleLoginButton from './UI/GoogleLoginButton';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const FormWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const NavLinkStyled = styled(NavLink)`
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

interface FormValues {
  usernameOrEmail: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const { authStore } = useContext(Context);

  const validationSchema = Yup.object({
    usernameOrEmail: Yup.string().required('Email или username обязателен'),
    password: Yup.string().required('Пароль обязателен'),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const deviceInfo = {
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
      };
      try {
        await authStore.login(values.usernameOrEmail, values.password, JSON.stringify(deviceInfo));
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Container>
      <FormWrapper>
        <FormTitle>Войти</FormTitle>
        <GoogleLoginButton />
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label>Email или Username</Label>
            <Input
              name="usernameOrEmail"
              type="text"
              placeholder="Email или username"
              autoComplete="on"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.usernameOrEmail}
            />
            {formik.touched.usernameOrEmail && formik.errors.usernameOrEmail ? (
              <ErrorMessage>{formik.errors.usernameOrEmail}</ErrorMessage>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label>Пароль</Label>
            <Input
              name="password"
              type="password"
              placeholder="Пароль"
              autoComplete="on"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <ErrorMessage>{formik.errors.password}</ErrorMessage>
            ) : null}
          </FormGroup>
          <Button type="submit">Логин</Button>
        </form>
        <NavLinkStyled to={REGISTRATION_ROUTE}>Еще не зарегистрированы?</NavLinkStyled>
      </FormWrapper>
    </Container>
  );
};

export default observer(AuthForm);
