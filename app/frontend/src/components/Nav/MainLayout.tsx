import NavHorizontal from "./container/NavHorizontal"
import NavVertical from "./container/NavVertical"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-screen">
			<div className="flex flex-row h-full">
				<div>
					<NavVertical/>
				</div> 
				<div className="flex flex-col w-full">
					<div> 
						<NavHorizontal/>
					</div>
					<div className="h-full"> 
						{children}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainLayout