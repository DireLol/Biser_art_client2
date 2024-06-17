import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Context } from "../index";

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

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const { authStore } = useContext(Context);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Имя пользователя должно содержать минимум 3 символа")
      .required("Имя пользователя обязательно"),
    email: Yup.string().email("Некорректный email").required("Email обязателен"),
    password: Yup.string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .required("Пароль обязателен"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const deviceInfo = {
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
      };
      try {
        await authStore.registration(values.username, values.email, values.password, JSON.stringify(deviceInfo));
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Container>
      <FormWrapper>
        <FormTitle>Регистрация</FormTitle>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label>Email:</Label>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="on"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label>Имя пользователя:</Label>
            <Input
              name="username"
              type="text"
              placeholder="Имя пользователя"
              autoComplete="on"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <ErrorMessage>{formik.errors.username}</ErrorMessage>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label>Пароль:</Label>
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
          <Button type="submit">Регистрация</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default observer(AuthForm);