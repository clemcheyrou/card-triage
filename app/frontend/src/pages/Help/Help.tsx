import MainLayout from "../../components/Nav/MainLayout"

function Help() {
  return (
	<MainLayout>
		<div className="p-6">
			<div className="flex flex-col space-y-2 text-navy">
				<h1 className="font-medium text-navy">Help</h1>
				<p className="text-sm text-navy">
					Hello everyone, regarding the use of the application, you need to drag and drop the cards with the patients to update their status. Example: my customer is pending, I drag him to the done column to update his status to done. And vice versa, if the patient is done and you want to move him to rejected, you need to drag him to the pending+rejected column.<br/><br/>
					Two display modes are available for your convenience: table or list.<br/><br/>

					Moreover, you can easily access a client's data by searching for it in the search bar at the top of the columns on the left, and otherwise find a patient according to these arrhythmias by ticking those searched for in the 'all arrythmias' selection menu.
				</p>
			</div>
		</div>
	</MainLayout>
  )
}

export default Help