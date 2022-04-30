import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "../components/Button";

import { createUser } from "../repository/redValleyRepository";
import { AppDispatch } from "../store/store";
import * as authActions from "../actions/authActions";
import { Typography } from "@mui/material";

const MainContainer = styled(Box)(() => ({
  backgroundImage: `linear-gradient(
    45deg,
    hsl(240deg 99% 56%) 0%,
    hsl(226deg 100% 50%) 11%,
    hsl(222deg 100% 50%) 22%,
    hsl(218deg 100% 50%) 33%,
    hsl(215deg 100% 50%) 44%,
    hsl(212deg 100% 50%) 56%,
    hsl(209deg 100% 50%) 67%,
    hsl(207deg 100% 50%) 78%,
    hsl(204deg 100% 50%) 89%,
    hsl(202deg 100% 50%) 100%
  )`,
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Form = styled("form")(() => ({
  maxWidth: "300px",
  padding: "40px 20px",
  margin: "10px",
  backgroundColor: "white",
  borderRadius: "5px",
  border: "0.3 px solid black",
}));

const Spacer = styled("div")(() => ({
  height: "10px",
}));

interface Props {
  as: "login" | "register";
}

const AuthPage: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const dispach = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    onSubmit: async function (values) {
      if (props.as === "login") {
        dispach(await authActions.validateLogin(values));
      } else {
        const response = await createUser(values);
        if (response.status === 201) {
          swal.fire("Exito al guardar", undefined, "success");
          navigate("/auth/login");
        }
      }
    },
    validationSchema: yup.object().shape({
      username: yup.string().min(5).max(50).required(),
    }),
  });

  return (
    <MainContainer>
      <Form onSubmit={formik.handleSubmit}>
        <Box>
          <Typography align="center" variant="h5">
            {props.as === "login" ? 'Inicio de Sesion' : 'Registro'}
          </Typography>
        </Box>
        <Box marginBottom={1}>
          <TextField
            label="Usuario"
            fullWidth
            margin="dense"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {props.as === "login" ? "Ingresar" : "Registrarme"}
        </Button>
        <Button
          fullWidth
          href={props.as === "login" ? "/auth/register" : "/auth/login"}
        >
          {props.as === "login" ? "Registrarme" : "Volver al Login"}
        </Button>
      </Form>
    </MainContainer>
  );
};

export default AuthPage;
