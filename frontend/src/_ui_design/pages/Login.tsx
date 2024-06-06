import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-white'>
					Se connecter
					<span className='text-blue-500'> ChatApp</span>
				</h1>

				<form>
					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Pseudo</span>
						</label>
						<input type='text' placeholder='Chanel' className='w-full input input-bordered h-10' />
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Mot de passe</span>
						</label>
						<input
							type='Mot de passe'
							placeholder='Mot de passe'
							className='w-full input input-bordered h-10'
						/>
					</div>
					<Link
						to='/signup'
						className='text-sm  hover:underline text-white hover:text-blue-600 mt-2 inline-block'
					>
						Tu as déja un compte ?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2'>Se connecter</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;