import React from 'react'
import { Patient } from '../../services/interface';

interface PatientDetailsProps {
	selectedPatient: Patient;
	handleStatus: (patientId: number, status: string) => void;
	setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ selectedPatient, handleStatus, setSelectedPatient }) => {
	return (
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
						<td className="p-2"><button  onClick={() => handleStatus(selectedPatient.id, 'REJECTED')} className="text-red rounded underline hover:opacity-40 cursor-pointer">Rejected</button></td>
					) : ( 
						<td className="p-2"><button onClick={() => handleStatus(selectedPatient.id, 'DONE')} className="bg-green px-2 py-1 rounded hover:opacity-40 cursor-pointer">Done</button></td>
					)}
				</tr>
			</tbody>
		</table>
	</div>
	)
}

export default PatientDetails