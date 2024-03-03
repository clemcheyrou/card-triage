import { IoMdSearch } from "react-icons/io";
import MainLayout from "../../components/Nav/MainLayout";
import { useState, useEffect } from "react";
import { fetchCards, patchCard } from "../../services/api";
import { FaArrowTurnUp, FaList } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { PiColumnsFill } from "react-icons/pi";
import { Patient } from "../../services/interface";
import PatientDetails from "../../components/DisplayOptions/PatientDetails";
import PatientTables from "../../components/DisplayOptions/PatientTables";
import PatientList from "../../components/DisplayOptions/PatientList";

function Dashboard() {
	const [statusHandled, setStatusHandled] = useState(false);

	const [isTyping, setIsTyping] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [selectedArrhythmia, setSelectedArrhythmia] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>('Tables');
	const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
	
	const [patients, setPatients] = useState<Patient[]>([]);
	const pendingPatients = patients.filter((patient) => patient.status === 'PENDING')
	const rejectedPatients = patients.filter((patient) => patient.status === 'REJECTED')
	const donePatients = patients.filter((patient) => patient.status === 'DONE')

	const arrhythmia = ['PVC', 'Pause', 'AV Block', 'AFib', 'PSVC'];

	useEffect(() => {
		fetchCards()
			.then(data => {
				setPatients(data);
				console.log('cards', patients);
				setStatusHandled(false);
			})
			.catch((error: any) => {
				console.log(error);
			});
	}, [statusHandled]);

	const handleInputChange = (e: any) => {
		const inputValue = e.target.value;
		setIsTyping(inputValue !== "");
		setSearchTerm(inputValue);
	};

	const filteredPatients = patients.filter((patient) =>
	patient.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
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

	const handlePatientClick = (patient: Patient) => {
		setSelectedPatient(patient);
		setIsTyping(false);
	};

	const handleOptionClick = (option: string) => {
        setSelectedOption(option);
    };

	const handleStatus = (patientId : number, status: string) => {
		patchCard(patientId, status)
			.then(data => {
				console.log('change', data)
				const updatedPatients = patients.map(patient =>
					patient.id === patientId ? data : patient
				);
				setPatients(updatedPatients);
				if (selectedPatient)
					setSelectedPatient(data);
			})
			.catch((error: any) => {
				console.log(error)
			});
	};

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
		e.dataTransfer.setData('text/plain', id.toString());
	};

	const handleDropRejected = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const id = e.dataTransfer.getData('text/plain');
		handleStatus(parseInt(id), 'REJECTED');
		setStatusHandled(true);
	};

	const handleDropDone = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const id = e.dataTransfer.getData('text/plain');
		handleStatus(parseInt(id), 'DONE');
		setStatusHandled(true);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	return (
		<MainLayout>
			<div className="p-6 flex-col space-y-6">

				<div className="flex flex-col space-y-2 text-navy">
					<h1 className="font-medium">Good Morning!</h1>
					<h2 className="text-sm">{pendingPatients.length !== 0
						? `I hope you're in a good mood because there are ${pendingPatients.length} patients waiting for you.`
						: "The day is going to be beautiful because no patient is waiting for you."
  					}</h2>
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
									<div className="absolute top-7 left-0 w-full bg-navy bg-opacity-60 rounded">
									{filteredPatients.length > 0 ? (
										filteredPatients.map((patient) => (
											<div 
												key={patient.id}
												onClick={() => {handlePatientClick(patient)}}
												className="p-2 text-white text-xs hover:bg-navy hover:rounded cursor-pointer"
											>
												{patient.patient_name}
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
											<input type="checkbox" checked={selectedArrhythmia.includes(option)} readOnly/>
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

				{/*Display*/}
				{selectedPatient ? (
				    <PatientDetails selectedPatient={selectedPatient} handleStatus={handleStatus} setSelectedPatient={setSelectedPatient}/>
				) : selectedOption === 'Tables' ? (
					<PatientTables
						patients={patients}
						selectedArrhythmia={selectedArrhythmia}
						handleDropRejected={handleDropRejected}
						handleDropDone={handleDropDone}
						handleDragOver={handleDragOver}
						handleDragStart={handleDragStart}
					/>
				) : selectedOption === 'List' ? (
					<PatientList
						patients={patients}
						selectedArrhythmia={selectedArrhythmia}
						handleDropRejected={handleDropRejected}
						handleDropDone={handleDropDone}
						handleDragOver={handleDragOver}
						handleDragStart={handleDragStart}
					/>
				) : null}
			</div>
		</MainLayout>
  )
}

export default Dashboard