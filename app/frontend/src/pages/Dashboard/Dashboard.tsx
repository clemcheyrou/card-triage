import { IoMdSearch } from "react-icons/io";
import MainLayout from "../../components/Nav/MainLayout";
import { useState, useEffect } from "react";
import { fetchCards } from "../../services/api";

{/*Icons*/}
import { FaArrowTurnUp, FaList } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { PiColumnsFill } from "react-icons/pi";
import { Patient } from "../../services/interface";

function Dashboard() {
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
			console.log('cards', patients)
		  })
		  .catch((error: any) => {
			console.log(error)
		  });
	}, []);

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

				{selectedPatient ? (
					<div className="px-4 py-10 border border-navy h-[20vh] relative">
						<span className="absolute text-lilac top-2 right-4 cursor-pointer" onClick={() => {setSelectedPatient(null);}} >
							&#10005;
						</span>
						<table className="w-full text-xs border-navy">
							<thead>
								<tr className="text-white text-end bg-navy bg-opacity-60">
									<th>#</th>
									<th>Name</th>
									<th>Time & Date</th>
									<th>Arrhythmia</th>
									<th>Status</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
							<tr className="text-end">
								<td className="p-2">{selectedPatient.id}</td>
								<td className="p-2">{selectedPatient.patient_name}</td>
								<td className="p-2">{new Date(selectedPatient.created_date).toLocaleDateString()} {new Date(selectedPatient.created_date).toLocaleTimeString()}</td>
								<td className="p-2">{selectedPatient.arrhythmias.join(', ')}</td>
								<td className="p-2"><span className={`${selectedPatient.status === 'DONE' ? 'bg-green' : (selectedPatient.status === 'REJECTED') ? 'bg-red' : 'bg-orange'} px-2 py-1 rounded`}>{selectedPatient.status.toLowerCase()}</span></td>
								{selectedPatient.status === 'DONE' ? (
									<td className="p-2"><button className="text-red rounded underline hover:opacity-40 cursor-pointer">Rejected</button></td>
								) : ( 
									<td className="p-2"><button className="bg-green px-2 py-1 rounded hover:opacity-40 cursor-pointer">Done</button></td>
								)}
							</tr>
						</tbody>
					</table>
					</div>
				) : selectedOption === 'Tables' ? (
				<div className="flex flex-row space-x-2 w-full">
					<div className="flex-1 border border-navy h-[62vh] rounded-lg overflow-hidden">
						<div className="h-8 bg-navy rounded-t text-white text-sm py-2 px-4">
							<span>{pendingPatients.length + rejectedPatients.length}</span>
							<span className="ml-2">Pending + Rejected</span>
						</div>
						<div className="p-2 h-[56vh] overflow-y-auto">
							{pendingPatients && pendingPatients.map((pending, index) => (
							(selectedArrhythmia.length === 0 || pending.arrhythmias.some(arrhythmia => selectedArrhythmia.includes(arrhythmia))) ? (
							<div key={index} className="flex flex-col justify-between bg-orange h-20 rounded-lg text-xs p-4 mb-2">
								<div className="flex flex-row justify-between">
									<p>{pending.patient_name}</p>
									<p>Pending</p>
								</div>
								<div className="flex flex-row justify-between text-end items-center">
									<div className="flex flex-wrap-reverse">
										{pending.arrhythmias.map((arrhythmia, index) => (
											<p key={index} className="border p-0.5 rounded bg-white mr-0.5">{arrhythmia}</p>
										))}
									</div>
									<p className="text-xss">{new Date(pending.created_date).toLocaleDateString()} <br/>{new Date(pending.created_date).toLocaleTimeString()}</p>
								</div>
							</div>
							) : null
							))}
							{rejectedPatients && rejectedPatients.map((rejected, index) => (
							(selectedArrhythmia.length === 0 || rejected.arrhythmias.some(arrhythmia => selectedArrhythmia.includes(arrhythmia))) ? (
							<div key={index} className="flex flex-col justify-between bg-red h-20 rounded-lg text-xs p-4 mb-2">
								<div className="flex flex-row justify-between">
									<p>{rejected.patient_name}</p>
									<p>Rejected</p>
								</div>
								<div className="flex flex-row justify-between text-end items-center">
									<div className="flex flex-wrap-reverse">
										{rejected.arrhythmias.map((arrhythmia, index) => (
											<p key={index} className="border p-0.5 rounded bg-white mr-0.5">{arrhythmia}</p>
										))}
									</div>
									<p className="text-xss">{new Date(rejected.created_date).toLocaleDateString()} <br/>{new Date(rejected.created_date).toLocaleTimeString()}</p>
								</div>
							</div>
							) : null
							))}
						</div>
					</div>
					<div className="flex-1 border border-navy h-[62vh] rounded-lg">
						<div className="h-8 bg-navy rounded-t text-white text-sm py-2 px-4">
							<span>{donePatients.length}</span>
							<span className="ml-2">Done</span>
						</div>
						<div className="p-2 h-[56vh] overflow-y-auto">
							{donePatients && donePatients.map((done, index) => (
							(selectedArrhythmia.length === 0 || done.arrhythmias.some(arrhythmia => selectedArrhythmia.includes(arrhythmia))) ? (
							<div key={index} className="flex flex-col justify-between bg-green h-20 rounded-lg text-xs p-4 mb-2">
								<div className="flex flex-row justify-between">
									<p>{done.patient_name}</p>
									<p>Done</p>
								</div>
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-wrap">
										{done.arrhythmias.map((arrhythmia, index) => (
											<p key={index} className="border p-0.5 rounded bg-white mr-0.5">{arrhythmia}</p>
										))}
									</div>
									<p className="text-xss text-end">{new Date(done.created_date).toLocaleDateString()} <br/>{new Date(done.created_date).toLocaleTimeString()}</p>
								</div>
							</div>
							) : null
							))}
						</div>
					</div>
				</div>
			) : selectedOption === 'List' ? (
				<div className="flex flex-col space-y-2 w-full">
					<div className="border border-navy h-[32vh] rounded-lg overflow-hide">
						<div className="h-8 bg-navy rounded-t text-white text-sm py-2 px-4">
							<span>{pendingPatients.length + rejectedPatients.length}</span>
							<span className="ml-2">Pending + Rejected</span>
						</div>
						<div className="h-[30vh] overflow-y-auto">
							<table className="w-full text-xs border-navy">
								<thead>
									<tr className="text-white bg-navy bg-opacity-60 text-center">
										<th>#</th>
										<th>Name</th>
										<th>Time & Date</th>
										<th>Arrhythmia</th>
										<th>Status</th>
									</tr>
								</thead>
								{pendingPatients && pendingPatients.map((pending, index) => (
								(selectedArrhythmia.length === 0 || pending.arrhythmias.some(arrhythmia => selectedArrhythmia.includes(arrhythmia))) ? (
									<tbody>
									<tr key={index} className="text-center bg-orange border border-white">
										<td className="w-6 p-1">{pending.id}</td>
										<td className="w-6 p-1">{pending.patient_name}</td>
										<td className="w-6 p-1">{new Date(pending.created_date).toLocaleDateString()} {new Date(pending.created_date).toLocaleTimeString()}</td>
										<td className="w-6 p-1">{pending.arrhythmias.join(', ')}</td>
										<td className="w-6 p-1">Pending</td>
									</tr>
									</tbody>
								) : null
								))}
								{rejectedPatients && rejectedPatients.map((rejected, index) => (
								(selectedArrhythmia.length === 0 || rejected.arrhythmias.some(arrhythmia => selectedArrhythmia.includes(arrhythmia))) ? (
									<tbody>
									<tr key={index} className="text-center bg-red border border-white">
										<td className="w-6 p-1">{rejected.id}</td>
										<td className="w-6 p-1">{rejected.patient_name}</td>
										<td className="w-6 p-1">{new Date(rejected.created_date).toLocaleDateString()} {new Date(rejected.created_date).toLocaleTimeString()}</td>
										<td className="w-6 p-1">{rejected.arrhythmias.join(', ')}</td>
										<td className="w-6 p-1">Rejected</td>
									</tr>
									</tbody>
								) : null
								))}
							</table>
						</div>
					</div>

					<div className="border border-navy h-[32vh] rounded-l overflow-hide">
						<div className="h-8 bg-navy rounded-t text-white text-sm py-2 px-4">
							<span>{donePatients.length}</span>
							<span className="ml-2">Done</span>
						</div>
						<div className="h-[30vh] overflow-y-auto">
							<table className="w-full text-xs border-navy">
								<thead>
									<tr className="text-white bg-navy bg-opacity-60 text-center">
										<th>#</th>
										<th>Name</th>
										<th>Time & Date</th>
										<th>Arrhythmia</th>
										<th>Status</th>
									</tr>
								</thead>
								{donePatients && donePatients.map((done, index) => (
								(selectedArrhythmia.length === 0 || done.arrhythmias.some(arrhythmia => selectedArrhythmia.includes(arrhythmia))) ? (
									<tbody>
									<tr key={index} className="text-center bg-green border border-white">
										<td className="w-6 p-1">{done.id}</td>
										<td className="w-6 p-1">{done.patient_name}</td>
										<td className="w-6 p-1">{new Date(done.created_date).toLocaleDateString()} {new Date(done.created_date).toLocaleTimeString()}</td>
										<td className="w-6 p-1">{done.arrhythmias.join(', ')}</td>
										<td className="w-6 p-1">Done</td>
									</tr>
									</tbody>
								) : null
								))}
							</table>
						</div>
					</div>
				</div>
			) : null }

			</div>
		</MainLayout>
  )
}

export default Dashboard