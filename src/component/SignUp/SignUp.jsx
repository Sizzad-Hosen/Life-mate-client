
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import login from "../../assets/images/signup.gif";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SignUp = () => {
  const axiosSecure = useAxiosSecure();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form data:", data); // Debug log

    try {
      const userCredential = await createUser(data.email, data.password);
      const user = userCredential.user;
      let imageUrl = null;

      if (data.profileImage.length > 0) {
        const formData = new FormData();
        formData.append("image", data.profileImage[0]);

        const imgbbApiKey ='40bbb0fa139714521cde8ac316643383';
        const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

        const response = await fetch(imgbbUrl, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const imgbbData = await response.json();
          imageUrl = imgbbData.data.url;
        } else {
          console.error('Error uploading image:', response.statusText);
        }
      }

      const userInfo = {
        name: data.name,
        email: data.email,
        photo: imageUrl,
        role: data.role,
        gender: data.gender,
      };
      console.log('user info', userInfo);

      await axiosSecure.post('/signup', userInfo)
        .then(res => {
          console.log('User signed up successfully:', res.data);

          if (res.data.InsertedId) {
            Swal.fire({
              text: "Successfully Signup!",
              icon: "success",
            });
          }
        })
        .catch(error => {
          console.error('Error signing up user:', error);
        });

      reset();
      navigate("/");

    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl mb-12 font-bold">Create Your Account</h1>
          <img className="w-96" src={login} alt="Sign Up" />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: true })}
                className="input input-bordered"
              />
              {errors.name && <span className="text-red-400">This field is required</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
                className="input input-bordered"
              />
              {errors.email && <span className="text-red-400">This field is required</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                {...register("role", { required: true })}
                className="select select-bordered"
              >
                <option value="">Select your role</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
                <option value="ambulanceDriver">Ambulance Driver</option>
              </select>
              {errors.role && <span className="text-red-400">This field is required</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                {...register("gender", { required: true })}
                className="select select-bordered"
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="text-red-400">This field is required</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Upload Your Image</span>
              </label>
              <input
                type="file"
                {...register("profileImage")}
                className="input input-bordered"
              />
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                {...register("password", {
                  pattern:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  minLength: 6,
                  maxLength: 18,
                  required: true,
                })}
                className="input input-bordered w-full"
              />
              <span
                className="absolute top-14 right-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
              {errors.password?.type === "required" && (
                <p className="text-red-400">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-400">Password must be at least 6 characters</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-400">
                  Password must contain one uppercase, one lowercase, one
                  special character, and one digit
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-400">Password must be less than 18 characters</p>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">SignUp</button>
            </div>
          </form>
          <p className="p-3 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
