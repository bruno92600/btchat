import { Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {

	const [search, setSearch] = useState("")
	const { setSelectedConversation } = useConversation()
	const { conversations } = useGetConversations()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!search) return
		if (search.length < 3) {
			return toast.error("Le terme de recherche doit comporter au moins 3 caractères")
		}
		const conversation = conversations.find((c: ConversationType) =>
			c.fullname.toLowerCase().includes(search.toLowerCase())
		)

		if (conversation) {
			setSelectedConversation(conversation)
			setSearch("")
		} else toast.error("Aucun utilisateur de ce type n'a été trouvé")
	}

	return (
		<form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Chercher…'
				className='input-sm md:input input-bordered rounded-full sm:rounded-full w-full'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn md:btn-md btn-sm btn-circle bg-sky-500 text-white  '>
				<Search className='w-4 h-4 md:w-6 md:h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;