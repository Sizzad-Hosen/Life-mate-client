import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import login from "../../assets/images/signup.gif";
import { AuthContext } from "../../Provider/AuthProvider";
import app from "../../firebase/firebase.config";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { createUser, updateUserProfile, setUser } = useContext(AuthContext);
  const storage = getStorage(app);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const userCredential = await createUser(data.email, data.password);
      const user = userCredential.user;
      let imageUrl = null;

      if (data.profileImage.length > 0) {
        const imageFile = data.profileImage[0];
        const storageRef = ref(storage, `profileImages/${user.uid}/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
        await updateUserProfile(data.name, imageUrl);
        console.log('Profile image uploaded and URL updated:', imageUrl);
      } else {
        await updateUserProfile(data.name, null);
      }

      const userInfo = {
        name: data.name,
        email: data.email,
        photo: imageUrl,
        role: data.role,
        gender: data.gender,
      };

      console.log('User profile updated:', userInfo);
      setUser(userInfo); // Update the user context with new user info
      reset();
      navigate("/overview");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl mb-12 font-bold">Create Your Account</h1>
          <img className="w-96" src={login} alt="" />
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
                name="name"
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
                name="email"
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
                name="password"
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
            Already, Have An Account?{" "}
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
