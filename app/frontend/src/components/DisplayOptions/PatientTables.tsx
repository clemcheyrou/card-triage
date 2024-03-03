import { Patient } from "../../services/interface";

interface PatientTablesProps {
	patients: Patient[];
	selectedArrhythmia:string[];
	handleDropRejected: (e: React.DragEvent<HTMLDivElement>) => void;
	handleDropDone: (e: React.DragEvent<HTMLDivElement>) => void;
	handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
	handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
}
  
const PatientTables: React.FC<PatientTablesProps> = ({
	patients,
	selectedArrhythmia,
	handleDropRejected,
	handleDropDone,
	handleDragOver,
	handleDragStart,
}) => {
	const pendingPatients = patients.filter((patient) => patient.status === 'PENDING')
	const rejectedPatients = patients.filter((patient) => patient.status === 'REJECTED')
	const donePatients = patients.filter((patient) => patient.status === 'DONE')
	
	const arrhythmiaColors = {
		'PVC': 'bg-blue',
		'Pause': 'bg-green',
		'AV Block': 'bg-yellow',
		'AFib': 'bg-orange',
		'PSVC': 'bg-purple'
	};

	return (
	<div className="flex flex-row space-x-2 w-full">
		<div className="flex-1 border border-navy h-[62vh] rounded-lg overflow-hidden">
			<div className="h-8 bg-navy rounded-t text-white text-sm py-2 px-4">
				<span>{pendingPatients.length + rejectedPatients.length}</span>
				<span className="ml-2">Pending + Rejected</span>
			</div>
			<div onDrop={handleDropRejected} onDragOver={handleDragOver} className="p-2 h-[56vh] overflow-y-auto">
				{patients && patients.map((patient, index) => (
				(patient.status !== 'DONE' && (selectedArrhythmia.length === 0 || patient.arrhythmias.some(arrhythmia => selectedArrhythmia.includes(arrhythmia)))) ? (
				<div key={index} draggable='true' onDragStart={(e) => handleDragStart(e, patient.id)} className={`flex flex-col justify-between ${patient.status === 'PENDING' ? 'bg-orange' : 'bg-red'} h-20 rounded-lg text-xs p-4 mb-2`}>
					<div className="flex flex-row justify-between">
						<p>{patient.patient_name}</p>
						<p>{patient.status === 'PENDING' ? 'Pending' : 'Rejected'}</p>
					</div>
					<div className="flex flex-row justify-between text-end items-center">
						<div className="flex flex-wrap-reverse">
							{patient.arrhythmias.map((arrhythmia, index) => (
								<p key={index} className={`border p-0.5 rounded mr-0.5 ${arrhythmiaColors[arrhythmia  as keyof typeof arrhythmiaColors]}`}>{arrhythmia}</p>
							))}
						</div>
						<p className="text-xss">{new Date(patient.created_date).toLocaleDateString()} <br/>{new Date(patient.created_date).toLocaleTimeString()}</p>
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
			<div onDrop={handleDropDone} onDragOver={handleDragOver} className="p-2 h-[56vh] overflow-y-auto">
				{donePatients && donePatients.map((done, index) => (
				(selectedArrhythmia.length === 0 || done.arrhythmias.some(arrhythmia => selectedArrhythmia.includes(arrhythmia))) ? (
				<div key={index} draggable='true' onDragStart={(e) => handleDragStart(e, done.id)} className="flex flex-col justify-between bg-green h-20 rounded-lg text-xs p-4 mb-2">
					<div className="flex flex-row justify-between">
						<p>{done.patient_name}</p>
						<p>Done</p>
					</div>
					<div className="flex flex-row justify-between items-center">
						<div className="flex flex-wrap">
							{done.arrhythmias.map((arrhythmia, index) => (
								<p key={index} className={`border p-0.5 rounded mr-0.5 ${arrhythmiaColors[arrhythmia  as keyof typeof arrhythmiaColors]}`}>{arrhythmia}</p>
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
	)
}

export default PatientTables