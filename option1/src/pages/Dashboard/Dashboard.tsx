import { IoMdSearch } from "react-icons/io";
import MainLayout from "../../components/Nav/MainLayout";
import { useState } from "react";

{/*Icons*/}
import { FaArrowTurnUp, FaList } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { PiColumnsFill } from "react-icons/pi";

function Dashboard() {
	const [isTyping, setIsTyping] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [selectedArrhythmia, setSelectedArrhythmia] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>('Tables');

	const arrhythmia = ['PVC', 'Pause', 'AV Block'];
	const patients = [{ id: 1, name: 'Bob' }, { id: 2, name: 'Bob' }];

	const handleInputChange = (e: any) => {
		const inputValue = e.target.value;
		setIsTyping(inputValue !== "");
		setSearchTerm(inputValue);
	};

	const filteredPatients = patients.filter((patient) =>
	patient.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleDropdown = () => {
		setIsOpen(!isOpen);
	}

	const handleArrhythmiaClick = (arrhythmia: string) => {
        if (selectedArrhythmia.includes(arrhythmia)) {
            setSelectedArrhythmia(selectedArrhythmia.filter((item) => item !== arrhythmia));
        } else {
            setSelectedArrhythmia([...selectedArrhythmia, arrhythmia]);
        }
    };

	const handleOptionClick = (option: string) => {
        setSelectedOption(option);
    };

	return (
		<MainLayout>
			<div className="p-6 flex-col space-y-6">

				<div className="flex flex-col space-y-2 text-navy">
					<h1 className="font-medium">Good Morning!</h1>
					<h2 className="text-sm">I hope you’re in good mood because there are x patients waiting for you.</h2>
				</div>

				<div className="px-4 flex flex-row bg-navy rounded-lg">
					{/*Find Patient*/}
					<div className="relative border-r border-white">
							<input
							type="text"
							placeholder="Find a patient"
							className="px-6 py-2 bg-transparent text-xs text-white placeholder:text-white focus:outline-none"
							onChange={handleInputChange}
							/>
							{isTyping && searchTerm ? (
								<>
									<FaArrowTurnUp className="absolute top-2.5 text-white w-3 h-3 transform rotate-90" />
									<div className="absolute top-7 left-0 w-full bg-navy bg-opacity-80 rounded">
									{filteredPatients.length > 0 ? (
										filteredPatients.map((patient) => (
											<div key={patient.id} className="p-2 text-white text-xs hover:bg-navy hover:rounded cursor-pointer">
												{patient.name}
											</div>
										))
									) : (
										<div className="p-2 text-white text-sm">No patients found...</div>
									)}
									</div>
								</>
								) : (
								<IoMdSearch className="absolute top-2 w-3.5 h-3.5 text-white"/>
							)}
					</div>
					{/*Find Arrhythmia*/}
					<div className="relative border-r border-white">
							<input
							type="text"
							placeholder="All arrhythmia"
							className="px-6 py-2 bg-transparent text-xs text-white placeholder:text-white focus:outline-none"
							/>
							<MdOutlineKeyboardArrowDown
								onClick={handleDropdown}
								className="absolute top-2 right-6 w-3.5 h-3.5 text-white cursor-pointer"
							/>
							{isOpen && (
								<div className="absolute top-6 w-full left-0 mt-1 p-2 bg-navy bg-opacity-60 rounded">
									{arrhythmia.map((option) => (
										<div
											key={option}
											onClick={() => handleArrhythmiaClick(option)}
											className={`flex items-center space-x-2 text-white text-sm`}
										>
											<input type="checkbox" checked={selectedArrhythmia.includes(option)}/>
											<span>{option}</span>
										</div>
									))}
								</div>
							)}
					</div>

					{/*Option Display*/}
					<div className="flex flex-row space-x-2 ml-auto pr-2 py-2">
						{/*Option Tables*/}
						<div
							onClick={() => handleOptionClick('Tables')}
							className={`px-2 flex flex-row items-center space-x-1 text-sm cursor-pointer ${selectedOption === 'Tables' ? 'bg-white text-navy rounded' : 'text-white'}`}
						>
							<PiColumnsFill/>
							<p className="hidden md:block">Tables</p>
						</div>
						{/*Option List*/}
						<div
							onClick={() => handleOptionClick('List')}
							className={`px-2 flex flex-row items-center space-x-1 text-sm cursor-pointer ${selectedOption === 'List' ? 'bg-white text-navy rounded' : 'text-white'}`}
						>
							<FaList />
							<p className="hidden md:block">List</p>
						</div>
					</div>
				</div>

			</div>
		</MainLayout>
  )
}

export default Dashboard