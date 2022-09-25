import React, { useState } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../containers/header/Header";
import Footer from "../containers/footer/Footer";
import useAuth from "../../../hook/useAuth";
import useTools from "../../../hook/useTools";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { createNewUser } = useAuth();
  const { isClick, setIsClick, buttonRefresh } = useTools();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    setIsClick(true);
    const fullName = data.fullName;
    const email = data.email;
    const password = data.password;
    createNewUser(fullName, email, password, navigate);
    buttonRefresh();
  };
  return (
    <>
      <Header />
      <main className="bg-light">
        <div className="container-fluid py-4">
          <div className="row justify-content-center">
            <div className="col-sm-4">
              <div className="card border-0 shadow p-3">
                <p className="display-6 opacity-50 text-center mb-4">
                  Register
                </p>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="row g-4 justify-content-center"
                >
                  <div className="col-sm-10">
                    <label htmlFor="fullName" className="form-label text-muted">
                      Full Name:
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="full name"
                      className="form-control"
                      {...register("fullName", {
                        required: "this field is required",
                        minLength: {
                          value: 4,
                          message: "min length 4 characters",
                        },
                      })}
                    />
                    {errors.fullName && (
                      <span
                        style={{ color: "red", fontSize: "12px" }}
                        role="alert"
                      >
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>
                  <div className="col-sm-10">
                    <label htmlFor="email" className="form-label text-muted">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="email"
                      className="form-control"
                      {...register("email", {
                        required: "this field is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "does't match email format",
                        },
                      })}
                    />
                    {errors.email && (
                      <span
                        style={{ color: "red", fontSize: "12px" }}
                        role="alert"
                      >
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="col-sm-10">
                    <label htmlFor="password" className="form-label text-muted">
                      Password:
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="password"
                        className="form-control"
                        {...register("password", {
                          required: "this field is required",
                          minLength: {
                            value: 8,
                            message: "min length is 8",
                          },
                        })}
                      />
                      <button
                        className="btn border text-muted"
                        type="button"
                        id="password"
                        onClick={() =>
                          setShowPassword((prevState) => !prevState)
                        }
                      >
                        {!showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <span
                        style={{ color: "red", fontSize: "12px" }}
                        role="alert"
                      >
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <div className="col-sm-10">
                    <label
                      htmlFor="confirm_password"
                      className="form-label text-muted"
                    >
                      Confirm password:
                    </label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirm_password"
                        name="confirm_password"
                        placeholder="confirm password"
                        className="form-control"
                        {...register("confirm_password", {
                          required: "this field is required",
                          validate: (value) =>
                            value === getValues("password") ||
                            "password doesn't match",
                        })}
                      />
                      <button
                        className="btn border text-muted"
                        type="button"
                        id="confirm_password"
                        onClick={() =>
                          setShowConfirmPassword((prevState) => !prevState)
                        }
                      >
                        {!showConfirmPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </button>
                    </div>
                    {errors.confirm_password && (
                      <span
                        style={{ color: "red", fontSize: "12px" }}
                        role="alert"
                      >
                        {errors.confirm_password.message}
                      </span>
                    )}
                  </div>
                  <div className="col-sm-10 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      I agree with the terms and conditions
                    </label>
                  </div>
                  {isClick ? (
                    <div className="text-center">
                      <button
                        className="btn btn-primary"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Create
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        endIcon={<PersonAddAltIcon />}
                      >
                        Create
                      </Button>
                    </div>
                  )}
                </form>
                <div className="text-center mt-2">
                  <p>
                    <span className="text-muted me-3">
                      If already have an account?
                    </span>
                    <Button variant="text" onClick={() => navigate("/login")}>
                      Login
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Register;
