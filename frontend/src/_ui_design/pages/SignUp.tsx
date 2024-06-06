import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";

const SignUp = () => {
	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Créer un compte <span className='text-blue-500'>B.tchat</span>
				</h1>

				<form>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-white'>Nom et Prénom</span>
						</label>
						<input type='text' placeholder='Coco Chanel' className='w-full input input-bordered  h-10' />
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text text-white'>Pseudo</span>
						</label>
						<input type='text' placeholder='Chanel' className='w-full input input-bordered h-10' />
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white'>Mot de passe</span>
						</label>
						<input
							type='password'
							placeholder='Créer votre mot de passe'
							className='w-full input input-bordered h-10'
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-white'>Confirmer votre mot de passe</span>
						</label>
						<input
							type='password'
							placeholder='Confirmer votre mot de passe'
							className='w-full input input-bordered h-10'
						/>
					</div>

					<GenderCheckbox />

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'
					>
						Vous avez déja un compte ?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700'>Créer mon compte</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;