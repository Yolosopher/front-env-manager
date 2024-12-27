import InfoProjects from "./InfoProjects";
import InfoTokens from "./InfoTokens";
import InfoUser from "./InfoUser";

const Dashboard = () => {
    return (
        <div className="w-full h-full flex-col flex justify-center items-center p-6">
            <div className="w-full max-w-lg h-full h-max">
                <div className="w-full h-full grid grid-cols-2 auto-rows-[200px] gap-4">
                    <InfoUser />
                    <InfoTokens />
                    <InfoProjects />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
