import { Patient } from "../../services/interface";

interface PatientListProps {
	patients: Patient[];
	selectedArrhythmia:string[];
	handleDropRejected: (e: React.DragEvent<HTMLDivElement>) => void;
	handleDropDone: (e: React.DragEvent<HTMLDivElement>) => void;
	handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
	handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
}

const PatientList: React.FC<PatientListProps> = ({
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
		
	return (
		<div className="flex flex-col space-y-2 w-full">
		<div className="border border-navy h-[32vh] rounded-lg overflow-hide">
			<div className="h-8 bg-navy rounded-t text-white text-sm py-2 px-4">
				<span>{pendingPatients.length + rejectedPatients.length}</span>
				<span className="ml-2">Pending + Rejected</span>
			</div>
			<div onDrop={handleDropRejected} onDragOver={handleDragOver} className="h-[30vh] overflow-y-auto">
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
					<tbody>
					{pendingPatients && pendingPatients.map((pending, index) => (
					(selectedArrhythmia.length === 0 || pending.arrhythmias.some(arrhythmia => selectedArrhythmia.includes(arrhythmia))) ? (
						<tr key={index} draggable='true' onDragStart={(e) => handleDragStart(e, pending.id)} className="text-center bg-orange border border-white">
							<td className="w-6 p-1">{pending.id}</td>
							<td className="w-6 p-1">{pending.patient_name}</td>
							<td className="w-6 p-1">{new Date(pending.created_date).toLocaleDateString()} {new Date(pending.created_date).toLocaleTimeString()}</td>
							<td className="w-6 p-1">{pending.arrhythmias.join(', ')}</td>
							<td className="w-6 p-1">Pending</td>
						</tr>
					) : null
					))}
					{rejectedPatients && rejectedPatients.map((rejected, index) => (
					(selectedArrhythmia.length === 0 || rejected.arrhythmias.some(arrhythmia => selectedArrhythmia.includes(arrhythmia))) ? (
						<tr key={index} draggable='true' onDragStart={(e) => handleDragStart(e, rejected.id)} className="text-center bg-red border border-white">
							<td className="w-6 p-1">{rejected.id}</td>
							<td className="w-6 p-1">{rejected.patient_name}</td>
							<td className="w-6 p-1">{new Date(rejected.created_date).toLocaleDateString()} {new Date(rejected.created_date).toLocaleTimeString()}</td>
							<td className="w-6 p-1">{rejected.arrhythmias.join(', ')}</td>
							<td className="w-6 p-1">Rejected</td>
						</tr>
					) : null
					))}
					</tbody>
				</table>
			</div>
		</div>

		<div className="border border-navy h-[32vh] rounded-l overflow-hide">
			<div className="h-8 bg-navy rounded-t text-white text-sm py-2 px-4">
				<span>{donePatients.length}</span>
				<span className="ml-2">Done</span>
			</div>
			<div onDrop={handleDropDone} onDragOver={handleDragOver} className="h-[30vh] overflow-y-auto">
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
					<tbody>
						{donePatients && donePatients.map((done, index) => (
						(selectedArrhythmia.length === 0 || done.arrhythmias.some(arrhythmia => selectedArrhythmia.includes(arrhythmia))) ? (
							<tr key={index} draggable='true' onDragStart={(e) => handleDragStart(e, done.id)} className="text-center bg-green border border-white">
								<td className="w-6 p-1">{done.id}</td>
								<td className="w-6 p-1">{done.patient_name}</td>
								<td className="w-6 p-1">{new Date(done.created_date).toLocaleDateString()} {new Date(done.created_date).toLocaleTimeString()}</td>
								<td className="w-6 p-1">{done.arrhythmias.join(', ')}</td>
								<td className="w-6 p-1">Done</td>
							</tr>
						) : null
						))}
					</tbody>
				</table>
			</div>
		</div>
	</div>
  )
}

export default PatientList